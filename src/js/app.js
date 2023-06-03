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

const limitTimer = 10
let currentAccess = sessionStorage.getItem('access_token') ?? auth.storeAccessToken(window.location.hash)
let clientId = sessionStorage.getItem('client_id')
let connectBtn = document.getElementById('connect')

if (!currentAccess) {

    let authUrl = auth.getAuthUrl(auth)
    connectBtn.href = authUrl

} else {

    // instanciate fag game
    const game = new FlagGame(
        document.getElementById('flag'),
        document.getElementById('flagText')
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
    const bot = new Bot(currentAccess, clientId, ['lechelmi'])
    bot.init()
    bot.addMessageHandler(createChat)
    bot.addMessageHandler(FlagGame.isCorrect)
    bot.start()

}