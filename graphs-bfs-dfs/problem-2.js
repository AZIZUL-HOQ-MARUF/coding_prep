/**
 * LC 207
 * You're building a build-system for a large codebase. Given a list of
 * modules and pairs describing which modules must be built before
 * others, determine whether all modules can be built at all given
 * these constraints — no need to return the order, just whether it's
 * achievable.
 * @param {number} numMoodules
 * @param {number[]} dependencies
 * @return {boolean}
 * numModules=4, dependencies=[[1,0],[2,0],[3,1],[3,2]]
 */
function canResolveAllModules(numModules, dependencies) {
	let graph = Array.from( {length: numModules}, () => []);
	let indegree = Array.from({ length: numModules}, () => 0);

	for (const [mod, dep] of dependencies) {
		graph[dep].push(mod);
		indegree[mod] += 1;
	}

	let queue = [];
	for (let i =0; i <indegree.length; i++) {
		if (indegree[i] === 0) queue.push(i);
	}

	let count = 0;
	while(queue.length) {
		let mod = queue.shift();
		count++;

		for (const neighbor of graph[mod]) {
			indegree[neighbor] -= 1;
			if (indegree[neighbor] === 0) queue.push(neighbor);
		}

	}

	return numModules === count;
}

// TC: O(Mod + dep)

// SC O(N)