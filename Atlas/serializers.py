from rest_framework import serializers
from rest_framework_mongoengine import fields
from .models import *


class UseCase_Serializer(serializers.ModelSerializer):

    _id = fields.ObjectIdField()

    class Meta:

        model = UseCases
        fields = '__all__'




'''
('_id',
                  'name',
                  'cybersecurity_threats',
                  'description',
                  'actors',
                  'organizations',
                  'technologies',
                  'discipline',
                  'locations',
                  'information_types',
                  'activities')
'''