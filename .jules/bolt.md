## 2024-05-18 - Replacing loops of string.includes() with Regex
**Learning:** Using a pre-compiled regular expression can be over 50% faster than looping through an array of keywords and repeatedly calling `string.includes()` for checking substring presence.
**Action:** When identifying multiple potential substrings in a larger string, prefer a single `RegExp.exec()` call with a combined regex pattern `/(word1|word2|word3)/` over `for` loops iterating `includes()`. Ensure the `RegExp` is pre-compiled outside the function logic.
