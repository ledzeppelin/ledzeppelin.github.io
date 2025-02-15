const SUBJECT_PRONOUN = 'Subject Pronoun';

const schemaHeadings = {
  presentParticiple: 'Present Participle',
  pastParticiple: 'Past Participle',
  pastTense: 'Past Tense',
  presentFutureTense: 'Present/Future Tense',
  imperativeMood: 'Imperative Mood',
  passivePastTense: 'Passive Past Tense',
  verbalNoun: 'Verbal Noun',
  agentNoun: 'Agent Noun',
  instanceNoun: 'Instance Noun',
  copula: 'Copula',
  futureTense: 'Future Tense',
};

const schemaTenseRows = {
  presentParticiple: [[' ', 'prp']],
  pastParticiple: [
    ['masculine', 'pp-sm'],
    ['feminine', 'pp-sf'],
    ['plural', 'pp-p'],
  ],
  pastTense: [
    ['I', 'past-1st-s'],
    ['we', 'past-1st-p'],
    ['you (to a man)', 'past-2nd-sm'],
    ['you (to a woman)', 'past-2nd-sf'],
    ['you (to a group)', 'past-2nd-p'],
    ['he', 'past-3rd-sm'],
    ['she', 'past-3rd-sf'],
    ['they', 'past-3rd-p'],
  ],
  presentFutureTense: [
    ['I (man)', 'pres-1st-sm'],
    ['I (woman)', 'pres-1st-sf'],
    ['we', 'pres-1st-p'],
    ['you (to a man)', 'pres-2nd-sm'],
    ['you (to a woman)', 'pres-2nd-sf'],
    ['you (to a group)', 'pres-2nd-p'],
    ['he', 'pres-3rd-sm'],
    ['she', 'pres-3rd-sf'],
    ['they', 'pres-3rd-p'],
  ],
  imperativeMood: [
    ['you (to a man)', 'imp-2nd-sm'],
    ['you (to a woman)', 'imp-2nd-sf'],
    ['you (to a group)', 'imp-2nd-p'],
  ],
  passivePastTense: [
    ['I (man)', 'passive-past-1st-sm'],
    ['I (woman)', 'passive-past-1st-sf'],
    ['we', 'passive-past-1st-p'],
    ['you (to a man)', 'passive-past-2nd-sm'],
    ['you (to a woman)', 'passive-past-2nd-sf'],
    ['you (to a group)', 'passive-past-2nd-p'],
    ['he', 'passive-past-3rd-sm'],
    ['she', 'passive-past-3rd-sf'],
    ['they', 'passive-past-3rd-p'],
  ],
  verbalNoun: [[' ', 'vn']],
  agentNoun: [
    ['singular masculine', 'an-sm'],
    ['singular feminine', 'an-sf'],
    ['plural masculine', 'an-pm'],
    ['plural feminine', 'an-pf'],
  ],
  instanceNoun: [
    ['singular', 'in-s'],
    ['plural', 'in-p'],
  ],
  copula: [
    ['I (man)', 'cop-1st-sm'],
    ['I (woman)', 'cop-1st-sf'],
    ['we', 'cop-1st-p'],
    ['you (to a man)', 'cop-2nd-sm'],
    ['you (to a woman)', 'cop-2nd-sf'],
    ['you (to a group)', 'cop-2nd-p'],
    ['he', 'cop-3rd-sm'],
    ['she', 'cop-3rd-sf'],
    ['they', 'cop-3rd-p'],
  ],
  futureTense: [
    ['I (man)', 'fut-1st-sm'],
    ['I (woman)', 'fut-1st-sf'],
    ['we', 'fut-1st-p'],
    ['you (to a man)', 'fut-2nd-sm'],
    ['you (to a woman)', 'fut-2nd-sf'],
    ['you (to a group)', 'fut-2nd-p'],
    ['he', 'fut-3rd-sm'],
    ['she', 'fut-3rd-sf'],
    ['they', 'fut-3rd-p'],
  ],
};

/* eslint-disable max-len */
const schemaTemplates = {
  common: [
    { left_heading: ' ', right_heading: schemaHeadings.presentParticiple, rows: schemaTenseRows.presentParticiple },
    { left_heading: 'Gender of Described Noun', right_heading: schemaHeadings.pastParticiple, rows: schemaTenseRows.pastParticiple },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.pastTense, rows: schemaTenseRows.pastTense },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.presentFutureTense, rows: schemaTenseRows.presentFutureTense },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.imperativeMood, rows: schemaTenseRows.imperativeMood },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.passivePastTense, rows: schemaTenseRows.passivePastTense },
    { left_heading: ' ', right_heading: schemaHeadings.verbalNoun, rows: schemaTenseRows.verbalNoun },
    { left_heading: 'Number and Gender', right_heading: schemaHeadings.agentNoun, rows: schemaTenseRows.agentNoun },
    { left_heading: 'Number', right_heading: schemaHeadings.instanceNoun, rows: schemaTenseRows.instanceNoun },
  ],
  noVn: [
    { left_heading: ' ', right_heading: schemaHeadings.presentParticiple, rows: schemaTenseRows.presentParticiple },
    { left_heading: 'Gender of Described Noun', right_heading: schemaHeadings.pastParticiple, rows: schemaTenseRows.pastParticiple },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.pastTense, rows: schemaTenseRows.pastTense },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.presentFutureTense, rows: schemaTenseRows.presentFutureTense },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.imperativeMood, rows: schemaTenseRows.imperativeMood },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.passivePastTense, rows: schemaTenseRows.passivePastTense },
    { left_heading: 'Number and Gender', right_heading: schemaHeadings.agentNoun, rows: schemaTenseRows.agentNoun },
    { left_heading: 'Number', right_heading: schemaHeadings.instanceNoun, rows: schemaTenseRows.instanceNoun },
  ],
  haweh: [
    { left_heading: ' ', right_heading: schemaHeadings.presentParticiple, rows: schemaTenseRows.presentParticiple },
    { left_heading: 'Gender of Described Noun', right_heading: schemaHeadings.pastParticiple, rows: schemaTenseRows.pastParticiple },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.pastTense, rows: schemaTenseRows.pastTense },
    { left_heading: SUBJECT_PRONOUN, right_heading: 'Present Tense', rows: schemaTenseRows.presentFutureTense },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.copula, rows: schemaTenseRows.copula },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.futureTense, rows: schemaTenseRows.futureTense },
    { left_heading: SUBJECT_PRONOUN, right_heading: schemaHeadings.imperativeMood, rows: schemaTenseRows.imperativeMood },
    { left_heading: ' ', right_heading: schemaHeadings.verbalNoun, rows: schemaTenseRows.verbalNoun },
    { left_heading: 'Number', right_heading: schemaHeadings.instanceNoun, rows: schemaTenseRows.instanceNoun },
  ],
};

// Verb conjugation schemas
const verbConjSchemas = {
  'verb-conj-schema': schemaTemplates.common,
  'verb-conj-schema-no-vn': schemaTemplates.noVn,
  'verb-conj-schema-haweh': schemaTemplates.haweh,
};
