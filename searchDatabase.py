import pymongo

MongoClient = pymongo.MongoClient()
db = MongoClient['Atlas']
use_cases = db['Atlas_usecases']

#entries = use_cases.find({'actors': {'$in': ['law enforcement']}})
entries = use_cases.find({})

for entry in entries:

    print(entry)
