class AiiConjugation:
    # pylint: disable=too-many-instance-attributes
    def __init__(self):
        # pylint: disable=invalid-name

        # Vowel Diacritics
        self.KHWASA_RWASA = '\u073C'
        self.KHWASA_RWAKHA = '\u073F'
        self.PTAKHA = '\u0732'
        self.ZQAPA = '\u0735'
        self.ZLAMA_KIRYA = '\u0738'
        self.ZLAMA_YAREEKHA = '\u0739'
        self.VOWEL_DIACRITICS = f'{self.KHWASA_RWASA}{self.KHWASA_RWAKHA}{self.PTAKHA}{self.ZQAPA}{self.ZLAMA_KIRYA}{self.ZLAMA_YAREEKHA}'

        # Non-vowel Diacritics
        self.COMBINING_TILDE_BELOW = '\u0330'
        self.COMBINING_TILDE_ABOVE = '\u0303'
        self.QUSHSHAYA = '\u0741'
        self.RUKKAKHA = '\u0742'
        self.COMBINING_BREVE_BELOW = '\u032E'
        self.TALQANA_ABOVE = '\u0747'
        self.NON_VOWEL_DIACRITICS = f'{self.COMBINING_TILDE_BELOW}{self.COMBINING_TILDE_ABOVE}{self.QUSHSHAYA}{self.RUKKAKHA}{self.COMBINING_BREVE_BELOW}{self.TALQANA_ABOVE}'

        # Consonants and Vowel Helpers
        self.CONSONANTS = 'ܦܒܬܛܕܟܓܩܣܨܙܫܚܥܗܡܢܪܠ'
        self.ALAP = 'ܐ'
        self.WAW = 'ܘ'
        self.YUDH = 'ܝ'
        self.VOWEL_HELPERS = f'{self.ALAP}{self.WAW}{self.YUDH}'
        self.LETTERS = f'{self.CONSONANTS}{self.VOWEL_HELPERS}'

        # Capture Groups - finds the atwateh in a verb to pass as arguments to the conj template
        self.CONSONANTS_CG = self.create_cg(self.CONSONANTS)
        self.CONSONANTS_A_CG = self.create_cg(f"{self.CONSONANTS}{self.ALAP}")
        self.CONSONANTS_Y_CG = self.create_cg(f"{self.CONSONANTS}{self.YUDH}")
        self.CONSONANTS_A_Y_CG = self.create_cg(f"{self.CONSONANTS}{self.ALAP}{self.YUDH}")
        self.CONSONANTS_A_W_CG = self.create_cg(f"{self.CONSONANTS}{self.ALAP}{self.WAW}")
        self.CONSONANTS_W_Y_CG = self.create_cg(f"{self.CONSONANTS}{self.WAW}{self.YUDH}")
        self.CONSONANTS_W_CG = self.create_cg(f"{self.CONSONANTS}{self.WAW}")

        self.W_Y_CG = f"([{self.WAW}{self.YUDH}])"
        self.A_Y_CG = f"([{self.ALAP}{self.YUDH}])"
        self.A_Y_CHAR_CLASS = f"[{self.ALAP}{self.YUDH}]"


        self.LETTERS_CG = self.create_cg(self.LETTERS)

        # Special Cases
        self.special_cases = {
            # These are cases where the non-past, 3rd person, singular, male form of the verb cannot
            # be used to reliably infer the other forms
            # Though the the continuous form is always reliable, the verbs on wiktionary have been
            # normalized to the former
            #
            # override matching Template:aii-conj-verb/G-2i since medial alap is strong
            'ܟܵܐܹܒ': ['aii-conj-verb/G-strong', 'ܟ', 'ܐ', 'ܒ'],
            'ܛܵܐܹܒ݂': ['aii-conj-verb/G-strong', 'ܛ', 'ܐ', 'ܒ݂'],
            'ܫܵܐܹܠ': ['aii-conj-verb/G-strong', 'ܫ', 'ܐ', 'ܠ'],
            'ܣܵܐܹܢ': ['aii-conj-verb/G-strong', 'ܣ', 'ܐ', 'ܢ'],
            # no matches since medial alap is strong and first radical is yudh
            'ܝܵܐܹܒ݂': ['aii-conj-verb/G-strong', 'ܝ', 'ܐ', 'ܒ݂'],

            # Irregular Conjugations
            'ܗܵܘܹܐ': ['aii-conj-haweh'],
            'ܐܵܬ݂ܹܐ': ['aii-conj-verb/atheh'],
            'ܐܵܙܹܠ': ['aii-conj-verb/azel'],
            'ܝܵܗ݇ܒ݂ܹܠ': ['aii-conj-verb/yavel'],
        }

    def create_cg(self, characters):
        return f"([{characters}][{self.NON_VOWEL_DIACRITICS}]?)"


    def get_patterns(self):
        # pylint: disable=line-too-long
        return [
            ('C-strong', 4, rf"^ܡ{self.PTAKHA}{self.LETTERS_CG}{self.CONSONANTS_A_W_CG}{self.ZLAMA_KIRYA}{self.CONSONANTS_CG}$"),
            ('C-weak-2d-3i', 3, rf"^ܡ{self.PTAKHA}{self.LETTERS_CG}{self.ZLAMA_YAREEKHA}{self.ALAP}$"),
            ('C-weak-3i', 4, rf"^ܡ{self.PTAKHA}{self.LETTERS_CG}{self.LETTERS_CG}{self.ZLAMA_YAREEKHA}{self.ALAP}$"),
            # geminates only occur in c-drop
            ('C-weak-d', 3, rf"^ܡ{self.PTAKHA}{self.CONSONANTS_CG}{self.ZLAMA_KIRYA}{self.CONSONANTS_CG}$"),
            ('C-weak-m', 4, rf"^ܡ{self.PTAKHA}{self.LETTERS_CG}{self.YUDH}{self.ZLAMA_KIRYA}{self.CONSONANTS_CG}$"),

            ('D-strong', 4, rf"^ܡ{self.LETTERS_CG}{self.PTAKHA}{self.LETTERS_CG}{self.ZLAMA_KIRYA}{self.LETTERS_CG}$"),
            ('D-weak-3i', 4, rf"^ܡ{self.LETTERS_CG}{self.PTAKHA}{self.CONSONANTS_W_CG}{self.ZLAMA_YAREEKHA}{self.ALAP}$"),

            ('G-strong', 3, rf"^{self.CONSONANTS_Y_CG}{self.ZQAPA}{self.CONSONANTS_W_CG}{self.ZLAMA_YAREEKHA}{self.CONSONANTS_CG}$"),
            ('G-weak-1i', 3, rf"^{self.ALAP}{self.ZQAPA}{self.CONSONANTS_A_CG}{self.ZLAMA_YAREEKHA}{self.CONSONANTS_CG}$"),
            ('G-weak-2i', 3, rf"^{self.CONSONANTS_CG}{self.ZQAPA}{self.A_Y_CHAR_CLASS}{self.ZLAMA_YAREEKHA}{self.CONSONANTS_CG}$"),
            ('G-weak-3i', 3, rf"^{self.CONSONANTS_A_Y_CG}{self.ZQAPA}{self.LETTERS_CG}{self.ZLAMA_YAREEKHA}{self.ALAP}$"),
            ('Gt-strong', 5, rf"^ܡ{self.ZLAMA_KIRYA}ܬ{self.RUKKAKHA}{self.CONSONANTS_CG}{self.CONSONANTS_CG}{self.ZLAMA_YAREEKHA}{self.CONSONANTS_A_CG}$"),

            ('Penta-strong', 6, rf"^ܡ{self.LETTERS_CG}{self.PTAKHA}{self.CONSONANTS_CG}{self.CONSONANTS_CG}{self.LETTERS_CG}{self.ZLAMA_KIRYA}{self.CONSONANTS_CG}$"),

            ('Q-strong', 5, rf"^ܡ{self.LETTERS_CG}{self.PTAKHA}{self.CONSONANTS_W_Y_CG}{self.CONSONANTS_A_W_CG}{self.ZLAMA_KIRYA}{self.CONSONANTS_CG}$"),
            ('Q-weak', 5, rf"^ܡ{self.LETTERS_CG}{self.PTAKHA}{self.CONSONANTS_W_CG}{self.CONSONANTS_CG}{self.ZLAMA_YAREEKHA}{self.ALAP}$"),
            ('Qi-strong', 6, rf"^ܡܸܫܬܲ{self.CONSONANTS_CG}{self.CONSONANTS_CG}{self.ZLAMA_KIRYA}{self.CONSONANTS_CG}$"),
        ]
