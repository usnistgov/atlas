'''
concept_links = [{
        'actors': ['5cf7f65068f9f4613aa09af6'],
        'information_types': ['5cf7f65168f9f4613aa09b1d', '5cf7f65168f9f4613aa09b1f', '5cf7f65168f9f4613aa09b22'],
        'locations': []
     },
    {
        'actors': ['5cf7f65068f9f4613aa09af8']
    }
]
'''

from bson.objectid import ObjectId
import pymongo
import Atlas_Project.settings as settings
import json

DATABASE_NAME = settings.DATABASES['default']['NAME']
MongoClient = pymongo.MongoClient()
db = MongoClient[DATABASE_NAME]

information_types = db[settings.COLLECTION_NAMES['information_types']]

#query = information_types.find({'information_categories': ObjectId('5d5d8c326c8d92200aa9b4af')})

information_types.update_many({'information_categories': ObjectId('5d5d8c326c8d92200aa9b4af')},
                                     {'$pull': {'information_categories': ObjectId('5d5d8c326c8d92200aa9b4af')}})