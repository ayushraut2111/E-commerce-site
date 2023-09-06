from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin


class CustomManager(BaseUserManager):
    def create_user(self,email,password,**kwargs):
        if not email:
            raise ValueError("Email field is required")
        email=self.normalize_email(email)
        user=self.model(email=email,**kwargs)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self,email,password,**kwargs):
        kwargs.setdefault('is_staff',True)
        kwargs.setdefault('is_superuser',True)
        kwargs.setdefault('is_active',True)
        return self.create_user(email,password,**kwargs)
    
    def create_seller(self,email,password,**kwargs):
        kwargs.setdefault('is_staff',True)
        return self.create_user(email,password,**kwargs)

class CustomUser(AbstractBaseUser,PermissionsMixin):
    fullname=models.CharField(max_length=100)
    phone=models.CharField(max_length=15,unique=True)
    email=models.EmailField(unique=True)
    address=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['phone']
    objects=CustomManager()

    def __str__(self) -> str:
        return self.fullname
    
class Product(models.Model):
    seller=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    pname=models.CharField(max_length=100)
    category=models.CharField(max_length=100)
    description=models.TextField(null=True,blank=True)
    price=models.FloatField()

    def __str__(self) -> str:
        return self.pname
    
class Order(models.Model):
    buyer=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.IntegerField()
    totalprice=models.FloatField()

    def __str__(self) -> str:
        return self.product.pname

