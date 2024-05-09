

# // 0:   2
# // 4:   4
# // 8:   6
# // 12:  8
# // 16:  10
# // 20:  12
# // 24:  12
# // 28:  12
# // 32:  10
# // 36:  8
# // 40:  6
# // 44:  4
# // 48:  2

# // 52:  2
# // 56:  4
# // 60:  6
# // 64:  8
# // 68:  10
# // 72:  12
# // 76:  12
# // 80:  12
# // 84:  10
# // 88:  8
# // 92:  6
# // 96:  4
# // 100: 2

# atwateh = ['a', 'b', 'c']
atwateh = ['b', 'b', 'b']
res = []
for i, char in enumerate(atwateh):
    if i > 0:
        prev_idx, prev_char = res[-1]
        if char == prev_char:
            res.append([prev_idx, char])
            continue
    res.append([i, char])

print(res)
