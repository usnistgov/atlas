from rest_framework_mongoengine import serializers
from .models import *


class UseCase_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = use_cases
        fields = '__all__'


class CyberSecurityThreats_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = cybersecurity_threats
        fields = '__all__'


class Actors_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = actors
        fields = '__all__'


class RespondingOrganizations_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = responding_organizations
        fields = '__all__'


class Technologies_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = technologies
        fields = '__all__'


class Disciplines_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = disciplines
        fields = '__all__'


class Locations_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = locations
        fields = '__all__'


class InformationTypes_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = information_types
        fields = '__all__'


class InformationCategories_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = information_categories
        fields = '__all__'


class Activities_Serializer(serializers.DocumentSerializer):

    class Meta:
        model = activities
        fields = '__all__'
