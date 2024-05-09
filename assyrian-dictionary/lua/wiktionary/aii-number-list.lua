-- From Dec 11th, 2023
-- https://en.wiktionary.org/w/index.php?title=Module:number_list/data/aii&oldid=77194575
-- 
-- in Lua 5.2, unpack was moved to table.unpack
local unpack = table.unpack
local m = require("wiktionary/aii-numeral")
local numbers = {}

numbers[0] = {
	numeral = ".",
	cardinal = "ܨܝܼܦܵܪ",
	ordinal = "ܨܝܼܦܪܵܝܵܐ",
}

numbers[1] = {
	numeral = "ܐ.",
	cardinal = "ܚܲܕ݇",
	ordinal = {"ܩܲܕ݇ܡܵܝܵܐ"},
	fractional = {"ܫܲܠܡܵܐ"},
	multiplier = {"ܚܕܵܢܵܝܵܐ"}
}

numbers[2] = {
	numeral = "ܒ.",
	cardinal = "ܬܪܹܝܢ",
	ordinal = {"ܬܪܲܝܵܢܵܐ"},
	fractional = {"ܦܲܠܓܵܐ"},
	multiplier = {"ܬܪܲܝܵܢܵܝܵܐ"}
}

numbers[3] = {
	numeral = "ܓ.",
	cardinal = "ܬܠܵܬ݂ܵܐ",
	ordinal = {"ܬܠܝܼܬ݂ܵܝܵܐ"},
	fractional = {"ܬܘܼܠܬ݂ܵܐ"},
	multiplier = {"ܡܬܲܠܬ݂ܵܐ"}
}

numbers[4] = {
	numeral = "ܕ.",
	cardinal = "ܐܲܪܒܥܵܐ",
	ordinal = {"ܪܒ݂ܝܼܥܵܝܵܐ"},
	fractional = {"ܪܘܼܒ݂ܥܵܐ"},
	multiplier = {"ܡܪܲܒܥܵܐ"}
}

numbers[5] = {
	numeral = "ܗ.",
	cardinal = "ܚܲܡܫܵܐ",
	ordinal = {"ܚܡܝܼܫܵܝܵܐ"},
	fractional = {"ܚܘܼܡܫܵܐ"},
	multiplier = {"ܡܚܲܡܫܵܐ"}
}

numbers[6] = {
	numeral = "ܘ.",
	cardinal = "ܐܸܫܬܵܐ",
	ordinal = {"ܫܬܝܼܬ݂ܵܝܵܐ"},
	fractional = {"ܫܘܼܬܬ݂ܵܐ"},
	multiplier = {"ܡܫܲܬܬ݂ܵܐ"}
}

numbers[7] = {
	numeral = "ܙ.",
	cardinal = "ܫܲܒ݂ܥܵܐ",
	ordinal = {"ܫܒ݂ܝܼܥܵܝܵܐ"},
	fractional = {"ܫܘܼܒ݂ܥܵܐ"},
	multiplier = {"ܡܫܲܒ݂ܥܵܐ"}
}

numbers[8] = {
	numeral = "ܚ.",
	cardinal = "ܬܡܵܢܝܵܐ",
	ordinal = {"ܬܡܝܼܢܵܝܵܐ"},
	fractional = {"ܬܘܼܡܢܵܐ"},
	multiplier = {"ܡܬܲܡܢܵܐ"}
}

numbers[9] = {
	numeral = "ܛ.",
	cardinal = "ܬܸܫܥܵܐ",
	ordinal = {"ܬܫܝܼܥܵܝܵܐ"},
	fractional = {"ܬܘܼܫܥܵܐ"},
	multiplier = {"ܡܬܲܫܥܵܐ"}
}

numbers[10] = {
	numeral = "ܝ.",
	cardinal = "ܥܸܣܪܵܐ",
	ordinal = {"ܥܣܝܼܪܵܝܵܐ"},
	fractional = {"ܥܘܼܣܪܵܐ"},
	multiplier = {"ܡܥܲܣܪܵܐ"}
}

numbers[11] = {
	numeral = "ܝܐ.",
	cardinal = "ܚܕ݂ܲܥܣܲܪ",
	ordinal = {"ܚܕ݂ܲܥܣܝܼܪܵܝܵܐ"}
}

numbers[12] = {
	numeral = "ܝܒ.",
	cardinal = "ܬܪܸܥܣܲܪ",
	ordinal = {"ܬܪܸܥܣܝܼܪܵܝܵܐ"}
}

numbers[13] = {
	numeral = "ܝܓ.",
	cardinal = "ܬܸܠܬܲܥܣܲܪ",
	ordinal = {"ܬܸܠܬܲܥܣܝܼܪܵܝܵܐ"}
}

numbers[14] = {
	numeral = "ܝܕ.",
	cardinal = "ܐܲܪܒܲܥܣܲܪ",
	ordinal = {"ܐܲܪܒܲܥܣܝܼܪܵܝܵܐ"}
}

numbers[15] = {
	numeral = "ܝܗ.",
	cardinal = "ܚܲܡܫܲܥܣܲܪ",
	ordinal = {"ܚܲܡܫܲܥܣܝܼܪܵܝܵܐ"}
}

numbers[16] = {
	numeral = "ܝܘ.",
	cardinal = "ܐܸܫܬܲܥܣܲܪ",
	ordinal = {"ܐܸܫܬܲܥܣܝܼܪܵܝܵܐ"}
}

numbers[17] = {
	numeral = "ܝܙ.",
	cardinal = "ܫܒ݂ܲܥܣܲܪ",
	ordinal = {"ܫܒ݂ܲܥܣܝܼܪܵܝܵܐ"}
}

numbers[18] = {
	numeral = "ܝܚ.",
	cardinal = "ܬܡܵܢܸܥܣܲܪ",
	ordinal = {"ܬܡܵܢܸܥܣܝܼܪܵܝܵܐ"}
}

numbers[19] = {
	numeral = "ܝܛ.",
	cardinal = "ܬܫܲܥܣܲܪ",
	ordinal = {"ܬܫܲܥܣܝܼܪܵܝܵܐ"}
}

local function unpack_ipairs(t)
	local i = 0
	return function()
		i = i + 1
		if t[i] then
			-- print(i, table.unpack(t[i]))
			return i, unpack(t[i])
		end
	end
end

for i, tens_cardinal in unpack_ipairs {
	{ "ܥܸܣܪܝܼܢ"}, -- 20
	{ "ܬܠܵܬ݂ܝܼܢ" }, -- 30
	{ "ܐܲܪܒܥܝܼܢ" }, -- 40
	{ "ܚܲܡܫܝܼܢ" }, -- 50
	{ "ܐܸܫܬܝܼܢ" }, -- 60
	{ "ܫܲܒ݂ܥܝܼܢ" }, -- 70
	{ "ܬܵܡܢܝܼܢ" }, -- 80
	{ "ܬܸܫܥܝܼܢ" }, -- 90
} do
	local tens = (i + 1) * 10
	-- iterate over the range 20-99
	-- outer loop iterates over all tens 20, 30, ... 90
	-- inner loop  iterates over all ones 0, 1, ... 9

	numbers[tens] = {}
	numbers[tens].numeral = m.aii_numeral(tens)
	numbers[tens].cardinal = tens_cardinal
	numbers[tens].ordinal = tens_cardinal .. 'ܵܝܵܐ'

	for ones = 1, 9 do
		numbers[tens + ones] = {}
		numbers[tens + ones].numeral = m.aii_numeral(tens + ones)
		numbers[tens + ones].cardinal = numbers[tens].cardinal .. ' ܘ' .. numbers[ones].cardinal
		numbers[tens + ones].ordinal = numbers[tens].cardinal .. ' ܘ' .. unpack(numbers[ones].ordinal)
	end

end

numbers[100] = {
	numeral = "ܩ.",
	cardinal = "ܡܐܵܐ",
	ordinal = {"ܡܐܵܝܵܐ"}
}

numbers[200] = {
	numeral = "ܪ.",
	cardinal = "ܬܪܲܝܡܐܵܐ",
	ordinal = {"ܬܪܲܝܡܐܵܝܵܐ"}
}

numbers[300] = {
	numeral = "ܫ.",
	cardinal = "ܬܠܵܬ݂ܡܐܵܐ",
	ordinal = {"ܬܠܵܬ݂ܡܐܵܝܵܐ"}
}

numbers[400] = {
	numeral = "ܬ.",
	cardinal = "ܐܲܪܒܲܥܡܐܵܐ",
	ordinal = {"ܐܲܪܒܲܥܡܐܵܝܵܐ"}
}

numbers[500] = {
	numeral = "ܢ̈.",
	cardinal = "ܚܲܡܫܲܡܐܵܐ",
	ordinal = {"ܚܲܡܫܲܡܐܵܝܵܐ"}
}

numbers[600] = {
	numeral = "ܣ̈.",
	cardinal = "ܐܸܫܬܲܡܐܵܐ",
	ordinal = {"ܐܸܫܬܲܥܡܐܵܝܵܐ"}
}

numbers[700] = {
	numeral = "ܥ̈.",
	cardinal = "ܫܒ݂ܲܥܡܐܵܐ",
	ordinal = {"ܫܒ݂ܲܥܡܐܵܝܵܐ"}
}

numbers[800] = {
	numeral = "ܦ̈.",
	cardinal = "ܬܡܵܢܸܡܐܵܐ",
	ordinal = {"ܬܡܵܢܸܡܐܵܝܵܐ"}
}

numbers[900] = {
	numeral = "ܨ̈.",
	cardinal = "ܬܫܲܥܡܐܵܐ",
	ordinal = {"ܬܫܲܥܡܐܵܝܵܐ"}
}

numbers[1000] = {
	numeral = "ܐ݇.",
	cardinal = "ܐܲܠܦܵܐ",
	ordinal = {"ܐܲܠܦܵܝܵܐ"}
}

numbers[1000000] = {
	numeral = "...",
	cardinal = "ܡܸܠܝܘܿܢ",
	ordinal = {"ܡܸܠܝܘܿܢܵܝܵܐ"}
}

numbers[1000000000] = {
	numeral = "...",
	cardinal = "ܡܸܠܝܵܪܕ݇",
	ordinal = {"ܡܸܠܝܵܪܕܵܝܵܐ"}
}

return numbers
