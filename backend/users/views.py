from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated

class CustomUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=30, required=True)
    last_name = serializers.CharField(max_length=30, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    re_password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = UserAccount
        fields = ('email', 'first_name', 'last_name', 'password', 're_password')
        extra_kwargs = {'password': {'write_only': True}, 're_password': {'write_only': True}}

    def validate_email(self, value):
        if UserAccount.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate(self, data):
        if data['password'] != data['re_password']:
            raise serializers.ValidationError("Passwords must match.")
        if len(data['password']) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return data

    def create(self, validated_data):
        validated_data.pop('re_password')
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoadUserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        try:
            serializer = CustomUserSerializer(request.user)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when trying to load user'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )