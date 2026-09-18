/**
 * // LC 210
 * You're building a build-system for a large codebase. Given a list of
 * modules and pairs describing which modules must be built before
 * others, determine whether all modules can be built at all given
 * these constraints — and if so, produce one valid build order.
 * @param {number} numMoodules
 * @param {number[]} dependencies
 * @return {number[]}
 */
function resolveBuildOrder(numModules, dependencies) {
	let graph = Array.from({ length: numModules}, () => []);
	let indegree = Array.from({ length: numModules }, () => 0);

	for (const [mod, prer] of dependencies) {
		graph[prer].push(mod); // add the modules that are dependent on me
		indegree[mod] += 1 // number of prerequisites
	}

	let queue = [];
	for (let i = 0; i < numModules; i++) {
		if (indegree[i] === 0) queue.push(i);
	}

	// start with the modules that does not have prereqs
	let result = [];
	while (queue.length) {
		let mod = queue.shift();
		result.push(mod);

		for (const neighbor of graph[mod]) {
			indegree[neighbor] -= 1;
			if (indegree[neighbor] === 0) queue.push(neighbor);
		}
	}

	if (result.length !== numModules) return [];
	return result;
}

// TC: O(Mod + Pre)
// SC: O(N)

// Kahn's algorithm / topological sort