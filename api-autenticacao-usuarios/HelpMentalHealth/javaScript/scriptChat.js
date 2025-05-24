function report(){
    alert("Usuário denunciado com sucesso");
}

document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    // Função para enviar mensagem
    function sendMessage() {
        const messageText = messageInput.value.trim();
        
        if (messageText !== '') {
            // Criar nova mensagem do usuário
            createMessage(messageText, true);
            
            // Limpar input e manter o foco
            messageInput.value = '';
            messageInput.focus();
            
            // // Simular resposta após 1 segundo
            // setTimeout(() => {
            //     const replies = [
            //         "Olá! Como posso ajudar?",
            //         "Entendi sua mensagem",
            //         "Estou analisando seu caso",
            //         "Poderia explicar melhor?",
            //         "Obrigado pelo contato!"
            //     ];
            //     const randomReply = replies[Math.floor(Math.random() * replies.length)];
            //     createMessage(randomReply, false);
            // }, 1000);
        }
    }
    
    // Função para criar mensagens
     function createMessage(text, isUser) {
         const messageDiv = document.createElement('div');
         messageDiv.className = isUser ? 'msg user' : 'msg';
         messageDiv.textContent = text;
        
    //     // Adicionar ao chat com animação
         chatContainer.appendChild(messageDiv);
        
    //     // Rolagem automática para a nova mensagem
         chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Event Listeners
    sendButton.addEventListener('click', sendMessage);
    
    // Enviar com Enter (mas mantém Shift+Enter para quebra de linha)
    // messageInput.addEventListener('keydown', function(e) {
    //     if (e.key === 'Enter' && !e.shiftKey) {
    //         e.preventDefault();
    //         sendMessage();
    //     }
    // });
    
    // Focar no input quando a página carregar
    // messageInput.focus();
});