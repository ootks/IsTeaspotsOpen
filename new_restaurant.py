import sys, re, os

if(len(sys.argv) != 2):
    print("Usage: python new_restaurant.py <NAME>")
    sys.exit()

name = sys.argv[1]


with open("abstract_restaurant.js") as template:
    nameSubbed = re.sub("ab_restaurant", name, template.read())
    nameSubbed = re.sub("NAME", name, nameSubbed)
    with open(name+".js", "w") as new_restaurant:
        new_restaurant.write(nameSubbed)

with open("restaurants.json", "a") as record:
    #Remove ] from file
    
    record.seek(0, os.SEEK_END)
    record.truncate(record.tell()-2)

    #Create new entry
    entry = ",\n{{\n\tname: \"{}\";\n\tname: \"{}\";\n}}\n]".format(name, name + ".js")

    record.write(entry)
