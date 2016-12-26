import app from 'ampersand-app'
import React from 'react'
import Router from 'ampersand-router'
import qs from 'qs'
import xhr from 'xhr'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import RepoDetail from './pages/repo-detail'
import Layout from './layout'

function auth (name) {
	return function () {
		if (app.me.loggedIn) {
			this[name].apply(this, arguments)
		} else {
			this.redirectTo('/')
		}
	}
}

export default Router.extend({
	renderPage (Page, options) {
		const Main = (
			<Layout me={app.me}>
				<Page {...options}/>
			</Layout>
		)

		React.render(Main, document.body)
	},

	routes: {
		'':'public', //this is the root. The '' is empty.
		'repos': auth('repos'),
		'repos/:owner/:reponame': auth('repoDetail'), //the : in front means we want to keep these as dynamic values and will get passed to repoDetail function
		'login':'login',
		'logout':'logout',
		'auth/callback':'authCallback'
	},

	public () {
		React.render(<PublicPage/>, document.body)
	},

	repos () {
		this.renderPage(ReposPage, {repos: app.me.repos})
	},

	repoDetail (owner, reponame) {
		// username/repo
		const repo = app.me.repos.getByFullName(owner + '/' + reponame)
		this.renderPage(RepoDetail, {repo: repo, labels: repo.labels})
	},

	login () {
		window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
			scope: 'user,repo', //this only to get the basic info that is needed from the github account.
			redirect_uri: location.origin + '/auth/callback',
			client_id: '88ecabe9f7a9f862b85f'
		})
	},

	logout () {
		app.me.clear()
		this.redirectTo('/')
	},

	authCallback () {
		// ?code=234234223425
		const code = qs.parse(window.location.search.slice(1)).code //qs is a module //slice(1) removes the leading character

		xhr({      // xhr is library to make ajax requests. this function is requesting an API token from github, through the heroku app that is using our secret.
			url: `http://pnwlabelr-dev.herokuapp.com/authenticate/${code}`, // the ` (back ticks) in ES6 are the same as adding + {code} at the end
			json: true
		}, (err, req, body) => {
			if (err) {
				console.error('something went wrong')
			} else {
			app.me.token = body.token // this is putting the token from the instance in app.js into a json object - its not stored locally yet. 'body' is json object with a property of 'token'.
			this.redirectTo('/repos')
			}
		})
	}
})






