# after uptaking dictionary
   * run `make datadump-diff`
   * update assyrian word count in index.html via `raise Exception(len(vocalized_cache))` and date (ex. January 1st) in index.html
   * regenerate new audio
   * export pdf and add number of people using sharrukin.io to graph

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
   * z'or vs z'ora - etymology position in article affects availability of root z-'-r


# todos

- set canonical urls for dictionary
- support lit ety

- update translit for edgiest of edge cases
- tr, html entities for newline

- set bible a hrefs
- set canonical for bible

- dynamic conjugations
- dynamic inflections






# nice to haves
- consec atwateh in root should be same color (ex. for G-2i  where 2nd and 3rd are same char implies 3rd is dropped)
- personal pronoun table


# won't do
- on mobile safari, infinite scroll is choppy if the velocity at the point of triggering the load is too fast (independent of whether last, 2nd to last, 10th to last, etc... being in viewport causes loadResults to be triggered) - doesn't seem like it can be fixed
- omit from 'other_forms' when there's a long list of things like all the colors provided by "related terms" for a gloss like 'yellowish' or personal pronouns for things like "-ee"
- cursor for .exact-search-match is pointer (can't fix bc of anchor)
- for conjugation tables, the atwateh boxes - on safari desktop the ligatures are always broken but they work in chrome, not possible to fix
- When phone is idle and you come back to it, howl onplay event doesn't seem to fire https://github.com/goldfire/howler.js/issues/371 . less likely - this could be because the file is not able to be fetched.  Hard to reproduce since being idle for a while causes refresh.  Also can be tested by playing a sound in another tab like define:cat.  For this reason we use HTML5 Audio instead of Web Audio API

