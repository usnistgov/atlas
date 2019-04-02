from .views import *
from django.conf.urls import url

urlpatterns = [
    url(r'^UseCases', UseCasesView.as_view(), name='Use Cases')
]



