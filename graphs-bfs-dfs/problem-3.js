
/**
 * Node definition
 * function Node(val, neighbor) {
 *   this.val = val === undefined ? 0 : val;
 *   this.neighbor = neighbor === undefined ? [] : neighbor;
 * }
 */

/**
 * LC 133
 * You're building a data-migration tool for a social network's backend.
 * Given a reference to a single node in a friend-connection graph, where
 * each node represents a user and its neighbors represent direct
 * friends, produce a completely independent, deep copy of the entire
 * connected network reachable from that node — so the copy can be
 * migrated to a new datastore without sharing any references with the
 * original graph.
 */
function cloneNetwork(node) {
	let map = new Map();

	const makeCopy = (node) => { // dfs approach
		if (map.has(node)) return map.get(node);

		let copy = new Node(node.val);
		map.set(node, copy);

		for (const neighbor of node.neighbor) {
			copy.neighbor.push(makeCopy(neighbor))
		}

		return copy;
	};

	return makeCopy(node);
}

// TC: O (V + E)

// SC O(N)

