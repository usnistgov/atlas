from djongo import models


class UseCases(models.Model):

    _id = models.ObjectIdField()
    name = models.CharField(max_length=100, null=False)
    cybersecurity_threats = models.ListField(blank=True)
    description = models.CharField(max_length=2000, null=False)
    actors = models.ListField(blank=True)
    organizations = models.ListField(blank=True)
    technologies = models.ListField(blank=True)
    discipline = models.ListField(blank=True)
    locations = models.ListField(blank=True)
    information_types = models.ListField(blank=True)
    activities = models.ListField(blank=True)
    objects = models.DjongoManager()



