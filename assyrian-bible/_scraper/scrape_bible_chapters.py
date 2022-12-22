import re
import scrapy

#NLT edge case...
nlt_edge_cases = {
    "REV.7.NLT:5": "from Judah 12,000, from Reuben 12,000, from Gad 12,000",
    "REV.7.NLT:6": "from Asher 12,000, from Naphtali, 12,000, from Manasseh 12,000",
    "REV.7.NLT:7": "from Simeon 12,000, from Levi 12,000, from Issachar 12,000",
    "REV.7.NLT:8": "from Zebulun 12,000, from Joseph 12,000, from Benjamin 12,000"
}

class TestSpider(scrapy.Spider):
    name = "bible"

    custom_settings = {
        'HTTPCACHE_ENABLED': True,
        'HTTPCACHE_EXPIRATION_SECS': 0, # default is 0
    }

    books_chapters = [
        ('PSA', 150),
        ('MAT', 28),
        ('MRK', 16),
        ('LUK', 24),
        ('JHN', 21),
        ('ACT', 28),
        ('ROM', 16),
        ('1CO', 16),
        ('2CO', 13),
        ('GAL', 6),
        ('EPH', 6),
        ('PHP', 4),
        ('COL', 4),
        ('1TH', 5),
        ('2TH', 3),
        ('1TI', 6),
        ('2TI', 4),
        ('TIT', 3),
        ('PHM', 1),
        ('HEB', 13),
        ('JAS', 5),
        ('1PE', 5),
        ('2PE', 3),
        ('1JN', 5),
        ('2JN', 1),
        ('3JN', 1),
        ('JUD', 1),
        ('REV', 22),
    ]

    translations = {
        'AII': 1080,
        # 'NCV': 105,
        'NLT': 116,
    }

    start_urls = []
    for book_chapters in books_chapters:
        (book, chapters) = book_chapters
        for chapter in range(1, chapters+1):
            for translation, code in translations.items():
                chapter_of_translation = f"{book}.{chapter}.{translation}"
                start_url = f"https://www.bible.com/bible/{code}/{chapter_of_translation}"
                start_urls.append(start_url)

    # print(start_urls)

    # https://stackoverflow.com/a/38234394
    def parse(self, response):
        chapter = response.url.split("/")[-1] # ex. REV.22.AII
        filename = 'bible_chapters/' + chapter + '.html'
        with open(filename, 'wb') as file:
            file.write(response.body)

        verse_num = 1
        consec_header = 1
        consec_ref = 1
        chapter_name,chapter_number,translation = chapter.split('.')
        children = response.css(f'div[data-usfm="{chapter_name}.{chapter_number}"] > div')
        for child in children:
            heading = (child.css('.s1 .heading::text').get() or
                child.css('.ms .heading::text').get() or
                child.css('.qa .heading::text').get())
            reference = (child.css('.r .heading::text').get() or
                child.css('.mr .heading::text').get())
            if heading is not None and translation == 'AII':
                yield {
                    'meta': f"{chapter}:{verse_num}:header:{consec_header}",
                    'body': heading,
                }
                consec_header += 1
            if reference is not None and translation == 'AII':
                yield {
                    'meta': f"{chapter}:{verse_num}:reference:{consec_ref}",
                    'body': reference,
                }
                consec_ref += 1
            else:
                while True:
                    verse_key = f"{chapter}:{verse_num}"
                    verse = child.css(f".v{verse_num} .content::text").get()
                    next_verse = child.css(f".v{verse_num+1} .content::text").get()
                    verse_data = parse_verse(verse_key, verse_num, verse, next_verse, response)

                    if verse_data is not None:
                        yield verse_data
                        verse_num += 1
                        consec_header = 1
                        consec_ref = 1
                    else:
                        break


def parse_verse(verse_key, verse_num, verse, next_verse, response):
    if verse_key in nlt_edge_cases:
        return {
            'meta': verse_key,
            'body': nlt_edge_cases[verse_key],
        }

    if verse is not None:
        # there could be multiple elements with .v1 outside of current child so we
        # getall and then join later
        verse_fragments = response.css(f".v{verse_num} .content::text").getall()
        sentence = " ".join(verse_fragments).strip().replace('Lord ,', 'Lord,')
        sentence_single_space = re.sub(' +', ' ', sentence)

        return {
            'meta': verse_key,
            'body': sentence_single_space,
        }

    if next_verse is not None:
        return {
            'meta': verse_key,
            'body': None,
        }

    return None

if __name__ == "__main__":
    print(TestSpider.books_chapters)
