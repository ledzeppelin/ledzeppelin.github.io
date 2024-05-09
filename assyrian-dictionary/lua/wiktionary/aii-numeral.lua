-- From Aug 30th, 2023
-- https://en.wiktionary.org/w/index.php?title=Module:aii-numeral&oldid=75870192
-- 
-- in Lua 5.2, unpack was moved to table.unpack
local unpack = table.unpack

local export = {}

-- currently this supports converting the range 0-1999 to numerals
-- adding a numeral for 2000 will increase support to 0-2999
-- adding a numeral for 3000 will increase support to 0-3999 and so forth
-- no need to change the function itself, just update the table to increase the supported range

local numerals = {
    {1000, 'ܐ݇'},
    {900, 'ܨ̈'}, {800, 'ܦ̈'}, {700, 'ܥ̈'}, {600, 'ܣ̈'}, {500, 'ܢ̈'}, {400, 'ܬ'},
    {300, 'ܫ'}, {200, 'ܪ'}, {100, 'ܩ'}, {90, 'ܨ'}, {80, 'ܦ'}, {70, 'ܥ'}, {60, 'ܣ'},
    {50, 'ܢ'}, {40, 'ܡ'}, {30, 'ܠ'}, {20, 'ܟ'}, {10, 'ܝ'}, {9, 'ܛ'}, {8, 'ܚ'}, {7, 'ܙ'},
    {6, 'ܘ'},  {5, 'ܗ'}, {4, 'ܕ'}, {3, 'ܓ'}, {2, 'ܒ'}, {1, 'ܐ'}, {0, ''},
}

function export.aii_numeral(num)
    local result = ''
    for _ ,v in ipairs(numerals) do
        local int, numeral = unpack(v)
        if ( num == 0 ) then break end

        local append_numeral = math.floor(num / int)
        num = num % int
        if ( append_numeral == 1) then
            result = result .. numeral
        end
    end
    return result .. '.'
end

return export
