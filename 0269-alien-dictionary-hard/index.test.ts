import alienOrder from "./index";
import { describe, test, expect } from "bun:test";


describe("Alien Dictionary", () => {
    /**
     * Example 1:
     * Input: ["z", "o"]
     * Expected Output: "zo"
     * Explanation:
     * From "z" and "o", we know that 'z' comes before 'o'.
     * (Visual: Imagine the order: z < o)
     */
    test("Example 1", () => {
        const words = ["z", "o"];
        const result = alienOrder(words);
        expect(result).toBe("zo");
    });

    /**
     * Example 2:
     * Input: ["hrn", "hrf", "er", "enn", "rfnn"]
     * Expected Output: "hernf"
     * Explanation:
     * - From "hrn" and "hrf", we know 'n' < 'f'.
     * - From "hrf" and "er", we know 'h' < 'e'.
     * - From "er" and "enn", we know 'r' < 'n'.
     * - From "enn" and "rfnn", we know 'e' < 'r'.
     * (Visual: The relative order is h < e < r < n < f)
     * One valid ordering is "hernf".
     */
    test("Example 2", () => {
        const words = ["hrn", "hrf", "er", "enn", "rfnn"];
        const result = alienOrder(words);
        expect(result).toBe("hernf");
    });

    /**
     * Additional Test:
     * Input: ["wrt", "wrf", "er", "ett", "rftt"]
     * Expected Output: "wertf"
     * Explanation:
     * - "wrt" and "wrf": 't' < 'f'
     * - "wrf" and "er": 'w' < 'e'
     * - "er" and "ett": 'r' < 't'
     * - "ett" and "rftt": 'e' < 'r'
     * (Visual: This implies the ordering: w < e < r < t < f)
     * One possible valid ordering is "wertf".
     */
    test("Additional Test", () => {
        const words = ["wrt", "wrf", "er", "ett", "rftt"];
        const result = alienOrder(words);
        expect(result).toBe("wertf");
    });

    /**
     * Invalid Order Test:
     * Input: ["abc", "ab"]
     * Expected Output: ""
     * Explanation:
     * "ab" is a prefix of "abc", and if "abc" comes before "ab", the ordering is invalid.
     */
    test("Invalid Order Test", () => {
        const words = ["abc", "ab"];
        const result = alienOrder(words);
        expect(result).toBe("");
    });
});
