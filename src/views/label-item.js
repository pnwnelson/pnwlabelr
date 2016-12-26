import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
	mixins: [ampersandMixin],

	displayName: 'Label',

	onToggleEditClick (event) { // this is the handler for the pencil/edit button below
		event.preventDefault()
		const {label} = this.props
		label.editing = !label.editing
		if (!label.editing) {
				this.setState(this.getInitialState)
		}
	},

	getInitialState () {
		const {label} = this.props
		return {
			color: label.color,
			name: label.name
		}
	},

	onNameChange (event) { // without this, when hitting cancel, the changed data won't revert back to its original state
		this.setState({
			name: event.target.value
		})
	},

	onColorChange (event) { // without this, when hitting cancel, the changed data won't revert back to its original state
		this.setState({
			color: event.target.value.slice(1) //this will protect the hashtag at the beginning from deletion.
		})
	},

	onDeleteClick (event) {
		const {label} = this.props
		// gracefully handle delete failures
		const collection = label.collection
		const models = collection.models.slice() // this will make a copy of an array without doing anything to it: slice()
		// delete the label
		label.destroy({
			error () {
				collection.reset(models)
				console.error('Could not delete')
			}
		})
		event.preventDefault()
	},

	onFormSubmit (event) {
		event.preventDefault()
		const {label} = this.props
		label.update(this.state)
		label.editing = false
	},

// this is another way to do the above two in one function (only if they do that same thing)
// but because we want the hashtag protected from deletion, we have to make them two different function
//		onChange (event) {
//		let attrs = {}
//		attrs[event.target.name] = event.target.value
//		this.setState(attrs)
//	},

	render () {
		const {label} = this.props
		const {color, name} = this.state
		const cssColor = '#' + color

		if (label.editing) {
			return (
			<form onSubmit={this.onFormSubmit} className='label'>
				<span style={{backgroundColor: cssColor}} className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
				<input value={name} onChange={this.onNameChange} name='name'/>
				<input value={cssColor} onChange={this.onColorChange} name='color'/>
				<button type='submit' className='button button-small'>Save</button>
				<button onClick={this.onToggleEditClick} type='button' className='button button-small button-unstyled'>Cancel</button>
			</form>
			)
		} else {
		return (
			<div className='label'>
				<span style={{backgroundColor: '#' + label.color}} className='label-color'>&nbsp;</span>
				<span>{label.name}</span>
				<span onClick={this.onToggleEditClick} className='fa fa-pencil'></span>
				<span onClick={this.onDeleteClick} className='fa fa-trash-o'></span>
			</div>
			)
		}
	}
})