# after uptaking dictionary
* run `make datadump-diff`
* confirm `LOCAL_DEVELOPMENT` flag is set prior to deploying

* once a year check the following for updates
   * aii-number-list.lua
   * aii-numeral.lua
   * common-words.lua
   * check consts.personal_pronouns for updates

# sanity check
* visual verb conjugation, preposition inflection and noun inflections

# test cases
* haweh (many examples)
* america (row wrapping)
* akhel, machikh
* peach (infl table)
* khayutha (unc infl table)
* pos:preposition (infl table w/ obj pronouns)
* azel (talqana touching header's border)
* pos:3-letter+root
* pattern:q-weak-4
* pos:phrase (long sentences when toggled/expanded)
* 'khda' (to ensure ipa and and etymologies are collated correctly)
* z'or vs z'ora - rootbox position in article affects availability of root z-'-r
* gloss for "ace" has tag “card games” tagged twice
* "Classical Syriac" for tier 1 vs tier 2 tags, and "Nationalities" for a lot of tier 3 tags
* pattern:d-strong for multiple tier2 tag for same vocalized word

# todos

# won't do
- on mobile safari, infinite scroll is choppy if the velocity at the point of triggering the load is too fast (independent of whether last, 2nd to last, 10th to last, etc... being in viewport causes loadResults to be triggered) - doesn't seem like it can be fixed
   - reproduce by closing all safari tabs and going to home page, then clicking on link to dictionary, type "i", then try to scroll down fast (more pronounced if you tap "Done" beforehand)
- omit from 'other_forms' when there's a long list of things like all the colors provided by "related terms" for a gloss like 'yellowish' or personal pronouns for things like "-ee"
- cursor for .exact-search-match is pointer (can't fix bc of anchor)
- for conjugation tables, the atwateh boxes - on safari desktop the ligatures are always broken but they work in chrome, not possible to fix
