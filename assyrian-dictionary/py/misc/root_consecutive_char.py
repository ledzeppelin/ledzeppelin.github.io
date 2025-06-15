import json

def has_consecutive_identical_chars(input_string):
    for i in range(1, len(input_string)):
        if input_string[i] == input_string[i-1]:
            return True
    return False


def root_consec():
    with open('./js/json/aii-dict-no-tr.json', encoding="utf-8") as f:
        data = json.load(f)

    roots, roots_consec_char = [], []

    for item in data:
        if isinstance(item['aii_not_v'], list):
            root = item['aii_not_v'][1]
            roots.append(root)
            if has_consecutive_identical_chars(root):
                roots_consec_char.append(root)


    print(f'{round(100*(len(roots_consec_char)/len(roots)), 2)}% of roots have consec chars')
    print(roots_consec_char)


root_consec()
