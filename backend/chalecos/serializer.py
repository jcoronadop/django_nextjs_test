from rest_framework import serializers # type: ignore

from .models import Chaleco

class ChalecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chaleco
        fields = '__all__'