/**
 * String Encode and Decode - Medium
 * 
 * https://neetcode.io/problems/string-encode-decode
 * 
 * Design an algorithm to encode a list of strings to a single string. 
 * The encoded string is then decoded back to the original list of strings.
 * 
 * Example 1:
 * Input: ["neet","code","love","you"]
 * Output: ["neet","code","love","you"]
 * 
 * Example 2:
 * Input: ["we","say",":","yes"]
 * Output: ["we","say",":","yes"]
 * 
 * Constraints:
 * - 0 <= strs.length < 100
 * - 0 <= strs[i].length < 200
 * - strs[i] contains only UTF-8 characters.
 */

export class Codec {
    // Encode a list of strings to a single string
    // Each string is encoded as "<length>#<string>", and all strings are concatenated
    encode(strs: string[]): string {
        return strs.map(s => `${s.length}#${s}`).join('');
    }

    // Decode a single string to a list of strings
    decode(s: string): string[] {
        const result: string[] = [];
        let i = 0;

        // Iterate through the encoded string to extract each original string
        while (i < s.length) {
            let symbolIdx = i;

            // Find the position of the delimiter '#' to get the length of the next string
            while (s[symbolIdx] !== '#') {
                symbolIdx++;
            }

            // Extract the length of the next string from the encoded format "<length>#<string>"
            // Note: The substring includes characters up to, but not including, the end index.
            // Therefore, '#' is excluded from the slice result, as we only want to extract the length part.
            const length = Number.parseInt(s.slice(i, symbolIdx), 10);

            // Calculate the starting index of the actual string content
            const strStartIdx = symbolIdx + 1;

            // Extract the string content using the calculated length
            const str = s.slice(strStartIdx, strStartIdx + length);

            // Push the decoded string to the result list
            result.push(str);

            // Move the index to the start of the next encoded segment
            i = strStartIdx + length;
        }

        return result;
    }
}
