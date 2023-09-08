from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import Product,Order,CustomUser
from .serializers import ProductSerializer,OrderSerializer,UserSerializer,UserSerializerBuyer
from itertools import groupby
from rest_framework import status
from rest_framework.views import APIView
from django.contrib import auth
from rest_framework_simplejwt.tokens import RefreshToken
from .mypermissions import Custompermission
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAdminUser

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
class SignupSeller(APIView):   # for seller registration
    authentication_classes=[] 
    permission_classes=[]
    def get(self,request):
        ser=UserSerializerBuyer(CustomUser.objects.all(),many=True)
        return Response(ser.data)
    def post(self,request):
        # print(request.data)
        ser=UserSerializerBuyer(data=request.data)
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
class LoginSeller(APIView):
    authentication_classes=[]
    permission_classes=[]
    def post(self,request):
        email=request.data['email']
        password=request.data['password']
        print(request.data)
        usr=auth.authenticate(email=email,password=password)
        print(usr)
        if usr is not None and usr.is_staff:
            refresh = RefreshToken.for_user(usr)
            return Response({"msg":"User logged in", 'token':{'refresh': str(refresh),'access': str(refresh.access_token)}},status=status.HTTP_202_ACCEPTED)
        elif usr is not None and not usr.is_staff:
            return Response({"msg":"You are not authorized to login"},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"msg":"Please enter valid credentials"},status=status.HTTP_400_BAD_REQUEST)
        
class Logout(APIView):
    authentication_classes=[]
    permission_classes=[]
    def get(self,request):
        auth.logout(request)
        return Response({"msg":"Logout successfull"},status=status.HTTP_202_ACCEPTED)

class AddOrder(ModelViewSet):   # this view is used to make orders
    queryset=Order.objects.all()
    serializer_class=OrderSerializer
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user)

    def create(self, request, *args, **kwargs):
        id=request.data.get('product')
        # print(prod)
        if Order.objects.filter(product_id=id,buyer=request.user).exists():
            lst=Order.objects.filter(product_id=id,buyer=request.user).values()
            ins=Order.objects.get(id=lst[0]['id'])
            amount=lst[0]['totalprice']/lst[0]['quantity']
            ser=OrderSerializer(ins,data=request.data,partial=True,context={'request':request,'quantity':lst[0]['quantity']+1,'amount':(lst[0]['quantity']+1)*amount})
            if ser.is_valid():
                ser.save()
                return Response({"msg":"Product added to cart successfully"},status=status.HTTP_202_ACCEPTED)
            return Response(ser.errors,status=status.HTTP_400_BAD_REQUEST)
        else:
            ser=OrderSerializer(data=request.data,context={'request':request,'quantity':1,'id':id,'price':Product})
            if ser.is_valid():
                ser.save()
                return Response({"msg":"Product added to cart successfully"},status=status.HTTP_202_ACCEPTED) 
            return Response(ser.errors,status=status.HTTP_400_BAD_REQUEST)
        
    def destroy(self, request,pk):
        ord=list(Order.objects.filter(id=pk).values())
        quantity=ord[0]['quantity']
        if quantity==1:
            ins=Order.objects.get(id=pk)
            ins.delete()
            return Response({"msg":"Item removed"},status=status.HTTP_202_ACCEPTED)
        else:
            ord=list(Order.objects.filter(id=pk).values())
            ins=Order.objects.get(id=pk)
            amount=ord[0]['totalprice']/ord[0]['quantity']
            ser=OrderSerializer(ins,data=request.data,partial=True,context={'request':request,'quantity':ord[0]['quantity']-1,'amount':(ord[0]['quantity']-1)*amount})
            if ser.is_valid():
                ser.save()
                return Response({"msg":"count decreased"},status=status.HTTP_202_ACCEPTED)
            return Response(ser.errors,status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk):
        ord=list(Order.objects.filter(id=pk).values())
        ins=Order.objects.get(id=pk)
        amount=ord[0]['totalprice']/ord[0]['quantity']
        ser=OrderSerializer(ins,data=request.data,partial=True,context={'request':request,'quantity':ord[0]['quantity']+1,'amount':(ord[0]['quantity']+1)*amount})
        if ser.is_valid():
            ser.save()
            return Response({"msg":"count increased"},status=status.HTTP_202_ACCEPTED)
        return Response(ser.errors,status=status.HTTP_400_BAD_REQUEST)


class ViewProduct(ModelViewSet):
    authentication_classes=[]
    permission_classes=[Custompermission]
    queryset=Product.objects.all()
    serializer_class=ProductSerializer

    def list(self, request, *args, **kwargs):
        values = [{'category': k, 'products': list(g)} for k, g in groupby(Product.objects.order_by('category').values(), lambda x: x['category'])]
        # print(values)
        return Response(values,status=status.HTTP_202_ACCEPTED)
    
class AddProduct(ModelViewSet):  # this is the view for seller with which he can make requests
    permission_classes=[IsAdminUser]
    queryset=Product.objects.all()
    serializer_class=ProductSerializer


    def list(self, request, *args, **kwargs):
        values = [{'category': k, 'products': list(g)} for k, g in groupby(Product.objects.all().filter(seller=request.user).order_by('category').values(), lambda x: x['category'])]
        return Response(values,status=status.HTTP_202_ACCEPTED)
    
    def create(self, request, *args, **kwargs):
        ser=ProductSerializer(data=request.data,context={'request':request})
        if ser.is_valid():
            ser.save()
            return Response({"msg":"product added"},status=status.HTTP_202_ACCEPTED)
        return Response({"msg":"invalid"})
        
    