from rest_framework import serializers
from .models import UserAccount, Country

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
    country_choices = serializers.SerializerMethodField()

    class Meta:
        model = UserAccount
        exclude = ['password']

    def get_country_choices(self, obj):
        countries = Country.objects.all()
        return CountrySerializer(countries, many=True).data