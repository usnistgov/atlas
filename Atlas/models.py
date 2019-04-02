from mongoengine import Document, fields


class UseCases(Document):

    _id = fields.ObjectIdField(primary_key=True)
    name = fields.StringField(max_length=100, null=False, unique=True)
    cybersecurity_threats = fields.ListField()
    description = fields.StringField(max_length=2000, null=False)
    actors = fields.ListField()
    organizations = fields.ListField()
    technologies = fields.ListField()
    discipline = fields.ListField()
    locations = fields.ListField()
    information_types = fields.ListField()
    activities = fields.ListField()

    meta = {'collection': 'Atlas_UseCases'}
