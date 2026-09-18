// Master Code Templates for Interview

// --------------------------------------------------------//


	
// ==========================================
// 1. 1D ARRAYS (DP Tables, Counters, Results)
// ==========================================

// A. Fixed-size filled with a default value (Primitives only: numbers, booleans, null)
// Use case: DP arrays, visited arrays, indegree counters
const dp1D = new Array(n + 1).fill(0);                // [0, 0, 0, ...]
const isVisited = new Array(n).fill(false);           // [false, false, ...]

// B. Fixed-size filled with sequential indices [0, 1, 2, ..., n-1]
// Use case: Union-Find parent array, initial topological index mapping
const parent = Array.from({ length: n }, (_, i) => i); // [0, 1, 2, 3, ...]

// C. Fixed-size allocation without immediate filling
// Use case: Output results where you overwrite every index during a loop (saves memory fill time)
const result = new Array(n);
for (let i = 0; i < n; i++) {
  result[i] = computeValue(i)
}


// ==========================================
// 2. 2D MATRICES (Grid DP, Graphs, Distance Tables)
// ==========================================

// A. Standard 2D Grid DP (Avoids reference sharing bug)
// Use case: Unique Paths, Longest Common Subsequence, Grid Graphs
const rows = 5, cols = 4;
const dp2D = Array.from({ length: rows }, () => new Array(cols).fill(0));

// B. Graph Adjacency List (Vector of vectors)
// Use case: Graph traversals, Topological sort neighbors
const graph = Array.from({ length: n }, () => []);


// ==========================================
// 3. FAST CONVERSIONS & ARRAY RESIZING
// ==========================================

// A. Converting Set/Map keys to a sorted Fixed-Size Array
// Use case: Retrieving map keys and sorting them safely
const sortedKeys = Array.from(map.keys()).sort((a, b) => a - b);

// B. Quick array resetting/clearing without re-allocating memory
// Use case: Reusing a temporary buffer in recursion/backtracking
let buffer = [1, 2, 3, 4, 5];
buffer.length = 0; // Clears the array in O(1) time without GC overhead


// -------- Graph: Adjacency List & Topological Sort (Kahn's BFS) --------------
/**
 * @param {number} numNodes 
 * @param {number[][]} edges - [u, v] where u points to v (u -> v)
 * @return {number[]} Topological order or [] if cycle detected
 */
const topologicalSort = (numNodes, edges) => {
  const graph = Array.from({ length: numNodes }, () => []);
  const indegree = new Array(numNodes).fill(0);

  for (const [u, v] of edges) {
    graph[u].push(v);
    indegree[v]++;
  }

  const queue = [];
  for (let i = 0; i < numNodes; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  const result = [];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (const neighbor of graph[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return result.length === numNodes ? result : [];
};


// ------------ Matrix Graph: Multi-Source / 2D Grid BFS  ------------------------

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right

const matrixBFS = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  
  // 1. Multi-source setup (e.g., collect all starting points)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) { // Example condition for start nodes
        queue.push([r, c, 0]); // [row, col, distance/time]
      }
    }
  }

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift();

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;

      // Boundary and validity check
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
        grid[nr][nc] = 2; // Mark as visited directly in grid to save memory
        queue.push([nr, nc, dist + 1]);
      }
    }
  }
};

// ------------ Binary Search on Answer Space (Range Search)  ------------------------

const binarySearchAnswerSpace = (weights, days) => {
  let left = Math.max(...weights);      // Minimum possible capacity
  let right = weights.reduce((a, b) => a + b, 0); // Maximum possible capacity
  let ans = right;

  // Helper validation function
  const isValid = (capacity) => {
    let neededDays = 1, currentLoad = 0;
    for (const w of weights) {
      if (currentLoad + w > capacity) {
        neededDays++;
        currentLoad = 0;
      }
      currentLoad += w;
    }
    return neededDays <= days;
  };

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (isValid(mid)) {
      ans = mid;        // Candidate found, try smaller value
      right = mid - 1;
    } else {
      left = mid + 1;   // Increase capacity
    }
  }

  return ans;
};

// ------------ Dynamic Programming: Top-Down Memoization Template  ------------------

const solveDP = (nums, target) => {
  const memo = new Map();

  const helper = (index, currentTarget) => {
    // Base Cases
    if (currentTarget === 0) return 1;
    if (currentTarget < 0 || index >= nums.length) return 0;

    // Serialization for 2D/multi-variable state
    const key = `${index},${currentTarget}`;
    if (memo.has(key)) return memo.get(key);

    // Decision Tree logic (Include / Exclude)
    const take = helper(index, currentTarget - nums[index]);
    const skip = helper(index + 1, currentTarget);

    const result = take + skip;
    memo.set(key, result);
    return result;
  };

  return helper(0, target);
};

// ------------ Trie (Prefix Tree)  ------------------------

class TrieNode {
  constructor() {
    this.children = {}; // Map char -> TrieNode
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children[ch]) curr.children[ch] = new TrieNode();
      curr = curr.children[ch];
    }
    curr.isEnd = true;
  }

  startsWith(prefix) {
    let curr = this.root;
    for (const ch of prefix) {
      if (!curr.children[ch]) return false;
      curr = curr.children[ch];
    }
    return true;
  }
}


// ------------ Union-Find (Disjoint Set Union with Path Compression)  ------------------------
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(1);
  }

  find(i) {
    if (this.parent[i] === i) return i;
    return (this.parent[i] = this.find(this.parent[i])); // Path compression
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
      return true; // Successfully merged
    }
    return false; // Already connected (Cycle!)
  }
}


/**
 *  ----------------- Traps and gotchas -----------
 */

// ------------ get map keys in sorted order  ------------------------
	(function(){
		const map = new Map(); // Key -> Frequency or Object
		// ... Populate map ...

		// Extract and sort keys numerically
		const sortedKeys = Array.from(map.keys()).sort((a, b) => a - b);

		// Iterate through keys in sorted order
		for (const key of sortedKeys) {
		  const value = map.get(key);
		  // Process value
		}
	})();


// ------------ .sort() Traps  ------------------------
	// Always pass a custom numeric comparator.
	(function(){
		// Numeric Ascending
		arr.sort((a, b) => a - b);

		// Numeric Descending
		arr.sort((a, b) => b - a);

		// 2D Array Sort (by first column, then second column)
		intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
	})();


// ------------ Set & Map Compound Key Gotchas  ------------------------
	/**
	 * The Pitfall: Set.add([r, c]) or Map.set([r, c], val) compares objects by memory reference, not value.
	 * Adding [0, 1] twice creates two separate entries!
	 * The Solution: Serialize coordinate/state pairs into string primitive keys.
	 */
	(function(){
		const visited = new Set();

		// Correct: String primitive serialization
		const key = `${r},${c}`;
		visited.add(key);
		if (visited.has(key)) { /* ... */ }
	})();


// ------------ Fast Array & Matrix Allocations  ------------------------
/**
 * Avoid new Array(N).fill([]) when creating 2D matrices because it fills the 
 * matrix with references to the same nested array. Modifying one row modifies every row!
 */
	(function(){
		// BAD (Mutating matrix[0][0] will mutate ALL rows!)
		const matrix = new Array(rows).fill(new Array(cols).fill(0)); 

		// GOOD (Allocates a brand new array instance for every row)
		const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
	})();


// ------------ avoid Math.max(...arr) if arr.length is > ~100k or N > 10^5 ------------------------
	(function() {
		 // Initialize max with negative infinity
		  let maxVal = -Infinity;

		  for (let i = 0; i < arr.length; i++) {
		    if (arr[i] > maxVal) {
		      maxVal = arr[i];
		    }
		  }

		  return maxVal;
	})();



// ------------   ------------------------
