import json
from collections import Counter

with open('./js/json/common-words.json', encoding="utf-8") as user_file:
    parsed_json = json.load(user_file)

dupes = [item for item, count in Counter(parsed_json).items() if count > 1]

print(len(list(dict.fromkeys(parsed_json))))

print(dupes)

# print(len(parsed_json))
# print(len(set(parsed_json)))


abc = ["foo", "bar", "baz"].index("baz")
# print(abc)
print('hello')
