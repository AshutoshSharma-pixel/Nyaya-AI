// AI Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const newChatBtn = document.getElementById('newChatBtn');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const chatMessages = document.getElementById('chatMessages');
    const pauseControls = document.getElementById('pauseControls');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');

    // ================================
    // INPUT ROUTER (STRICT PHASE 2.5)
    // ================================
    function detectInputType(message) {
        const q = message.trim().toLowerCase();

        // STRICT GREETING/INSULT FILTER
        // Block regardless of lock status
        if (/^(hi|hello|hey|hii|good morning|good evening|good afternoon|sup|yo)\b/.test(q)) {
            return "greeting";
        }
        if (/are you|you ok|you tweaking|bro|dude|wtf|lol|lmao|bitch|idiot|stupid|fuck/.test(q)) {
            return "casual";
        }

        // SAFETY REFUSAL: STRICTLY VIOLENCE INTENT ONLY
        // Allegations (e.g., "murder allegations") are LEGAL.
        if (/how to kill|kill someone|how to murder|help me kill|how to hurt|how to beat|how to hide body|dispose of body|make bomb|make weapon/i.test(q)) {
            // EXCEPTION: Legal keywords allowed "allegation", "case", etc.
            if (/allegation|case|filed|charge|against me|on me|accused/i.test(q)) {
                return "legal";
            }
            return "blocked";
        }

        return "legal";
    }

    // Chat history management
    let currentChatId = null;

    // Conversation context and memory
    let conversationContext = {
        lockedRole: null,
        lockedCaseType: null
    };

    function generateChatId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    function getChatTitle(messages) {
        if (messages.length === 0) return 'New Chat';
        const firstUserMessage = messages.find(msg => msg.isUser);
        if (firstUserMessage) {
            const title = firstUserMessage.content.substring(0, 50);
            return title.length < firstUserMessage.content.length ? title + '...' : title;
        }
        return 'New Chat';
    }

    function saveChatHistory(force = false) {
        const messages = Array.from(chatMessages.children).map(messageDiv => {
            const isUser = messageDiv.classList.contains('user-message');
            const messageTextDiv = messageDiv.querySelector('.message-text');
            const timeDiv = messageDiv.querySelector('.message-time');

            // Robust check: Skip if critical elements missing (e.g. typing indicator)
            if (!messageTextDiv) return null;

            const messageText = messageTextDiv.textContent;
            const timestamp = timeDiv ? timeDiv.textContent : new Date().toISOString();

            return {
                isUser,
                content: messageText,
                timestamp,
                id: Date.now() + Math.random()
            };
        }).filter(msg => msg !== null);

        if (currentChatId && messages.length > 0) {
            const chatData = {
                id: currentChatId,
                title: getChatTitle(messages),
                messages: messages,
                lastUpdated: new Date().toISOString(),
                lockedRole: conversationContext.lockedRole,
                lockedCaseType: conversationContext.lockedCaseType
            };

            const existingChats = JSON.parse(localStorage.getItem('nyayaChatHistory') || '[]');
            const chatIndex = existingChats.findIndex(chat => chat.id === currentChatId);
            if (chatIndex >= 0) {
                existingChats[chatIndex] = chatData;
            } else {
                existingChats.push(chatData);
            }
            localStorage.setItem('nyayaChatHistory', JSON.stringify(existingChats));
            updateChatHistoryList();
        }
    }

    function loadChatHistory() {
        return JSON.parse(localStorage.getItem('nyayaChatHistory') || '[]');
    }

    function updateChatHistoryList() {
        const chatHistoryList = document.getElementById('chatHistory');
        if (!chatHistoryList) return;

        const chats = loadChatHistory();
        chatHistoryList.innerHTML = '';
        if (chats.length === 0) return;

        chats.forEach(chat => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            if (chat.id === currentChatId) historyItem.classList.add('current-chat');

            historyItem.innerHTML = `
                <div class="history-preview">${chat.title}</div>
                <div class="history-time">${new Date(chat.lastUpdated).toLocaleDateString()}</div>
                <div class="chat-actions">
                    <button class="rename-btn">✏️</button>
                    <button class="delete-chat-btn">🗑️</button>
                </div>
            `;

            historyItem.addEventListener('click', (e) => {
                if (!e.target.closest('.chat-actions')) loadChat(chat);
            });

            const deleteBtn = historyItem.querySelector('.delete-chat-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm("Delete this chat?")) {
                    const newChats = chats.filter(c => c.id !== chat.id);
                    localStorage.setItem('nyayaChatHistory', JSON.stringify(newChats));
                    if (chat.id === currentChatId) startNewChat();
                    updateChatHistoryList();
                }
            });

            chatHistoryList.appendChild(historyItem);
        });
    }

    function loadChat(chat) {
        chatMessages.innerHTML = '';
        chat.messages.forEach(msg => addMessage(msg.content, msg.isUser));
        currentChatId = chat.id;

        // RESTORE CONTEXT
        conversationContext = {
            lockedRole: chat.lockedRole || null,
            lockedCaseType: chat.lockedCaseType || null
        };
        console.log("Loaded chat context:", conversationContext);

        updateChatHistoryList();
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function startNewChat() {
        if (chatMessages.children.length > 0) saveChatHistory();
        chatMessages.innerHTML = '';
        currentChatId = generateChatId();

        // RESET CONTEXT
        conversationContext = {
            lockedRole: null,
            lockedCaseType: null
        };
        console.log("Started new chat. Context reset.");

        updateChatHistoryList();
        addMessage("Hello! I'm Nyaya AI, your comprehensive legal assistant. I can help you with any legal questions across all areas of law. What would you like to know?", false);
    }

    // AI DISPATCH
    async function sendMessageToAI(message) {
        console.log('AI received:', message);

        const inputType = detectInputType(message);

        // STRICT GATING: DO NOT PASS TO AI IF NON-LEGAL
        // "Inputs that are greetings... Must NEVER be passed..."
        if (inputType === "greeting") {
            return "Hello. I’m Nyaya AI, here to help with legal questions under Indian law. Please describe your legal issue.";
        }
        if (inputType === "casual") {
            return "I am a legal assistant. I cannot engage in casual conversation. Please ask a legal question.";
        }
        if (inputType === "blocked") {
            return "I can’t help with harming anyone.\n\nIf someone is in danger, contact emergency services.\n\nI can help with legal guidance instead.";
        }

        // DELEGATE TO AI SERVICE
        if (window.callOpenAI) {
            try {
                const responseObj = await window.callOpenAI(message, {
                    lockedRole: conversationContext.lockedRole,
                    lockedCaseType: conversationContext.lockedCaseType // Pass Locked Type
                });

                const responseText = responseObj.text || responseObj;
                const newRole = responseObj.role;
                const newCaseType = responseObj.caseType;

                // LOCK ROLE
                if (newRole && (newRole === "ACCUSED" || newRole === "VICTIM")) {
                    conversationContext.lockedRole = newRole;
                }

                // LOCK CASE TYPE
                if (newCaseType && newCaseType !== "General Legal Query" && newCaseType !== "Unknown" && newCaseType !== "Suicide Risk") {
                    conversationContext.lockedCaseType = newCaseType;
                }

                return responseText;

            } catch (error) {
                console.error('AI Service failed:', error);
                return "I’m having trouble accessing my legal system right now. Please try again shortly.";
            }
        }
        return "System error.";
    }

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = `<div class="${isUser ? 'user-avatar' : 'ai-avatar'}">${isUser ? 'U' : 'AI'}</div>`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        const messageText = document.createElement('div');
        messageText.className = 'message-text';

        if (!isUser) messageText.innerHTML = formatMessage(content);
        else messageText.textContent = content;

        messageContent.appendChild(messageText);

        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageContent.appendChild(messageTime);

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function formatMessage(text) {
        if (!text) return '';
        return text.replace(/\n/g, '<br>');
    }

    function addTypingMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message typing';
        messageDiv.innerHTML = `<div class="message-avatar"><div class="ai-avatar">AI</div></div><div class="message-content"><div class="message-text"></div></div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        let i = 0;
        const speed = 10;
        const msgText = messageDiv.querySelector('.message-text');

        const timer = setInterval(() => {
            if (i < content.length) {
                msgText.innerHTML = formatMessage(content.substring(0, i + 5));
                i += 5;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            } else {
                clearInterval(timer);
                messageDiv.classList.remove('typing');
                const messageTime = document.createElement('div');
                messageTime.className = 'message-time';
                messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                messageDiv.querySelector('.message-content').appendChild(messageTime);

                // NOW SAFE TO SAVE
                saveChatHistory();
            }
        }, speed);
    }

    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        if (!currentChatId) {
            currentChatId = generateChatId();
        }

        addMessage(message, true);
        messageInput.value = '';
        saveChatHistory();

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing';
        typingDiv.innerHTML = `<div class="message-avatar"><div class="ai-avatar">AI</div></div><div class="message-content"><div class="message-text">Typing...</div></div>`;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const aiResponse = await sendMessageToAI(message);
            chatMessages.removeChild(typingDiv);
            addTypingMessage(aiResponse);
        } catch (e) {
            chatMessages.removeChild(typingDiv);
            addMessage("Error occurred.", false);
        }
    }

    // Listeners
    if (sendBtn) sendBtn.addEventListener('click', (e) => { e.preventDefault(); sendMessage(); });
    if (messageInput) messageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } });
    if (newChatBtn) newChatBtn.addEventListener('click', startNewChat);

});