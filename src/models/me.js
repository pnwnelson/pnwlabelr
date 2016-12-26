// This model will contain the API token from Github (or whatever API) so it can be persisted throughout a state. 
// Without this persistence, every time the browswer window is refreshed, the token will disappear and the EU
// will have to go through the login process again.

import Model from 'ampersand-model'
import cacheMixin from 'ampersand-local-cache-mixin' // gives us an object with a few storage properties
import ms from 'milliseconds' // module that lets you write time durations in a more readable way. Used in 'ttl'.
import githubMixin from '../helpers/github-mixin'
import RepoCollection from './repo-collection'

export default Model.extend(githubMixin, cacheMixin, {
	url: 'https://api.github.com/user',

	initialize () {
		this.initStorage({ // this says how to store the token, but doesn't actually store it at this point.
			storageKey: 'me',
			ttl: ms.hours(30), // using the 'ms' module to invalidate the token after a duration. Doesn't actually delete the data from localStorage
			tts: ms.minutes(1) // time to stale
		})
		this.on('stale', this.onStale, this)
		this.on('change', this.writeToStorage, this) // this is where the token is actually stored in cache.
		this.on('change:loggedIn', this.onLoggedInChange, this)
	},

	props: { // with props, you have to specify things that are wanted to keep.
		login: 'string',
		name: 'string',
		token: 'string'
	},

	derived: {
		loggedIn: {
			deps: ['token'],
			fn () {
				return !!this.token
			}
		}
	},

	collections: {
		repos: RepoCollection
	},

	onStale () {
		if (this.loggedIn) {
			this.fetchAll()
		}
	},

	fetchAll () {
		this.fetch()
		this.repos.fetch()
	},

	onLoggedInChange () {
		if (this.loggedIn) {
			this.fetchAll()
		} else {
			window.localStorage.clear()
		}
	}
})