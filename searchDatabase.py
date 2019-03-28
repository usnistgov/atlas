import pymongo

MongoClient = pymongo.MongoClient()
db = MongoClient['atlas']
use_cases = db['use_cases']

civilian_entries = use_cases.find({'actors': {'$in': ['civilians']}})

for entry in civilian_entries:

    print(entry)
