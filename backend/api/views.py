from rest_framework import viewsets
from .models import User, Product
from .serializers import UserSerializer, ProductSerializer
from rest_framework.permissions import IsAuthenticated
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]