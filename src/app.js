import app from 'ampersand-app'
import Router from './router' //this is the router.js file we created
import styles from './styles/main.styl'
import icons from'../node_modules/octicons/build/octicons.css'
import fontAwesome from '../node_modules/font-awesome/css/font-awesome.css'
import Me from './models/me'

app.extend ({
	init () {
		this.me = new Me () // this is an instance for authentication (the me.js model)
		this.router = new Router()
		this.router.history.start() // history object is singleton property of router which means it runs once
	}
})

window.app = app // this is going to fire off the router. this is the first thing the app will do.

app.init()