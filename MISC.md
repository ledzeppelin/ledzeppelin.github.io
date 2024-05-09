### checking line-height

we need to safeguard against overlapping with next line and getting cut off text in <input> for both vocalized and unvocalized spellings - use these strings to test
ܨܲܚܨܹܐ
ܨܲܦܪܵܐ
ܨܦܪܐ
ܡܵܨܹܐ
ܕܝܘܚܢܢ

### always ensure trailing slash for backlinks

If webapp links don't contain a trailing slash, then query string parameters are not updated in the following scenarios

* https://ledzeppelin.github.io/assyrian-transliterator
	* chrome on ios (tabs and incognito tabs)

* http://localhost:8000/assyrian-transliterator
	* chrome on ios (incognito tabs only)


### set lang to "syr"

if we set <html lang="en"> chrome on iPhone suggests translating to diff lang for searchable assyrian bible

per https://syriaca.org/documentation/isostandards.html, "syr" is for a macrolanguage syriac (presumably includes aii, tru and syc) and "syc" is for microlanguage (classical syriac)

### create new proj

`npm init` then `npm init @eslint/config`