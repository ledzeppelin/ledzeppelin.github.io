from ..datadump_to_dict import datadump_to_dict

def vocalized_counts(aii_dict):

    num_aii_not_v = 0
    num_aii_not_v_mult = 0

    for _, aii_vs in aii_dict.items():
        num_aii_not_v += 1
        if len(aii_vs.items()) > 1:
            num_aii_not_v_mult += 1

    print(f'{round(100*(num_aii_not_v_mult/num_aii_not_v), 2)}% of {num_aii_not_v} unvocalized spellings have more than one vocalized spelling')

aii_dict, sounds, _ = datadump_to_dict()

print(vocalized_counts(aii_dict))
