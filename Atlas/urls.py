from .views import *
from django.conf.urls import url
from rest_framework_mongoengine import routers

#router = routers.DefaultRouter()
#router.register(r'UseCases', UseCasesView, r'UseCases')

urlpatterns = [
    url(r'^UseCases', UseCasesView.as_view(), name='Use Cases')
]

#urlpatterns += router.urls

