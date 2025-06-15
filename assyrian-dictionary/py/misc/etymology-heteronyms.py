import json

def heteronyms():
    with open('./js/json/aii-dict-no-tr.json', encoding="utf-8") as f:
        data = json.load(f)

    tier1_etymology_ct, tier2_etymology_ct = 0, 0

    for item in data:
        for aii_v in item['aii_v_s']:
            if 'tier1_etymology' in aii_v:
                tier1_etymology_ct+=1
            else:
                tier2_ct = 0
                for jsonline in aii_v['jsonlines']:
                    if 'tier2_etymology' in jsonline:
                        tier2_ct =1
                tier2_etymology_ct+=tier2_ct


    total = tier1_etymology_ct + tier2_etymology_ct
    print(f'{round(100*(tier1_etymology_ct/total), 2)}% of vocalized spellings w/ etymologies are NOT heteronyms')


print(heteronyms())
