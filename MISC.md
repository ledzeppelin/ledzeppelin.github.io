### checking line-height

we need to safeguard against overlapping with next line and getting cut off text in <input> for both vocalized and unvocalized spellings - use these strings to test
ܨܲܦܪܵܐ
ܨܦܪܐ
ܡܵܨܹܐ
ܕܝܘܚܢܢ

### always ensure trailing slash for backlinks

If webapp links don't contain a trailing slash, then query string parameters are not updated in the following scenarios

* https://ledzeppelin.github.io/assyrian-transliterator
	* chrome on ios (tabs and incognito tabs)

* http://192.168.1.5:8000/assyrian-transliterator
	* chrome on ios (incognito tabs only)
