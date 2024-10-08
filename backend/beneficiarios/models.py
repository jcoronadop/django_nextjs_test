from django.db import models # type: ignore


class Beneficiario(models.Model):
    cedula = models.IntegerField(primary_key=True, unique=True)
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    poblacion = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre
