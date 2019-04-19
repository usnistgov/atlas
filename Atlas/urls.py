from .views import *
from django.conf.urls import url

app_name = 'Atlas'

urlpatterns = [
    url(r'^UseCases', UseCasesView.as_view(), name='Use Cases')
]



