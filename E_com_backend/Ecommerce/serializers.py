from rest_framework.serializers import ModelSerializer
from .models import Product,Order,CustomUser
from rest_framework import serializers


class ProductSerializer(ModelSerializer):
    seller=serializers.CharField(source="seller.fullname")
    class Meta:
        model=Product
        fields=['id','seller','pname','category','description','price']


class OrderSerializer(ModelSerializer):
    pname=serializers.CharField(source="product.pname",read_only=True)    # to view referenced field details in this api also
    category=serializers.CharField(source="product.category",read_only=True)
    description=serializers.CharField(source="product.description",read_only=True)
    pprice=serializers.CharField(source="product.price",read_only=True)
    class Meta:
        model=Order
        fields=['id','buyer','product','pname','category','description','pprice','quantity','totalprice']

class UserSerializer(ModelSerializer):   # for signup
    password=serializers.CharField(write_only=True)  # if the fields are not defined in models then we define here after then we can use it so we have to bring all the fields here if we are passing it here from views
    password1=serializers.CharField(write_only=True)
    class Meta:  # this validated data is not the data which we sent, it is the data which is processed from model so we want every field here
        model=CustomUser
        fields='__all__'

    def create(self, validated_data):
        return CustomUser.objects.create_user(email=validated_data['email'],password=validated_data['password'],phone=validated_data['phone'],fullname=validated_data['fullname'],address=validated_data['address'])
    
    def validate(self, attrs):
        pass1=attrs.get('password')
        pass2=attrs.get('password1')
        if pass1!=pass2:
            raise serializers.ValidationError("password not matched")
        else:
            return attrs
    def validate_phone(self,value):
        if CustomUser.objects.filter(phone=value).exists():
            raise serializers.ValidationError("phone number already exists")
        else:
            return value
    def validate_email(self,value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("email already exists")
        else:
            return value
    
        