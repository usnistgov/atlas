from .serializers import *
from rest_framework_mongoengine import generics
from rest_framework_mongoengine.generics import mixins
from rest_framework import status
from rest_framework.response import Response
from bson.objectid import ObjectId
import pymongo
import Atlas_Project.settings as settings
import json

DATABASE_NAME = settings.DATABASES['default']['NAME']
MongoClient = pymongo.MongoClient()
db = MongoClient[DATABASE_NAME]


class baseMongoView(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.ListCreateAPIView):

    serializer_class = ""

    def __init__(self):
        self.model = self.serializer_class.Meta.model

    def put(self, request, *args, **kwargs):

        document = self.model.objects.with_id(request.data["id"])
        keys = (i for i in document)
        print(request.data)
        for key in keys:
            document[key] = request.data[key]

        document.save()
        return Response(status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):

        document = self.model.objects.with_id(request.data["id"])
        keys = (i for i in document)

        for key in keys:
            if key in request.data and key is not "id":
                document[key] = request.data[key]

        document.save()
        return Response(status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):

        if "id" in request.data:

            self.model.objects(id=request.data['id']).delete()

            if self.model._class_name not in ['information_types', 'use_cases']:

                use_cases = db[settings.COLLECTION_NAMES['use_cases']]
                information_types = db[settings.COLLECTION_NAMES['information_types']]

                use_cases.update_many({str(self.model._class_name): ObjectId(request.data['id'])},
                                      {'$pull': {str(self.model._class_name): ObjectId(request.data['id'])}})

                information_types.update_many({str(self.model._class_name): ObjectId(request.data['id'])},
                                              {'$pull': {str(self.model._class_name): ObjectId(request.data['id'])}})


            return Response(status.HTTP_200_OK)

        else:
            return Response(status.HTTP_404_NOT_FOUND)


class CyberSecurityThreatsView(baseMongoView):

    serializer_class = CyberSecurityThreats_Serializer
    queryset = cybersecurity_threats.objects.all()


class ActorsView(baseMongoView):
    serializer_class = Actors_Serializer
    queryset = actors.objects.all()


class TechnologiesView(baseMongoView):
    serializer_class = Technologies_Serializer
    queryset = technologies.objects.all()


class RespondingOrganizationsView(baseMongoView):
    serializer_class = RespondingOrganizations_Serializer
    queryset = responding_organizations.objects.all()


class DisciplinesView(baseMongoView):
    serializer_class = Disciplines_Serializer
    queryset = disciplines.objects.all()


class LocationsView(baseMongoView):
    serializer_class = Locations_Serializer
    queryset = locations.objects.all()


class InformationCategoriesView(baseMongoView):
    serializer_class = InformationCategories_Serializer
    queryset = information_categories.objects.all()


class ActivitiesView(baseMongoView):
    serializer_class = Activities_Serializer
    queryset = activities.objects.all()


class InformationTypesView(baseMongoView):
    serializer_class = InformationTypes_Serializer
    my_filter_fields = ('id',
                        'name',
                        'triad_rating',
                        'information_categories')

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

                    search_option = ''

                    # Extract Search Options from URL If They Are Present
                    if field_value.find('[') != -1:
                        option_index = field_value.find('[')
                        search_option = field_value[option_index + 1:-1]
                        field_value = field_value[0:option_index]

                    # Array Field Types
                    if field in ('information_categories'):

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

                    # Object Field Type
                    elif field in ('triad_rating'):

                        del mongo_query[field]
                        triad_values = json.loads(field_value.replace("'", "\""))
                        for key, value in triad_values.items():

                            mongo_query.update({'triad_rating.' + key: value})

                        if search_option in ('||', 'or'):
                            or_query = {'$or': []}

                            for key in mongo_query:
                                if key.startswith('triad_rating'):
                                    or_query['$or'].append({key: mongo_query[key]})

                            mongo_query = {k: v for k, v in mongo_query.items() if not k.startswith("triad_rating")}
                            mongo_query.update(or_query)

                        if search_option in ('!or', 'not or'):
                            nor_query = {'$nor': []}

                            for key in mongo_query:
                                if key.startswith('triad_rating'):
                                    nor_query['$nor'].append({key: mongo_query[key]})

                            mongo_query = {k: v for k, v in mongo_query.items() if not k.startswith("triad_rating")}
                            mongo_query.update(nor_query)

                        if search_option in ('!', 'not'):
                            for key in mongo_query:
                                if key.startswith('triad_rating'):
                                    mongo_query[key] = {'$ne': mongo_query[key]}

                    # Object Id Field Type
                    elif field == 'id':

                        mongo_query[field] = ObjectId(field_value)

        return mongo_query

    def get_queryset(self):

        queryset = information_types.objects.all()
        mongo_query = self.convert_kwargs_to_mongo_query()  # get the fields with values for filtering
        if mongo_query != {}:
            queryset = information_types.objects(__raw__=mongo_query)

        return queryset


class UseCasesView(baseMongoView):
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

        queryset = use_cases.objects.all()
        mongo_query = self.convert_kwargs_to_mongo_query()  # get the fields with values for filtering

        if mongo_query != {}:
            queryset = use_cases.objects(__raw__=mongo_query)

        return queryset