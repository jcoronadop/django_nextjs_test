from django.db import models # type: ignore

class Chaleco(models.Model):
    serial = models.IntegerField(primary_key=True)
    beneficiario_cedula = models.ForeignKey(to='beneficiarios.Beneficiario', on_delete=models.CASCADE, db_column='cedula')

    def __str__(self):
        return str(self.serial)