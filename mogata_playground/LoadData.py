import pymongo
import json
import argparse
import pymongo
import os
import sys

def loadData(db, jobj):

    # load data ########################################################################################################
    collection_name = jobj['collection_name']
    collection_documents = jobj['documents']

    # Insert Data ######################################################################################################
    collection = db[collection_name]
    collection.delete_many({})

    collection.insert_many(collection_documents)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", dest="data_file", type=str, required=True)

    args = parser.parse_args()

    # Check for file existence
    if not os.path.isfile( args.data_file ):
        print( "Couldn't find data file {}".format( args.data_file))
        sys.exit(-1)

    with open( args.data_file, 'r') as jdata:
        MongoClient = pymongo.MongoClient()
        jobj = json.load(jdata)
        db = MongoClient['Atlas']
        loadData(db, jobj)

if __name__ == "__main__":
    main()




