from django.db import models
from django.contrib.auth.models import AbstractUser

STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('editor', 'Editor'),
        ('user', 'User'),
        ('viewer', 'Viewer'),
        ('manager', 'Manager'),

    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    email = models.EmailField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='inactive')

    def __str__(self):
        return self.username

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)

    CATEGORY_CHOICES = (
            ('displays', 'Displays'),
            ('computers', 'Computers'),
            ('audio', 'Audio'),
            ('accessories', 'Accessories'),
            ('tablets', 'Tablets'),
            ('wearables', 'Wearables'),
            ('phones', 'Phones'),
        )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='inactive')
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='displays')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name