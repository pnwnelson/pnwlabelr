import Collection from 'ampersand-rest-collection'
import Label from './label'
import githubMixin from '../helpers/github-mixin'

export default Collection.extend(githubMixin, {
	url () {
		return this.parent.url() + '/labels' // any child collection gets a reference to its parent via the 'parent' model. In this case, repo-collection.js is the parent file.
	},

	model: Label
})