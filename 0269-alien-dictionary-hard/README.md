# Alien Dictionary
> link: https://leetcode.com/problems/alien-dictionary/description/ 

There is a foreign language which uses the Latin alphabet, but the order among letters is not "a", "b", "c", ... "z" as in English.

You receive a list of non-empty strings `words` from the dictionary, where the words are sorted lexicographically based on the rules of this new language.

Your task is to derive the order of letters in this language. If the order is invalid, return an empty string. If there are multiple valid orders of letters, return any one of them.

A string `a` is lexicographically smaller than a string `b` if either of the following is true:

1. The first letter where they differ is smaller in `a` than in `b`.
2. There is no index `i` such that `a[i] != b[i]` and `a.length < b.length`.

---

## Examples

### Example 1

- **Input**: `["z", "o"]`
- **Output**: `"zo"`
- **Explanation**:  
  From `"z"` and `"o"`, we know `'z' < 'o'`, so the order is `"zo"`.

### Example 2

- **Input**: `["hrn", "hrf", "er", "enn", "rfnn"]`
- **Output**: `"hernf"`
- **Explanation**:
  - From `"hrn"` and `"hrf"`, we know `'n' < 'f'`.
  - From `"hrf"` and `"er"`, we know `'h' < 'e'`.
  - From `"er"` and `"enn"`, we get `'r' < 'n'`.
  - From `"enn"` and `"rfnn"`, we know `'e' < 'r'`.  
  Thus, one possible valid order is `"hernf"`.

---

## Constraints

- The input `words` will contain characters only from lowercase `'a'` to `'z'`.
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
