from rest_framework import serializers
from .models import RegisterUser

class Serializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterUser
        fields = '__all__'
