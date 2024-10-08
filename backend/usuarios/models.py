from django.db import models # type: ignore


class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    nombreUsuario = models.CharField(max_length=255, unique=True)
    contraseña = models.CharField(max_length=255)

    def __str__(self):
        return self.nombreUsuario
