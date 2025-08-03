#!/usr/bin/env python3

import copy
import json
from pathlib import Path
from verb_templates import conj_schema

SUBJECT_PRONOUN = "Subject Pronoun"
OBJECT_PRONOUN = "Object Pronoun"

HAWEH_WA   = "ܗ݇ܘܵܐ"
HABITUAL_KEH = "ܟܹܐ"
FUTURE_BIT = "ܒܸܬ"
SIMPLE_PAST_QIM = "ܩܸܡ"

MY_OWN_SELF = 'me'
DISTANT_TERM = '(a while ago)'
SOME_DIALECTS = '- some dialects'


def generate_t1_verb_conj(is_haweh):
    ex_marker = 'ex.'

    ex_pres_p = 'driving'
    ex_past_p = 'driven'
    ex_past = 'drove'
    ex_present_future = 'drive'
    ex_present = 'drive'

    ex_verbal_noun_sentence = f'{ex_marker} fast "driving"' # not always the same as present participle, ex. decision, arrival
    ex_agent_noun = 'driver'
    ex_instance_noun = 'drive' # not always the same as present/future, ex. invitation, speech


    if is_haweh:
        ex_marker = 'ie.'

        ex_pres_p = 'being'
        ex_past_p = 'been'
        ex_past = 'was'
        ex_present_future = 'be'
        ex_present = 'am'

        ex_verbal_noun_sentence = f'{ex_marker} "existence"'
        ex_agent_noun = "exister"
        ex_instance_noun = 'being'


    T1_VERB_CONJ = {
        "presentParticiple": {
            "left_heading": " ",
            "right_heading": ["Present Participle", f'{ex_marker} "{ex_pres_p}" fast'],
            "rows": [
                {"left": " ", "right": [{"value": "prp", "type": "arg"}]},
            ],
        },
        "pastParticiple": {
            "left_heading": "Gender of Described Noun",
            "right_heading": ["Past Participle", f'{ex_marker} "{ex_past_p}"'],
            "rows": [
                {"left": "masculine", "right": [{"value": "pp-sm", "type": "arg"}]},
                {"left": "feminine",  "right": [{"value": "pp-sf", "type": "arg"}]},
                {"left": "plural",    "right": [{"value": "pp-p",  "type": "arg"}]},
            ],
        },
        "pastTense": {
            "left_heading": SUBJECT_PRONOUN,
            "right_heading": ["Simple Past", f'{ex_marker} i "{ex_past}"'],
            "rows": [
                {"left": "I",                "right": [{"value": "past-1st-s",  "type": "arg"}]},
                {"left": "we",               "right": [{"value": "past-1st-p",  "type": "arg"}]},
                {"left": "you (to a man)",   "right": [{"value": "past-2nd-sm", "type": "arg"}]},
                {"left": "you (to a woman)", "right": [{"value": "past-2nd-sf", "type": "arg"}]},
                {"left": "you (to a group)", "right": [{"value": "past-2nd-p",  "type": "arg"}]},
                {"left": "he",               "right": [{"value": "past-3rd-sm", "type": "arg"}]},
                {"left": "she",              "right": [{"value": "past-3rd-sf", "type": "arg"}]},
                {"left": "they",             "right": [{"value": "past-3rd-p",  "type": "arg"}]},
            ],
            'disable_fuse': True
        },
        "presentTense": {
            "left_heading": SUBJECT_PRONOUN,
            "right_heading": ["Simple Present", f'{ex_marker} i "{ex_present}"'],
            "rows": [
                {"left": "I (man)",        "right": [{"value": "pres-1st-sm", "type": "arg"}]},
                {"left": "I (woman)",      "right": [{"value": "pres-1st-sf", "type": "arg"}]},
                {"left": "we",             "right": [{"value": "pres-1st-p",  "type": "arg"}]},
                {"left": "you (to a man)", "right": [{"value": "pres-2nd-sm", "type": "arg"}]},
                {"left": "you (to a woman)","right": [{"value": "pres-2nd-sf","type": "arg"}]},
                {"left": "you (to a group)","right": [{"value": "pres-2nd-p", "type": "arg"}]},
                {"left": "he",             "right": [{"value": "pres-3rd-sm", "type": "arg"}]},
                {"left": "she",            "right": [{"value": "pres-3rd-sf", "type": "arg"}]},
                {"left": "they",           "right": [{"value": "pres-3rd-p",  "type": "arg"}]},
            ],
        },
        "presentFutureTense": {
            "left_heading": SUBJECT_PRONOUN,
            "right_heading": ["Modal Construction", f'{ex_marker} i should "{ex_present_future}"'],
            "rows": [
                {"left": "I (man)",        "right": [{"value": "pres-1st-sm", "type": "arg"}]},
                {"left": "I (woman)",      "right": [{"value": "pres-1st-sf", "type": "arg"}]},
                {"left": "we",             "right": [{"value": "pres-1st-p",  "type": "arg"}]},
                {"left": "you (to a man)", "right": [{"value": "pres-2nd-sm", "type": "arg"}]},
                {"left": "you (to a woman)","right": [{"value": "pres-2nd-sf","type": "arg"}]},
                {"left": "you (to a group)","right": [{"value": "pres-2nd-p", "type": "arg"}]},
                {"left": "he",             "right": [{"value": "pres-3rd-sm", "type": "arg"}]},
                {"left": "she",            "right": [{"value": "pres-3rd-sf", "type": "arg"}]},
                {"left": "they",           "right": [{"value": "pres-3rd-p",  "type": "arg"}]},
            ],
        },
        "imperativeMood": {
            "left_heading": SUBJECT_PRONOUN,
            "right_heading": ["Command", f'{ex_marker} "{ex_present_future}!"'],
            "rows": [
                {"left": "you (to a man)",   "right": [{"value": "imp-2nd-sm", "type": "arg"}]},
                {"left": "you (to a woman)", "right": [{"value": "imp-2nd-sf", "type": "arg"}]},
                {"left": "you (to a group)", "right": [{"value": "imp-2nd-p",  "type": "arg"}]},
            ],
        },
        "passivePastTense": {
            "left_heading": SUBJECT_PRONOUN,
            "right_heading": ["Passive Past", f'{ex_marker} i was "{ex_past_p}"'],
            "rows": [
                {"left": "I (man)",          "right": [{"value": "passive-past-1st-sm", "type": "arg"}]},
                {"left": "I (woman)",        "right": [{"value": "passive-past-1st-sf", "type": "arg"}]},
                {"left": "we",               "right": [{"value": "passive-past-1st-p",  "type": "arg"}]},
                {"left": "you (to a man)",   "right": [{"value": "passive-past-2nd-sm", "type": "arg"}]},
                {"left": "you (to a woman)", "right": [{"value": "passive-past-2nd-sf", "type": "arg"}]},
                {"left": "you (to a group)", "right": [{"value": "passive-past-2nd-p",  "type": "arg"}]},
                {"left": "he",               "right": [{"value": "passive-past-3rd-sm", "type": "arg"}]},
                {"left": "she",              "right": [{"value": "passive-past-3rd-sf", "type": "arg"}]},
                {"left": "they",             "right": [{"value": "passive-past-3rd-p",  "type": "arg"}]},
            ],
        },
        "copula": {
            "left_heading": SUBJECT_PRONOUN,
            "right_heading": ["Copula"],
            "rows": [
                {"left": "I (man)",          "right": [{"value": "cop-1st-sm", "type": "arg"}]},
                {"left": "I (woman)",        "right": [{"value": "cop-1st-sf", "type": "arg"}]},
                {"left": "we",               "right": [{"value": "cop-1st-p",  "type": "arg"}]},
                {"left": "you (to a man)",   "right": [{"value": "cop-2nd-sm", "type": "arg"}]},
                {"left": "you (to a woman)", "right": [{"value": "cop-2nd-sf", "type": "arg"}]},
                {"left": "you (to a group)", "right": [{"value": "cop-2nd-p",  "type": "arg"}]},
                {"left": "he",               "right": [{"value": "cop-3rd-sm", "type": "arg"}]},
                {"left": "she",              "right": [{"value": "cop-3rd-sf", "type": "arg"}]},
                {"left": "they",             "right": [{"value": "cop-3rd-p",  "type": "arg"}]},
            ],
        },
        "futureTense": {
            "left_heading": SUBJECT_PRONOUN,
            "right_heading": ["Synthetic Future", f'{ex_marker} i should "{ex_present_future}"'],
            "rows": [
                {"left": "I (man)",          "right": [{"value": "fut-1st-sm", "type": "arg"}]},
                {"left": "I (woman)",        "right": [{"value": "fut-1st-sf", "type": "arg"}]},
                {"left": "we",               "right": [{"value": "fut-1st-p",  "type": "arg"}]},
                {"left": "you (to a man)",   "right": [{"value": "fut-2nd-sm", "type": "arg"}]},
                {"left": "you (to a woman)", "right": [{"value": "fut-2nd-sf", "type": "arg"}]},
                {"left": "you (to a group)", "right": [{"value": "fut-2nd-p",  "type": "arg"}]},
                {"left": "he",               "right": [{"value": "fut-3rd-sm", "type": "arg"}]},
                {"left": "she",              "right": [{"value": "fut-3rd-sf", "type": "arg"}]},
                {"left": "they",             "right": [{"value": "fut-3rd-p",  "type": "arg"}]},
            ],
        },
        "verbalNoun": {
            "left_heading": " ",
            "right_heading": ["Verbal Noun", ex_verbal_noun_sentence],
            "rows": [
                {"left": " ", "right": [{"value": "vn", "type": "arg"}]},
            ],
        },
        "agentNoun": {
            "left_heading": "Number and Gender",
            "right_heading": ["Agent Noun", f'{ex_marker} "{ex_agent_noun}"'],
            "rows": [
                {"left": "singular masculine", "right": [{"value": "an-sm", "type": "arg"}]},
                {"left": "singular feminine",  "right": [{"value": "an-sf", "type": "arg"}]},
                {"left": "plural masculine",   "right": [{"value": "an-pm", "type": "arg"}]},
                {"left": "plural feminine",    "right": [{"value": "an-pf", "type": "arg"}]},
            ],
        },
        "instanceNoun": {
            "left_heading": "Number",
            "right_heading": ["Instance Noun", f'{ex_marker} a "{ex_instance_noun}"'],
            "rows": [
                {"left": "singular", "right": [{"value": "in-s", "type": "arg"}]},
                {"left": "plural",   "right": [{"value": "in-p", "type": "arg"}]},
            ],
        },
    }

    SUBJECT_PRONOUNS = {
        'left_heading': SUBJECT_PRONOUN,
        'rows': [
            ("I (man)",           "1st-sm", "pp-sm"),
            ("I (woman)",         "1st-sf", "pp-sf"),
            ("we",                "1st-p", "pp-p"),
            ("you (to a man)",    "2nd-sm", "pp-sm"),
            ("you (to a woman)",  "2nd-sf", "pp-sf"),
            ("you (to a group)",  "2nd-p", "pp-p"),
            ("he",                "3rd-sm", "pp-sm"),
            ("she",               "3rd-sf", "pp-sf"),
            ("they",              "3rd-p", "pp-p"),
        ]
    }

    SUBJECT_PRONOUNS_2 = {
        'left_heading': SUBJECT_PRONOUN,
        'rows': [
            ("I (man)",           "1st-sm", "an-sm"),
            ("I (woman)",         "1st-sf", "an-sf"),
            ("we",                "1st-p", "an-pm"),
            ("you (to a man)",    "2nd-sm", "an-sm"),
            ("you (to a woman)",  "2nd-sf", "an-sf"),
            ("you (to a group)",  "2nd-p", "an-pm"),
            ("he",                "3rd-sm", "an-sm"),
            ("she",               "3rd-sf", "an-sf"),
            ("they",              "3rd-p", "an-pm"),
        ]
    }


    OBJECT_PRONOUNS_ACTIVE_PAST = {
        'left_heading': OBJECT_PRONOUN,
        'rows': [
            (f"{MY_OWN_SELF} (man)",           "1st-sm", "pp-sm"),
            (f"{MY_OWN_SELF} (woman)",         "1st-sf", "pp-sf"),
            ("us",                "1st-p", "pp-p"),
            ("you (to a man)",    "2nd-sm", "pp-sm"),
            ("you (to a woman)",  "2nd-sf", "pp-sf"),
            ("you (to a group)",  "2nd-p", "pp-p"),
            ("him",                "3rd-sm", "pp-sm"),
            ("her",               "3rd-sf", "pp-sf"),
            ("them",              "3rd-p", "pp-p"),
        ]
    }



    SUBJECT_PRONOUNS_PAST = {
        'left_heading': SUBJECT_PRONOUN,
        'rows': [
            ("I",                 "1st-s", None),
            ("we",                "1st-p", None),
            ("you (to a man)",    "2nd-sm", None),
            ("you (to a woman)",  "2nd-sf", None),
            ("you (to a group)",  "2nd-p", None),
            ("he",                "3rd-sm", None),
            ("she",               "3rd-sf", None),
            ("they",              "3rd-p", None),
        ]
    }


    def make_rows(subject_pronouns_list, builder):
        return [
            {"left": left, "right": builder(abbr, pastP)}
            for left, abbr, pastP in subject_pronouns_list
        ]

    def build_child(subject_pronouns_list, heading, row_builder):
        return {
            "left_heading":  subject_pronouns_list['left_heading'],
            "right_heading": heading,
            "rows":          make_rows(subject_pronouns_list['rows'], row_builder)
        }

    PRP_ARG = {"value": "prp", "type": "arg"}
    T1_VERB_CONJ["presentParticiple"]["children"] = [
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i am "{ex_pres_p}"'],
            lambda abbr, _: [
                PRP_ARG,
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"cop-{abbr}"], "type": "literal"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i was "{ex_pres_p}"'],
            lambda abbr, _: [
                PRP_ARG,
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"cop-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i should be "{ex_pres_p}"'],
            lambda abbr, _: [
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                PRP_ARG,
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i should have been "{ex_pres_p}"'],
            lambda abbr, _: [
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
                PRP_ARG,
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i am often "{ex_pres_p}"'],
            lambda abbr, _: [
                {"value": HABITUAL_KEH, "type": "literal"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                PRP_ARG,
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i was often "{ex_pres_p}"'],
            lambda abbr, _: [
                {"value": HABITUAL_KEH, "type": "literal"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
                PRP_ARG,
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i will be "{ex_pres_p}"'],
            lambda abbr, _: [
                {"value": FUTURE_BIT, "type": "literal"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                PRP_ARG,
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i would have been "{ex_pres_p}"'],
            lambda abbr, _: [
                {"value": FUTURE_BIT, "type": "literal"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
                PRP_ARG,
            ],
        ),
    ]

    T1_VERB_CONJ["pastParticiple"]["children"] = [
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i have "{ex_past_p}"'],
            lambda abbr, pastP: [
                {"value": pastP, "type": "arg"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"cop-{abbr}"], "type": "literal"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i had "{ex_past_p}"'],
            lambda abbr, pastP: [
                {"value": pastP, "type": "arg"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"cop-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i should be having "{ex_past_p}"'],
            lambda abbr, pastP: [
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": pastP, "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i wish i had "{ex_past_p}"'],
            lambda abbr, pastP: [
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
                {"value": pastP, "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i am often having "{ex_past_p}"'],
            lambda abbr, pastP: [
                {"value": HABITUAL_KEH, "type": "literal"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": pastP, "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i was often having "{ex_past_p}"'],
            lambda abbr, pastP: [
                {"value": HABITUAL_KEH, "type": "literal"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
                {"value": pastP, "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i will have "{ex_past_p}"'],
            lambda abbr, pastP: [
                {"value": FUTURE_BIT, "type": "literal"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": pastP, "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i would have already "{ex_past_p}"'],
            lambda abbr, pastP: [
                {"value": FUTURE_BIT, "type": "literal"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
                {"value": pastP, "type": "arg"},
            ],
        ),
    ]

    if not is_haweh:
        T1_VERB_CONJ["pastTense"]["children"] = [
            build_child(
                SUBJECT_PRONOUNS_PAST,
                [f'{ex_marker} i "{ex_past}" {DISTANT_TERM}'],
                lambda abbr, _: [
                    {"value": f"past-{abbr}", "type": "arg-infix-wa"},
                ],
            ),
        ]

    T1_VERB_CONJ["presentTense"]["children"] = [
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i "{ex_past}"'],
            lambda abbr, _: [
                {"value": f"pres-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
    ]

    T1_VERB_CONJ["presentFutureTense"]["children"] = [
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i should have "{ex_past_p}"'],
            lambda abbr, _: [
                {"value": f"pres-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i often "{ex_present}"'],
            lambda abbr, _: [
                {"value": HABITUAL_KEH, "type": "literal"},
                {"value": f"pres-{abbr}", "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i often "{ex_past}"'],
            lambda abbr, _: [
                {"value": HABITUAL_KEH, "type": "literal"},
                {"value": f"pres-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i will "{ex_present_future}"'],
            lambda abbr, _: [
                {"value": FUTURE_BIT, "type": "literal"},
                {"value": f"pres-{abbr}", "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i would have "{ex_past_p}"'],
            lambda abbr, _: [
                {"value": FUTURE_BIT, "type": "literal"},
                {"value": f"pres-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i "{ex_past}" {SOME_DIALECTS}'],
            lambda abbr, _: [
                {"value": SIMPLE_PAST_QIM, "type": "literal"},
                {"value": f"pres-{abbr}", "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i "{ex_past}" {DISTANT_TERM} {SOME_DIALECTS}'],
            lambda abbr, _: [
                {"value": SIMPLE_PAST_QIM, "type": "literal"},
                {"value": f"pres-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
    ]

    T1_VERB_CONJ["futureTense"]["children"] = [
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i should have "{ex_past_p}"'],
            lambda abbr, _: [
                {"value": f"fut-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i often "{ex_present}"'],
            lambda abbr, _: [
                {"value": HABITUAL_KEH, "type": "literal"},
                {"value": f"fut-{abbr}", "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i often "{ex_past}"'],
            lambda abbr, _: [
                {"value": HABITUAL_KEH, "type": "literal"},
                {"value": f"fut-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i will "{ex_present_future}"'],
            lambda abbr, _: [
                {"value": FUTURE_BIT, "type": "literal"},
                {"value": f"fut-{abbr}", "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i would have "{ex_past_p}"'],
            lambda abbr, _: [
                {"value": FUTURE_BIT, "type": "literal"},
                {"value": f"fut-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i "{ex_past}" {SOME_DIALECTS}'],
            lambda abbr, _: [
                {"value": SIMPLE_PAST_QIM, "type": "literal"},
                {"value": f"fut-{abbr}", "type": "arg"},
            ],
        ),
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i "{ex_past}" {DISTANT_TERM} {SOME_DIALECTS}'],
            lambda abbr, _: [
                {"value": SIMPLE_PAST_QIM, "type": "literal"},
                {"value": f"fut-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
    ]


    T1_VERB_CONJ["passivePastTense"]["children"] = [
        build_child(
            SUBJECT_PRONOUNS,
            [f'{ex_marker} i was "{ex_past_p}" {DISTANT_TERM}'],
            lambda abbr, _: [
                {"value": f"passive-past-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
            ],
        ),
    ]

    LEE = ['ܠܝܼ', 'i', MY_OWN_SELF]
    LAN = ['ܠܲܢ', 'we', MY_OWN_SELF]
    LUKH = ['ܠܘܼܟ݂', 'you (to a man)', MY_OWN_SELF]
    LAKH = ['ܠܵܟ݂ܝ', 'you (to a woman)', MY_OWN_SELF]
    LAWKHON = ['ܠܵܘܟ݂ܘܿܢ', 'you (to a group)', MY_OWN_SELF]
    LEH = ['ܠܹܗ', 'he', MY_OWN_SELF]
    LAH = ['ܠܵܗ̇', 'she', MY_OWN_SELF]
    LHON = ['ܠܗܘܿܢ', 'they', MY_OWN_SELF]

    PRONOUNS = [LEE, LAN, LUKH, LAKH, LAWKHON, LEH, LAH, LHON]

    T1_VERB_CONJ["passivePastTense"]["collapsed_children_1"] = [
        build_child(
            OBJECT_PRONOUNS_ACTIVE_PAST,
            [f'{ex_marker} {eng_prep} "{ex_past}" {sing_personal_pron}'],
            lambda abbr, pastP, lit=aii_prep: [
                {"value": f"passive-past-{abbr}", "type": "arg"},
                {"value": lit,                 "type": "literal"},
            ],
        )
        for aii_prep, eng_prep, sing_personal_pron in PRONOUNS
    ]

    T1_VERB_CONJ["passivePastTense"]["collapsed_children_2"] = [
        build_child(
            OBJECT_PRONOUNS_ACTIVE_PAST,
            [f'{ex_marker} {eng_prep} "{ex_past}" {sing_personal_pron} {DISTANT_TERM}'],
            lambda abbr, pastP, lit=aii_prep: [
                {"value": f"passive-past-{abbr}", "type": "arg"},
                {"value": HAWEH_WA, "type": "literal"},
                {"value": lit,                 "type": "literal"},
            ],
        )
        for aii_prep, eng_prep, sing_personal_pron in PRONOUNS
    ]


    T1_VERB_CONJ["agentNoun"]["children"] = [
        # ──────────────────────────────────────────────────────────
        build_child(
            SUBJECT_PRONOUNS_2,
            [f'{ex_marker} i am set on "{ex_pres_p}"'],
            lambda abbr, pp: [
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"pres-{abbr}"], "type": "literal"},
                {"value": pp, "type": "arg"},
            ],
        ),
        # ──────────────────────────────────────────────────────────
        build_child(
            SUBJECT_PRONOUNS_2,
            [f'{ex_marker} i was set on "{ex_pres_p}"'],
            lambda abbr, pp: [
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"pres-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
                {"value": pp, "type": "arg"},
            ],
        ),
        # ──────────────────────────────────────────────────────────
        build_child(
            SUBJECT_PRONOUNS_2,
            [f'{ex_marker} i should be set on "{ex_pres_p}"'],
            lambda abbr, pp: [
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": pp, "type": "arg"},
            ],
        ),
        # ──────────────────────────────────────────────────────────
        build_child(
            SUBJECT_PRONOUNS_2,
            [f'{ex_marker} i should have been set on "{ex_pres_p}"'],
            lambda abbr, pp: [
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
                {"value": pp, "type": "arg"},
            ],
        ),
        # ──────────────────────────────────────────────────────────
        build_child(
            SUBJECT_PRONOUNS_2,
            [f'{ex_marker} i am often set on "{ex_pres_p}"'],
            lambda abbr, pp: [
                {"value": HABITUAL_KEH, "type": "literal"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": pp, "type": "arg"},
            ],
        ),
        # ──────────────────────────────────────────────────────────
        build_child(
            SUBJECT_PRONOUNS_2,
            [f'{ex_marker} i was often set on "{ex_pres_p}"'],
            lambda abbr, pp: [
                {"value": HABITUAL_KEH, "type": "literal"},
                {"value": conj_schema["aii-conj-haweh"]["parameters"][f"fut-{abbr}"], "type": "literal"},
                {"value": HAWEH_WA, "type": "literal"},
                {"value": pp, "type": "arg"},
            ],
        ),
    ]
    return T1_VERB_CONJ


schema_definitions = {
    "verb-conj-schema": {
        'tenses': ["presentParticiple", "pastParticiple", "pastTense",
            "presentFutureTense", "imperativeMood", "passivePastTense",
            "verbalNoun", "agentNoun", "instanceNoun"],
        'is_haweh': False
    },
    "verb-conj-schema-haweh": {
        'tenses': ["presentParticiple", "pastParticiple", "pastTense",
            "presentTense", "copula", "futureTense",
            "imperativeMood", "verbalNoun", "agentNoun", "instanceNoun"],
        'is_haweh': True
    }
}

verb_conj_schemas = {}

for schema_name, values in schema_definitions.items():
    T1_VERB_CONJ = generate_t1_verb_conj(values['is_haweh'])

    rows = []
    for key in values['tenses']:
        rows.append(copy.deepcopy(T1_VERB_CONJ[key]))
    verb_conj_schemas[schema_name] = rows


# --- write out to JS ---------------------------------------------------------
OUT_FILE = Path("js/consts/conj-schemas.js")

with OUT_FILE.open("w", encoding="utf-8") as fp:
    fp.write("/* eslint-disable quote-props, quotes */\nconst verbConjSchemas = ")
    json.dump(verb_conj_schemas, fp, ensure_ascii=False, indent=2)
    fp.write(";\n")

print(f"💾  Wrote {OUT_FILE.resolve()}")
