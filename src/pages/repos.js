import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
	mixins: [ampersandMixin],

	displayName: 'ReposPage',

	render() {
		const {repos} = this.props

		return (
			<div className='container'>
				<h1>Github Repos</h1>
				{repos.map((repo) => { //.map is js to list the repos
					return (
						<div>
							<a href={repo.appUrl} key={repo.id}>{repo.name}</a>
						</div>
					)
				})}
			</div>
		)
	}
})