from django.urls import path, include  # type: ignore
from rest_framework import routers  # type: ignore

from .views import ChalecoViewSet

router = routers.DefaultRouter()
router.register(r'chalecos', ChalecoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
