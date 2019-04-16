import pymongo

# Global Setting #######################################################################################################
# Mongo set up
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
newdb = myclient['NewAtlas']
mydb = myclient['Atlas']
mycollection = mydb['Atlas_UseCases']

def main():
    # Actor
    newdb['Actors'].drop()
    actors = set()
    for i in mycollection.find({}):
        for a in i['actors']:
         actors.add( a )

    for a in actors:
        newdb['Actors'].insert({"_id": a, "Name": a, "Description": "<todo>"})

    # Responding Organizations
    newdb['Responding_Organizations'].drop()
    responding_organizations = set()
    for r in mycollection.find({}):
        for a in r['organizations']:
            responding_organizations.add(a)
    for r in responding_organizations:
        newdb['Responding_Organizations'].insert({"_id": r, "Name": r, "Description":"<todo>"})

    # Technology
    newdb['Technologies'].drop()
    technologies=set()
    for i in mycollection.find({}):
        for a in i['technologies']:
            technologies.add(a)
    for t in technologies:
        newdb['Technologies'].insert({"_id": t, "Name": t, "Description": "<todo>"})

    # Discipline
    newdb['Disciplines'].drop()
    disciplines = set()
    for i in mycollection.find({}):
        for a in i['discipline']:
            disciplines.add(a)
    for t in disciplines:
        newdb['Disciplines'].insert({"_id": t, "Name": t, "Description": "<todo>"})

    # Location
    newdb['Locations'].drop()
    locations = set()
    for i in mycollection.find({}):
        for a in i['locations']:
            locations.add(a)
    for t in locations:
        newdb['Locations'].insert({"_id": t, "Name": t, "Description": "<todo>"})

    # Activity
    newdb['Activities'].drop()
    activities = set()
    for i in mycollection.find({}):
        for a in i['activities']:
            activities.add(a)
    for t in activities:
        newdb['Activities'].insert({"_id": t, "Name": t, "Description": "<todo>"})

    # Reshape Use Cases
    newdb['Atlas_UseCases'].drop()
    for uc in mycollection.find({}):
        new_use_case = {}

        new_use_case['Name'] = uc['name']
        new_use_case['Description'] = uc['description']

        # Actors
        new_use_case['Actors'] = []
        for a in uc['actors']:
            new_use_case['Actors'].append(a)

        # Responding Organizations
        new_use_case['Responding_Organizations'] = []
        for r in uc['organizations']:
            new_use_case['Responding_Organizations'].append(r)

        # Technologies
        new_use_case['Technologies'] = []
        for r in uc['technologies']:
            new_use_case['Technologies'].append(r)

        # Disciplines
        new_use_case['Disciplines'] = []
        for r in uc['discipline']:
            new_use_case['Disciplines'].append(r)

        # Locations
        new_use_case['Locations'] = []
        for r in uc['locations']:
            new_use_case['Locations'].append(r)

        # Activities
        new_use_case['Activities'] = []
        for r in uc['activities']:
            new_use_case['Activities'].append(r)

        # Information Types
        newdb['Atlas_UseCases'].insert(new_use_case)

if __name__=="__main__":
    main()