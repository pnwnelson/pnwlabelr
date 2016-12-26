import app from 'ampersand-app'
import React from 'react'
import localLinks from'local-links'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
	mixins: [ampersandMixin],

	onClick (event) {
		const pathname = localLinks.getLocalPathname(event)

		if (pathname) {
			event.preventDefault()
			app.router.history.navigate(pathname, {trigger:true})
		}
	},

	render () {
		const {me} = this.props // this is ES6 and is called destructuring. ES5 is: const me = this.props.me
														// this will populate the {me.name} when it becomes available, since the DOM is
														// rendered before the data is available.

		return (
			<div onClick={this.onClick}>
				<nav className='top-nav top-nav-light cf' role='navigation'>
					<input id='menu-toggle' className='menu-toggle' type='checkbox'/>
					<label htmlFor='menu-toggle'>Menu</label>
					<ul className='list-unstyled list-inline cf'>
						<li>Labelr</li>
						<li><a href='/repos'>Repos</a></li>
						<li className='pull-right'>{me.name} | <a href='/logout'>Logout</a></li>
					</ul>
				</nav>
				<div className='container'>
					{this.props.children}
				</div>
			</div>
		)
	}
})