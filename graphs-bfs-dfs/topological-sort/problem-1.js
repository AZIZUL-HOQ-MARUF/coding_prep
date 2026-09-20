/**
 * LC: 210 - Course Schedule II
 * 
 * Scenario:
 * You're building a build-system for a large codebase. Given a list of
 * modules (labeled 0 to numModules - 1) and pairs describing dependency
 * constraints where [a, b] means module 'b' must be built before module 'a',
 * determine whether all modules can be built. If so, produce a valid
 * compilation order; if not (e.g. cyclic dependency), return an empty array.
 * 
 * Pattern: Topological Sort using Kahn's Algorithm (BFS with In-degree Array)
 * 
 * Key Observations:
 * 1. In-degree of a node = number of prerequisites required before that module can run.
 * 2. Adjacency list graph[u] = list of downstream modules that depend on 'u'.
 * 3. Modules with in-degree == 0 have no outstanding dependencies and can be processed immediately.
 * 4. As each module finishes:
 *    - Append it to the build order result list.
 *    - Decrement the in-degree of all its downstream dependents.
 *    - If any dependent's in-degree drops to 0, enqueue it.
 * 5. Cycle Detection: If the final build order length !== numModules, a cycle exists.
 * 
 * @param {number} numModules
 * @param {number[][]} dependencies
 * @return {number[]}
 */
function resolveBuildOrder(numModules, dependencies) {
	// Build graph adjacency list and calculate in-degree for each module
	const graph = Array.from({ length: numModules }, () => []);
	const indegree = Array.from({ length: numModules }, () => 0);

	for (const [mod, prereq] of dependencies) {
		graph[prereq].push(mod); // Directed edge: prereq -> mod
		indegree[mod] += 1;      // Increment in-degree for dependent module
	}

	// Queue all modules that have no prerequisites (in-degree === 0)
	const queue = [];
	for (let i = 0; i < numModules; i++) {
		if (indegree[i] === 0) {
			queue.push(i);
		}
	}

	const result = [];

	// Process queue in BFS order
	while (queue.length > 0) {
		const mod = queue.shift();
		result.push(mod);

		// Decrement in-degree for all downstream neighbors
		for (const neighbor of graph[mod]) {
			indegree[neighbor] -= 1;
			// If all prerequisites for neighbor are satisfied, push to queue
			if (indegree[neighbor] === 0) {
				queue.push(neighbor);
			}
		}
	}

	// If result doesn't include all modules, a cyclic dependency exists
	if (result.length !== numModules) {
		return [];
	}

	return result;
}

// Complexity Analysis:
// Time Complexity: O(V + E) where V = numModules, E = dependencies.length
//   - Building adjacency list and in-degrees: O(V + E)
//   - Each node is enqueued and processed once: O(V)
//   - Each directed edge is traversed once: O(E)
// Space Complexity: O(V + E)
//   - Adjacency list graph: O(V + E)
//   - In-degree array: O(V)
//   - BFS queue and result array: O(V)

// Example Test Case:
// const numModules = 4;
// const deps = [[1, 0], [2, 0], [3, 1], [3, 2]];
// console.log(resolveBuildOrder(numModules, deps)); // Output: [0, 1, 2, 3] or [0, 2, 1, 3]
