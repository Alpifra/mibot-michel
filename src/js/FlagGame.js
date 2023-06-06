import Countries from "../data/country.json"
import shoetest from "shoetest"

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
        this.nodeCongrats.classList.add('hide')
        this.winner = null
        this.found = false
    }

    setWinner(username) {
        this.winner = username
        this.nodeCongrats.getElementsByTagName('p')[0].innerText = "Bravo " + this.winner + " !!"
        this.nodeCongrats.classList.remove('hide')
    }

    showAnswer() {
        this.nodeAnswer.innerText = this.flag.name
    }

    isCorrect(context, msg) {
        if (shoetest.test(this.flag.name, msg)) {
            this.found = true
            this.showAnswer()
            this.setWinner(context['display-name'])
        }
    }

}