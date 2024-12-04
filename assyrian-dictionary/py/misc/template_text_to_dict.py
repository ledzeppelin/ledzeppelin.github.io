import re

# The input text
input_text = """
{{
aii-conj-haweh
|prp=ܗܘܵܝܵܐ
|pp=ܗܸܘܝܵܐ
|past-1st-s=ܗ݇ܘܹܐ ܠܝܼ
|past-2nd-sm=ܗ݇ܘܹܐ ܠܘܼܟ݂
|past-2nd-sf=ܗ݇ܘܹܐ ܠܵܟ݂ܝ
|past-3rd-sm=ܗ݇ܘܹܐ ܠܹܗ
|past-3rd-sf=ܗ݇ܘܹܐ ܠܵܗ̇
|past-1st-p=ܗ݇ܘܹܐ ܠܲܢ
|past-2nd-p=ܗ݇ܘܹܐ ܠܵܘܟ݂ܘܿܢ
|past-3rd-p=ܗ݇ܘܹܐ ܠܗܘܿܢ

|pres-1st-sm=ܝܼܘܸܢ
|pres-1st-sf=ܝܼܘܵܢ
|pres-2nd-sm=ܝܼܘܸܬ
|pres-2nd-sf=ܝܼܘܵܬܝ
|pres-3rd-sm=ܝܼܠܹܗ
|pres-3rd-sf=ܝܼܠܵܗ̇
|pres-1st-p=ܝܼܘܲܚ
|pres-2nd-p=ܝܼܬܘܿܢ
|pres-3rd-p=ܝܼܢܵܐ

|cop-1st-sm=ܝܘܸܢ
|cop-1st-sf=ܝܘܵܢ
|cop-2nd-sm=ܝܘܸܬ
|cop-2nd-sf=ܝܘܵܬܝ
|cop-3rd-sm=ܝܠܹܗ
|cop-3rd-sf=ܝܠܵܗ̇
|cop-1st-p=ܝܘܲܚ
|cop-2nd-p=ܝܬܘܿܢ
|cop-3rd-p=ܝܢܵܐ

|fut-1st-sm=ܗܵܘܹܝܢ
|fut-1st-sf=ܗܵܘܝܵܢ
|fut-2nd-sm=ܗܵܘܹܝܬ
|fut-2nd-sf=ܗܵܘܝܵܬܝ
|fut-3rd-sm=ܗܵܘܹܐ
|fut-3rd-sf=ܗܵܘܝܵܐ
|fut-1st-p=ܗܵܘܲܚ
|fut-2nd-p=ܗܵܘܹܝܬܘܿܢ
|fut-3rd-p=ܗܵܘܝܼ

|imp-2nd-sm=ܗ݇ܘܝܼ
|imp-2nd-sf=ܗ݇ܘܹܐ
|imp-2nd-p=ܗ݇ܘܹܝܡܘܼܢ
}}
"""

# Extract the key-value pairs
matches = re.findall(r'\|([\w\-]+)=(.+)', input_text)

# Filter out "which_template"
result_dict = {key: value.strip() for key, value in matches if key != "which_template"}

# Format and print the dictionary
formatted_output = "{\n"
for key, value in result_dict.items():
    formatted_output += f"    '{key}': '{value}',\n"
formatted_output += "}"

print(formatted_output)
