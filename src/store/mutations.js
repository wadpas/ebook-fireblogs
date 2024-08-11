import { findById, upsert, docToResource } from '../helpers'

export default {
	setItem(state, { resource, item }) {
		upsert(state[resource], docToResource(item))
	},
	setAuthId(state, id) {
		state.authId = id
	},
	setAuthUserUnsubscribe(state, unsubscribe) {
		state.authUserUnsubscribe = unsubscribe
	},
	appendUnsubscribe(state, { unsubscribe }) {
		state.unsubscribes.push(unsubscribe)
	},
	clearUnsubscribes(state) {
		state.unsubscribes = []
	},
	appendPostToThread: appendMutation({ parent: 'threads', child: 'posts' }),
	appendThreadToForum: appendMutation({ parent: 'forums', child: 'threads' }),
	appendThreadToUser: appendMutation({ parent: 'users', child: 'threads' }),
	appendContributorToThread: appendMutation({ parent: 'threads', child: 'contributors' }),
}

function appendMutation({ parent, child }) {
	return (state, { childId, parentId }) => {
		const resource = findById(state[parent], parentId)
		if (!resource) {
			console.warn(`Appending ${child} to ${parent} failed`)
			return
		}
		resource[child] = resource[child] || []
		if (resource[child].includes(childId)) return
		resource[child].push(childId)
	}
}
