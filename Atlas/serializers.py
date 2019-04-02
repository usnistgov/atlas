from rest_framework_mongoengine import serializers, fields
from .models import *


class UseCase_Serializer(serializers.DocumentSerializer):

    class Meta:

        model = UseCases
        fields = '__all__'
