### test cases

whole
ful
ܩܲܕ݇ܡܘܼܟ݂.
ܩܕܡܘܟ.

### todo
test og:url, if not applicable, remove it

### wont do
- scroll event can't find when there's not enough content - safeguard against widescreen monitors w/ vertial orientation by having a while loop to continue to load more until backofflimit is reached https://stackoverflow.com/a/11779989

- on m1 safari if you type 1 letter like "p", then delete, then type again "p" the scroll becomes stiff and doesn't scroll through. this can be mitigated by setting ::-webkit-scrollbar to display: none or we using async call with 0 to delay to wait for call stack to finish before updating UI (need to confirm this against m2/m3).  issue seems to be w/ "input" event as this doesn't happen w/ keydown.  discussion regarding choppy scrolling https://discussions.apple.com/thread/255161881?answerId=259723996022&sortBy=best#259723996022


style EXACT match highlight differently than partial match, here's a good example: ܟܐ


### notes
we cant do highlighting for aii due to ligatures breaking, adding a zero width joiner (per https://stackoverflow.com/a/11156606) creates a different set of problems.  try 'ܚܲܡ ' (notice space at end)
