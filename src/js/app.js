import Auth from "./Auth"
import Bot from "./Bot"
import { createChat } from "./functions/dom-functions"

const auth = new Auth(
    'token',
    'wd3ocgm4k96y9on16i7nbykt2ckvet',
    'https://mibotmichel.alexandrechauvin.fr',
    ['chat:read'],
    Math.floor(Math.random() * 333333333),
)

let currentAccess = sessionStorage.getItem('access_token') ?? auth.storeAccessToken(window.location.hash)
let clientId = sessionStorage.getItem('client_id')
let connectBtn = document.getElementById('connect')

if (!currentAccess) {

    let authUrl = auth.getAuthUrl(auth)
    connectBtn.href = authUrl

} else {

    connectBtn.remove()
    const bot = new Bot(currentAccess, clientId, ['lechelmi'])
    bot.init()
    bot.addMessageHandler(createChat)
    bot.start()

}