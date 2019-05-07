from mongoengine import Document
from mongoengine.fields import ListField, StringField, DictField, ObjectIdField
import Atlas_Project.settings as settings


class CyberSecurityThreats(Document):

    _id = ObjectIdField(primary_key=True)
    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('cybersecurity_threats')}


class Actors(Document):

    _id = ObjectIdField(primary_key=True)
    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('actors')}


class RespondingOrganizations(Document):

    _id = ObjectIdField(primary_key=True)
    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('responding_organizations')}


class Technologies(Document):

    _id = ObjectIdField(primary_key=True)
    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('technologies')}


class Disciplines(Document):

    _id = ObjectIdField(primary_key=True)
    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('discipline')}


class Locations(Document):

    _id = ObjectIdField(primary_key=True)
    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('locations')}


class InformationCategories(Document):

    _id = ObjectIdField(primary_key=True)
    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('information_categories')}


class InformationTypes(Document):

    _id = ObjectIdField(primary_key=True)
    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)
    triad_rating = DictField(required=True)
    information_categories = ListField(field=ObjectIdField(), required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('information_types')}


class Activities(Document):

    _id = ObjectIdField(primary_key=True)
    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, required=True)

    meta = {'collection': settings.COLLECTION_NAMES.get('activities')}


class UseCases(Document):

    _id = ObjectIdField(primary_key=True)
    name = StringField(max_length=100, required=True)
    cybersecurity_threats = ListField(field=ObjectIdField())
    description = StringField(max_length=2000, required=True)
    actors = ListField(field=ObjectIdField())
    responding_organizations = ListField(field=ObjectIdField())
    technologies = ListField(field=ObjectIdField())
    discipline = ListField(field=ObjectIdField())
    locations = ListField(field=ObjectIdField())
    information_types = ListField(field=ObjectIdField())
    activities = ListField(field=ObjectIdField())

    meta = {'collection': settings.COLLECTION_NAMES.get('use_cases')}
