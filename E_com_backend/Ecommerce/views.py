from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import Product,Order,CustomUser
from .serializers import ProductSerializer,OrderSerializer,UserSerializer
from itertools import groupby
from rest_framework import status
from rest_framework.views import APIView
from django.contrib import auth
from rest_framework_simplejwt.tokens import RefreshToken

class Signup(APIView):
    authentication_classes=[]
    permission_classes=[]
    def get(self,request):
        ser=UserSerializer(CustomUser.objects.all(),many=True)
        return Response(ser.data)
    def post(self,request):
        # print(request.data)
        ser=UserSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response({"msg":"signup successfull"},status=status.HTTP_202_ACCEPTED)
        # print(ser.errors.values())
        return Response({"msg":ser.errors.values()},status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    authentication_classes=[]
    permission_classes=[]
    def post(self,request):
        email=request.data['email']
        password=request.data['password']
        usr=auth.authenticate(email=email,password=password)
        if usr is not None:
            refresh = RefreshToken.for_user(usr)
            return Response({"msg":"User logged in", 'token':{'refresh': str(refresh),'access': str(refresh.access_token)}},status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"msg":"Please enter valid credentials"},status=status.HTTP_400_BAD_REQUEST)
class AddProduct(ModelViewSet):
    authentication_classes=[]
    permission_classes=[]
    queryset=Product.objects.all()
    serializer_class=ProductSerializer

    def list(self, request, *args, **kwargs):
        values = [{'category': k, 'products': list(g)} for k, g in groupby(Product.objects.order_by('category').values(), lambda x: x['category'])]
        return Response(values,status=status.HTTP_202_ACCEPTED)

class AddOrder(ModelViewSet):
    authentication_classes=[]
    permission_classes=[]
    queryset=Order.objects.all()
    serializer_class=OrderSerializer