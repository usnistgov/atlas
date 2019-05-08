from rest_framework_mongoengine import serializers
from .models import *


class UseCase_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = UseCases
        fields = '__all__'


class CyberSecurityThreats_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = CyberSecurityThreats
        fields = '__all__'


class Actors_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = Actors
        fields = '__all__'


class RespondingOrganizations_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = RespondingOrganizations
        fields = '__all__'


class Technologies_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = Technologies
        fields = '__all__'


class Disciplines_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = Disciplines
        fields = '__all__'


class Locations_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = Locations
        fields = '__all__'


class InformationTypes_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = InformationTypes
        fields = '__all__'


class InformationCategories_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = InformationCategories
        fields = '__all__'


class Activities_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = Activities
        fields = '__all__'
