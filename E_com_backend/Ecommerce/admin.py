from django.contrib import admin
from .models import CustomUser,Product,Order

@admin.register(CustomUser)
class UserRegister(admin.ModelAdmin):
    list_display=['email','fullname','phone']

@admin.register(Product)
class ProductRegister(admin.ModelAdmin):
    list_display=['id','seller','pname','category']

@admin.register(Order)
class OrderRegister(admin.ModelAdmin):
    list_display=['id','buyer','product','quantity']

