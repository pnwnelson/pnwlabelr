import app from 'ampersand-app'
import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'
import xhr from 'xhr'

export default Model.extend(githubMixin, {
	idAttribute: 'name', // this makes the name as the unique identifier instead of 'id'.

	props: { // props are linked to the api
		name: 'string',
		color: 'string'
	},

	session: { // things that are temporary state that are linked to a specific model
		editing: {
			type: 'boolean',
			default: false
		}
	},

	// this is the method to update the label (used on the submit button)
	update (newAttributes) {
		const old = this.attributes //grabbing the current attributes
		xhr({
			url: this.url(), //getting the old url first
			method: 'PATCH', //updating with the new attributes
			json: newAttributes,
			headers: { // the patching needs authorization headers for github
				'Authorization': 'token ' + app.me.token
			}
		}, (err) => {
			if (err) {
				this.set(old)
				console.error('Check your internet')
			}
		})
		this.set(newAttributes) // returning the new attributes
	}
})