from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

router=DefaultRouter()

router.register('addproduct',views.AddProduct,basename='add_a_product')
router.register('product',views.ViewProduct,basename='view_all')
router.register('addorder',views.AddOrder)

urlpatterns = [
    path('',include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/',views.Signup.as_view()),
    path('signupbuyer/',views.SignupSeller.as_view()),
    path('login/',views.Login.as_view()),
    path('logout/',views.Logout.as_view()),
    path('loginseller/',views.LoginSeller.as_view()),

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


# http://127.0.0.1:8000/product/
# {
#     "pname":"mobile phone",
#     "category":"mobiles",
#     "description":"hello i am phone",
#     "price":"123"
# }