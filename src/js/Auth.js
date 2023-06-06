
export default class Auth {

    constructor(authType, clientId, authRedirect, scopes, state) {
        this.authType = authType
        this.clientId = clientId
        this.authRedirect = authRedirect
        this.scopes = scopes
    }

    init() {
        const url = this.getAuthUrl()
        this.storeAccessToken(url)
    }

    getAuthUrl() {
        const formatScopes = encodeURIComponent(this.scopes.join('+'))

        return `https://id.twitch.tv/oauth2/authorize?response_type=${this.authType}&client_id=${this.clientId}&redirect_uri=${this.authRedirect}&scope=${formatScopes}&state=${this.state}`
    }

    storeAccessToken(url) {
        let urlParams = new URLSearchParams(url)
        let accessToken = urlParams.get('#access_token')
        let state = urlParams.get('state')

        if (accessToken) {
            sessionStorage.setItem('access_token', accessToken)
            window.location.hash = '#logged'
        }
        if (state) {
            sessionStorage.setItem('state', state)
        }
    }

}