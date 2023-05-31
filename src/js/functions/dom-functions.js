
function createChat(target, context, msg, self) {
    if (self) {
        return;
    } // Ignore messages from the bot

    let messageElement = document.createElement('li')
    let senderElement = document.createElement('span')
    let contentElement = document.createElement('span')
    let chatContainer = document.getElementById('chat')

    messageElement.classList.add('message')
    senderElement.classList.add('sender')
    contentElement.classList.add('content')
    senderElement.innerText = context['display-name'] + ': '
    contentElement.innerText = msg

    messageElement.appendChild(senderElement)
    messageElement.appendChild(contentElement)
    chatContainer.appendChild(messageElement)
    chatContainer.scrollTop = chatContainer.scrollHeight
}

export { createChat }