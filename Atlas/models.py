from djongo import models


class UseCases(models.Model):

    _id = models.ObjectIdField()
    name = models.CharField(max_length=100, null=False)
    cybersecurity_threats = models.ListField()
    description = models.CharField(max_length=2000, null=False)
    actors = models.ListField()
    organizations = models.ListField()
    technologies = models.ListField()
    discipline = models.ListField()
    locations = models.ListField()
    information_types = models.ListField()
    activities = models.ListField()
    objects = models.DjongoManager()



