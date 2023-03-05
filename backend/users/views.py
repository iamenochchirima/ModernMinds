from decouple import config
from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserAccount, Country
from .serializers import AccountSerializer, CountrySerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class CustomUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=30, required=True)
    last_name = serializers.CharField(max_length=30, required=True)
    email = serializers.EmailField(required=True)
    country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all(), required=True)
    gender = serializers.CharField(max_length=30, required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    re_password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = UserAccount
        fields = ('email', 'first_name', 'last_name', 'country', 'gender',
                  'password', 're_password')
        extra_kwargs = {'password': {'write_only': True},
                        're_password': {'write_only': True}}

    def validate_email(self, value):
        if UserAccount.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with this email already exists.")
        return value

    def validate(self, data):
        if data['password'] != data['re_password']:
            raise serializers.ValidationError("Passwords must match.")
        if len(data['password']) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long.")
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
                # Generate verification token
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
                token = PasswordResetTokenGenerator().make_token(user)

                # Construct verification URL
                verification_url = f'http://localhost:3000/verify-email/{uidb64}/{token}'

                # Send verification email using SendGrid dynamic template
                message = Mail(
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to_emails=user.email,
                    subject='Verify your email address',
                )
                message.template_id = config('EMAIL_VERIFICATION_TEMPLATE_ID')
                message.dynamic_template_data = {
                    'verification_url': verification_url,
                }
                try:
                    sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                    response = sg.send(message)
                    print(response.status_code)
                except Exception as e:
                    print(e)
                    print(e.body)

                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserDataSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all(), required=True)
    gender = serializers.CharField(max_length=30, required=True)

    class Meta:
        model = UserAccount
        fields = ('first_name', 'last_name', 'country', 'gender')

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.country = validated_data.get('country', instance.country)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.save()
        return instance

class UpdateUser(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, format=None):
        print(request.data)
        user = request.user
        serializer = UpdateUserDataSerializer(
            user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoadUserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        try:
            serializer = AccountSerializer(request.user)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        except UserAccount.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            print(e)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):

        try:
            # Decode uidb64 to get user pk
            uid = force_str(urlsafe_base64_decode(uidb64))
            uid_int = int(uid)

            # Get user object and verify token
            user = UserAccount.objects.get(pk=uid_int)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise Exception('Invalid verification token')

            # Mark email as verified and save user
            user.is_email_verified = True
            user.save()

            return Response({'message': 'Email verified successfully'}, status=status.HTTP_200_OK)
        except UserAccount.DoesNotExist:
            return Response({'error': 'User account not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        email = request.data.get('email', '')
        try:
            user = UserAccount.objects.get(email=email)
        except UserAccount.DoesNotExist:
            return Response({'error': 'User account not found'}, status=status.HTTP_404_NOT_FOUND)

        # Generate reset token
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = PasswordResetTokenGenerator().make_token(user)

        # Construct reset URL
        reset_url = f'http://localhost:3000/reset-password-confirm/{uidb64}/{token}'

        # Send reset email using SendGrid dynamic template
        message = Mail(
            from_email=settings.DEFAULT_FROM_EMAIL,
            to_emails=user.email,
            subject='Reset your password',
        )
        message.template_id = config('PASSWORD_RESET_TEMPLATE_ID')
        message.dynamic_template_data = {
            'reset_url': reset_url,
        }
        try:
            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            response = sg.send(message)
            print(response.status_code)
        except Exception as e:
            print(e)
            print(e.body)

        return Response({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        uidb64 = request.data.get('uid', '')
        token = request.data.get('token', '')
        password = request.data.get('password', '')
        re_password = request.data.get('re_password', '')

        # Check if password and re_password match
        if password != re_password:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        # Decode uidb64 to get user pk
        uid = force_str(urlsafe_base64_decode(uidb64))
        uid_int = int(uid)

        try:
            # Get user object and verify token
            user = UserAccount.objects.get(pk=uid_int)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise Exception('Invalid reset token')

            # Reset password
            user.set_password(password)
            user.save()

            return Response({'message': 'Password reset successful'}, status=status.HTTP_200_OK)
        except UserAccount.DoesNotExist:
            return Response({'error': 'User account not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class CountryListView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, format=None):
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
