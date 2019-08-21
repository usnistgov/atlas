from mongoengine import Document
from mongoengine.fields import ListField, StringField, DictField, ObjectIdField
import Atlas_Project.settings as settings


class activities(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, null=True)
    resource_links = ListField()

    meta = {'collection': settings.COLLECTION_NAMES.get('activities')}

class actors(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, null=True)
    resource_links = ListField()

    meta = {'collection': settings.COLLECTION_NAMES.get('actors')}

class cybersecurity_threats(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, null=True)
    resource_links = ListField()

    meta = {'collection': settings.COLLECTION_NAMES.get('cybersecurity_threats')}

class disciplines(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, null=True)
    resource_links = ListField()

    meta = {'collection': settings.COLLECTION_NAMES.get('disciplines')}

class responding_organizations(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, null=True)
    resource_links = ListField()

    meta = {'collection': settings.COLLECTION_NAMES.get('responding_organizations')}


class technologies(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, null=True)
    resource_links = ListField()

    meta = {'collection': settings.COLLECTION_NAMES.get('technologies')}


class locations(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, null=True)
    resource_links = ListField()

    meta = {'collection': settings.COLLECTION_NAMES.get('locations')}


class information_categories(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, null=True)
    resource_links = ListField()

    meta = {'collection': settings.COLLECTION_NAMES.get('information_categories')}


class information_types(Document):

    name = StringField(max_length=100, required=True)
    description = StringField(max_length=2000, null=True)
    security_reasoning = StringField(max_length=2000, null=True)
    triad_rating = DictField(required=True)
    information_categories = ListField(field=ObjectIdField())

    meta = {'collection': settings.COLLECTION_NAMES.get('information_types')}


class use_cases(Document):

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
    concept_links = DictField(field=ListField(field=ObjectIdField()))

    meta = {'collection': settings.COLLECTION_NAMES.get('use_cases')}
