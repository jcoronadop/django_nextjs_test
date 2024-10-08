from rest_framework import viewsets # type: ignore
from rest_framework.permissions import AllowAny  # type: ignore

from .serializer import ChalecoSerializer
from .models import Chaleco

class ChalecoViewSet(viewsets.ModelViewSet):
    serializer_class = ChalecoSerializer
    queryset = Chaleco.objects.all()
    
    action_permission = {
        AllowAny: ['list','create', 'update', 'retrieve', 'partial_update', 'destroy'],
    }