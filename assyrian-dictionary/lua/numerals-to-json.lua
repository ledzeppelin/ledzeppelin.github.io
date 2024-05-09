local numbers = require "wiktionary/aii-number-list"

for i, number in ipairs(numbers) do
	print("Number " .. i .. ":")
	print("\tNumeral: " .. number.numeral)
	print("\tCardinal: " .. number.cardinal)
end

