import Collection from 'ampersand-rest-collection' //store for managing ampersand models and interacting with RESTful api's.
import Repo from './repo'
import githubMixin from '../helpers/github-mixin'

export default Collection.extend(githubMixin, { // this imports base collections and models and then extends them 
	url: 'https://api.github.com/user/repos',

	model: Repo,

	getByFullName (fullName ) { // fullName is owner and the name of the repo together
		let model = this.findWhere({full_name: fullName}) // using 'let' instead of 'const' because later on we are defining model as something else
		if (!model) {
			console.log("DID NOT FIND IT")
			model = new Repo({full_name: fullName})
		}
		model.fetch()
		return model
	}
})