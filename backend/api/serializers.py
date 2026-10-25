from rest_framework import serializers
from .models import User, Product

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='first_name', required=False)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'role', 'status']
        extra_kwargs = {'username': {'required': False}}

    def create(self, validated_data):
        email = validated_data.get('email', '')
        validated_data['username'] = email 
        

        if 'first_name' in validated_data:
            first_name = validated_data.pop('first_name')
            validated_data['first_name'] = first_name

        user = User(**validated_data)

        user.set_password("Welcome123!") 
        user.save()
        
        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'