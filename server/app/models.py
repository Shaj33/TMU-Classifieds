from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, validators=[RegexValidator(regex=r'@torontomu\.ca$',
                                message='Email must end with @torontomu.ca')])
    
    # Provide unique related_name attributes for the groups and user_permissions fields
    # to avoid clashes with the default User model
    groups = models.ManyToManyField(
        to=Group,
        related_name='custom_user_set',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='custom_user_permissions'  # Unique related_name for user_permissions
    )