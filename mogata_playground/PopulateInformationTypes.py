import pymongo
import csv

# Global Setting #######################################################################################################
# Mongo set up
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
newdb = myclient['NewAtlas']

triad_lookup={
    "l": "low",
    "m": "medium",
    "h": "high"
}

newdb['Information_Types'].drop()

# All of these information types came from my old doc 8135

# Operations Data
newdb['Information_Categories'].drop()
newdb['Information_Categories'].insert({
    "_id": "operations_data",
    "Name": "operations data",
    "Description": "<todo>"
})

with open( "raw_data/operations_data.csv", "r") as rf:
    csv_handle = csv.reader(rf)
    next(csv_handle)
    for row in csv_handle:
        new_type = {
            "Name": row[0],
            "Triad_Rating":{
                "confidentiality": triad_lookup[row[1]],
                "integrity": triad_lookup[row[2]],
                "availability": triad_lookup[row[3]],
            },
            "Information_Categories": ['operations_data']
        }
        newdb['Information_Types'].insert(new_type)

# Sensor Data

newdb['Information_Categories'].insert({
    "_id": "sensor_data",
    "Name": "sensor data",
    "Description": "<todo>"
})

with open( "raw_data/sensor_data.csv", "r") as rf:
    csv_handle = csv.reader(rf)
    next(csv_handle)
    for row in csv_handle:
        new_type = {
            "Name": row[0],
            "Triad_Rating":{
                "confidentiality": triad_lookup[row[1]],
                "integrity": triad_lookup[row[2]],
                "availability": triad_lookup[row[3]],
            },
            "Information_Categories": ['sensor_data']
        }
        newdb['Information_Types'].insert(new_type)

# Publicy Sourced Data

newdb['Information_Categories'].insert({
    "_id": "publicly_sourced",
    "Name": "publicly sourced data",
    "Description": "<todo>"
})

with open( "raw_data/publicly_sourced.csv", "r") as rf:
    csv_handle = csv.reader(rf)
    next(csv_handle)
    for row in csv_handle:
        new_type = {
            "Name": row[0],
            "Triad_Rating":{
                "confidentiality": triad_lookup[row[1]],
                "integrity": triad_lookup[row[2]],
                "availability": triad_lookup[row[3]],
            },
            "Information_Categories": ['publicly_sourced']
        }
        newdb['Information_Types'].insert(new_type)

# Situational Awareness Data

newdb['Information_Categories'].insert({
    "_id": "situational_awareness",
    "Name": "situational awareness data",
    "Description": "<todo>"
})

with open("raw_data/situational_awareness.csv", "r") as rf:
    csv_handle = csv.reader(rf)
    next(csv_handle)
    for row in csv_handle:
        new_type = {
            "Name": row[0],
            "Triad_Rating": {
                "confidentiality": triad_lookup[row[1]],
                "integrity": triad_lookup[row[2]],
                "availability": triad_lookup[row[3]],
            },
            "Information_Categories": ['situational_awareness']
        }
        newdb['Information_Types'].insert(new_type)

# Uncategorized

newdb['Information_Categories'].insert({
    "_id": "unknown",
    "Name": "unknown",
    "Description": "<todo>"
})

with open("raw_data/uncategorized_data.csv", "r") as rf:
    csv_handle = csv.reader(rf)
    next(csv_handle)
    for row in csv_handle:
        new_type = {
            "Name": row[0],
            "Triad_Rating": {
                "confidentiality": "unknown",
                "integrity": "unknown",
                "availability": "unknown",
            },
            "Information_Categories": ['unknown']
        }
        newdb['Information_Types'].insert(new_type)

