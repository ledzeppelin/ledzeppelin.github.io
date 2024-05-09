
def num_isolates():
    file_path = 'js/consts/aii-dict.min.js'

    with open(file_path, 'r') as file:
        # Read the content of the file
        content = file.read()

        RTL_ISOLATE = '⁧'
        POP_DIR_ISOLATE = '⁩'

        occurrences = [content.count(isolate) for isolate in [RTL_ISOLATE, POP_DIR_ISOLATE]]

    if sum(occurrences):
        print(f'there are {occurrences} isolate characters in {file_path}')

num_isolates()
