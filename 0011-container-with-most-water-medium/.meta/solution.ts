/**
 * Max Water Container - Medium
 * 
 * https://neetcode.io/problems/max-water-container
 * 
 * You are given an integer array `heights` where `heights[i]` represents the height of the ith bar.
 * 
 * You may choose any two bars to form a container. Return the maximum amount of water a container can store.
 * 
 * Example 1:
 * Input: height = [1,7,2,5,4,7,3,6]
 * Output: 36
 * 
 * Example 2:
 * Input: height = [2,2,2]
 * Output: 4
 * 
 * Constraints:
 * - 2 <= height.length <= 1000
 * - 0 <= height[i] <= 1000
 * 
 * Solution:
 * - Use the two-pointer technique.
 * - Start with two pointers at the beginning and end of the array.
 * - Calculate the area for each pair of pointers and update the maximum.
 * - Move the pointer pointing to the shorter bar to potentially find a taller bar.
 */

export default function maxArea(heights: number[]): number {

    let maxArea = -1
    let left = 0
    let right = heights.length - 1

    while (left < right) {
        const minHeight = Math.min(heights[left], heights[right]);
        const width = right - left;
        const area = minHeight * width;

        maxArea = Math.max(area, maxArea)

        // keep longer height
        if (heights[left] < heights[right]) {
            left++
        } else {
            right--
        }
    }
    return maxArea
}
