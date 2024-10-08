from rest_framework import viewsets # type: ignore
from rest_framework.permissions import AllowAny  # type: ignore

from .serializer import UsuarioSerializer
from .models import Usuario

class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
    
    action_permission = {
        AllowAny: ['list','create', 'update', 'retrieve', 'partial_update', 'destroy'],
    }
    