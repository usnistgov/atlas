import pymongo


from  jinja2 import Environment, PackageLoader, select_autoescape


# Global Setting #######################################################################################################
# Mongo set up
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['Atlas']
mycollection = mydb['Atlas_UseCases']

# Basic Jinja set up
env = Environment(
    loader=PackageLoader("mogata_playground", "templates"),
    autoescape=select_autoescape(['html', 'xml'])
)

# Main Def #############################################################################################################
def main():

    # Get main_page_template ready
    main_page_template = env.get_template("front_page_template.html")
    div_container = env.get_template("attributes.html")
    use_case_template = env.get_template("use_case.html")


    all_keys = set()
    for doc in mycollection.find({}):
        for k in doc.keys():
            all_keys.add(k)

    all_keys.remove("_id")
    attributes = {}

    print(sorted(all_keys))


    for i in ['activities', 'actors', 'cybersecurity_threats', 'discipline', 'information_types',
              'locations', 'organizations', 'technologies']:
        cur_s = set()
        print(i)
        for k in mycollection.find({}):
            if isinstance(k, str):
                cur_s.add(k[i])
            else:
                for j in k[i]:
                    cur_s.add(j)
        attributes[i] = cur_s
    with open( "./index.html", "w") as html_out:
        the_divs = ""
        for k in attributes.keys():
            the_divs += div_container.render(name=k, items=attributes[k])

        html_out.write( main_page_template.render( thedivs=the_divs) )

    # Build the "All Use Cases" Pages
    the_divs = ""
    for doc in mycollection.find({}):
        the_divs += use_case_template.render(
                use_case=doc
            )
    with open( "all.html", "w") as html_out:
        html_out.write( main_page_template.render(thedivs=the_divs))
    with open( "information_types.html", "w") as html_out:
        html_out.write( main_page_template.render(thedivs=""))
    with open("model.html", "w") as html_out:
        html_out.write( main_page_template.render(thedivs=""))



if __name__ == '__main__':
    main()



