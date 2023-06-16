test cases
- 2 Corinthians 3  // no header, check book name is properly separated from first verse
- Psalms 1 // header, ref
- Psalms 42 // header, ref, header
- Matthew 2  // space between last header and last verses of prev section should have visual separation
- Matthew 17  // header spacing
- Matthew 17:21 // missing verse NLT
- Acts // long aii title


check 200f rlm removal
grep -R $'\u200f' js/bible.min.js



set query string parameters for book and chapter so when background tab containing bible is removed, upon a reload, the state of book/chapter is maintained
https://apple.stackexchange.com/a/363363

https://www.chromium.org/chromium-os/chromiumos-design-docs/tab-discarding-and-reloading/
