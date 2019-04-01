from .serializers import *
from rest_framework import viewsets, generics, filters
from django.template.response import TemplateResponse
from bson.objectid import ObjectId


class UseCasesView(generics.ListCreateAPIView):

    lookup_field = "_id"
    serializer_class = UseCase_Serializer
    my_filter_fields = ('_id',
                        'name',
                        'cybersecurity_threats',
                        'description',
                        'actors',
                        'organizations',
                        'technologies',
                        'discipline',
                        'locations',
                        'information_types',
                        'activities')

    def get_kwargs_for_filtering(self):

        filtering_kwargs = {}
        for field in self.my_filter_fields:  # iterate over the filter fields
            field_value = self.request.query_params.get(field)  # get the value of a field from request query parameter
            if field_value:

                if field in ('cybersecurity_threats',
                             'actors',
                             'organizations',
                             'technologies',
                             'discipline',
                             'locations',
                             'information_types',
                             'activities'):
                    field_values = field_value.split(',', field_value.count(','))
                    filtering_kwargs[field] = {'$all': field_values}
                elif field == '_id':

                    filtering_kwargs[field] = ObjectId(field_value)

                else:
                    filtering_kwargs[field] = ObjectId(field_value)

        return filtering_kwargs

    def get_queryset(self):

        queryset = UseCases.objects.all()
        filtering_kwargs = self.get_kwargs_for_filtering()  # get the fields with values for filtering

        if filtering_kwargs:
            print(filtering_kwargs)
            query_keys = [i['_id'] for i in UseCases.objects.mongo_find(filtering_kwargs)]
            queryset = UseCases.objects.filter(_id__in=query_keys)

        return queryset




