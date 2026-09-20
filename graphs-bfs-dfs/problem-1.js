/**
 * Node definition for undirected graph:
 * function Node(val, neighbors) {
 *   this.val = val === undefined ? 0 : val;
 *   this.neighbors = neighbors === undefined ? [] : neighbors;
 * }
 */

/**
 * LC: 133 - Clone Graph
 * 
 * Scenario:
 * You're building a data-migration tool for a social network's backend.
 * Given a reference to a single node in a connected, undirected friend-connection
 * graph, where each node represents a user and its neighbors represent direct
 * friends, produce a completely independent deep copy of the entire connected
 * network reachable from that node — so the copy can be migrated to a new datastore
 * without sharing any memory references with the original graph.
 * 
 * Pattern: Graph DFS with Hash Map (Deep Copy of Graph with Cycles)
 * 
 * Key Observations:
 * 1. Undirected graphs have cycles (mutual edges between neighbors).
 * 2. A Hash Map (oldNode -> cloneNode) is essential to:
 *    - Track already cloned nodes and avoid infinite loops.
 *    - Reuse existing cloned references when connecting neighbor lists.
 * 3. Base cases:
 *    - If input node is null, return null.
 *    - If node is already in map, return its clone.
 * 
 * @param {Node|null} node
 * @return {Node|null}
 */
function cloneNetwork(node) {
	if (!node) return null;

	// Map to track original node -> cloned node
	const visited = new Map();

	const dfs = (curr) => {
		// If node has already been cloned, return the existing cloned instance
		if (visited.has(curr)) {
			return visited.get(curr);
		}

		// Create clone for the current node
		const copy = new Node(curr.val);
		visited.set(curr, copy);

		const neighbors = curr.neighbors || curr.neighbor || [];
		for (const neighbor of neighbors) {
			const clonedNeighbor = dfs(neighbor);
			if (copy.neighbors) {
				copy.neighbors.push(clonedNeighbor);
			} else if (copy.neighbor) {
				copy.neighbor.push(clonedNeighbor);
			} else {
				copy.neighbors = [clonedNeighbor];
			}
		}

		return copy;
	};

	return dfs(node);
}

// Complexity Analysis:
// Time Complexity: O(V + E)
//   - Every vertex is cloned once and visited via DFS: O(V)
//   - Every edge is traversed once: O(E)
// Space Complexity: O(V)
//   - Hash Map stores mapping for all V vertices: O(V)
//   - Recursion stack depth can reach O(V) in the worst case (linear chain).