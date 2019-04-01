import pymongo
from descriptions import *
from bson.objectid import ObjectId
from pymongo.collection import BulkWriteError

MongoClient = pymongo.MongoClient()
db = MongoClient['Atlas']
use_cases = db['Atlas_usecases']
use_cases.delete_many({})

entries = [

    {
        '_id': ObjectId(),
        'name':  'Personal Injury Collision with hazards',
        'cybersecurity_threats': [],
        'description': desc_1,
        'actors': ['patients', 'paramedics', 'law enforcement'],
        'organizations': ['Local EMS', 'Local Police', 'Highway Patrol'],
        'technologies': [],
        'discipline': ['EMS', 'Fire', 'Law Enforcement'],
        'locations': ['highway'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Medical emergency',
        'cybersecurity_threats': [],
        'description': desc_2,
        'actors': ['patients', 'paramedics'],
        'organizations': ['EMS'],
        'technologies': [],
        'discipline': ['EMS'],
        'locations': ['hospital'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Search in a national park',
        'cybersecurity_threats': [],
        'description': desc_3,
        'actors': ['suspect', 'law enforcement'],
        'organizations': ['Local Police', 'Park Police'],
        'technologies': [],
        'discipline': ['Law Enforcement', 'EMS'],
        'locations': ['national park'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Rioting in an urban area',
        'cybersecurity_threats': [],
        'description': desc_4,
        'actors': ['civilians', 'suspects', 'law enforcement', 'paramedics'],
        'organizations': [],
        'technologies': [],
        'discipline': [],
        'locations': ['urban area'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Undercover officer',
        'cybersecurity_threats': [],
        'description': desc_5,
        'actors': ['suspects', 'law enforcement'],
        'organizations': [],
        'technologies': [],
        'discipline': ['Law Enforcement'],
        'locations': ['urban area'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Structure fire',
        'cybersecurity_threats': [],
        'description': desc_6,
        'actors': ['victims', 'fire fighters'],
        'organizations': ['Fire Department'],
        'technologies': [],
        'discipline': ['Fire'],
        'locations': ['building'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Wild fire',
        'cybersecurity_threats': [],
        'description': desc_7,
        'actors': ['civilians', 'fire fighters', 'law enforcement', 'paramedics'],
        'organizations': ['Local EMS', 'Fire Department', 'Local Police'],
        'technologies': [],
        'discipline': ['Fire'],
        'locations': ['sub-urban area', 'parks'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Hurricane',
        'cybersecurity_threats': [],
        'description': desc_8,
        'actors': ['civilans', 'fire fighters', 'law enforcement', 'parmedics'],
        'organizations': ['Local EMS', 'Fire Department', 'Local Police', 'FEMA'],
        'technologies': [],
        'discipline': [],
        'locations': [],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Active shooter',
        'cybersecurity_threats': [],
        'description': desc_9,
        'actors': ['civilians', 'paramedics', 'law enforcement'],
        'organizations': ['Local EMS', 'Local Police'],
        'technologies': [],
        'discipline': [],
        'locations': ['urban area'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Police officer vehicle stop',
        'cybersecurity_threats': [],
        'description': desc_10,
        'actors': ['suspect', 'law enforcement'],
        'organizations': [],
        'technologies': [],
        'discipline': [],
        'locations': ['road'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Apartment Building Fire',
        'cybersecurity_threats': [],
        'description': desc_11,
        'actors': ['cab driver', 'incident commander', 'fire fighters', 'paramedics', 'civilians'],
        'organizations': ['Local EMS', 'Local Fire'],
        'technologies': [],
        'discipline': ['Fire', 'EMS'],
        'locations': ['building', 'metropolitan city'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Structure Fire -Future Technology Scenario',
        'cybersecurity_threats': [],
        'description': desc_12,
        'actors': ['fire fighters'],
        'organizations': ['Local Fire'],
        'technologies': [],
        'discipline': ['Fire'],
        'locations': ['building', 'metropolitan city'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Subway Fire',
        'cybersecurity_threats': [],
        'description': desc_13,
        'actors': ['civilians', 'fire fighters', 'victims'],
        'organizations': ['Local Fire'],
        'technologies': [],
        'discipline': ['Fire'],
        'locations': ['subway', 'metropolitan city'],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'WUI Fire',
        'cybersecurity_threats': [],
        'description': desc_14,
        'actors': ['civilians', 'fire_fighters'],
        'organizations': ['Local Fire'],
        'technologies': [],
        'discipline': ['Fire'],
        'locations': [],
        'information_types': [],
        'activities': []
    }
]

use_cases.insert_many(entries)
#use_cases.insert_one(entries[0])
