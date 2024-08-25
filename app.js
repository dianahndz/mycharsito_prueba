document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const messagesContainer = document.getElementById('messages');
    const sendButton = document.getElementById('sendButton');

    userInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') sendMessage();
    });

    sendButton.addEventListener('click', sendMessage);

    function sendMessage() {
        const messageText = userInput.value.trim();
        if (!messageText) return;

        addMessage(messageText, 'user-message');

        const loadingMessage = addMessage('...', 'api-message');

        fetch('https://yesno.wtf/api')
            .then(response => response.json())
            .then(data => {
                loadingMessage.remove();
                addMessage(data.answer, 'api-message', data.image);
            })
            .catch(() => {
                loadingMessage.remove();
                addMessage('Error al conectar con la API', 'api-message');
            });

        userInput.value = '';
    }

    function addMessage(text, className, imageUrl = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = text;
            messageDiv.appendChild(img);
        }

        if (text) {
            const textDiv = document.createElement('div');
            textDiv.textContent = text;
            textDiv.className = 'message-text';
            messageDiv.appendChild(textDiv);
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        return messageDiv;
    }
});
