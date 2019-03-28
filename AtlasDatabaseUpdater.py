import pymongo
import argparse
import json
from  bson import json_util, ObjectId

# To run:
#
#     python(3) AtlasDatabaseUpdater.py --host [host address (default is localhost] --action [export or import] --output_file [filename if exporting] --input_file [input filename if importing] --reset [if you want to delete database conetnts before importing (y or yes)]

if __name__ == '__main__':

    parser = argparse.ArgumentParser(prog='AtlasDatabaseUpdater', description='Program to export changes to Atlas Database  to a JSON file')
    parser.add_argument('--host', dest='host', help='Database host address', default='localhost')
    parser.add_argument('--action', dest='action', help='Import to or Export From Database')
    parser.add_argument('--input_file', dest='input_file', help='JSON Input Filename')
    parser.add_argument('--output_file', dest='output_file', help= 'JSON Output Filename')
    parser.add_argument('--reset', dest='reset', help='Clear database before import')

    args = parser.parse_args()

    host = args.host
    action = args.action

    MongoClient = pymongo.MongoClient(host=host)
    db = MongoClient['atlas']
    use_cases = db['use_cases']

    # Export Use Cases Collection to JSON file
    if action in ('export', 'Export'):

        output_file = args.output_file
        cursor = use_cases.find({})

        with open(output_file, 'w') as output:

            dump = json.dumps([document for document in cursor], sort_keys=False, indent=4, default=json_util.default)
            output.write(dump)

    # Import from JSON file and update Use Cases Collection.
    # If Reset is enabled it will delete contents of collection before import
    elif action in ('import', 'Import'):

        with open(args.input_file) as input_file:

            json_file = json.load(input_file)

            if args.reset in ('y', 'Y', 'Yes', 'yes'):
                use_cases.delete_many({})

            for item in json_file:
                item["_id"] = ObjectId(item["_id"]["$oid"])

            use_cases.insert_many(json_file)

