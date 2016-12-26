import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import Label from '../views/label-item'

export default React.createClass({
	mixins: [ampersandMixin],

	displayName: 'ReposDetailPage',

	render() {
		const {repo} = this.props

		return (
			<div className='container'>
				<h1>{repo.full_name} Labels</h1>
				<ul>
					{repo.labels.map((label) => {
						return <Label key={label.name} label={label}/>
					})}
				</ul>
			</div>
		)
	}
})