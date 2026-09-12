/**
 * You're building a duplicate-detection feature for a contact import tool.
 * Given an array of contact IDs that is already sorted in ascending order,
 * and a target sum, determine whether any two distinct contact IDs in the
 * array add up exactly to the target sum. This is used to flag pairs of
 * IDs that might represent a linked or merged record.
 *
 * @param {number[]} contactIds - sorted array of unique contact ID numbers
 * @param {number} target - the sum to check for
 * @return {boolean} - true if two distinct elements sum to target, false otherwise
 */
function hasPairWithSum(contactIds, target) {

	// [3, 4, 5, 7, 10]
	//target = 12
	// L = 0, R = 3
	let left = 0, right = contactIds.length - 1;

	while (left < right) {
		const temp = contactIds[left] + contactIds[right];
		if(temp === target) return true;
		else if (temp > target) right--;
		else left++;
	}

	return false;
}

let ids = [2, 5, 7, 10];
let target = 12;
console.log(hasPairWithSum(ids, target));

/** 
 * time complexity at worst case O(N) - 
 * the loop may run for all the contactIds element if pair found at last element
 * or not found at all
 */

/**
 * Space complexity would be O(1)
 */
