import Countries from "../data/country.json"
import shoetest from "shoetest"
import confetti from "canvas-confetti"

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
        while (!this.flag.nation) {
            this.flag = Countries[Math.floor(Math.random() * Countries.length)]
        }
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
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 1 }
        });
    }

    showAnswer() {
        this.nodeAnswer.innerText = this.flag.name
    }

    isCorrect(context, msg) {
        if (shoetest.test(this.flag.name, msg) && !this.found) {
            this.found = true
            this.showAnswer()
            this.setWinner(context['display-name'])
        }
    }

}