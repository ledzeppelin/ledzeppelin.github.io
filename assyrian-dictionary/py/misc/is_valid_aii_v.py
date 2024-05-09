# this function isn't really valid anymore since we have words like ܒ- whose unvocalized spelling is same as vocalized spelling

def is_valid_aii_v(item):
    is_valid = 'forms' in item and item['forms'][0]['tags'][0] == 'canonical'
    return is_valid or item['pos'] != 'root'
