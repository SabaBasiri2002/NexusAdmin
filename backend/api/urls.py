from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserViewSet, ProductViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'products', ProductViewSet)    

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('products/', ProductViewSet.as_view({'get': 'list', 'post': 'create'}), name='product_list'),
    # path('products/<int:pk>/', ProductViewSet.as_view({'get': 'retrieve'}), name='product_detail'),
    # path('products/<int:pk>/', ProductViewSet.as_view({'put': 'update', 'patch': 'partial_update'}), name='product_update'),
    # path('users/', UserViewSet.as_view({'get': 'list'}), name='user_list'),
    # path('users/<int:pk>/', UserViewSet.as_view({'get': 'retrieve'}), name='user_detail'),
]