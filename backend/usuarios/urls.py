from django.urls import path, include  # type: ignore
from rest_framework import routers  # type: ignore

from .views import UsuarioViewSet

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
