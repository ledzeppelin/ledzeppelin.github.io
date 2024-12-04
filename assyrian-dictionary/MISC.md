# after uptaking dictionary
   * run `make datadump-diff`
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
   * gloss for "ace" has tag “card games” tagged twice

# todos
- uncomment #canonical-link for tag search
- canonical for typing in the search box?
- br for t3 categories
- tr search should show all glosses
- aii search
- tag search UI
- see if it looks better to lowercase all clickable links
- check hide/show on numbers table and spacing between elements
- try line-height of > 1.4 (1.6?) for android accessibility

- check if new bible template is working as expected https://en.wiktionary.org/w/index.php?title=%DC%9A%DC%9D%DC%98%DC%AC%DC%90&diff=prev&oldid=82399768
- remove old validators which no longer work or are no longer used
- validate G-weak-1i, G-weak-2i, G-weak-3i

- dynamic conjugations
- dynamic inflections
- dynamic sentence generation
- radical visualization
   ܡܲܚܬܹܐ is a good example for why this is a needed feature... it will communicate roots aren't a concrete thing and instead a concept to better group together words
   right now the UI confusingly suggests that weak-3i means the 3rd letter of the root is weak, when instead it's the 3rd radical of the verb


# nice to haves
- consec atwateh in root should be same color (ex. for G-2i  where 2nd and 3rd are same char implies 3rd is dropped), not really possible since G-weak-3i and G-weak-2i have geminates, ex ܥܵܐܹܠ and ܪܵܒ݂ܹܐ 
- personal pronoun table

# won't do
- on mobile safari, infinite scroll is choppy if the velocity at the point of triggering the load is too fast (independent of whether last, 2nd to last, 10th to last, etc... being in viewport causes loadResults to be triggered) - doesn't seem like it can be fixed
- omit from 'other_forms' when there's a long list of things like all the colors provided by "related terms" for a gloss like 'yellowish' or personal pronouns for things like "-ee"
- cursor for .exact-search-match is pointer (can't fix bc of anchor)
- for conjugation tables, the atwateh boxes - on safari desktop the ligatures are always broken but they work in chrome, not possible to fix
- When phone is idle and you come back to it, howl onplay event doesn't seem to fire https://github.com/goldfire/howler.js/issues/371 . less likely - this could be because the file is not able to be fetched.  Hard to reproduce since being idle for a while causes refresh.  Also can be tested by playing a sound in another tab like define:cat.  For this reason we use HTML5 Audio instead of Web Audio API
