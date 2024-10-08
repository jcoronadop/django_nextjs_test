from rest_framework import serializers # type: ignore

from .models import Beneficiario

class BeneficiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiario
        fields = '__all__'