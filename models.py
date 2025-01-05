from django.db import models
class RegisterUser(models.Model):
    username=models.CharField(max_length=255)
    password=models.CharField(max_length=8)
    faceID=models.CharField(max_length=500)



