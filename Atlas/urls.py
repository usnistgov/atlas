from .views import *
from django.conf.urls import url

app_name = 'Atlas'

urlpatterns = [
    url(r'^UseCases', UseCasesView.as_view(), name='Use Cases'),
    url(r'^CyberSecurityThreats', CyberSecurityThreatsView.as_view(), name='Cyber Security Threats'),
    url(r'^Actors', ActorsView.as_view(), name='Actors'),
    url(r'^RespondingOrganizations', RespondingOrganizationsView.as_view(), name='Responding Organizations'),
    url(r'^Technologies', TechnologiesView.as_view(), name='Technologies'),
    url(r'^Disciplines', DesciplinesView.as_view(), name='Disciplines'),
    url(r'^InformationTypes', InformationTypesView.as_view(), name='Information Types'),
    url(r'^InformationCategories', InformationCategoriesView.as_view(), name='Information Categories'),
    url(r'^Activities', ActivitiesView.as_view(), name='Activities')
]



