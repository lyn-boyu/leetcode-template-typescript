/*
# 0269 Alien Dictionary - Hard
> NeetCode: https://neetcode.io/problems/foreign-dictionary

Problem Statement:
There is a foreign language which uses the Latin alphabet, but the order among letters is not "a", "b", "c", ... "z" as in English.

You receive a list of non-empty strings `words` from the dictionary, where the words are sorted lexicographically based on the rules of this new language.

Derive the order of letters in this language. If the order is invalid, return an empty string. If there are multiple valid orders of letters, return any of them.

A string `a` is lexicographically smaller than a string `b` if either of the following is true:
1. The first letter where they differ is smaller in `a` than in `b`.
2. There is no index `i` such that `a[i] != b[i]` and `a.length < b.length`.

Example 1:
Input: ["z", "o"]
Output: "zo"
Explanation:
    From "z" and "o", we know 'z' < 'o'. 
    (Visual: Think of the ordering as: z < o)

Example 2:
Input: ["hrn", "hrf", "er", "enn", "rfnn"]
Output: "hernf"
Explanation:
    - From "hrn" and "hrf", we know 'n' < 'f'.
    - From "hrf" and "er", we know 'h' < 'e'.
    - From "er" and "enn", we know 'r' < 'n'.
    - From "enn" and "rfnn", we know 'e' < 'r'.
    (Visual: Imagine the order: h < e < r < n < f)

Constraints:
- The input words will contain characters only from lowercase 'a' to 'z'.
- 1 <= words.length <= 100
- 1 <= words[i].length <= 100

Note: Do not include any solution details in these comments.
*/

/*
  We divide the solution into 3 major steps:
  
  Step 1: Build the Graph and Compute In-Degrees
    - Initialize the graph and in-degree map with all unique characters.
    - For every pair of adjacent words, find the first differing character and add a directed edge.
    - Also check for the prefix rule: if word2 is a prefix of word1, the order is invalid.
  
  Step 2: Topological Sort (Using BFS / Kahn's Algorithm)
    - Use a queue to process characters with in-degree 0.
    - Remove characters from the queue and reduce the in-degrees of their neighbors.
    - Append characters to the order as they are processed.
  
  Step 3: Verify the Topological Order and Return the Result
    - If the resulting order contains all unique characters, return the order.
    - Otherwise, return an empty string (indicating a cycle or invalid order).
*/

function alienOrder(words: string[]): string {
    return ''
}

// Export the function for testing
export default alienOrder 
