-- From Feb 8th, 2024
-- https://en.wiktionary.org/w/index.php?title=Module:Swadesh/data/aii&oldid=78031890
-- https://en.wiktionary.org/w/index.php?title=Appendix:Assyrian_Neo-Aramaic_Swadesh_list&oldid=78031854

local m = require "wiktionary/common-words"
local json = require("dkjson")
local output = {}

for _, vals in pairs(m) do
    for _, vals2 in ipairs(vals) do
        table.insert(output, vals2['term'])
    end
end

local json_output = json.encode(output)
print(json_output)


