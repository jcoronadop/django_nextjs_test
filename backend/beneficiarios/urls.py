from django.urls import path, include  # type: ignore
from rest_framework import routers  # type: ignore

from .views import BeneficiarioViewSet

router = routers.DefaultRouter()
router.register(r'beneficiarios', BeneficiarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
