
# TODO
- consec atwateh in root should be same color (ex. for G-2i pattern where 2nd and 3rd are same char implies 3rd is dropped)
- sort numeral search
- create number table
- personal pronoun table
- ܚܵܬܹܐ ligatured taw is not showing in root boxes, also taw is is not ligatured ever in safari on macbook

# after uptaking dictionary
   * check if DEFAULT_VAL has been replaced
   * once a year check the following for updates
      * aii-number-list.lua
      * aii-numeral.lua
      * common-words.lua

# test cases
   * haweh (many examples)
   * america (row wrapping)
   * akhel, machikh
   * peach (infl table)
   * khayutha (unc infl table)
   * pos:preposition (infl table w/ obj pronouns)
   * azel (talqana touching header's border)
   * pos:root (derived terms tables)
   * pos:phrase (long sentences when toggled/expanded)
   * 'khda' (to ensure ipa and and etymologies are collated correctly)

# won't do
- on mobile iOS Chrome, search something then tap any link.  if you scroll then tap any button or link - you need to tap twice since the first one doesn't register.  seems like this is a known issue per https://generatepress.com/forums/topic/chrome-ios-double-tap-issue-despite-removed-back-to-top-button/
- on mobile safari, infinite scroll is choppy if the velocity at the point of triggering the load is too fast (independent of whether last, 2nd to last, 10th to last, etc... being in viewport causes loadResults to be triggered) - doesn't seem like it can be fixed
- omit from 'other_forms' when there's a long list of things like all the colors provided by "related terms" for a gloss like 'yellowish' or personal pronouns for things like "-ee"
- cursor for .exact-search-match is pointer (can't fix bc of anchor)
- for conjugation tables, the atwateh boxes - on safari desktop the ligatures are always broken but they work in chrome, not possible to fix

