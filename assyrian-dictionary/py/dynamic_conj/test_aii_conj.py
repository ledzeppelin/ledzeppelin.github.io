import unittest

from aii_conj import aii_conj

class TestExample(unittest.TestCase):
    def test_array_comparison(self):
        tests = [
            ('ܡܲܥܒܸܕ݂', '{{aii-conj-verb/C-strong|ܥ|ܒ|ܕ݂}}'),
            ('ܡܲܚܹܐ', '{{aii-conj-verb/C-weak-2d-3i|ܚ}}'),
            ('ܡܲܥܠܹܐ', '{{aii-conj-verb/C-weak-3i|ܥ|ܠ}}'),
            ('ܡܲܠܸܦ', '{{aii-conj-verb/C-weak-d|ܠ|ܦ}}'),
            ('ܡܲܥܝܸܕ݂', '{{aii-conj-verb/C-weak-m|ܥ|ܕ݂}}'),
            ('ܡܥܲܕܸܢ', '{{aii-conj-verb/D-strong|ܥ|ܕ|ܢ}}'),
            ('ܡܐܲܣܹܐ', '{{aii-conj-verb/D-weak-3i|ܐ|ܣ}}'),
            ('ܥܵܕ݂ܹܪ', '{{aii-conj-verb/G-strong|ܥ|ܕ݂|ܪ}}'),
            ('ܐܵܟ̰ܹܡ', '{{aii-conj-verb/G-weak-1i|ܟ̰|ܡ}}'),
            ('ܥܵܐܹܠ', '{{aii-conj-verb/G-weak-2i|ܥ|ܠ}}'),
            ('ܥܵܢܹܐ', '{{aii-conj-verb/G-weak-3i|ܥ|ܢ}}'),
            ('ܡܸܬ݂ܟܬ݂ܹܒ݂', '{{aii-conj-verb/Gt-strong|ܟ|ܬ݂|ܒ݂}}'),
            ('ܡܐܲܪܓܘܸܢ', '{{aii-conj-verb/Penta-strong|ܐ|ܪ|ܓ|ܘ|ܢ}}'),
            ('ܡܥܲܠܬܸܢ', '{{aii-conj-verb/Q-strong|ܥ|ܠ|ܬ|ܢ}}'),
            ('ܡܦܲܪܓܹܐ', '{{aii-conj-verb/Q-weak|ܦ|ܪ|ܓ}}'),
            ('ܡܸܫܬܲܒ݂ܗܸܪ', '{{aii-conj-verb/Qi-strong|ܒ݂|ܗ|ܪ}}'),
            # Special cases
            ('ܛܵܐܹܒ݂', '{{aii-conj-verb/G-strong|ܛ|ܐ|ܒ݂}}'),
            ('ܝܵܐܹܒ݂', '{{aii-conj-verb/G-strong|ܝ|ܐ|ܒ݂}}'),
            # Irregular conjugations
            ('ܗܵܘܹܐ', '{{aii-conj-haweh}}'),
            ('ܐܵܬ݂ܹܐ', '{{aii-conj-verb/atheh}}'),
            ('ܐܵܙܹܠ', '{{aii-conj-verb/azel}}'),
            ('ܝܵܗ݇ܒ݂ܹܠ', '{{aii-conj-verb/yavel}}'),
        ]

        for aii_v, expected in tests:
            result = aii_conj(aii_v)
            str_args = f"|{'|'.join(result['args'])}" if result['args'] else ''
            str_result = f"{{{{{result['title']}{str_args}}}}}"
            self.assertEqual(str_result, expected, f"{aii_v} should be {expected} not {str_result}")

if __name__ == '__main__':
    unittest.main()
