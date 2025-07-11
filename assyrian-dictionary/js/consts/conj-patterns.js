const conjPatterns = {
  'c-strong': {
    is_radical_strong: [true, true, true],
    parameters: {
      prp: 'ܡܲ{{{1}}}{{{2}}}ܘܿ{{{3}}}ܹܐ',
      'pp-sm': 'ܡܘܼ{{{1}}}{{{2}}}{{{3}}}ܵܐ',
      'pp-sf': 'ܡܘܼ{{{1}}}{{{2}}}ܲ{{{3}}}ܬܵܐ',
      'pp-p': 'ܡܘܼ{{{1}}}{{{2}}}{{{3}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡܘܼ{{{1}}}{{{2}}}{{{3}}}ܸܢ',
      'passive-past-2nd-sm': 'ܡܘܼ{{{1}}}{{{2}}}{{{3}}}ܸܬ',
      'passive-past-3rd-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܸ{{{3}}}',
      'passive-past-1st-p': 'ܡܘܼ{{{1}}}{{{2}}}{{{3}}}ܸܚ',
      'passive-past-2nd-p': 'ܡܘܼ{{{1}}}{{{2}}}{{{3}}}ܝܼܬܘܿܢ',
      'passive-past-3rd-p': 'ܡܘܼ{{{1}}}{{{2}}}{{{3}}}ܝܼ',
      'passive-past-1st-sf': 'ܡܘܼ{{{1}}}{{{2}}}{{{3}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡܘܼ{{{1}}}{{{2}}}{{{3}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡܘܼ{{{1}}}{{{2}}}{{{3}}}ܵܐ',
      'past-1st-s': 'ܡܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܝܼ',
      'past-2nd-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܹܗ',
      'past-3rd-sf': 'ܡܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܵܗ̇',
      'past-1st-p': 'ܡܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܲܢ',
      'past-2nd-p': 'ܡܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܸܢ',
      'pres-1st-sf': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܲܢ',
      'pres-2nd-sm': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܸܬ',
      'pres-2nd-sf': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܵܬܝ',
      'pres-3rd-sm': 'ܡܲ{{{1}}}{{{2}}}ܸ{{{3}}}',
      'pres-3rd-sf': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܵܐ',
      'pres-1st-p': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܲܚ',
      'pres-2nd-p': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܝܼܬܘܿܢ',
      'pres-3rd-p': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܝܼ',
      'imp-2nd-sm': 'ܐܲ{{{1}}}{{{2}}}ܸ{{{3}}}',
      'imp-2nd-sf': 'ܐܲ{{{1}}}{{{2}}}ܸ{{{3}}}ܝ',
      'imp-2nd-p': 'ܐܲ{{{1}}}{{{2}}}{{{3}}}ܘܼܢ',
      'an-sm': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܵܢܵܐ',
      'an-sf': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܵܢܹ̈ܐ',
      'an-pf': 'ܡܲ{{{1}}}{{{2}}}{{{3}}}ܵܢ̈ܝܵܬ݂ܵܐ',
      'in-s': 'ܐܲ{{{1}}}{{{2}}}ܲ{{{3}}}ܬܵܐ',
      'in-p': 'ܐܲ{{{1}}}{{{2}}}ܲ{{{3}}}ܝܵܬ݂̈ܵܐ',
    },
  },
  'c-weak-2-drop': {
    is_radical_strong: [true, false],
    parameters: {
      prp: 'ܡܲ{{{1}}}ܘܿ{{{ܝ}}}ܹܐ',
      'pp-sm': 'ܡܘܼ{{{1}}}{{{ܝ}}}ܵܐ',
      'pp-sf': 'ܡܘܼ{{{1}}}ܲ{{{ܝ}}}ܬܵܐ',
      'pp-p': 'ܡܘܼ{{{1}}}{{{ܝ}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡܘܼ{{{1}}}ܹ{{{ܝ}}}ܢ',
      'passive-past-2nd-sm': 'ܡܘܼ{{{1}}}ܹ{{{ܝ}}}ܬ',
      'passive-past-3rd-sm': 'ܡܘܼ{{{1}}}ܹ{{{ܐ}}}',
      'passive-past-1st-p': 'ܡܘܼ{{{1}}}ܹ{{{ܝ}}}ܚ',
      'passive-past-2nd-p': 'ܡܘܼ{{{1}}}ܹ{{{ܝ}}}ܬܘܿܢ',
      'passive-past-3rd-p': 'ܡܘܼ{{{1}}}ܲ{{{ܝ}}}',
      'passive-past-1st-sf': 'ܡܘܼ{{{1}}}{{{ܝ}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡܘܼ{{{1}}}{{{ܝ}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡܘܼ{{{1}}}{{{ܝ}}}ܵܐ',
      'past-1st-s': 'ܡܘܼ{{{1}}}ܹ{{{ܐ}}} ܠܝܼ',
      'past-2nd-sm': 'ܡܘܼ{{{1}}}ܹ{{{ܐ}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡܘܼ{{{1}}}ܹ{{{ܐ}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡܘܼ{{{1}}}ܹ{{{ܐ}}} ܠܹܗ',
      'past-3rd-sf': 'ܡܘܼ{{{1}}}ܹ{{{ܐ}}} ܠܵܗ̇',
      'past-1st-p': 'ܡܘܼ{{{1}}}ܹ{{{ܐ}}} ܠܲܢ',
      'past-2nd-p': 'ܡܘܼ{{{1}}}ܹ{{{ܐ}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡܘܼ{{{1}}}ܹ{{{ܐ}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡܲ{{{1}}}ܹ{{{ܝ}}}ܢ',
      'pres-1st-sf': 'ܡܲ{{{1}}}{{{ܝ}}}ܵܢ',
      'pres-2nd-sm': 'ܡܲ{{{1}}}ܹ{{{ܝ}}}ܬ',
      'pres-2nd-sf': 'ܡܲ{{{1}}}{{{ܝ}}}ܵܬܝ',
      'pres-3rd-sm': 'ܡܲ{{{1}}}ܹ{{{ܐ}}}',
      'pres-3rd-sf': 'ܡܲ{{{1}}}{{{ܝ}}}ܵܐ',
      'pres-1st-p': 'ܡܲ{{{1}}}ܲ{{{ܝ}}}ܚ',
      'pres-2nd-p': 'ܡܲ{{{1}}}{{{ܝ}}}ܼܬܘܿܢ',
      'pres-3rd-p': 'ܡܲ{{{1}}}{{{ܝ}}}ܼ',
      'imp-2nd-sm': 'ܐܲ{{{1}}}{{{ܝ}}}ܼ',
      'imp-2nd-sf': 'ܐܲ{{{1}}}ܹ{{{ܐ}}}',
      'imp-2nd-p': 'ܐܲ{{{1}}}ܹ{{{ܝ}}}ܡܘܼܢ',
      'an-sm': 'ܡܲ{{{1}}}{{{ܝ}}}ܵܢܵܐ',
      'an-sf': 'ܡܲ{{{1}}}{{{ܝ}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡܲ{{{1}}}{{{ܝ}}}ܵܢܹ̈ܐ',
      'an-pf': 'ܡܲ{{{1}}}{{{ܝ}}}ܵܢ̈ܝܵܬ݂ܵܐ',
      'in-s': 'ܡܲ{{{1}}}ܲ{{{ܝ}}}ܬܵܐ',
      'in-p': 'ܡܲ{{{1}}}ܲ{{{ܝ}}}̈ܵܬ݂ܵܐ',
    },
  },
  'c-weak-3': {
    is_radical_strong: [true, true, false],
    parameters: {
      prp: 'ܡܲ{{{1}}}{{{2}}}ܘܿ{{{ܝ}}}ܹܐ',
      'pp-sm': 'ܡܘܼ{{{1}}}{{{2}}}{{{ܝ}}}ܵܐ',
      'pp-sf': 'ܡܘܼ{{{1}}}{{{2}}}ܲ{{{ܝ}}}ܬܵܐ',
      'pp-p': 'ܡܘܼ{{{1}}}{{{2}}}{{{ܝ}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܢ',
      'passive-past-2nd-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܬ',
      'passive-past-3rd-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܐ}}}',
      'passive-past-1st-p': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܚ',
      'passive-past-2nd-p': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܬܘܿܢ',
      'passive-past-3rd-p': 'ܡܘܼ{{{1}}}{{{2}}}ܲ{{{ܝ}}}',
      'passive-past-1st-sf': 'ܡܘܼ{{{1}}}{{{2}}}{{{ܝ}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡܘܼ{{{1}}}{{{2}}}{{{ܝ}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡܘܼ{{{1}}}{{{2}}}{{{ܝ}}}ܵܐ',
      'past-1st-s': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܝܼ',
      'past-2nd-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܹܗ',
      'past-3rd-sf': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܵܗ̇',
      'past-1st-p': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܲܢ',
      'past-2nd-p': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡܘܼ{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡܲ{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܢ',
      'pres-1st-sf': 'ܡܲ{{{1}}}{{{2}}}{{{ܝ}}}ܵܢ',
      'pres-2nd-sm': 'ܡܲ{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܬ',
      'pres-2nd-sf': 'ܡܲ{{{1}}}{{{2}}}{{{ܝ}}}ܵܬܝ',
      'pres-3rd-sm': 'ܡܲ{{{1}}}{{{2}}}ܹ{{{ܐ}}}',
      'pres-3rd-sf': 'ܡܲ{{{1}}}{{{2}}}{{{ܝ}}}ܵܐ',
      'pres-1st-p': 'ܡܲ{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܚ',
      'pres-2nd-p': 'ܡܲ{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܬܘܿܢ',
      'pres-3rd-p': 'ܡܲ{{{1}}}{{{2}}}{{{ܝ}}}ܼ',
      'imp-2nd-sm': 'ܐܲ{{{1}}}{{{2}}}{{{ܝ}}}ܼ',
      'imp-2nd-sf': 'ܐܲ{{{1}}}{{{2}}}ܲ{{{ܝ}}}',
      'imp-2nd-p': 'ܐܲ{{{1}}}{{{2}}}ܲ{{{ܘ}}}',
      'an-sm': 'ܡܲ{{{1}}}{{{2}}}{{{ܝ}}}ܵܢܵܐ',
      'an-sf': 'ܡܲ{{{1}}}{{{2}}}{{{ܝ}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡܲ{{{1}}}{{{2}}}{{{ܝ}}}ܵܢܹ̈ܐ',
      'an-pf': 'ܡܲ{{{1}}}{{{2}}}ܝܵܢ̈{{{ܝ}}}ܵܬ݂ܵܐ',
      'in-s': 'ܡܲ{{{1}}}{{{2}}}ܲ{{{ܝ}}}ܬܵܐ',
      'in-p': 'ܡܲ{{{1}}}̈{{{2}}}ܲ{{{ܝ}}}ܵܬ݂ܵܐ',
    },
  },
  'c-weak-drop': {
    is_radical_strong: [true, true],
    parameters: {
      prp: 'ܡܲ{{{1}}}ܘܿ{{{2}}}ܹܐ',
      'pp-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܵܐ',
      'pp-sf': 'ܡܘܼ{{{1}}}ܲ{{{2}}}ܬܵܐ',
      'pp-p': 'ܡܘܼ{{{1}}}{{{2}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܸܢ',
      'passive-past-2nd-sm': 'ܡܘܼ{{{1}}}{{{2}}}ܸܬ',
      'passive-past-3rd-sm': 'ܡܘܼ{{{1}}}ܸ{{{2}}}',
      'passive-past-1st-p': 'ܡܘܼ{{{1}}}{{{2}}}ܸܚ',
      'passive-past-2nd-p': 'ܡܘܼ{{{1}}}{{{2}}}ܝܼܬܘܿܢ',
      'passive-past-3rd-p': 'ܡܘܼ{{{1}}}{{{2}}}ܝܼ',
      'passive-past-1st-sf': 'ܡܘܼ{{{1}}}{{{2}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡܘܼ{{{1}}}{{{2}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡܘܼ{{{1}}}{{{2}}}ܵܐ',
      'past-1st-s': 'ܡܘܼ{{{1}}}ܸ{{{2}}} ܠܝܼ',
      'past-2nd-sm': 'ܡܘܼ{{{1}}}ܸ{{{2}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡܘܼ{{{1}}}ܸ{{{2}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡܘܼ{{{1}}}ܸ{{{2}}} ܠܹܗ',
      'past-3rd-sf': 'ܡܘܼ{{{1}}}ܸ{{{2}}} ܠܵܗ̇',
      'past-1st-p': 'ܡܘܼ{{{1}}}ܸ{{{2}}} ܠܲܢ',
      'past-2nd-p': 'ܡܘܼ{{{1}}}ܸ{{{2}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡܘܼ{{{1}}}ܸ{{{2}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡܲ{{{1}}}{{{2}}}ܸܢ',
      'pres-1st-sf': 'ܡܲ{{{1}}}{{{2}}}ܲܢ',
      'pres-2nd-sm': 'ܡܲ{{{1}}}{{{2}}}ܸܬ',
      'pres-2nd-sf': 'ܡܲ{{{1}}}{{{2}}}ܵܬܝ',
      'pres-3rd-sm': 'ܡܲ{{{1}}}ܸ{{{2}}}',
      'pres-3rd-sf': 'ܡܲ{{{1}}}{{{2}}}ܵܐ',
      'pres-1st-p': 'ܡܲ{{{1}}}{{{2}}}ܲܚ',
      'pres-2nd-p': 'ܡܲ{{{1}}}{{{2}}}ܝܼܬܘܿܢ',
      'pres-3rd-p': 'ܡܲ{{{1}}}{{{2}}}ܝܼ',
      'imp-2nd-sm': 'ܐܲ{{{1}}}ܸ{{{2}}}',
      'imp-2nd-sf': 'ܐܲ{{{1}}}ܸ{{{2}}}ܝ',
      'imp-2nd-p': 'ܐܲ{{{1}}}{{{2}}}ܘܼܢ',
      'an-sm': 'ܡܲ{{{1}}}{{{2}}}ܵܢܵܐ',
      'an-sf': 'ܡܲ{{{1}}}{{{2}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡܲ{{{1}}}{{{2}}}ܵܢܹ̈ܐ',
      'an-pf': 'ܡܲ{{{1}}}{{{2}}}ܵܢ̈ܝܵܬ݂ܵܐ',
      'in-s': 'ܡܲ{{{1}}}ܲ{{{2}}}ܬܵܐ',
      'in-p': 'ܡܲ{{{1}}}ܲ{{{2}}}ܝ̈ܵܬ݂ܵܐ',
    },
  },
  'd-strong': {
    is_radical_strong: [true, true, true],
    parameters: {
      prp: 'ܡ{{{1}}}ܲ{{{2}}}ܘܿ{{{3}}}ܹܐ',
      'pp-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܵܐ',
      'pp-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}ܲ{{{3}}}ܬܵܐ',
      'pp-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸܢ',
      'passive-past-2nd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸܬ',
      'passive-past-3rd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}ܸ{{{3}}}',
      'passive-past-1st-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸܚ',
      'passive-past-2nd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܝܼܬܘܿܢ',
      'passive-past-3rd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܝܼ',
      'passive-past-1st-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܵܐ',
      'past-1st-s': 'ܡ{{{1}}}ܘܼ{{{2}}}ܸ{{{3}}} ܠܝܼ',
      'past-2nd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}ܸ{{{3}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}ܸ{{{3}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}ܸ{{{3}}} ܠܹܗ',
      'past-3rd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}ܸ{{{3}}} ܠܵܗ̇',
      'past-1st-p': 'ܡ{{{1}}}ܘܼ{{{2}}}ܸ{{{3}}} ܠܲܢ',
      'past-2nd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}ܸ{{{3}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}ܸ{{{3}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܸܢ',
      'pres-1st-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܲܢ',
      'pres-2nd-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܸܬ',
      'pres-2nd-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܵܬܝ',
      'pres-3rd-sm': 'ܡ{{{1}}}ܲ{{{2}}}ܸ{{{3}}}',
      'pres-3rd-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܵܐ',
      'pres-1st-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܲܚ',
      'pres-2nd-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܝܼܬܘܿܢ',
      'pres-3rd-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܝܼ',
      'imp-2nd-sm': '{{{1}}}ܲ{{{2}}}ܸ{{{3}}}',
      'imp-2nd-sf': '{{{1}}}ܲ{{{2}}}ܸ{{{3}}}ܝ',
      'imp-2nd-p': '{{{1}}}ܲ{{{2}}}{{{3}}}ܘܼܢ',
      'an-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܵܢܵܐ',
      'an-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܵܢܹ̈ܐ',
      'an-pf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܵܢ̈ܝܵܬ݂ܵܐ',
      vn: '{{{1}}}ܘܼ{{{2}}}ܵ{{{3}}}ܵܐ',
      'in-s': '{{{1}}}ܲ{{{2}}}ܲ{{{3}}}ܬܵܐ',
      'in-p': '{{{1}}}ܲ{{{2}}}ܲ{{{3}}}̈ܝܵܬ݂ܵܐ',
    },
  },
  'd-weak-3': {
    is_radical_strong: [true, true, false],
    parameters: {
      prp: 'ܡ{{{1}}}ܲ{{{2}}}ܘܿ{{{ܝ}}}ܹܐ',
      'pp-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{ܝ}}}ܵܐ',
      'pp-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}ܲ{{{ܝ}}}ܬܵܐ',
      'pp-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{ܝ}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܝ}}}ܢ',
      'passive-past-2nd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܝ}}}ܬ',
      'passive-past-3rd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܐ}}}',
      'passive-past-1st-p': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܝ}}}ܚ',
      'passive-past-2nd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܝ}}}ܬܘܿܢ',
      'passive-past-3rd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}ܲ{{{ܝ}}}',
      'passive-past-1st-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{ܝ}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{ܝ}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{ܝ}}}ܵܐ',
      'past-1st-s': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܐ}}} ܠܝܼ',
      'past-2nd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܐ}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܐ}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܐ}}} ܠܹܗ',
      'past-3rd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܐ}}} ܠܵܗ̇',
      'past-1st-p': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܐ}}} ܠܲܢ',
      'past-2nd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܐ}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}ܹ{{{ܐ}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡ{{{1}}}ܲ{{{2}}}ܹ{{{ܝ}}}ܢ',
      'pres-1st-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{ܝ}}}ܵܢ',
      'pres-2nd-sm': 'ܡ{{{1}}}ܲ{{{2}}}ܹ{{{ܝ}}}ܬ',
      'pres-2nd-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{ܝ}}}ܵܬܝ',
      'pres-3rd-sm': 'ܡ{{{1}}}ܲ{{{2}}}ܹ{{{ܐ}}}',
      'pres-3rd-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{ܝ}}}ܵܐ',
      'pres-1st-p': 'ܡ{{{1}}}ܲ{{{2}}}ܹ{{{ܝ}}}ܚ',
      'pres-2nd-p': 'ܡ{{{1}}}ܲ{{{2}}}ܹ{{{ܝ}}}ܬܘܿܢ',
      'pres-3rd-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{ܝ}}}ܼ',
      'imp-2nd-sm': '{{{1}}}ܲ{{{2}}}{{{ܝ}}}ܼ',
      'imp-2nd-sf': '{{{1}}}ܲ{{{2}}}ܲ{{{ܝ}}}',
      'imp-2nd-p': '{{{1}}}ܲ{{{2}}}ܲ{{{ܘ}}}',
      'an-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{ܝ}}}ܵܢܵܐ',
      'an-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{ܝ}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡ{{{1}}}ܲ{{{2}}}{{{ܝ}}}ܵܢܹ̈ܐ',
      'an-pf': 'ܡ{{{1}}}ܲ{{{2}}}{{{ܝ}}}ܵܢ̈ܝܵܬ݂ܵܐ',
      vn: '{{{1}}}ܘܼ{{{2}}}ܵ{{{ܝ}}}ܵܐ',
      'in-s': '{{{1}}}ܲ{{{2}}}ܲ{{{ܝ}}}ܬܵܐ',
      'in-p': '{{{1}}}ܲ{{{2}}}ܲ{{{ܝ}}}̈ܵܬ݂ܵܐ',
    },
  },
  'g-strong': {
    is_radical_strong: [true, true, true],
    parameters: {
      prp: 'ܒܸ{{{1}}}{{{2}}}ܵ{{{3}}}ܵܐ',
      'pp-sm': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܵܐ',
      'pp-sf': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܬܵܐ',
      'pp-p': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܹ̈ܐ',
      'passive-past-1st-sm': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܸܢ',
      'passive-past-2nd-sm': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܸܬ',
      'passive-past-3rd-sm': '{{{1}}}{{{2}}}ܝܼ{{{3}}}',
      'passive-past-1st-p': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܸܚ',
      'passive-past-2nd-p': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܝܼܬܘܿܢ',
      'passive-past-3rd-p': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܝܼ',
      'passive-past-1st-sf': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܲܢ',
      'passive-past-2nd-sf': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܲܬܝ',
      'passive-past-3rd-sf': '{{{1}}}{{{2}}}ܝܼ{{{3}}}ܵܐ',
      'past-1st-s': '{{{1}}}{{{2}}}ܝܼ{{{3}}} ܠܝܼ',
      'past-2nd-sm': '{{{1}}}{{{2}}}ܝܼ{{{3}}} ܠܘܼܟ݂',
      'past-2nd-sf': '{{{1}}}{{{2}}}ܝܼ{{{3}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': '{{{1}}}{{{2}}}ܝܼ{{{3}}} ܠܹܗ',
      'past-3rd-sf': '{{{1}}}{{{2}}}ܝܼ{{{3}}} ܠܵܗ̇',
      'past-1st-p': '{{{1}}}{{{2}}}ܝܼ{{{3}}} ܠܲܢ',
      'past-2nd-p': '{{{1}}}{{{2}}}ܝܼ{{{3}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': '{{{1}}}{{{2}}}ܝܼ{{{3}}} ܠܗܘܿܢ',
      'pres-1st-sm': '{{{1}}}ܵ{{{2}}}{{{3}}}ܹܢ',
      'pres-1st-sf': '{{{1}}}ܵ{{{2}}}{{{3}}}ܵܢ',
      'pres-2nd-sm': '{{{1}}}ܵ{{{2}}}{{{3}}}ܹܬ',
      'pres-2nd-sf': '{{{1}}}ܵ{{{2}}}{{{3}}}ܵܬܝ',
      'pres-3rd-sm': '{{{1}}}ܵ{{{2}}}ܹ{{{3}}}',
      'pres-3rd-sf': '{{{1}}}ܵ{{{2}}}{{{3}}}ܵܐ',
      'pres-1st-p': '{{{1}}}ܵ{{{2}}}{{{3}}}ܲܚ',
      'pres-2nd-p': '{{{1}}}ܵ{{{2}}}{{{3}}}ܝܼܬܘܿܢ',
      'pres-3rd-p': '{{{1}}}ܵ{{{2}}}{{{3}}}ܝܼ',
      'imp-2nd-sm': '{{{1}}}{{{2}}}ܘܿ{{{3}}}',
      'imp-2nd-sf': '{{{1}}}{{{2}}}ܘܿ{{{3}}}ܝ',
      'imp-2nd-p': '{{{1}}}{{{2}}}ܘܿ{{{3}}}ܘܼܢ',
      'an-sm': '{{{1}}}ܵ{{{2}}}ܘܿ{{{3}}}ܵܐ',
      'an-sf': '{{{1}}}ܵ{{{2}}}ܘܿ{{{3}}}ܬܵܐ',
      'an-pm': '{{{1}}}ܵ{{{2}}}ܘܿ{{{3}}}ܹ̈ܐ',
      'an-pf': '{{{1}}}ܵ{{{2}}}ܘܿ{{{3}}}ܝ̈ܵܬ݂ܵܐ',
      vn: '{{{1}}}{{{2}}}ܵ{{{3}}}ܵܐ',
      'in-s': '{{{1}}}{{{2}}}ܵ{{{3}}}ܬܵܐ',
      'in-p': '{{{1}}}{{{2}}}ܵ{{{3}}}̈ܝܵܬ݂ܵܐ',
    },
  },
  'g-weak-1': {
    is_radical_strong: [false, true, true],
    parameters: {
      prp: 'ܒܹ{{{ܐ}}}݇{{{1}}}ܵ{{{2}}}ܵܐ',
      'pp-sm': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܵܐ',
      'pp-sf': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܬܵܐ',
      'pp-p': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܹ̈ܐ',
      'passive-past-1st-sm': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܸܢ',
      'passive-past-2nd-sm': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܸܬ',
      'passive-past-3rd-sm': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}',
      'passive-past-1st-p': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܸܚ',
      'passive-past-2nd-p': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܝܼܬܘܿܢ',
      'passive-past-3rd-p': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܝܼ',
      'passive-past-1st-sf': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܲܢ',
      'passive-past-2nd-sf': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܲܬܝ',
      'passive-past-3rd-sf': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}}ܵܐ',
      'past-1st-s': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}} ܠܝܼ',
      'past-2nd-sm': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}} ܠܘܼܟ݂',
      'past-2nd-sf': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}} ܠܹܗ',
      'past-3rd-sf': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}} ܠܵܗ̇',
      'past-1st-p': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}} ܠܲܢ',
      'past-2nd-p': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': '{{{ܐ}}}݇{{{1}}}ܝܼ{{{2}}} ܠܗܘܿܢ',
      'pres-1st-sm': '{{{ܐ}}}ܵ{{{1}}}{{{2}}}ܹܢ',
      'pres-1st-sf': '{{{ܐ}}}ܵ{{{1}}}{{{2}}}ܵܢ',
      'pres-2nd-sm': '{{{ܐ}}}ܵ{{{1}}}{{{2}}}ܹܬ',
      'pres-2nd-sf': '{{{ܐ}}}ܵ{{{1}}}{{{2}}}ܵܬܝ',
      'pres-3rd-sm': '{{{ܐ}}}ܵ{{{1}}}ܹ{{{2}}}',
      'pres-3rd-sf': '{{{ܐ}}}ܵ{{{1}}}{{{2}}}ܵܐ',
      'pres-1st-p': '{{{ܐ}}}ܵ{{{1}}}{{{2}}}ܲܚ',
      'pres-2nd-p': '{{{ܐ}}}ܵ{{{1}}}{{{2}}}ܝܼܬܘܿܢ',
      'pres-3rd-p': '{{{ܐ}}}ܵ{{{1}}}{{{2}}}ܝܼ',
      'imp-2nd-sm': '{{{ܐ}}}݇{{{1}}}ܘܿ{{{2}}}',
      'imp-2nd-sf': '{{{ܐ}}}݇{{{1}}}ܘܿ{{{2}}}ܝ',
      'imp-2nd-p': '{{{ܐ}}}݇{{{1}}}ܘܿ{{{2}}}ܘܼܢ',
      'an-sm': '{{{ܐ}}}ܵ{{{1}}}ܘܿ{{{2}}}ܵܐ',
      'an-sf': '{{{ܐ}}}ܵ{{{1}}}ܘܿ{{{2}}}ܬܵܐ',
      'an-pm': '{{{ܐ}}}ܵ{{{1}}}ܘܿ{{{2}}}ܹ̈ܐ',
      'an-pf': '{{{ܐ}}}ܵ{{{1}}}ܘܿ{{{2}}}ܝ̈ܵܬ݂ܵܐ',
      vn: '{{{ܐ}}}݇{{{1}}}ܵ{{{2}}}ܵܐ',
      'in-s': '{{{ܐ}}}݇{{{1}}}ܵ{{{2}}}ܬܵܐ',
      'in-p': '{{{ܐ}}}݇{{{1}}}ܵ{{{2}}}ܝ̈ܵܬ݂ܵܐ',
    },
  },
  'g-weak-2': {
    is_radical_strong: [true, false, true],
    parameters: {
      prp: 'ܒܸ{{{1}}}{{{ܝ}}}ܵ{{{2}}}ܵܐ',
      'pp-sm': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܵܐ',
      'pp-sf': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܬܵܐ',
      'pp-p': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܹ̈ܐ',
      'passive-past-1st-sm': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܸܢ',
      'passive-past-2nd-sm': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܸܬ',
      'passive-past-3rd-sm': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}',
      'passive-past-1st-p': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܸܚ',
      'passive-past-2nd-p': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܝܼܬܘܿܢ',
      'passive-past-3rd-p': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܝܼ',
      'passive-past-1st-sf': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܲܢ',
      'passive-past-2nd-sf': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܲܬܝ',
      'passive-past-3rd-sf': '{{{1}}}{{{ܝ}}}ܼ{{{2}}}ܵܐ',
      'past-1st-s': '{{{1}}}{{{ܝ}}}ܼ{{{2}}} ܠܝܼ',
      'past-2nd-sm': '{{{1}}}{{{ܝ}}}ܼ{{{2}}} ܠܘܼܟ݂',
      'past-2nd-sf': '{{{1}}}{{{ܝ}}}ܼ{{{2}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': '{{{1}}}{{{ܝ}}}ܼ{{{2}}} ܠܹܗ',
      'past-3rd-sf': '{{{1}}}{{{ܝ}}}ܼ{{{2}}} ܠܵܗ̇',
      'past-1st-p': '{{{1}}}{{{ܝ}}}ܼ{{{2}}} ܠܲܢ',
      'past-2nd-p': '{{{1}}}{{{ܝ}}}ܼ{{{2}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': '{{{1}}}{{{ܝ}}}ܼ{{{2}}} ܠܗܘܿܢ',
      'pres-1st-sm': '{{{1}}}ܵ{{{ܝ}}}{{{2}}}ܹܢ',
      'pres-1st-sf': '{{{1}}}ܵ{{{ܝ}}}{{{2}}}ܵܢ',
      'pres-2nd-sm': '{{{1}}}ܵ{{{ܝ}}}{{{2}}}ܹܬ',
      'pres-2nd-sf': '{{{1}}}ܵ{{{ܝ}}}{{{2}}}ܵܬܝ',
      'pres-3rd-sm': '{{{1}}}ܵ{{{ܐ}}}ܹ{{{2}}}',
      'pres-3rd-sf': '{{{1}}}ܵ{{{ܝ}}}{{{2}}}ܵܐ',
      'pres-1st-p': '{{{1}}}ܵ{{{ܝ}}}{{{2}}}ܲܚ',
      'pres-2nd-p': '{{{1}}}ܵ{{{ܝ}}}{{{2}}}ܝܼܬܘܿܢ',
      'pres-3rd-p': '{{{1}}}ܵ{{{ܝ}}}{{{2}}}ܝܼ',
      'imp-2nd-sm': '{{{1}}}{{{ܘ}}}ܼ{{{2}}}',
      'imp-2nd-sf': '{{{1}}}{{{ܘ}}}ܼ{{{2}}}ܝ',
      'imp-2nd-p': '{{{1}}}{{{ܘ}}}ܼ{{{2}}}ܘܼܢ',
      'an-sm': '{{{1}}}ܵ{{{ܝ}}}ܘܿ{{{2}}}ܵܐ',
      'an-sf': '{{{1}}}ܵ{{{ܝ}}}ܘܿ{{{2}}}ܬܵܐ',
      'an-pm': '{{{1}}}ܵ{{{ܝ}}}ܘܿ{{{2}}}ܹ̈ܐ',
      'an-pf': '{{{1}}}ܵ{{{ܝ}}}ܘܿ{{{2}}}ܝ̈ܵܬ݂ܵܐ',
      vn: '{{{1}}}{{{ܝ}}}ܵ{{{2}}}ܵܐ',
      'in-s': '{{{1}}}{{{ܝ}}}ܵ{{{2}}}ܬܵܐ',
      'in-p': '{{{1}}}{{{ܝ}}}ܵ{{{2}}}ܝܵܬ݂̈ܵܐ',
    },
  },
  'g-weak-3': {
    is_radical_strong: [true, true, false],
    parameters: {
      prp: 'ܒܸ{{{1}}}{{{2}}}ܵ{{{ܝ}}}ܵܐ',
      'pp-sm': '{{{1}}}ܸ{{{2}}}{{{ܝ}}}ܵܐ',
      'pp-sf': '{{{1}}}{{{2}}}{{{ܝ}}}ܼܬ݂ܵܐ',
      'pp-p': '{{{1}}}ܸ{{{2}}}{{{ܝ}}}ܹ̈ܐ',
      'passive-past-1st-sm': '{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܢ',
      'passive-past-2nd-sm': '{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܬ',
      'passive-past-3rd-sm': '{{{1}}}{{{2}}}ܹ{{{ܐ}}}',
      'passive-past-1st-p': '{{{1}}}{{{2}}}ܹ{{{ܝ}}}ܚ',
      'passive-past-2nd-p': '{{{1}}}{{{2}}}ܲ{{{ܝ}}}ܬܘܿܢ',
      'passive-past-3rd-p': '{{{1}}}{{{2}}}ܲ{{{ܝ}}}',
      'passive-past-1st-sf': '{{{1}}}ܸ{{{2}}}{{{ܝ}}}ܲܢ',
      'passive-past-2nd-sf': '{{{1}}}ܸ{{{2}}}{{{ܝ}}}ܲܬܝ',
      'passive-past-3rd-sf': '{{{1}}}ܸ{{{2}}}{{{ܝ}}}ܵܐ',
      'past-1st-s': '{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܝܼ',
      'past-2nd-sm': '{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܘܼܟ݂',
      'past-2nd-sf': '{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': '{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܹܗ',
      'past-3rd-sf': '{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܵܗ̇',
      'past-1st-p': '{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܲܢ',
      'past-2nd-p': '{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': '{{{1}}}{{{2}}}ܹ{{{ܐ}}} ܠܗܘܿܢ',
      'pres-1st-sm': '{{{1}}}ܵ{{{2}}}ܹ{{{ܝ}}}ܢ',
      'pres-1st-sf': '{{{1}}}ܵ{{{2}}}{{{ܝ}}}ܲܢ',
      'pres-2nd-sm': '{{{1}}}ܵ{{{2}}}ܹ{{{ܝ}}}ܬ',
      'pres-2nd-sf': '{{{1}}}ܵ{{{2}}}{{{ܝ}}}ܲܬܝ',
      'pres-3rd-sm': '{{{1}}}ܵ{{{2}}}ܹ{{{ܐ}}}',
      'pres-3rd-sf': '{{{1}}}ܵ{{{2}}}{{{ܝ}}}ܵܐ',
      'pres-1st-p': '{{{1}}}ܵ{{{2}}}ܹ{{{ܝ}}}ܚ',
      'pres-2nd-p': '{{{1}}}ܵ{{{2}}}ܲ{{{ܝ}}}ܬܘܿܢ',
      'pres-3rd-p': '{{{1}}}ܵ{{{2}}}{{{ܝ}}}ܼ',
      'imp-2nd-sm': '{{{1}}}{{{2}}}{{{ܝ}}}ܼ',
      'imp-2nd-sf': '{{{1}}}{{{2}}}ܲ{{{ܝ}}}',
      'imp-2nd-p': '{{{1}}}{{{2}}}ܲ{{{ܘ}}}',
      'an-sm': '{{{1}}}ܵ{{{2}}}ܘܿ{{{ܝ}}}ܵܐ',
      'an-sf': '{{{1}}}ܵ{{{2}}}ܘܿ{{{ܝ}}}ܬܵܐ',
      'an-pm': '{{{1}}}ܵ{{{2}}}ܘܿ{{{ܝ}}}ܹ̈ܐ',
      'an-pf': '{{{1}}}ܵ{{{2}}}̈ܘܿ{{{ܝ}}}ܵܬ݂ܵܐ',
      vn: '{{{1}}}{{{2}}}ܵ{{{ܝ}}}ܵܐ',
      'in-s': '{{{1}}}{{{2}}}ܵ{{{ܝ}}}ܬܵܐ',
      'in-p': '{{{1}}}̈{{{2}}}ܵ{{{ܝ}}}ܵܬ݂ܵܐ',
    },
  },
  'gt-strong': {
    is_radical_strong: [true, true, true],
    parameters: {
      prp: 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܿ{{{3}}}ܹܐ',
      'pp-sm': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܵܐ',
      'pp-sf': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܬܵܐ',
      'pp-p': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܸܢ',
      'passive-past-2nd-sm': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܸܬ',
      'passive-past-3rd-sm': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}',
      'passive-past-1st-p': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܸܚ',
      'passive-past-2nd-p': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܝܼܬܘܿܢ',
      'passive-past-3rd-p': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܝܼ',
      'passive-past-1st-sf': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡܸܬ݂{{{1}}}{{{2}}}ܘܼ{{{3}}}ܵܐ',
      'past-1st-s': 'ܡܘܼܬ݂{{{1}}}{{{2}}}ܹ{{{3}}} ܠܝܼ',
      'past-2nd-sm': 'ܡܘܼܬ݂{{{1}}}{{{2}}}ܹ{{{3}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡܘܼܬ݂{{{1}}}{{{2}}}ܹ{{{3}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡܘܼܬ݂{{{1}}}{{{2}}}ܹ{{{3}}} ܠܹܗ',
      'past-3rd-sf': 'ܡܘܼܬ݂{{{1}}}{{{2}}}ܹ{{{3}}} ܠܵܗ̇',
      'past-1st-p': 'ܡܘܼܬ݂{{{1}}}{{{2}}}ܹ{{{3}}} ܠܲܢ',
      'past-2nd-p': 'ܡܘܼܬ݂{{{1}}}{{{2}}}ܹ{{{3}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡܘܼܬ݂{{{1}}}{{{2}}}ܹ{{{3}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܸܢ',
      'pres-1st-sf': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܵܢ',
      'pres-2nd-sm': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܸܬ',
      'pres-2nd-sf': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܵܬܝ',
      'pres-3rd-sm': 'ܡܸܬ݂{{{1}}}{{{2}}}ܹ{{{3}}}',
      'pres-3rd-sf': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܵܐ',
      'pres-1st-p': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܲܚ',
      'pres-2nd-p': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܝܼܬܘܿܢ',
      'pres-3rd-p': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܝܼ',
      'imp-2nd-sm': 'ܐܸܬ݂{{{1}}}{{{2}}}ܹ{{{3}}}',
      'imp-2nd-sf': 'ܐܸܬ݂{{{1}}}{{{2}}}ܹ{{{3}}}ܝ',
      'imp-2nd-p': 'ܐܸܬ݂{{{1}}}ܸ{{{2}}}{{{3}}}ܘܼܢ',
      'an-sm': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܵܢܵܐ',
      'an-sf': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܵܢܹ̈ܐ',
      'an-pf': 'ܡܸܬ݂{{{1}}}ܲ{{{2}}}{{{3}}}ܵܢ̈ܝܵܬ݂ܵܐ',
      'in-s': 'ܡܸܬ݂{{{1}}}{{{2}}}ܲ{{{3}}}ܬܵܐ',
      'in-p': 'ܡܸܬ݂{{{1}}}{{{2}}}ܲ{{{3}}}ܝ̈ܵܬ݂ܵܐ',
    },
  },
  'penta-strong': {
    is_radical_strong: [true, true, true, true, true],
    parameters: {
      prp: 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܘܿ{{{5}}}ܹܐ',
      'pp-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܵܐ',
      'pp-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܬܵܐ',
      'pp-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܸܢ',
      'passive-past-2nd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܸܬ',
      'passive-past-3rd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}',
      'passive-past-1st-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܸܚ',
      'passive-past-2nd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܝܼܬܘܿܢ',
      'passive-past-3rd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܝܼ',
      'passive-past-1st-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܵܐ',
      'past-1st-s': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}} ܠܝܼ',
      'past-2nd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}} ܠܹܗ',
      'past-3rd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}} ܠܵܗ̇',
      'past-1st-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}} ܠܲܢ',
      'past-2nd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}ܸܢ',
      'pres-1st-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}ܲܢ',
      'pres-2nd-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}ܸܬ',
      'pres-2nd-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}ܵܬܝ',
      'pres-3rd-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}',
      'pres-3rd-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}ܵܐ',
      'pres-1st-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}ܲܚ',
      'pres-2nd-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}ܝܼܬܘܿܢ',
      'pres-3rd-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}ܝܼ',
      'imp-2nd-sm': '{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}',
      'imp-2nd-sf': '{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}ܝ',
      'imp-2nd-p': '{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸ{{{5}}}ܘܼܢ',
      'an-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܢܵܐ',
      'an-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܢܹ̈ܐ',
      'an-pf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܸ{{{4}}}{{{5}}}ܢ̈ܝܵܬ݂ܵܐ',
      vn: '{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܵ{{{5}}}ܵܐ',
      'in-s': '{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܲ{{{5}}}ܬܵܐ',
      'in-p': '{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܲ{{{5}}}ܝ̈ܵܬ݂ܵܐ',
    },
  },
  'q-strong': {
    is_radical_strong: [true, true, true, true],
    parameters: {
      prp: 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܘܿ{{{4}}}ܹܐ',
      'pp-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܵܐ',
      'pp-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܲ{{{4}}}ܬܵܐ',
      'pp-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸܢ',
      'passive-past-2nd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸܬ',
      'passive-past-3rd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}}',
      'passive-past-1st-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܸܚ',
      'passive-past-2nd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܝܼܬܘܿܢ',
      'passive-past-3rd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܝܼ',
      'passive-past-1st-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{4}}}ܵܐ',
      'past-1st-s': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}} ܠܝܼ',
      'past-2nd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}} ܠܹܗ',
      'past-3rd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}} ܠܵܗ̇',
      'past-1st-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}} ܠܲܢ',
      'past-2nd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܸ{{{4}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸܢ',
      'pres-1st-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܲܢ',
      'pres-2nd-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܸܬ',
      'pres-2nd-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܵܬܝ',
      'pres-3rd-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܸ{{{4}}}',
      'pres-3rd-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܵܐ',
      'pres-1st-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܲܚ',
      'pres-2nd-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܝܼܬܘܿܢ',
      'pres-3rd-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܝܼ',
      'imp-2nd-sm': '{{{1}}}ܲ{{{2}}}{{{3}}}ܸ{{{4}}}',
      'imp-2nd-sf': '{{{1}}}ܲ{{{2}}}{{{3}}}ܸ{{{4}}}ܝ',
      'imp-2nd-p': '{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܘܼܢ',
      'an-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܵܢܵܐ',
      'an-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܵܢܹ̈ܐ',
      'an-pf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{4}}}ܵܢܝܵܬ݂̈ܵܐ',
      vn: '{{{1}}}ܘܼ{{{2}}}{{{3}}}ܵ{{{4}}}ܵܐ',
      'in-s': '{{{1}}}ܲ{{{2}}}{{{3}}}ܲ{{{4}}}ܬܵܐ',
      'in-p': '{{{1}}}ܲ{{{2}}}{{{3}}}ܲ{{{4}}}ܝܵܬ݂̈ܵܐ',
    },
  },
  'q-weak-4': {
    is_radical_strong: [true, true, true, false],
    parameters: {
      prp: 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܘܿ{{{ܝ}}}ܹܐ',
      'pp-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{ܝ}}}ܵܐ',
      'pp-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܲ{{{ܝ}}}ܬܵܐ',
      'pp-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{ܝ}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܝ}}}ܢ',
      'passive-past-2nd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܝ}}}ܬ',
      'passive-past-3rd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܐ}}}',
      'passive-past-1st-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܝ}}}ܚ',
      'passive-past-2nd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܝ}}}ܬܘܿܢ',
      'passive-past-3rd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܲ{{{ܝ}}}',
      'passive-past-1st-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{ܝ}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{ܝ}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}{{{ܝ}}}ܵܐ',
      'past-1st-s': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܐ}}} ܠܝܼ',
      'past-2nd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܐ}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܐ}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܐ}}} ܠܹܗ',
      'past-3rd-sf': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܐ}}} ܠܵܗ̇',
      'past-1st-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܐ}}} ܠܲܢ',
      'past-2nd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܐ}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡ{{{1}}}ܘܼ{{{2}}}{{{3}}}ܹ{{{ܐ}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܹ{{{ܝ}}}ܢ',
      'pres-1st-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{ܝ}}}ܵܢ',
      'pres-2nd-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܹ{{{ܝ}}}ܬ',
      'pres-2nd-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{ܝ}}}ܵܬܝ',
      'pres-3rd-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܹ{{{ܐ}}}',
      'pres-3rd-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{ܝ}}}ܵܐ',
      'pres-1st-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}ܹ{{{ܝ}}}ܚ',
      'pres-2nd-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{ܝ}}}ܼܬܘܿܢ',
      'pres-3rd-p': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{ܝ}}}ܼ',
      'imp-2nd-sm': '{{{1}}}ܲ{{{2}}}{{{3}}}{{{ܝ}}}ܼ',
      'imp-2nd-sf': '{{{1}}}ܲ{{{2}}}{{{3}}}ܹ{{{ܐ}}}',
      'imp-2nd-p': '{{{1}}}ܲ{{{2}}}{{{3}}}ܹ{{{ܝ}}}ܡܘܼܢ',
      'an-sm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{ܝ}}}ܵܢܵܐ',
      'an-sf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{ܝ}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{ܝ}}}ܵܢܹ̈ܐ',
      'an-pf': 'ܡ{{{1}}}ܲ{{{2}}}{{{3}}}{{{ܝ}}}ܵܢܝܵܬ݂̈ܵܐ',
      vn: '{{{1}}}ܘܼ{{{2}}}{{{3}}}ܵ{{{ܝ}}}ܵܐ',
      'in-s': '{{{1}}}ܲ{{{2}}}{{{3}}}ܲ{{{ܝ}}}ܬܵܐ',
      'in-p': '{{{1}}}ܲ{{{2}}}{{{3}}}ܲ{{{ܝ}}}ܵܬ݂̈ܵܐ',
    },
  },
  'qi-strong': {
    is_radical_strong: [true, true, true],
    parameters: {
      prp: 'ܡܸܫܬܲ{{{1}}}{{{2}}}ܘܿ{{{3}}}ܹܐ',
      'pp-sm': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}{{{3}}}ܵܐ',
      'pp-sf': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}ܲ{{{3}}}ܬܵܐ',
      'pp-p': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}{{{3}}}ܹ̈ܐ',
      'passive-past-1st-sm': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}{{{3}}}ܸܢ',
      'passive-past-2nd-sm': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}{{{3}}}ܸܬ',
      'passive-past-3rd-sm': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}ܸ{{{3}}}',
      'passive-past-1st-p': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}{{{3}}}ܸܚ',
      'passive-past-2nd-p': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}{{{3}}}ܝܼܬܘܿܢ',
      'passive-past-3rd-p': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}{{{3}}}ܝܼ',
      'passive-past-1st-sf': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}{{{3}}}ܲܢ',
      'passive-past-2nd-sf': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}{{{3}}}ܲܬܝ',
      'passive-past-3rd-sf': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}{{{3}}}ܵܐ',
      'past-1st-s': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܝܼ',
      'past-2nd-sm': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܘܼܟ݂',
      'past-2nd-sf': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܹܗ',
      'past-3rd-sf': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܵܗ̇',
      'past-1st-p': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܲܢ',
      'past-2nd-p': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܡܸܫܬܘܼ{{{1}}}{{{2}}}ܸ{{{3}}} ܠܗܘܿܢ',
      'pres-1st-sm': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܸܢ',
      'pres-1st-sf': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܲܢ',
      'pres-2nd-sm': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܸܬ',
      'pres-2nd-sf': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܲܬܝ',
      'pres-3rd-sm': 'ܡܸܫܬܲ{{{1}}}{{{2}}}ܸ{{{3}}}',
      'pres-3rd-sf': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܵܐ',
      'pres-1st-p': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܲܚ',
      'pres-2nd-p': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܝܼܬܘܿܢ',
      'pres-3rd-p': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܝܼ',
      'imp-2nd-sm': 'ܐܸܫܬܲ{{{1}}}{{{2}}}ܸ{{{3}}}',
      'imp-2nd-sf': 'ܐܸܫܬܲ{{{1}}}{{{2}}}ܸ{{{3}}}ܝ',
      'imp-2nd-p': 'ܐܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܘܼܢ',
      'an-sm': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܵܢܵܐ',
      'an-sf': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܵܢܹ̈ܐ',
      'an-pf': 'ܡܸܫܬܲ{{{1}}}{{{2}}}{{{3}}}ܵܢܝܵܬ݂̈ܵܐ',
      'in-s': 'ܡܸܫܬܲ{{{1}}}{{{2}}}ܲ{{{3}}}ܬܵܐ',
      'in-p': 'ܡܸܫܬܲ{{{1}}}{{{2}}}ܲ{{{3}}}ܝܵܬ݂̈ܵܐ',
    },
  },
  atheh: {
    parameters: {
      prp: 'ܒܹܐܬ݂ܵܝܵܐ',
      'pp-sm': 'ܐܸܬ݂ܝܵܐ',
      'pp-sf': 'ܐ݇ܬ݂ܝܼܬ݂ܵܐ',
      'pp-p': 'ܐܸܬ݂ܝܹ̈ܐ',
      'passive-past-1st-sm': 'ܐ݇ܬ݂ܹܝܢ',
      'passive-past-2nd-sm': 'ܐ݇ܬ݂ܹܝܬ',
      'passive-past-3rd-sm': 'ܐ݇ܬ݂ܹܐ',
      'passive-past-1st-p': 'ܐ݇ܬ݂ܹܝܚ',
      'passive-past-2nd-p': 'ܐ݇ܬ݂ܹܝܬܘܿܢ',
      'passive-past-3rd-p': 'ܐ݇ܬ݂ܲܝ',
      'passive-past-1st-sf': 'ܐܸܬ݂ܝܲܢ',
      'passive-past-2nd-sf': 'ܐܸܬ݂ܝܲܬܝ',
      'passive-past-3rd-sf': 'ܐܸܬ݂ܝܵܐ',
      'past-1st-s': 'ܐ݇ܬ݂ܹܐ ܠܝܼ',
      'past-2nd-sm': 'ܐ݇ܬ݂ܹܐ ܠܘܼܟ݂',
      'past-2nd-sf': 'ܐ݇ܬ݂ܹܐ ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܐ݇ܬ݂ܹܐ ܠܹܗ',
      'past-3rd-sf': 'ܐ݇ܬ݂ܹܐ ܠܵܗ̇',
      'past-1st-p': 'ܐ݇ܬ݂ܹܐ ܠܲܢ',
      'past-2nd-p': 'ܐ݇ܬ݂ܹܐ ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܐ݇ܬ݂ܹܐ ܠܗܘܿܢ',
      'pres-1st-sm': 'ܐܵܬ݂ܹܝܢ',
      'pres-1st-sf': 'ܐܵܬ݂ܝܵܢ',
      'pres-2nd-sm': 'ܐܵܬ݂ܹܝܬ',
      'pres-2nd-sf': 'ܐܵܬ݂ܝܵܬܝ',
      'pres-3rd-sm': 'ܐܵܬ݂ܹܐ',
      'pres-3rd-sf': 'ܐܵܬ݂ܝܵܐ',
      'pres-1st-p': 'ܐܵܬ݂ܲܚ',
      'pres-2nd-p': 'ܐܵܬ݂ܹܝܬܘܿܢ',
      'pres-3rd-p': 'ܐܵܬ݂ܝܼ',
      'imp-2nd-sm': 'ܬܵܐ',
      'imp-2nd-sf': 'ܬܵܐܝ',
      'imp-2nd-p': 'ܬܹܝܡܘܼܢ',
      'an-sm': 'ܐܵܬ݂ܘܿܝܵܐ',
      'an-sf': 'ܐܵܬ݂ܘܿܝܬܵܐ',
      'an-pm': 'ܐܵܬ݂ܘܿܝܹ̈ܐ',
      'an-pf': 'ܐܵܬ݂̈ܘܿܝܵܬ݂ܵܐ',
      vn: 'ܐ݇ܬ݂ܵܝܵܐ',
      'in-s': 'ܐ݇ܬ݂ܵܝܬܵܐ',
      'in-p': 'ܐ݇ܬ݂ܵܝ̈ܵܬ݂ܵܐ',
    },
  },
  azel: {
    parameters: {
      prp: 'ܒܹܐܙܵܠܵܐ',
      'pp-sm': 'ܐ݇ܙܝܼܠܵܐ',
      'pp-sf': 'ܐ݇ܙܝܼܠܬܵܐ',
      'pp-p': 'ܐ݇ܙܝܼ̈ܠܹܐ',
      'passive-past-1st-sm': 'ܐ݇ܙܝܼܠܸܢ',
      'passive-past-2nd-sm': 'ܐ݇ܙܝܼܠܸܬ',
      'passive-past-3rd-sm': 'ܐ݇ܙܝܼܠ',
      'passive-past-1st-p': 'ܐ݇ܙܝܼܠܸܚ',
      'passive-past-2nd-p': 'ܐ݇ܙܝܼܠܝܼܬܘܿܢ',
      'passive-past-3rd-p': 'ܐ݇ܙܝܼܠܝܼ',
      'passive-past-1st-sf': 'ܐ݇ܙܝܼܠܲܢ',
      'passive-past-2nd-sf': 'ܐ݇ܙܝܼܠܲܬܝ',
      'passive-past-3rd-sf': 'ܐ݇ܙܝܼܠܵܐ',
      'past-1st-s': 'ܐ݇ܙܝܼܠ ܠܝܼ',
      'past-2nd-sm': 'ܐ݇ܙܝܼܠ ܠܘܼܟ݂',
      'past-2nd-sf': 'ܐ݇ܙܝܼܠ ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܐ݇ܙܝܼܠ ܠܹܗ',
      'past-3rd-sf': 'ܐ݇ܙܝܼܠ ܠܵܗ̇',
      'past-1st-p': 'ܐ݇ܙܝܼܠ ܠܲܢ',
      'past-2nd-p': 'ܐ݇ܙܝܼܠ ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܐ݇ܙܝܼܠ ܠܗܘܿܢ',
      'pres-1st-sm': 'ܐܵܙܹܠ݇ܢ',
      'pres-1st-sf': 'ܐܵܙܵܠ݇ܢ',
      'pres-2nd-sm': 'ܐܵܙܹܠ݇ܬ',
      'pres-2nd-sf': 'ܐܵܙܵܠ݇ܬܝ',
      'pres-3rd-sm': 'ܐܵܙܹܠ',
      'pres-3rd-sf': 'ܐܵܙܵܠ݇ܐ',
      'pres-1st-p': 'ܐܵܙܲܠ݇ܚ',
      'pres-2nd-p': 'ܐܵܙܠ݇ܝܼܬܘܿܢ',
      'pres-3rd-p': 'ܐܵܙܠ݇ܝܼ',
      'imp-2nd-sm': 'ܙܹܠ݇',
      'imp-2nd-sf': 'ܙܹܠ݇ܝ',
      'imp-2nd-p': 'ܙܹܠ݇ܡܘܼܢ',
      'an-sm': 'ܐܵܙܘܿܠܵܐ',
      'an-sf': 'ܐܵܙܘܿܠܬܵܐ',
      'an-pm': 'ܐܵܙ̈ܘܿܠܹܐ',
      'an-pf': 'ܐܵܙ̈ܘܿܠܝܵܬ݂ܵܐ',
      vn: 'ܐ݇ܙܵܠܵܐ',
      'in-s': 'ܐ݇ܙܵܠܬܵܐ',
      'in-p': 'ܐ݇ܙ̈ܵܠܵܬ݂ܵܐ',
    },
  },
  yavel: {
    parameters: {
      prp: 'ܒܝܼܵܗ݇ܒ݂ܵܐ',
      'pp-sm': 'ܝܘܼܗ݇ܒ݂ܵܐ',
      'pp-sf': 'ܝܘܼܗ݇ܒ݂ܹܠܬܵܐ',
      'pp-p': 'ܝܘܼܗ݇ܒ݂ܹ̈ܐ',
      'passive-past-1st-sm': 'ܝܘܼܗ݇ܒ݂ܸܢ',
      'passive-past-2nd-sm': 'ܝܘܼܗ݇ܒ݂ܸܬ',
      'passive-past-3rd-sm': 'ܝܘܼܗ݇ܒ݂ܹܠ',
      'passive-past-1st-p': 'ܝܘܼܗ݇ܒ݂ܸܚ',
      'passive-past-2nd-p': 'ܝܘܼܗ݇ܒ݂ܝܼܬܘܿܢ',
      'passive-past-3rd-p': 'ܝܘܼܗ݇ܒ݂ܝܼ',
      'passive-past-1st-sf': 'ܝܘܼܗ݇ܒ݂ܲܢ',
      'passive-past-2nd-sf': 'ܝܘܼܗ݇ܒ݂ܲܬܝ',
      'passive-past-3rd-sf': 'ܝܘܼܗ݇ܒ݂ܵܐ',
      'past-1st-s': 'ܝܘܼܗ݇ܒ݂ܹܠ ܠܝܼ',
      'past-2nd-sm': 'ܝܘܼܗ݇ܒ݂ܹܠ ܠܘܼܟ݂',
      'past-2nd-sf': 'ܝܘܼܗ݇ܒ݂ܹܠ ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܝܘܼܗ݇ܒ݂ܹܠ ܠܹܗ',
      'past-3rd-sf': 'ܝܘܼܗ݇ܒ݂ܹܠ ܠܵܗ̇',
      'past-1st-p': 'ܝܘܼܗ݇ܒ݂ܹܠ ܠܲܢ',
      'past-2nd-p': 'ܝܘܼܗ݇ܒ݂ܹܠ ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܝܘܼܗ݇ܒ݂ܹܠ ܠܗܘܿܢ',
      'pres-1st-sm': 'ܝܵܗ݇ܒ݂ܹܢ',
      'pres-1st-sf': 'ܝܵܗ݇ܒ݂ܵܢ',
      'pres-2nd-sm': 'ܝܵܗ݇ܒ݂ܹܬ',
      'pres-2nd-sf': 'ܝܵܗ݇ܒ݂ܲܬܝ',
      'pres-3rd-sm': 'ܝܵܗ݇ܒ݂ܹܠ',
      'pres-3rd-sf': 'ܝܵܗ݇ܒ݂ܵܐ',
      'pres-1st-p': 'ܝܵܗ݇ܒ݂ܲܚ',
      'pres-2nd-p': 'ܝܵܗ݇ܒ݂ܝܼܬܘܿܢ',
      'pres-3rd-p': 'ܝܵܗ݇ܒ݂ܝܼ',
      'imp-2nd-sm': 'ܗܲܒ݂݇ܠ',
      'imp-2nd-sf': 'ܗܲܒ݂݇ܠܝ',
      'imp-2nd-p': 'ܗܲܒ݂݇ܠܘܼܢ',
      'an-sm': 'ܝܵܗ݇ܒ݂ܵܢܵܐ',
      'an-sf': 'ܝܵܗ݇ܒ݂ܵܢܝܼܬ݂ܵܐ',
      'an-pm': 'ܝܵܗ݇ܒ݂ܵܢܹ̈ܐ',
      'an-pf': 'ܝܵܗ݇ܒ݂ܵܢ̈ܝܵܬ݂ܵܐ',
      vn: 'ܝܵܗ݇ܒ݂ܵܐ',
      'in-s': 'ܝܵܗ݇ܒܵܠܬܵܐ',
      'in-p': 'ܝ̈ܵܗ݇ܒ݂ܵܠܵܬ݂ܵܐ',
    },
  },
  'aii-conj-haweh': {
    parameters: {
      prp: 'ܒܹܗ݇ܘܵܝܵܐ',
      'pp-sm': 'ܗܸܘܝܵܐ',
      'pp-sf': 'ܗܘܝܼܬ݂ܵܐ',
      'pp-p': 'ܗܸ̈ܘܝܹܐ',
      'past-1st-s': 'ܗ݇ܘܹܐ ܠܝܼ',
      'past-2nd-sm': 'ܗ݇ܘܹܐ ܠܘܼܟ݂',
      'past-2nd-sf': 'ܗ݇ܘܹܐ ܠܵܟ݂ܝ',
      'past-3rd-sm': 'ܗ݇ܘܹܐ ܠܹܗ',
      'past-3rd-sf': 'ܗ݇ܘܹܐ ܠܵܗ̇',
      'past-1st-p': 'ܗ݇ܘܹܐ ܠܲܢ',
      'past-2nd-p': 'ܗ݇ܘܹܐ ܠܵܘܟ݂ܘܿܢ',
      'past-3rd-p': 'ܗ݇ܘܹܐ ܠܗܘܿܢ',
      'pres-1st-sm': 'ܝܼܘܸܢ',
      'pres-1st-sf': 'ܝܼܘܵܢ',
      'pres-2nd-sm': 'ܝܼܘܸܬ',
      'pres-2nd-sf': 'ܝܼܘܵܬܝ',
      'pres-3rd-sm': 'ܝܼܠܹܗ',
      'pres-3rd-sf': 'ܝܼܠܵܗ̇',
      'pres-1st-p': 'ܝܼܘܲܚ',
      'pres-2nd-p': 'ܝܼܬܘܿܢ',
      'pres-3rd-p': 'ܝܼܢܵܐ',
      'cop-1st-sm': 'ܝܘܸܢ',
      'cop-1st-sf': 'ܝܘܵܢ',
      'cop-2nd-sm': 'ܝܘܸܬ',
      'cop-2nd-sf': 'ܝܘܵܬܝ',
      'cop-3rd-sm': 'ܝܠܹܗ',
      'cop-3rd-sf': 'ܝܠܵܗ̇',
      'cop-1st-p': 'ܝܘܲܚ',
      'cop-2nd-p': 'ܝܬܘܿܢ',
      'cop-3rd-p': 'ܝܢܵܐ',
      'fut-1st-sm': 'ܗܵܘܹܝܢ',
      'fut-1st-sf': 'ܗܵܘܝܵܢ',
      'fut-2nd-sm': 'ܗܵܘܹܝܬ',
      'fut-2nd-sf': 'ܗܵܘܝܵܬܝ',
      'fut-3rd-sm': 'ܗܵܘܹܐ',
      'fut-3rd-sf': 'ܗܵܘܝܵܐ',
      'fut-1st-p': 'ܗܵܘܲܚ',
      'fut-2nd-p': 'ܗܵܘܹܝܬܘܿܢ',
      'fut-3rd-p': 'ܗܵܘܝܼ',
      'imp-2nd-sm': 'ܗ݇ܘܝܼ',
      'imp-2nd-sf': 'ܗ݇ܘܹܐ',
      'imp-2nd-p': 'ܗ݇ܘܹܝܡܘܼܢ',
      'an-sm': 'ܗܵܘܘܿܝܵܐ',
      'an-sf': 'ܗܵܘܘܿܝܬܵܐ',
      'an-pm': 'ܗܵܘܘܿܝܹ̈ܐ',
      'an-pf': 'ܗܵܘ̈ܘܿܝܵܬ݂ܵܐ',
      vn: 'ܗܘܵܝܵܐ',
      'in-s': 'ܗܘܵܝܬܵܐ',
      'in-p': 'ܗ̈ܘܵܝܵܬ݂ܵܐ',
    },
  },
};

// This allows us to run code in a Node.js context and also in browser-side JavaScript
if (typeof module === 'object') {
  module.exports = {
    conjPatterns,
  };
}
