import Auth from "./Auth"
import Bot from "./Bot"
import FlagGame from "./FlagGame"
import { createChat } from "./functions/dom-functions"

const auth = new Auth(
    'token',
    'wd3ocgm4k96y9on16i7nbykt2ckvet',
    // 'https://mibotmichel.alexandrechauvin.fr',
    'http://localhost:5173',
    ['chat:read'],
    Math.floor(Math.random() * 333333333),
)
auth.storeAccessToken(window.location.hash)

const channel = 'alpifra'
const limitTimer = 20
let currentAccess = sessionStorage.getItem('access_token')
let clientId = sessionStorage.getItem('client_id')

if (window.location.hash === '#logged') {

    let gameContainer = document.getElementById('game')
    gameContainer.classList.remove('hide')

    // instanciate fag game
    const game = new FlagGame(
        document.getElementById('flag'),
        document.getElementById('flagText'),
        document.getElementById('winnerCongrats')
    )
    game.generate()

    setInterval(() => {
        if (!FlagGame.found) {
            game.showAnswer()
            setTimeout(() => {
                game.newFlag()
                game.generate()
            }, 5 * 1000);
        }
    }, (limitTimer + 5) * 1000);

    // instanciate chat
    const bot = new Bot(currentAccess, clientId, [channel])
    bot.init()
    bot.addMessageHandler(createChat)
    bot.addMessageHandler((target, context, msg, self) => game.isCorrect(context, msg))
    bot.start()

} else {

    let authUrl = auth.getAuthUrl(auth)
    let connectContainer = document.getElementById('login')
    let connectBtn = document.getElementById('connect')
    connectBtn.href = authUrl
    connectBtn.innerText = 'Connexion à ' + channel
    connectContainer.classList.remove('hide')

}