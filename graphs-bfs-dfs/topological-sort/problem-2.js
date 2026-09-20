/**
 * LC: 207 - Course Schedule
 * 
 * Scenario:
 * You're building a build-system for a large codebase. Given a list of
 * modules (labeled 0 to numModules - 1) and pairs describing dependencies
 * where [a, b] means module 'b' must be built before module 'a',
 * determine whether it is possible to finish all modules (i.e. check
 * whether the dependency graph contains any cycles).
 * 
 * Pattern: Topological Sort / Cycle Detection in Directed Graph (Kahn's Algorithm)
 * 
 * Key Observations:
 * 1. Unlike LC 210, we only need to return a boolean: true if a topological
 *    ordering exists (no cycles), and false if there is a cycle.
 * 2. Maintain a count of modules processed from the queue.
 * 3. If count === numModules, all modules can be resolved without cyclic deadlock.
 * 
 * @param {number} numModules
 * @param {number[][]} dependencies
 * @return {boolean}
 */
function canResolveAllModules(numModules, dependencies) {
	// Build graph adjacency list and in-degree array
	const graph = Array.from({ length: numModules }, () => []);
	const indegree = Array.from({ length: numModules }, () => 0);

	for (const [mod, prereq] of dependencies) {
		graph[prereq].push(mod); // Directed edge: prereq -> mod
		indegree[mod] += 1;
	}

	// Queue all modules that have 0 prerequisites
	const queue = [];
	for (let i = 0; i < numModules; i++) {
		if (indegree[i] === 0) {
			queue.push(i);
		}
	}

	let processedCount = 0;

	// Process queue
	while (queue.length > 0) {
		const mod = queue.shift();
		processedCount++;

		for (const neighbor of graph[mod]) {
			indegree[neighbor] -= 1;
			if (indegree[neighbor] === 0) {
				queue.push(neighbor);
			}
		}
	}

	// If we processed all modules, there are no cycles
	return processedCount === numModules;
}

// Complexity Analysis:
// Time Complexity: O(V + E) where V = numModules, E = dependencies.length
//   - Graph construction: O(V + E)
//   - BFS traversal visits each vertex and edge at most once: O(V + E)
// Space Complexity: O(V + E)
//   - Graph storage: O(V + E)
//   - In-degree array & queue: O(V)

// Example Test Cases:
// console.log(canResolveAllModules(2, [[1, 0]])); // Output: true
// console.log(canResolveAllModules(2, [[1, 0], [0, 1]])); // Output: false (cycle)
