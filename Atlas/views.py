from .serializers import *
from rest_framework_mongoengine import generics
from rest_framework_mongoengine.generics import mixins
from rest_framework import status
from rest_framework.response import Response
from bson.objectid import ObjectId
import pymongo
import Atlas_Project.settings as settings

DATABASE_NAME = settings.DATABASES['default']['NAME']
MongoClient = pymongo.MongoClient()
db = MongoClient[DATABASE_NAME]


class CyberSecurityThreatsView(generics.ListCreateAPIView):
    serializer_class = CyberSecurityThreats_Serializer
    queryset = CyberSecurityThreats.objects.all()


class ActorsView(generics.ListCreateAPIView):
    serializer_class = Actors_Serializer
    queryset = Actors.objects.all()


class TechnologiesView(generics.ListCreateAPIView):
    serializer_class = Technologies_Serializer
    queryset = Technologies.objects.all()


class RespondingOrganizationsView(generics.ListCreateAPIView):
    serializer_class = RespondingOrganizations_Serializer
    queryset = RespondingOrganizations.objects.all()


class DisciplinesView(generics.ListCreateAPIView):
    serializer_class = Disciplines_Serializer
    queryset = Disciplines.objects.all()


class LocationsView(generics.ListCreateAPIView):
    serializer_class = Locations_Serializer
    queryset = Locations.objects.all()


class InformationTypesView(generics.ListCreateAPIView):
    serializer_class = InformationTypes_Serializer
    queryset = InformationTypes.objects.all()


class InformationCategoriesView(generics.ListCreateAPIView):
    serializer_class = InformationCategories_Serializer
    queryset = InformationCategories.objects.all()


class ActivitiesView(generics.ListCreateAPIView):
    serializer_class = Activities_Serializer
    queryset = Activities.objects.all()


class UseCasesView(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   generics.ListCreateAPIView):
    serializer_class = UseCase_Serializer
    my_filter_fields = ('id',
                        'name',
                        'cybersecurity_threats',
                        'description',
                        'actors',
                        'responding_organizations',
                        'technologies',
                        'disciplines',
                        'locations',
                        'information_types',
                        'information_categories',
                        'activities')

    def convert_kwargs_to_mongo_query(self):

        mongo_query = {}

        for field in self.request.query_params:  # iterate over the filter fields

            if field != 'format':

                # get the value of a field from request query parameter
                field_value = self.request.query_params.get(field)

                # Default search option, ensures that query returns
                # nothing if the field is not in the database
                mongo_query[field] = field_value

                if field in self.my_filter_fields:

                    # Array Field Types
                    if field in ('cybersecurity_threats',
                                 'actors',
                                 'responding_organizations',
                                 'technologies',
                                 'disciplines',
                                 'locations',
                                 'information_types',
                                 'activities'):

                        search_option = ''

                        # Extract Search Options from URL If They Are Present
                        if field_value.find('[') != -1:
                            option_index = field_value.find('[')
                            search_option = field_value[option_index + 1:-1]
                            field_value = field_value[0:option_index]

                        # Separate Field Values Entered Into an Array
                        field_values = [field_value.strip() for field_value in
                                        field_value.split(',', field_value.count(','))]

                        # Get Collection Name From Settings File
                        collection_name = settings.COLLECTION_NAMES.get(field)

                        # Get Documents Ids from Field Value Collections
                        field_ids = [x['_id'] for x in db[collection_name].find({'name': {'$in': field_values}})]

                        # Perform Search Using Document Ids in Use Case
                        # Document and Search Options Entered
                        if search_option == 'or':

                            mongo_query[field] = {'$in': field_ids}

                        elif search_option in ('!or', 'not or'):

                            mongo_query[field] = {'$not': {'$in': field_ids}}

                        elif search_option in ('!', 'not'):

                            mongo_query[field] = {'$not': {'$all': field_ids}}

                        else:

                            mongo_query[field] = {'$all': field_ids}

                    # Object Id Field Type
                    elif field == 'id':

                        mongo_query[field] = ObjectId(field_value)

        return mongo_query

    def get_queryset(self):

        queryset = UseCases.objects.all()
        mongo_query = self.convert_kwargs_to_mongo_query()  # get the fields with values for filtering

        if mongo_query != {}:

            queryset = UseCases.objects(__raw__=mongo_query)

        return queryset

    def put(self, request, *args, **kwargs):

        document = UseCases.objects.with_id(request.data["id"])

        for key in document:

            if key is not "id":

                if key in request.data:
                    document[key] = request.data[key]

                else:
                    if key is "description":
                        return Response(status.HTTP_400_BAD_REQUEST)

                    document[key] = []

        document.save()

        return Response(status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):

        document = UseCases.objects.with_id(request.data["id"])
        for key in document:
            if key in request.data and key is not "id":
                document[key] = request.data[key]

        document.save()
        return Response(status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):

        if "id" in request.data:

            UseCases.objects(id=request.data['id']).delete()

            return Response(status.HTTP_200_OK)

        else:
            return Response(status.HTTP_404_NOT_FOUND)

