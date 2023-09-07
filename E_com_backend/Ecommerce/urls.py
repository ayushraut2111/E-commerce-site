from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router=DefaultRouter()

router.register('addproduct',views.AddProduct,basename='add_a_product')
router.register('product',views.ViewProduct,basename='view_all')
router.register('addorder',views.AddOrder)

urlpatterns = [
    path('',include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/',views.Signup.as_view()),
    path('login/',views.Login.as_view()),

]