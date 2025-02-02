// @bun
// 0011-container-with-most-water-medium/.meta/solution.ts
function maxArea(heights) {
  let maxArea2 = -1;
  let left = 0;
  let right = heights.length - 1;
  while (left < right) {
    const minHeight = Math.min(heights[left], heights[right]);
    const width = right - left;
    const area = minHeight * width;
    maxArea2 = Math.max(area, maxArea2);
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxArea2;
}
export {
  maxArea as default
};
