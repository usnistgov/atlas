import pymongo
from descriptions import *

MongoClient = pymongo.MongoClient()
db = MongoClient['Atlas']
use_cases = db['Atlas_UseCases']
cybersecurity_threats = db['Atlas_cybersecurity_threats']
actors = db['Atlas_actors']
responding_organizations = db['Atlas_responding_organizations']
technologies = db['Atlas_technologies']
disciplines = db['Atlas_disciplines']
locations = db['Atlas_locations']
information_types = db['Atlas_information_types']
information_categories = db['Atlas_information_categories']
activities = db['Atlas_activities']

use_cases.delete_many({})
cybersecurity_threats.delete_many({})
actors.delete_many({})
responding_organizations.delete_many({})
technologies.delete_many({})
disciplines.delete_many({})
locations.delete_many({})
information_types.delete_many({})
information_categories.delete_many({})
activities.delete_many({})

cybersecurity_threats_ids = {}
information_categories_ids = {}
actors_ids = {}
responding_organizations_ids = {}
technologies_ids = {}
disciplines_ids = {}
locations_ids = {}
information_types_ids = {}
activities_ids = {}

actors.insert_many([
        {
            'name': 'patients',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'paramedics',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'law enforcement',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'suspects',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'civilians',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'victims',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'fire fighters',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'incident commander',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'cab driver',
            'description': '',
            'resource_links': []
        },
])

for i in actors.find({}):
    actors_ids[i['name']] = i['_id']

for i, j in actors_ids.items():
    print(i, j)

responding_organizations.insert_many([
        {
            'name': 'Local EMS',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'Local Police',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'Highway Patrol',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'EMS',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'Park Police',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'Fire Department',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'FEMA',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'Local Fire',
            'description': '',
            'resource_links': []
        }
])

for i in responding_organizations.find({}):
    responding_organizations_ids[i['name']] = i['_id']

disciplines.insert_many([
        {
            'name': 'EMS',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'Law Enforcement',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'Fire',
            'description': '',
            'resource_links': []
        }
])

for i in disciplines.find({}):
    disciplines_ids[i['name']] = i['_id']

locations.insert_many([
        {
            'name': 'highway',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'hospital',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'national park',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'urban area',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'building',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'sub-urban area',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'parks',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'road',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'metropolitan city',
            'description': '',
            'resource_links': []
        },
        {
            'name': 'subway',
            'description': '',
            'resource_links': []
        },
])

technologies.insert_many(
    [{
      "name": "smartphone",
      "description": "",
      "resource_links": [
        {
          "href": "https://www.nist.gov/communications-technology-laboratory/pscr/process-document-nist-list-certified-devices",
          "hyperlink_name": "Certified Devices",
          "description": "The Middle Class Tax Relief and Job Creation Act of 2012 (Act) defined responsibilities for the National Institute of Standards and Technology (NIST) in regards to the Nationwide Public Safety Broadband Network (NPSBN) and the First Responder Nextwork Authority (FN). AT&T was awarded the contract by FN to partner with FN and to build the NPSBN. One requirement of the Act is that the Director of NIST shall ensure the development of a list of certified devices that meet appropriate protocols and standards for access to, use of, or compatibility with the NPSBN that FN and AT&T build and maintain. This requirement is carried out by the Public Safety Communications Research Division (PSCR) of the NIST Communications Technology Laboratory. This document describes the process for creating and maintaining the list."
        }
      ]
    },
    {
      "name": "tablet",
      "description": "",
      "resource_links": []
    },
    {
      "name": "hotspot",
      "description": "",
      "resource_links": []
    },
    {
      "name": "LTE modem",
      "description": "",
      "resource_links": []
    },
    {
      "name": "smartwatch",
      "description": "",
      "resource_links": []
    },
    {
      "name": "fitness tracker",
      "description": "",
      "resource_links": []
    },
    {
      "name": "drone",
      "description": "",
      "resource_links": []
    },
    {
      "name": "body worn camera",
      "description": "",
      "resource_links": []
    },
    {
      "name": "smartglasses",
      "description": "",
      "resource_links": []
    },
    {
      "name": "bluetooth headset",
      "description": "",
      "resource_links": []
    },
    {
      "name": "wearable health monitoring sensor",
      "description": "",
      "resource_links": []
    },
      {
      "name": "hardware authentication device",
      "description": "",
      "resource_links": []
    },
    {
      "name": "LMR handsets",
      "description": "",
      "resource_links": []
    }]

)

for i in locations.find({}):
    locations_ids[i['name']] = i['_id']


information_categories.insert_many([
    {
        'name': 'operations data',
        'description': '',
        'resource_links': []
    },
    {
        'name': 'sensor data',
        'description': '',
        'resource_links': []
    },
    {
        'name': 'publicly sourced data',
        'description': '',
        'resource_links': []
    },
    {
        'name': 'situational awareness data',
        'description': '',
        'resource_links': []
    },
    {
        'name': 'Unknown',
        'description': '',
        'resource_links': []
    }
])


for i in information_categories.find({}):
    information_categories_ids[i['name']] = i['_id']


information_types.insert_many([
    {
        'name': 'active authentication',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'body camera data',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'comms',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'completed incident command system (ICS) forms/plans',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'crime scene geographic information system (GIS) intel location',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'critical static locations (shelters|ccps|EVAC|LZ)',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'medium',
            'availability': 'medium'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'deployable assets',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'Emergency Response',
        'description': '',
        'triad_rating': {
            'confidentiality': 'low',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'evac routes and plans',
        'description': '',
        'triad_rating': {
            'confidentiality': 'low',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'facial recognition',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'medium'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'first responder assets',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'functional roles',
        'description': '',
        'triad_rating': {
            'confidentiality': 'medium',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'ICS (incident command system) forms/plans',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'images + media from ng911',
        'description': '',
        'triad_rating': {
            'confidentiality': 'low',
            'integrity': 'medium',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'incident action plan',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'Info from multiple CAD LE Location',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'medium',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'law enforcement intel',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'license and plate reader',
        'description': '',
        'triad_rating': {
            'confidentiality': 'medium',
            'integrity': 'high',
            'availability': 'low'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'license plate recognition (LPR)',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },
    {
        'name': 'managing security',
        'description': '',
        'triad_rating': {
            'confidentiality': 'high',
            'integrity': 'high',
            'availability': 'high'
        },
        'security_reasoning': '',
        'information_categories': [information_categories_ids.get('operations data')]
    },

])

for i in information_types.find({}):
    information_types_ids[i['name']] = i['_id']


use_cases.insert_many([

    {
        'name':  'Personal Injury Collision with hazards',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_1,
        'actors': [actors_ids[x] for x in ['patients', 'paramedics', 'law enforcement']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['Local EMS', 'Local Police', 'Highway Patrol']],
        'technologies': [],
        'disciplines': [disciplines_ids[x] for x in ['EMS', 'Fire', 'Law Enforcement']],
        'locations': [locations_ids[x] for x in ['highway']],
        'information_types': [],
        'activities': [],
        'concept_links': {
            'actors': [actors_ids[x] for x in ['law enforcement']],
            'disciplines': [disciplines_ids[x] for x in ['Law Enforcement']],
            'responding_organizations': [responding_organizations_ids[x] for x in ['Local Police']],
            'information_types': [information_types_ids[x] for x in ['law enforcement intel', 'body camera data']]
            }
    },

    {
        'name': 'Medical emergency',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_2,
        'actors': [actors_ids[x] for x in ['patients', 'paramedics']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['EMS']],
        'technologies': [],
        'disciplines': [disciplines_ids[x]for x in ['EMS']],
        'locations': [locations_ids[x] for x in ['hospital']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Search in a national park',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_3,
        'actors': [actors_ids[x] for x in ['suspects', 'law enforcement']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['Local Police', 'Park Police']],
        'technologies': [],
        'disciplines': [disciplines_ids[x] for x in ['Law Enforcement', 'EMS']],
        'locations': [locations_ids[x] for x in ['national park']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Rioting in an urban area',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_4,
        'actors': [actors_ids[x] for x in ['civilians', 'suspects', 'law enforcement', 'paramedics']],
        'responding_organizations': [],
        'technologies': [],
        'disciplines': [],
        'locations': [locations_ids[x] for x in ['urban area']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Undercover officer',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_5,
        'actors': [actors_ids[x] for x in ['suspects', 'law enforcement']],
        'responding_organizations': [],
        'technologies': [],
        'disciplines': [disciplines_ids[x] for x in ['Law Enforcement']],
        'locations': [locations_ids[x] for x in ['urban area']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Structure fire',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_6,
        'actors': [actors_ids[x] for x in ['victims', 'fire fighters']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['Fire Department']],
        'technologies': [],
        'disciplines': [disciplines_ids[x] for x in ['Fire']],
        'locations': [locations_ids[x] for x in ['building']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Wild fire',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_7,
        'actors': [actors_ids[x] for x in ['civilians', 'fire fighters', 'law enforcement', 'paramedics']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['Local EMS', 'Fire Department', 'Local Police']],
        'technologies': [],
        'disciplines': [disciplines_ids[x] for x in ['Fire']],
        'locations': [locations_ids[x] for x in ['sub-urban area', 'parks']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Hurricane',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_8,
        'actors': [actors_ids[x] for x in ['civilians', 'fire fighters', 'law enforcement', 'paramedics']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['Local EMS', 'Fire Department', 'Local Police', 'FEMA']],
        'technologies': [],
        'disciplines': [],
        'locations': [],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Active shooter',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_9,
        'actors': [actors_ids[x] for x in ['civilians', 'paramedics', 'law enforcement']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['Local EMS', 'Local Police']],
        'technologies': [],
        'disciplines': [],
        'locations': [locations_ids[x] for x in ['urban area']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Police officer vehicle stop',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_10,
        'actors': [actors_ids[x] for x in ['suspects', 'law enforcement']],
        'responding_organizations': [],
        'technologies': [],
        'disciplines': [],
        'locations': [locations_ids[x] for x in ['road']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Apartment Building Fire',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_11,
        'actors': [actors_ids[x] for x in ['cab driver', 'incident commander', 'fire fighters', 'paramedics', 'civilians']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['Local EMS', 'Local Fire']],
        'technologies': [],
        'disciplines': [disciplines_ids[x] for x in ['Fire', 'EMS']],
        'locations': [locations_ids[x] for x in ['building', 'metropolitan city']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Structure Fire -Future Technology Scenario',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_12,
        'actors': [actors_ids[x] for x in ['fire fighters']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['Local Fire']],
        'technologies': [],
        'disciplines': [disciplines_ids[x] for x in ['Fire']],
        'locations': [locations_ids[x] for x in ['building', 'metropolitan city']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'Subway Fire',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_13,
        'actors': [actors_ids[x] for x in ['civilians', 'fire fighters', 'victims']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['Local Fire']],
        'technologies': [],
        'disciplines': [disciplines_ids[x] for x in ['Fire']],
        'locations': [locations_ids[x] for x in ['subway', 'metropolitan city']],
        'information_types': [],
        'activities': []
    },

    {
        'name': 'WUI Fire',
        "source": "",
        'cybersecurity_threats': [],
        'description': desc_14,
        'actors': [actors_ids[x] for x in ['civilians', 'fire fighters']],
        'responding_organizations': [responding_organizations_ids[x] for x in ['Local Fire']],
        'technologies': [],
        'disciplines': [disciplines_ids[x] for x in ['Fire']],
        'locations': [],
        'information_types': [],
        'activities': []
    }
])
