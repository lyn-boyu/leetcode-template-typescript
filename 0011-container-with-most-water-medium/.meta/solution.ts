/**
 * Container With Most Water - Medium
 * https://leetcode.com/problems/container-with-most-water/
 * Topics: Array, Two Pointers, Greedy
 * 
 * Problem Description:
 * You are given an integer array height of length n. There are n vertical lines drawn such that 
 * the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together 
 * with the x-axis form a container, such that the container contains the most water.
 * 
 * Return the maximum amount of water a container can store.
 * 
 * @param height - Array of heights representing vertical lines
 * @returns The maximum amount of water that can be contained
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