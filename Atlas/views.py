from .serializers import *
from rest_framework_mongoengine import generics
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

    def convert_kwargs_to_mongo_query(self):

        mongo_query = {}

        for field in self.request.query_params:  # iterate over the filter fields

            if field != 'format':

                field_value = self.request.query_params.get(field)  # get the value of a field from request query parameter
                mongo_query[field] = field_value                    # Default search option, ensures that query returns nothing if the field is not in the database

                if field in self.my_filter_fields:

                    # Array Field Types
                    if field in ('cybersecurity_threats',
                                 'actors',
                                 'organizations',
                                 'technologies',
                                 'discipline',
                                 'locations',
                                 'information_types',
                                 'activities'):

                        search_option = ''

                        if field_value.find('[') != -1:

                            option_index = field_value.find('[')
                            search_option = field_value[option_index + 1:-1]
                            field_value = field_value[0:option_index]

                        field_values = [field_value.strip() for field_value in field_value.split(',', field_value.count(','))]

                        if search_option == 'or':

                            mongo_query[field] = {'$in': field_values}

                        elif search_option in ('!or', 'not or'):

                            mongo_query[field] = {'$not': {'$in': field_values}}

                        elif search_option in ('!', 'not'):

                            mongo_query[field] = {'$not': {'$all': field_values}}

                        else:

                            mongo_query[field] = {'$all': field_values}

                    # Object Id Field Type
                    elif field == '_id':

                        mongo_query[field] = ObjectId(field_value)

        return mongo_query

    def get_queryset(self):

        queryset = UseCases.objects.all()
        mongo_query = self.convert_kwargs_to_mongo_query()  # get the fields with values for filtering

        if mongo_query != {}:

            queryset = UseCases.objects(__raw__=mongo_query)

        return queryset



