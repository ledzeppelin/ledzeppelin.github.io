import unittest

from aii_conj import aii_conj

class TestExample(unittest.TestCase):
    def test_array_comparison(self):
        tests = [
            ('ܡܲܥܒܸܕ݂', '{{c-strong|ܥ|ܒ|ܕ݂}}'),
            ('ܡܲܚܹܐ', '{{c-weak-2-drop|ܚ}}'),
            ('ܡܲܥܠܹܐ', '{{c-weak-3|ܥ|ܠ}}'),
            ('ܡܲܠܸܦ', '{{c-weak-drop|ܠ|ܦ}}'),
            ('ܡܲܥܝܸܕ݂', '{{c-weak-2|ܥ|ܕ݂}}'),
            ('ܡܥܲܕܸܢ', '{{d-strong|ܥ|ܕ|ܢ}}'),
            ('ܡܐܲܣܹܐ', '{{d-weak-3|ܐ|ܣ}}'),
            ('ܥܵܕ݂ܹܪ', '{{g-strong|ܥ|ܕ݂|ܪ}}'),
            ('ܐܵܟ̰ܹܡ', '{{g-weak-1|ܟ̰|ܡ}}'),
            ('ܥܵܐܹܠ', '{{g-weak-2|ܥ|ܠ}}'),
            ('ܥܵܢܹܐ', '{{g-weak-3|ܥ|ܢ}}'),
            ('ܡܸܬ݂ܟܬ݂ܹܒ݂', '{{gt-strong|ܟ|ܬ݂|ܒ݂}}'),
            ('ܡܐܲܪܓܘܸܢ', '{{penta-strong|ܐ|ܪ|ܓ|ܘ|ܢ}}'),
            ('ܡܥܲܠܬܸܢ', '{{q-strong|ܥ|ܠ|ܬ|ܢ}}'),
            ('ܡܦܲܪܓܹܐ', '{{q-weak-4|ܦ|ܪ|ܓ}}'),
            ('ܡܸܫܬܲܒ݂ܗܸܪ', '{{qi-strong|ܒ݂|ܗ|ܪ}}'),
            # Special cases
            ('ܛܵܐܹܒ݂', '{{g-strong|ܛ|ܐ|ܒ݂}}'),
            ('ܝܵܐܹܒ݂', '{{g-strong|ܝ|ܐ|ܒ݂}}'),
            # Irregular conjugations
            ('ܗܵܘܹܐ', '{{aii-conj-haweh}}'),
            ('ܐܵܬ݂ܹܐ', '{{atheh}}'),
            ('ܐܵܙܹܠ', '{{azel}}'),
            ('ܝܵܗ݇ܒ݂ܹܠ', '{{yavel}}'),
        ]

        for aii_v, expected in tests:
            result = aii_conj(aii_v)
            str_args = f"|{'|'.join(result['args'])}" if result['args'] else ''
            str_result = f"{{{{{result['title']}{str_args}}}}}"
            self.assertEqual(str_result, expected, f"{aii_v} should be {expected} not {str_result}")

if __name__ == '__main__':
    unittest.main()
