/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    let n = nums.length, left = 0, right = nums.length - 1; 
    k = k % n; // in case the k is greater than n
    
    // reverse the list [5, 4, 3, 2, 1];
    swapFromLeftToRight(nums, left, right);

    // reverse the first k items [4, 5, 3, 2, 1]
    left = 0;
    right = k - 1;
    swapFromLeftToRight(nums, left, right);

    // reverse the remaining items [4, 5, 1, 2, 3]
    left = k;
    right = nums.length - 1;
    swapFromLeftToRight(nums, left, right);
};

/**
* @param {number[]} nums
* @param {number} left
* @param {number} right
*/
function swapFromLeftToRight(nums, left, right) {
    while(left < right) {
    	[nums[left], nums[right]] = [nums[right], nums[left]];
    	left++;
    	right--;
    }
}

let nums = [1, 2, 3, 4, 5];
rotate(nums, 2);

console.log(nums)
