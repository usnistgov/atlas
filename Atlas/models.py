from mongoengine import Document
from mongoengine.fields import ListField, StringField, DictField, ObjectIdField
import Atlas_Project.settings as settings


class CyberSecurityThreats(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('cybersecurity_threats')}


class Actors(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('actors')}


class RespondingOrganizations(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('responding_organizations')}


class Technologies(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('technologies')}


class Disciplines(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('disciplines')}


class Locations(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('locations')}


class InformationCategories(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('information_categories')}


class InformationTypes(Document):

    name = StringField(max_length=100, required=True)
    security_reasoning = StringField(max_length=2000, required=True)
    triad_rating = DictField(required=True)
    information_categories = ListField(field=ObjectIdField(), required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('information_types')}


class Activities(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('activities')}


class UseCases(Document):

    name = StringField(max_length=100, required=True)
    source = StringField(max_length=500)
    cybersecurity_threats = ListField(field=ObjectIdField())
    description = StringField(max_length=2000, required=True)
    actors = ListField(field=ObjectIdField())
    responding_organizations = ListField(field=ObjectIdField())
    technologies = ListField(field=ObjectIdField())
    disciplines = ListField(field=ObjectIdField())
    locations = ListField(field=ObjectIdField())
    information_types = ListField(field=ObjectIdField())
    activities = ListField(field=ObjectIdField())

    meta = {'collection': settings.COLLECTION_NAMES.get('use_cases')}
