import tmi from 'tmi.js';

export default class Bot {

    constructor(token, clientId, channels) {
        this.token = token
        this.clientId = clientId
        this.channels = channels
        this.client = null
    }

    init() {
        // Define configuration options
        const opts = {
            options: { debug: false },
            identity: {
                username: 'mibotmichel',
                password: 'oauth:' + this.token
            },
            channels: this.channels
        }

        // Create a client with our options
        this.client = new tmi.Client(opts); 
    }

    addMessageHandler(callback) {
        this.client.on('message', callback);
    }

    start() {
        if (this.client) {
            this.client.connect()
        }
    }

}
