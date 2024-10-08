from rest_framework import viewsets  # type: ignore
from rest_framework.permissions import AllowAny  # type: ignore
from django_filters.rest_framework import DjangoFilterBackend  # type: ignore
from rest_framework.filters import SearchFilter, OrderingFilter  # type: ignore
from rest_framework.decorators import action # type: ignore
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST # type: ignore
from rest_framework.response import Response # type: ignore

from .serializer import BeneficiarioSerializer
from .models import Beneficiario


class BeneficiarioViewSet(viewsets.ModelViewSet):
    serializer_class = BeneficiarioSerializer
    queryset = Beneficiario.objects.all()

    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]

    filter_fields = {
        "nombre": [
            "exact",
        ],
        "id": [
            "exact",
        ],
    }

    action_permission = {
        AllowAny: ["list", "create", "update", "retrieve", "partial_update", "destroy"],
    }

    @action(
        detail=False,
        methods=["get"],
        url_path="get-by-name/(?P<nombre>[^/.]+)",
        url_name="get_by_name",
    )
    def get_by_name(self, request, nombre=None):
        if not nombre:
            return Response(
                {"message": "Name parameter is required."},
                status=HTTP_400_BAD_REQUEST,
            )

        bnf = Beneficiario.objects.filter(name__icontains=nombre)
        serializer = BeneficiarioSerializer(bnf, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
