valid_stems = ('C', 'D', 'G', 'Q', 'S', 'Sh')

valid_stems = tuple(sorted(valid_stems, key=len, reverse=True))

print(valid_stems)


foo = 'Good'
print(foo[:2])