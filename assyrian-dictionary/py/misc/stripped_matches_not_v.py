import re
import sys
from unstripped_slugs import strip_markers
sys.path.append('py')
from datadump_to_dict import datadump_to_dict

aii_dict, aii_collapsed_sounds1, numbers_table_ = datadump_to_dict()

stripped_doesnt_match = []
regex = strip_markers() # pylint: disable=C0103

for aii_not_v, aii_v_s in aii_dict.items():
    for aii_v, jsonlines in aii_v_s.items():
        if re.sub(regex, '', aii_v).replace("!", "") != aii_not_v:
            stripped_doesnt_match.append((aii_not_v, aii_v))

raise Exception(stripped_doesnt_match)
