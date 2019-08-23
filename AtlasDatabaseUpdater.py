import pymongo
import os
import sys
import argparse
from argparse import RawDescriptionHelpFormatter
import json
from bson import json_util, ObjectId
from bson.json_util import loads
from string import Template
# Colored terminal  stuff :-p
from colorama import Fore, Back, Style, init

# To run:
#
#     python(3) AtlasDatabaseUpdater.py --host [host address (default is localhost] --action [export or import] --output_file [filename if exporting] --input_file [input filename if importing] --reset [if you want to delete database conetnts before importing (y or yes)]


# Hard Coded List of the Atlas collections we are concerned about ######################################################
COLLECTIONS = [
    "Atlas_UseCases",
    "Atlas_activities",
    "Atlas_actors",
    "Atlas_cybersecurity_threats",
    "Atlas_disciplines",
    "Atlas_information_categories",
    "Atlas_information_types",
    "Atlas_locations",
    "Atlas_responding_organizations",
    "Atlas_technologies"
]

command_description="""
Program to backup and restore the contents of the Atlas MongoDB. 

This script handles the following collections:
---------------------------------------------- 
"""

for c in COLLECTIONS:
    command_description += "\t{}\n".format(c,)
command_description += "----------------------------------------------"
if __name__ == '__main__':

    # Set up argument parser ###########################################################################################
    ####################################################################################################################
    parser = argparse.ArgumentParser(prog='AtlasDatabaseUpdater',
                                     formatter_class=RawDescriptionHelpFormatter,
                                     description=command_description)

    parser.add_argument('--host', dest='host', help='Database host address', default='localhost')
    parser.add_argument('--database-name', "-d", dest="dbname", help="The database name to target (required)",
                        required=True)
    parser.add_argument('--action', "-a", dest='action', help='Import to or Export From Database (required)',
                        required=True)
    parser.add_argument('--backup_dir', "-b", dest='backup_dir', help='JSON backup directory (required)', required=True)
    parser.add_argument('--reset', dest='reset', help='Clear database before import')


    # Set up env #######################################################################################################
    ####################################################################################################################
    args = parser.parse_args()

    host = args.host
    action = args.action

    MongoClient = pymongo.MongoClient(host=host)

    # Choose Mode for Script ###########################################################################################
    ####################################################################################################################

    # If we are in Export Mode #########################################################################################
    if action in ('export', 'Export'):

        # Check to see if the database actually exists before we try to dump from it ###################################
        if args.dbname not in MongoClient.list_database_names():
            print("Error, unknown database name: {}".format(args.dbname))
            sys.exit(-1)

        db = MongoClient[args.dbname]

        # Create the backupdir if it doesn't exist
        if not os.path.isdir(args.backup_dir):
            os.makedirs(args.backup_dir)

        # for each collection, create a backupfile
        for cur_collection_name in COLLECTIONS:

            output_file = os.path.join(args.backup_dir, "{}.json".format(cur_collection_name))
            cursor = db[cur_collection_name].find({})

            with open(output_file, 'w') as output:
                dump = json.dumps([document for document in cursor], sort_keys=True, indent=4,
                                  default=json_util.default)
                output.write(dump)

    # If we are in Import Mode #########################################################################################
    ####################################################################################################################
    # If Reset is enabled it will delete contents of collection before import
    elif action in ('import', 'Import'):

        # Create database
        db = MongoClient[args.dbname]

        # Check to make sure all the files we need exist in the backup directory #######################################
        backup_files = { a: False for a in [os.path.join(args.backup_dir, "{}.json".format(c)) for c in COLLECTIONS]}
        missing_file = False

        for input_file in backup_files :
            if os.path.isfile(input_file):
                backup_files[input_file] = True
            else:
                missing_file = True

        # Check to see if we should abort because of a missing file ####################################################
        if missing_file:
            print( "Error: a required backup file is missing", file=sys.stderr )
            init()
            for f in backup_files:
                label = Fore.GREEN + "found"
                if not backup_files[f]:
                    label = Fore.RED + "missing"
                print("{}: {}".format(f, label), file=sys.stderr)
                print(Style.RESET_ALL, end="")
            sys.exit(-1)

        # for each collection, read the backupfile and import ##########################################################
        for cur_collection_name in COLLECTIONS:
            input_file = os.path.join(args.backup_dir, "{}.json".format(cur_collection_name))

            with open(input_file) as input_file:
                json_file = loads(input_file.read())

                if args.reset in ('y', 'Y', 'Yes', 'yes'):
                    db[cur_collection_name].delete_many({})

                # Insert all of the documents in the backup file
                db[cur_collection_name].insert_many(json_file)

