local numbers = require "wiktionary/aii-number-list"
local json = require("dkjson")

local numbers_json = json.encode(numbers)
print(numbers_json)

