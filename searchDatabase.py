import pymongo

MongoClient = pymongo.MongoClient()
db = MongoClient['Atlas']
use_cases = db['Atlas_UseCases']

#entries = use_cases.find({'actors': {'$in': ['law enforcement']}})
entries = use_cases.find({})

for entry in entries:

    print(entry)
