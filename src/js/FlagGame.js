import Countries from "../data/country.json";

export default class FlagGame {

    constructor(nodeImage, nodeAnswer, nodeCongrats) {
        this.nodeImage = nodeImage
        this.nodeAnswer = nodeAnswer
        this.nodeCongrats = nodeCongrats
        this.found = false
        this.winner = null
        this.newFlag()
    }

    newFlag() {
        this.flag = Countries[Math.floor(Math.random() * Countries.length)]
    }

    generate() {
        let p = document.createElement('p')
        p.innerText = '...'
        this.nodeAnswer.innerText = null
        this.nodeAnswer.appendChild(p)
        this.nodeImage.src = this.flag.flag_image
    }

    setWinner(username) {
        this.nodeCongrats.innerText = username
    }

    showAnswer() {
        this.nodeAnswer.innerText = this.flag.name
    }

    isCorrect(target, context, msg, self) {
        if (msg === this.flag.name) {
            setWinner(context['display-name'])
        }
    }

}