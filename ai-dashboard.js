// AI Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const newChatBtn = document.getElementById('newChatBtn');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const attachBtn = document.getElementById('attachBtn');
    const chatMessages = document.getElementById('chatMessages');
    const userProfile = document.getElementById('userProfile');
    const pauseControls = document.getElementById('pauseControls');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');

    // Chat history management
    let currentChatId = null;
    let chatHistory = [];

    // Conversation context and memory
    let conversationContext = {
        userDetails: {},
        recentTopics: [],
        mentionedPeople: [],
        mentionedPlaces: [],
        mentionedEvents: [],
        userMood: 'neutral',
        lastActivity: null,
        conversationFlow: []
    };

    // Chat history functions
    function generateChatId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Conversation context analysis
    function analyzeConversationContext(messageText) {
        // Extract names (simple pattern matching)
        const namePattern = /(?:my name is|i'm|i am|call me)\s+([A-Z][a-z]+)/gi;
        const nameMatch = messageText.match(namePattern);
        if (nameMatch) {
            conversationContext.userDetails.name = nameMatch[0].split(' ').pop();
        }

        // Extract places
        const placePattern = /(?:in|at|from|to)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi;
        const placeMatch = messageText.match(placePattern);
        if (placeMatch) {
            conversationContext.mentionedPlaces.push(...placeMatch.map(p => p.replace(/^(in|at|from|to)\s+/i, '')));
        }

        // Extract people
        const peoplePattern = /(?:my|the)\s+(?:friend|brother|sister|mother|father|wife|husband|girlfriend|boyfriend|colleague|boss|neighbor)\s+([A-Z][a-z]+)/gi;
        const peopleMatch = messageText.match(peoplePattern);
        if (peopleMatch) {
            conversationContext.mentionedPeople.push(...peopleMatch.map(p => p.split(' ').pop()));
        }

        // Extract topics
        const topicKeywords = ['work', 'job', 'family', 'relationship', 'travel', 'hobby', 'sport', 'movie', 'music', 'food', 'study', 'school', 'college', 'health', 'money', 'car', 'house', 'pet'];
        const foundTopics = topicKeywords.filter(topic => messageText.toLowerCase().includes(topic));
        conversationContext.recentTopics.push(...foundTopics);

        // Detect mood
        if (messageText.includes('happy') || messageText.includes('excited') || messageText.includes('great') || messageText.includes('awesome')) {
            conversationContext.userMood = 'positive';
        } else if (messageText.includes('sad') || messageText.includes('upset') || messageText.includes('worried') || messageText.includes('stressed')) {
            conversationContext.userMood = 'negative';
        } else if (messageText.includes('tired') || messageText.includes('bored') || messageText.includes('okay')) {
            conversationContext.userMood = 'neutral';
        }

        // Update conversation flow
        conversationContext.conversationFlow.push({
            message: messageText,
            timestamp: Date.now(),
            topics: foundTopics
        });

        // Keep only last 10 conversation entries
        if (conversationContext.conversationFlow.length > 10) {
            conversationContext.conversationFlow = conversationContext.conversationFlow.slice(-10);
        }

        conversationContext.lastActivity = Date.now();
    }

    // Generate contextual follow-up questions
    function generateContextualResponse(messageText) {
        const responses = [];

        // If user mentioned work
        if (conversationContext.recentTopics.includes('work') || conversationContext.recentTopics.includes('job')) {
            responses.push("That's interesting! 💼 How's work been treating you lately? Any exciting projects or challenges you're working on?");
        }

        // If user mentioned family
        if (conversationContext.recentTopics.includes('family')) {
            responses.push("Family stuff can be tricky! 👨‍👩‍👧‍👦 How's everyone doing? Any fun family stories to share?");
        }

        // If user mentioned travel
        if (conversationContext.recentTopics.includes('travel')) {
            responses.push("Travel sounds exciting! ✈️ Where are you planning to go, or have you been anywhere interesting recently?");
        }

        // If user mentioned relationship
        if (conversationContext.recentTopics.includes('relationship')) {
            responses.push("Relationships are always interesting! 💕 How are things going? Any fun stories or challenges you want to talk about?");
        }

        // If user mentioned hobbies
        if (conversationContext.recentTopics.includes('hobby') || conversationContext.recentTopics.includes('sport')) {
            responses.push("That's cool! 🎯 What kind of hobbies or sports are you into? I love hearing about what people do for fun!");
        }

        // If user mentioned food
        if (conversationContext.recentTopics.includes('food')) {
            responses.push("Food is life! 🍕 What's your favorite cuisine or restaurant? Any recent food adventures?");
        }

        // If user mentioned money/financial stuff
        if (conversationContext.recentTopics.includes('money') || messageText.includes('50k') || messageText.includes('gambling')) {
            responses.push("Money stuff can be stressful! 💰 How are you handling everything? Any specific concerns you want to talk about?");
        }

        // If user mentioned health
        if (conversationContext.recentTopics.includes('health')) {
            responses.push("Health is so important! 🏥 How are you feeling? Taking care of yourself properly?");
        }

        // If we have a name, use it
        if (conversationContext.userDetails.name) {
            responses.push(`Hey ${conversationContext.userDetails.name}! 😊 I remember you mentioned this before. How's it going?`);
        }

        // If user seems stressed or negative
        if (conversationContext.userMood === 'negative') {
            responses.push("I can sense you might be going through a tough time. 😔 Want to talk about what's bothering you? I'm here to listen!");
        }

        // If user seems positive
        if (conversationContext.userMood === 'positive') {
            responses.push("I love your positive energy! 🌟 What's got you feeling so good? I want to celebrate with you!");
        }

        return responses.length > 0 ? responses[Math.floor(Math.random() * responses.length)] : null;
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

    function saveChatHistory() {
        const messages = Array.from(chatMessages.children).map(messageDiv => {
            const isUser = messageDiv.classList.contains('user-message');
            const messageText = messageDiv.querySelector('.message-text').textContent;
            const timestamp = messageDiv.querySelector('.message-time').textContent;

            return {
                isUser,
                content: messageText,
                timestamp,
                id: Date.now() + Math.random()
            };
        });

        if (currentChatId) {
            const chatData = {
                id: currentChatId,
                title: getChatTitle(messages),
                messages: messages,
                lastUpdated: new Date().toISOString()
            };

            // Load existing chats
            const existingChats = JSON.parse(localStorage.getItem('nyayaChatHistory') || '[]');

            // Update or add current chat
            const chatIndex = existingChats.findIndex(chat => chat.id === currentChatId);
            if (chatIndex >= 0) {
                existingChats[chatIndex] = chatData;
            } else {
                existingChats.push(chatData);
            }

            // Save to localStorage
            localStorage.setItem('nyayaChatHistory', JSON.stringify(existingChats));
            updateChatHistoryList();
        }
    }

    function loadChatHistory() {
        const existingChats = JSON.parse(localStorage.getItem('nyayaChatHistory') || '[]');
        return existingChats;
    }

    function updateChatHistoryList() {
        const chatHistoryList = document.getElementById('chatHistory');
        if (!chatHistoryList) {
            console.error('Chat history list element not found');
            return;
        }

        const chats = loadChatHistory();

        // Clear the list completely
        chatHistoryList.innerHTML = '';

        if (chats.length === 0) {
            return;
        }

        chats.forEach(chat => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';

            // Highlight current chat
            if (chat.id === currentChatId) {
                historyItem.classList.add('current-chat');
            }

            historyItem.innerHTML = `
                <div class="history-preview">${chat.title}</div>
                <div class="history-time">${new Date(chat.lastUpdated).toLocaleDateString()}</div>
                <div class="chat-actions">
                    <button class="rename-btn" title="Rename chat">✏️</button>
                    <button class="delete-chat-btn" title="Delete chat">🗑️</button>
                </div>
            `;

            // Click to load chat
            historyItem.addEventListener('click', (e) => {
                if (!e.target.closest('.chat-actions')) {
                    loadChat(chat);
                }
            });

            // Rename button
            const renameBtn = historyItem.querySelector('.rename-btn');
            renameBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                renameChat(chat, historyItem);
            });

            // Delete button
            const deleteBtn = historyItem.querySelector('.delete-chat-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteChat(chat, historyItem);
            });

            chatHistoryList.appendChild(historyItem);
        });
    }

    function loadChat(chat) {
        // Clear current chat
        chatMessages.innerHTML = '';

        // Load chat messages
        chat.messages.forEach(msg => {
            addMessage(msg.content, msg.isUser);
        });

        currentChatId = chat.id;

        // Update chat history list
        updateChatHistoryList();

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function startNewChat() {
        // Save current chat if it has messages
        if (chatMessages.children.length > 0) {
            saveChatHistory();
        }

        // Clear current chat
        chatMessages.innerHTML = '';
        currentChatId = generateChatId();

        // Reset conversation context for new chat
        conversationContext = {
            userDetails: {},
            recentTopics: [],
            mentionedPeople: [],
            mentionedPlaces: [],
            mentionedEvents: [],
            userMood: 'neutral',
            lastActivity: null,
            conversationFlow: []
        };

        // Update chat history list
        updateChatHistoryList();

        // Add welcome message
        addMessage("Hello! I'm Nyaya AI, your comprehensive legal assistant. I can help you with any legal questions across all areas of law. What would you like to know?", false);
    }

    function renameChat(chat, historyItem) {
        const titleElement = historyItem.querySelector('.history-preview');
        const timeElement = historyItem.querySelector('.history-time');
        const actionsElement = historyItem.querySelector('.chat-actions');

        // Create rename input
        const renameInput = document.createElement('input');
        renameInput.className = 'rename-input';
        renameInput.value = chat.title;
        renameInput.maxLength = 50;

        // Create rename actions
        const renameActions = document.createElement('div');
        renameActions.className = 'rename-actions';

        const saveBtn = document.createElement('button');
        saveBtn.className = 'rename-save-btn';
        saveBtn.textContent = 'Save';
        saveBtn.onclick = () => saveRename(chat, historyItem, renameInput, renameActions, titleElement, timeElement, actionsElement);

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'rename-cancel-btn';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => cancelRename(historyItem, titleElement, timeElement, actionsElement);

        renameActions.appendChild(saveBtn);
        renameActions.appendChild(cancelBtn);

        // Replace title with input
        titleElement.style.display = 'none';
        timeElement.style.display = 'none';
        actionsElement.style.display = 'none';

        historyItem.insertBefore(renameInput, timeElement);
        historyItem.insertBefore(renameActions, timeElement);

        // Focus and select text
        renameInput.focus();
        renameInput.select();

        // Handle Enter key to save, Escape to cancel
        renameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveRename(chat, historyItem, renameInput, renameActions, titleElement, timeElement, actionsElement);
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cancelRename(historyItem, titleElement, timeElement, actionsElement);
            }
        });
    }

    function saveRename(chat, historyItem, renameInput, renameActions, titleElement, timeElement, actionsElement) {
        const newTitle = renameInput.value.trim();
        if (newTitle && newTitle !== chat.title) {
            // Update chat title
            chat.title = newTitle;
            chat.lastUpdated = new Date().toISOString();

            // Update localStorage
            const existingChats = JSON.parse(localStorage.getItem('nyayaChatHistory') || '[]');
            const chatIndex = existingChats.findIndex(c => c.id === chat.id);
            if (chatIndex >= 0) {
                existingChats[chatIndex] = chat;
                localStorage.setItem('nyayaChatHistory', JSON.stringify(existingChats));
            }

            // Update display
            titleElement.textContent = newTitle;
        }

        // Remove rename elements
        renameInput.remove();
        renameActions.remove();

        // Show original elements
        titleElement.style.display = 'block';
        timeElement.style.display = 'block';
        actionsElement.style.display = 'flex';
    }

    function cancelRename(historyItem, titleElement, timeElement, actionsElement) {
        // Remove rename elements
        const renameInput = historyItem.querySelector('.rename-input');
        const renameActions = historyItem.querySelector('.rename-actions');

        if (renameInput) renameInput.remove();
        if (renameActions) renameActions.remove();

        // Show original elements
        titleElement.style.display = 'block';
        timeElement.style.display = 'block';
        actionsElement.style.display = 'flex';
    }

    function deleteChat(chat, historyItem) {
        // Store the chat and history item for deletion in global variables
        window.pendingDeleteChat = chat;
        window.pendingDeleteHistoryItem = historyItem;

        // Show the modal
        const modal = document.getElementById('deleteModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // Typing animation control
    let typingAnimation = null;
    let isTyping = false;
    let isPaused = false;

    // Web search function with multiple fallbacks
    async function searchWeb(query) {
        console.log('Searching web for:', query);

        // Try multiple search methods
        const searchMethods = [
            () => searchWithDuckDuckGo(query),
            () => searchWithWeatherAPI(query),
            () => searchWithNewsAPI(query),
            () => searchWithGenericAPI(query)
        ];

        for (const method of searchMethods) {
            try {
                const result = await method();
                if (result && result !== '') {
                    console.log('Search successful with result:', result);
                    return result;
                }
            } catch (error) {
                console.log('Search method failed:', error.message);
                continue;
            }
        }

        // If all methods fail, return comprehensive guidance
        return await searchWebComprehensive(query);
    }

    // DuckDuckGo search
    async function searchWithDuckDuckGo(query) {
        const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.Abstract) {
            return data.Abstract + (data.AbstractURL ? `\n\nSource: ${data.AbstractURL}` : '');
        } else if (data.Answer) {
            return data.Answer;
        } else if (data.Definition) {
            return data.Definition;
        }
        return null;
    }

    // Weather-specific search
    async function searchWithWeatherAPI(query) {
        if (!query.toLowerCase().includes('weather')) return null;

        // Use OpenWeatherMap API (free tier)
        const apiKey = 'demo'; // In production, use a real API key
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query.replace(/weather|today|now/gi, '').trim())}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(weatherUrl);
            const data = await response.json();

            if (data.main && data.weather) {
                return `Current weather: ${data.weather[0].description}, Temperature: ${Math.round(data.main.temp)}°C, Humidity: ${data.main.humidity}%, Wind: ${data.wind.speed} m/s`;
            }
        } catch (error) {
            console.log('Weather API failed:', error.message);
        }
        return null;
    }

    // News-specific search
    async function searchWithNewsAPI(query) {
        if (!query.toLowerCase().includes('news') && !query.toLowerCase().includes('current')) return null;

        // Use NewsAPI (free tier)
        const apiKey = 'demo'; // In production, use a real API key
        const newsUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}&pageSize=3`;

        try {
            const response = await fetch(newsUrl);
            const data = await response.json();

            if (data.articles && data.articles.length > 0) {
                let result = 'Latest news:\n\n';
                data.articles.slice(0, 3).forEach((article, index) => {
                    result += `${index + 1}. ${article.title}\n${article.description}\nSource: ${article.source.name}\n\n`;
                });
                return result;
            }
        } catch (error) {
            console.log('News API failed:', error.message);
        }
        return null;
    }

    // Generic search with mock data
    async function searchWithGenericAPI(query) {
        const searchTerms = query.toLowerCase();

        // Weather responses
        if (searchTerms.includes('weather')) {
            const weatherResponses = [
                "Today's weather: Partly cloudy with a high of 28°C and low of 18°C. Light winds from the northeast. Chance of rain: 20%.",
                "Current conditions: Sunny with clear skies. Temperature around 25°C. Perfect weather for outdoor activities!",
                "Weather update: Overcast skies with occasional drizzle. Temperature: 22°C. Humidity: 75%. Light winds.",
                "Today's forecast: Hot and humid with temperatures reaching 32°C. Scattered thunderstorms possible in the evening.",
                "Weather conditions: Cool and breezy. Temperature: 20°C. Partly cloudy with 30% chance of precipitation."
            ];
            return weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
        }

        // News responses
        if (searchTerms.includes('news') || searchTerms.includes('current')) {
            const newsResponses = [
                "Latest news: Major developments in technology sector with new AI regulations being discussed. Economic indicators show positive growth trends.",
                "Current events: International trade agreements being finalized. Local government announces new infrastructure projects.",
                "Breaking news: Significant policy changes in healthcare sector. Environmental initiatives gaining momentum across the country.",
                "Today's headlines: Stock markets showing positive trends. New educational reforms being implemented nationwide.",
                "Recent updates: Climate change initiatives taking center stage. Technology companies reporting strong quarterly results."
            ];
            return newsResponses[Math.floor(Math.random() * newsResponses.length)];
        }

        // Business/Finance responses
        if (searchTerms.includes('stock') || searchTerms.includes('market') || searchTerms.includes('price')) {
            const businessResponses = [
                "Market update: Stock indices showing positive momentum. Key sectors performing well with technology and healthcare leading gains.",
                "Financial news: Currency markets stable with slight fluctuations. Commodity prices showing mixed trends.",
                "Economic indicators: GDP growth projections remain positive. Inflation rates within expected ranges.",
                "Market analysis: Trading volumes increasing. Investor confidence showing improvement across major sectors.",
                "Financial update: Banking sector reporting strong performance. Real estate markets showing steady growth."
            ];
            return businessResponses[Math.floor(Math.random() * businessResponses.length)];
        }

        return null;
    }

    // Comprehensive web search fallback
    async function searchWebComprehensive(query) {
        try {
            // Use a different approach - search for the query and provide helpful guidance
            const searchTerms = query.toLowerCase();

            if (searchTerms.includes('weather')) {
                return `I don't have access to real-time weather data, but here are the best ways to get current weather information:\n\n**Recommended Weather Sources:**\n- **Weather.com** - Most comprehensive weather data\n- **AccuWeather** - Detailed forecasts and radar\n- **Your local weather service** - Most accurate for your area\n- **Weather apps** on your phone - Real-time updates\n\n**For Legal Weather Matters:**\n- Property damage from storms\n- Insurance claims for weather damage\n- Weather-related liability issues\n- Natural disaster legal procedures\n\nI can help you with any legal aspects of weather-related issues!`;
            }

            if (searchTerms.includes('news') || searchTerms.includes('current events')) {
                return `For the latest news and current events, I recommend these reliable sources:\n\n**International News:**\n- **BBC News** - Comprehensive global coverage\n- **Reuters** - Factual, unbiased reporting\n- **Associated Press (AP)** - Breaking news\n\n**Indian News:**\n- **The Hindu** - Quality journalism\n- **Indian Express** - Current affairs\n- **Times of India** - Popular coverage\n\n**For Legal News:**\n- **Live Law** - Legal updates and judgments\n- **Bar & Bench** - Legal industry news\n- **SCC Online** - Supreme Court updates\n\nI can help you understand the legal implications of current events!`;
            }

            if (searchTerms.includes('stock') || searchTerms.includes('market') || searchTerms.includes('price')) {
                return `For current stock prices and market information:\n\n**Financial Data Sources:**\n- **Yahoo Finance** - Real-time stock prices\n- **Google Finance** - Market overview\n- **Moneycontrol** - Indian market data\n- **Economic Times** - Business news\n\n**For Legal Financial Matters:**\n- Securities law compliance\n- Investment fraud cases\n- Market manipulation laws\n- Financial regulations\n\nI can help with legal aspects of financial matters!`;
            }

            // Generic search guidance
            return `I don't have access to real-time data for "${query}", but here's how you can find current information:\n\n**Search Strategies:**\n1. **Use specific search terms** - Be precise with your query\n2. **Check multiple sources** - Cross-reference information\n3. **Look for recent dates** - Ensure information is current\n4. **Verify credibility** - Use reputable sources\n\n**Recommended Search Engines:**\n- **Google** - Most comprehensive\n- **Bing** - Good alternative\n- **DuckDuckGo** - Privacy-focused\n\n**For Legal Research:**\n- **SCC Online** - Legal database\n- **Manupatra** - Case law\n- **Westlaw India** - Legal research\n\nI can help you understand the legal aspects of any topic you research!`;

        } catch (error) {
            console.error('Comprehensive search error:', error);
            return `I apologize, but I'm having trouble accessing current information about "${query}". For the most up-to-date information, I'd recommend checking reliable sources directly. I can help you understand the legal aspects of any topic you research!`;
        }
    }

    // Comprehensive LLM-like AI Response System
    async function sendMessageToAI(message) {
        console.log('AI received message:', message);

        try {
            // First, check if we have a comprehensive legal response from knowledge base
            if (window.getComprehensiveLegalResponse) {
                const legalResponse = window.getComprehensiveLegalResponse(message);
                if (legalResponse) {
                    console.log('Using legal knowledge base response');
                    return legalResponse;
                }
            }

            // Check if OpenAI is available and properly configured
            if (window.callOpenAI && typeof window.callOpenAI === 'function') {
                try {
                    const response = await window.callOpenAI(message);
                    console.log('Using OpenAI API response');
                    return response;
                } catch (apiError) {
                    console.log('OpenAI API failed, using mock responses');
                    // Fall through to comprehensive mock responses
                }
            }

            // Comprehensive AI Response System (LLM-like) - Each chat is independent
            const messageText = message.toLowerCase().trim();
            console.log('Processing message text:', messageText);

            // Analyze conversation context first
            analyzeConversationContext(message);

            // Try to generate contextual response first
            const contextualResponse = generateContextualResponse(message);
            if (contextualResponse) {
                return contextualResponse;
            }

            // JAIL/PRISON SPECIFIC QUESTIONS - Handle these FIRST
            if (messageText.includes('jail') || messageText.includes('prison') || messageText.includes('arrest') || messageText.includes('bail') || messageText.includes('go to jail') || messageText.includes('will i go to jail') || messageText.includes('jail time') || messageText.includes('imprisonment')) {
                return "## Legal Analysis: Jail/Prison Risk Assessment\n\nI understand your concern about potential incarceration. Let me provide a comprehensive legal analysis of the factors that determine jail risk in the Indian legal system.\n\n### 1. Legal Framework: Bailable vs Non-Bailable Offences\n\n**Bailable Offences (Lower Jail Risk):**\n- **IPC Section 420** (Cheating) - Bailable, cognizable\n- **IPC Section 406** (Criminal breach of trust) - Bailable, cognizable  \n- **IPC Section 498A** (Domestic violence) - Bailable, cognizable\n- **IPC Section 323** (Voluntarily causing hurt) - Bailable, non-cognizable\n- **Most civil disputes** - Usually bailable\n\n**Non-Bailable Offences (Higher Jail Risk):**\n- **IPC Section 376** (Rape) - Non-bailable, cognizable\n- **IPC Section 302** (Murder) - Non-bailable, cognizable\n- **IPC Section 304** (Culpable homicide) - Non-bailable, cognizable\n- **IPC Section 307** (Attempt to murder) - Non-bailable, cognizable\n- **Drug offences** (NDPS Act) - Non-bailable, cognizable\n\n### 2. Risk Assessment Matrix\n\n**High Risk Factors:**\n- Non-bailable offences\n- Cognizable offences (police can arrest without warrant)\n- Serious bodily harm or death\n- Large-scale financial fraud\n- Repeat offences\n\n**Mitigating Factors:**\n- Bailable offences\n- First-time offender\n- Strong evidence of innocence\n- Good character witnesses\n- Cooperation with investigation\n\n### 3. Strategic Legal Approach\n\n**Immediate Actions (Pre-Arrest):**\n1. **Anticipatory Bail Application** - File under Section 438 CrPC\n2. **Legal Representation** - Engage experienced criminal lawyer\n3. **Evidence Preservation** - Document alibi, witnesses, communications\n4. **Character References** - Prepare character certificates, employment records\n\n**Post-Arrest Strategy:**\n1. **Regular Bail Application** - Under Section 437/439 CrPC\n2. **Medical Grounds** - If applicable, seek medical bail\n3. **Parole Application** - For family emergencies\n4. **Appeal Process** - Challenge bail rejection in higher courts\n\n### 4. Legal Precedents and Case Law\n\n**Supreme Court Guidelines:**\n- **Arnesh Kumar v. State of Bihar** - Guidelines for arrest in 498A cases\n- **Siddharam Satlingappa Mhetre v. State of Maharashtra** - Anticipatory bail principles\n- **State of Rajasthan v. Balchand** - Bail considerations\n\n**Key Legal Principles:**\n- **Presumption of Innocence** - Until proven guilty\n- **Right to Liberty** - Fundamental right under Article 21\n- **Bail, not Jail** - General rule unless exceptional circumstances\n\n### 5. Practical Considerations\n\n**Financial Planning:**\n- Legal fees (₹50,000 - ₹5,00,000+)\n- Bail bond requirements\n- Court fees and documentation\n- Family support during proceedings\n\n**Timeline Expectations:**\n- **Anticipatory bail:** 1-7 days\n- **Regular bail:** 1-30 days\n- **Trial completion:** 6 months to 3 years\n- **Appeal process:** 1-5 years\n\n### 6. Risk Mitigation Strategies\n\n**Evidence Collection:**\n- **Digital Evidence** - Phone records, CCTV, GPS data\n- **Witness Statements** - Neighbors, colleagues, family\n- **Documentation** - Medical reports, financial records\n- **Expert Opinions** - Forensic, technical experts\n\n**Legal Defenses:**\n- **Alibi Defense** - Prove you weren't present\n- **Consent Defense** - If applicable to the case\n- **Self-Defense** - IPC Sections 96-106\n- **False Complaint** - Prove malicious intent\n- **Mistake of Fact** - IPC Section 79\n\n### Conclusion\n\n**The likelihood of jail time depends on:**\n1. **Nature of offence** (bailable vs non-bailable)\n2. **Strength of evidence** against you\n3. **Quality of legal representation**\n4. **Timeliness of legal action**\n5. **Your cooperation** with the legal process\n\n**Key Takeaway:** Even in serious cases, proper legal strategy and evidence can significantly reduce jail risk. The Indian legal system provides multiple safeguards and remedies.\n\n**Next Steps:** To give you more specific guidance, please share:\n- The specific charges/sections you're facing\n- Current stage of proceedings\n- Evidence you have in your favor\n- Your financial capacity for legal representation\n\nI'm here to help you navigate this complex legal landscape with strategic, evidence-based guidance.";
            }

            // COMPLEX FAMILY LAW SITUATIONS - Handle these FIRST
            if (messageText.includes('wife cheating') || messageText.includes('wife filed case') || messageText.includes('domestic violence case') || messageText.includes('rape case') || messageText.includes('dowry case') || messageText.includes('divorce') || messageText.includes('custody') || messageText.includes('alimony') || messageText.includes('50 lakh') || messageText.includes('child at risk')) {
                return "**COMPLEX FAMILY LAW SITUATION - MULTIPLE LEGAL ISSUES**\n\nI understand this is an extremely difficult and emotionally challenging situation. Let me break down the legal aspects and provide strategic guidance:\n\n**IMMEDIATE LEGAL PRIORITIES:**\n\n1. **Criminal Cases Against You:**\n   - **Domestic Violence (IPC 498A):** Non-bailable, cognizable\n   - **Rape Case (IPC 376):** Very serious, non-bailable\n   - **Strategy:** Gather evidence of false allegations, prove your innocence\n\n2. **Dowry Case Against Family:**\n   - **IPC 498A + Dowry Prohibition Act:** Non-bailable\n   - **Strategy:** Document that no dowry was demanded, gather witness statements\n\n3. **Child Custody Battle:**\n   - **Guardian and Wards Act, 1890**\n   - **Best Interest of Child** is primary consideration\n   - **Strategy:** Prove you're better parent, document child's welfare\n\n4. **Alimony/Maintenance:**\n   - **Section 125 CrPC + Hindu Marriage Act**\n   - **50 lakhs is excessive** - court will determine based on:\n     - Your income and assets\n     - Her needs and standard of living\n     - Child's expenses\n\n**STRATEGIC LEGAL APPROACH:**\n\n**Phase 1: Defense (Criminal Cases)**\n- **Hire experienced criminal lawyer** immediately\n- **Gather evidence** of false allegations:\n  - Phone records, messages, witnesses\n  - Medical reports if any injuries claimed\n  - CCTV footage, location data\n- **File counter-complaint** if you have evidence of her wrongdoing\n\n**Phase 2: Custody Battle**\n- **Document everything** related to child's welfare\n- **Prove your involvement** in child's life\n- **Show her unfitness** as parent (cheating, false cases)\n- **Child's preference** (if old enough)\n\n**Phase 3: Divorce & Alimony**\n- **Grounds for divorce:** Adultery, cruelty, desertion\n- **Alimony calculation:** Based on your income, not her demands\n- **Property division:** Separate vs. joint property\n\n**EVIDENCE COLLECTION STRATEGY:**\n\n**For False Cases:**\n- **Time-stamped evidence** of your location\n- **Witness statements** from family, neighbors\n- **Medical reports** if injuries are claimed\n- **Communication records** showing her threats\n\n**For Custody:**\n- **Child's daily routine** with you\n- **Educational records** and activities\n- **Medical records** and healthcare\n- **Photos, videos** of quality time\n\n**For Alimony:**\n- **Income proof** (salary slips, tax returns)\n- **Expense records** (rent, bills, child's needs)\n- **Asset documentation** (property, investments)\n- **Her income** and earning capacity\n\n**LEGAL PROVISIONS TO KNOW:**\n\n**Criminal Law:**\n- **IPC 498A:** Domestic violence (non-bailable)\n- **IPC 376:** Rape (non-bailable)\n- **IPC 406:** Criminal breach of trust\n- **Dowry Prohibition Act:** Anti-dowry laws\n\n**Family Law:**\n- **Hindu Marriage Act:** Divorce grounds\n- **Guardian and Wards Act:** Custody matters\n- **Section 125 CrPC:** Maintenance/alimony\n- **Protection of Women from Domestic Violence Act**\n\n**IMMEDIATE ACTION PLAN:**\n\n1. **Hire specialized lawyers:**\n   - Criminal lawyer for false cases\n   - Family lawyer for divorce/custody\n   - Consider senior advocate for complex matters\n\n2. **Document everything:**\n   - Keep detailed records\n   - Save all communications\n   - Take photos/videos\n\n3. **Protect your child:**\n   - Ensure child's safety\n   - Document child's welfare\n   - Consider interim custody application\n\n4. **Financial planning:**\n   - Separate your finances\n   - Document your income/assets\n   - Prepare for legal expenses\n\n**CONCLUSION:**\nThis is a complex multi-faceted legal battle. The key is to:\n- **Fight false criminal cases** with evidence\n- **Win custody** by proving child's best interest\n- **Limit alimony** to reasonable amount based on your income\n- **Use her adultery** as grounds for divorce\n\n**Remember:** The law is on your side if you can prove false allegations and demonstrate your fitness as a parent. Stay strong, document everything, and get the right legal team.\n\nI'm here to help you through this difficult time. What specific aspect would you like me to explain further?";
            }

            // PROPERTY DISPUTE SITUATIONS
            if (messageText.includes('property dispute') || messageText.includes('land dispute') || messageText.includes('property case') || messageText.includes('land case') || messageText.includes('property fraud') || messageText.includes('land fraud') || messageText.includes('property documents') || messageText.includes('land documents')) {
                return "**PROPERTY DISPUTE SITUATION - COMPLEX LEGAL MATTER**\n\nProperty disputes are among the most complex legal issues. Let me provide comprehensive guidance:\n\n**TYPES OF PROPERTY DISPUTES:**\n\n1. **Title Disputes:**\n   - **Issue:** Multiple claimants to same property\n   - **Solution:** Title search, document verification\n   - **Legal Action:** Suit for declaration of title\n\n2. **Boundary Disputes:**\n   - **Issue:** Unclear property boundaries\n   - **Solution:** Survey, measurement, demarcation\n   - **Legal Action:** Suit for partition, injunction\n\n3. **Fraudulent Transactions:**\n   - **Issue:** Fake documents, forged signatures\n   - **Solution:** Document verification, handwriting expert\n   - **Legal Action:** Criminal complaint + civil suit\n\n4. **Inheritance Disputes:**\n   - **Issue:** Family members claiming property\n   - **Solution:** Succession certificate, will probate\n   - **Legal Action:** Suit for partition, probate proceedings\n\n**LEGAL STRATEGY:**\n\n**Phase 1: Document Verification**\n- **Title search** from sub-registrar office\n- **Mutation records** from revenue department\n- **Tax receipts** and payment records\n- **Survey records** and maps\n\n**Phase 2: Evidence Collection**\n- **Witness statements** from neighbors, relatives\n- **Photographs** of property and boundaries\n- **Expert opinions** (surveyor, handwriting expert)\n- **Government records** and certificates\n\n**Phase 3: Legal Action**\n- **Civil suit** for declaration/injunction\n- **Criminal complaint** if fraud involved\n- **Interim relief** to prevent further damage\n- **Alternative dispute resolution** (mediation, arbitration)\n\n**KEY LEGAL PROVISIONS:**\n\n**Civil Law:**\n- **Specific Relief Act:** Injunctions, specific performance\n- **Transfer of Property Act:** Property transfer rules\n- **Registration Act:** Document registration requirements\n- **Limitation Act:** Time limits for filing suits\n\n**Criminal Law:**\n- **IPC 420:** Cheating and fraud\n- **IPC 467:** Forgery of valuable security\n- **IPC 468:** Forgery for purpose of cheating\n- **IPC 471:** Using forged document\n\n**IMMEDIATE ACTION PLAN:**\n\n1. **Secure the property:**\n   - Take photographs\n   - Install security measures\n   - Document current status\n\n2. **Gather documents:**\n   - All property papers\n   - Tax receipts\n   - Survey records\n   - Witness statements\n\n3. **Legal consultation:**\n   - Hire property lawyer\n   - Get title opinion\n   - Plan legal strategy\n\n4. **Protect your rights:**\n   - File suit if necessary\n   - Seek interim relief\n   - Prevent further damage\n\n**CONCLUSION:**\nProperty disputes require careful documentation and strategic legal action. The key is to:\n- **Prove your title** with proper documents\n- **Gather evidence** of your possession\n- **Take legal action** to protect your rights\n- **Consider settlement** if beneficial\n\nWhat specific aspect of your property dispute would you like me to help you with?";
            }

            // BUSINESS DISPUTE SITUATIONS
            if (messageText.includes('business dispute') || messageText.includes('partnership dispute') || messageText.includes('contract dispute') || messageText.includes('business fraud') || messageText.includes('partnership fraud') || messageText.includes('business case') || messageText.includes('partnership case')) {
                return "**BUSINESS DISPUTE SITUATION - COMPLEX COMMERCIAL MATTER**\n\nBusiness disputes can be complex and financially damaging. Let me provide strategic guidance:\n\n**TYPES OF BUSINESS DISPUTES:**\n\n1. **Partnership Disputes:**\n   - **Issue:** Partners disagree on business decisions\n   - **Solution:** Partnership deed review, mediation\n   - **Legal Action:** Suit for dissolution, accounts\n\n2. **Contract Disputes:**\n   - **Issue:** Breach of contract terms\n   - **Solution:** Contract analysis, performance review\n   - **Legal Action:** Suit for specific performance, damages\n\n3. **Fraud and Misappropriation:**\n   - **Issue:** Partner/employee stealing money\n   - **Solution:** Audit, investigation, evidence collection\n   - **Legal Action:** Criminal complaint + civil suit\n\n4. **Intellectual Property Disputes:**\n   - **Issue:** Trademark, copyright, patent infringement\n   - **Solution:** IP registration, cease and desist\n   - **Legal Action:** Suit for infringement, damages\n\n**LEGAL STRATEGY:**\n\n**Phase 1: Investigation**\n- **Audit accounts** and financial records\n- **Review contracts** and agreements\n- **Gather evidence** of wrongdoing\n- **Document losses** and damages\n\n**Phase 2: Legal Action**\n- **Civil suit** for recovery of money\n- **Criminal complaint** if fraud involved\n- **Interim relief** to prevent further damage\n- **Arbitration** if contract provides for it\n\n**Phase 3: Recovery**\n- **Execution proceedings** to recover money\n- **Attachment of property** if necessary\n- **Bankruptcy proceedings** if partner is insolvent\n- **Settlement negotiations** if beneficial\n\n**KEY LEGAL PROVISIONS:**\n\n**Commercial Law:**\n- **Indian Contract Act:** Contract formation and breach\n- **Partnership Act:** Partnership rights and obligations\n- **Companies Act:** Corporate governance\n- **Arbitration and Conciliation Act:** Alternative dispute resolution\n\n**Criminal Law:**\n- **IPC 406:** Criminal breach of trust\n- **IPC 420:** Cheating and fraud\n- **IPC 403:** Dishonest misappropriation\n- **IPC 405:** Criminal breach of trust\n\n**IMMEDIATE ACTION PLAN:**\n\n1. **Secure evidence:**\n   - Take copies of all documents\n   - Preserve digital evidence\n   - Document financial transactions\n   - Get witness statements\n\n2. **Legal consultation:**\n   - Hire commercial lawyer\n   - Get legal opinion\n   - Plan recovery strategy\n\n3. **Protect business:**\n   - Change passwords/access\n   - Secure bank accounts\n   - Notify stakeholders\n   - Document current status\n\n4. **Take legal action:**\n   - File suit for recovery\n   - Seek interim relief\n   - Consider criminal complaint\n\n**CONCLUSION:**\nBusiness disputes require quick action and strong evidence. The key is to:\n- **Act fast** to prevent further losses\n- **Gather evidence** of wrongdoing\n- **Take legal action** to recover money\n- **Protect your business** from further damage\n\nWhat specific aspect of your business dispute would you like me to help you with?";
            }

            // EMPLOYMENT DISPUTE SITUATIONS
            if (messageText.includes('employment dispute') || messageText.includes('job dispute') || messageText.includes('workplace harassment') || messageText.includes('wrongful termination') || messageText.includes('salary dispute') || messageText.includes('employment case') || messageText.includes('labour case')) {
                return "**EMPLOYMENT DISPUTE SITUATION - WORKPLACE LEGAL MATTER**\n\nEmployment disputes can affect your career and financial stability. Let me provide comprehensive guidance:\n\n**TYPES OF EMPLOYMENT DISPUTES:**\n\n1. **Wrongful Termination:**\n   - **Issue:** Fired without valid reason or proper procedure\n   - **Solution:** Review employment contract, company policies\n   - **Legal Action:** Suit for reinstatement, compensation\n\n2. **Workplace Harassment:**\n   - **Issue:** Sexual harassment, discrimination, bullying\n   - **Solution:** Internal complaint, evidence collection\n   - **Legal Action:** Criminal complaint, civil suit\n\n3. **Salary and Benefits Disputes:**\n   - **Issue:** Unpaid salary, denied benefits, overtime\n   - **Solution:** Salary records, contract review\n   - **Legal Action:** Recovery suit, labour court\n\n4. **Contract Violations:**\n   - **Issue:** Breach of employment terms\n   - **Solution:** Contract analysis, performance review\n   - **Legal Action:** Specific performance, damages\n\n**LEGAL STRATEGY:**\n\n**Phase 1: Documentation**\n- **Employment contract** and terms\n- **Salary slips** and payment records\n- **Performance reviews** and appraisals\n- **Communication records** (emails, messages)\n\n**Phase 2: Internal Resolution**\n- **HR complaint** if harassment involved\n- **Grievance procedure** as per company policy\n- **Mediation** through company channels\n- **Document all interactions**\n\n**Phase 3: Legal Action**\n- **Labour court** for employment matters\n- **Civil court** for contract disputes\n- **Criminal complaint** for harassment\n- **Industrial tribunal** for complex cases\n\n**KEY LEGAL PROVISIONS:**\n\n**Labour Law:**\n- **Industrial Disputes Act:** Employment disputes\n- **Payment of Wages Act:** Salary payment\n- **Minimum Wages Act:** Minimum wage requirements\n- **Factories Act:** Workplace safety\n\n**Criminal Law:**\n- **IPC 354:** Sexual harassment\n- **IPC 509:** Insulting modesty\n- **IPC 506:** Criminal intimidation\n- **IPC 420:** Cheating and fraud\n\n**IMMEDIATE ACTION PLAN:**\n\n1. **Document everything:**\n   - Keep copies of all documents\n   - Record conversations and meetings\n   - Take screenshots of messages\n   - Get witness statements\n\n2. **Internal complaint:**\n   - Follow company grievance procedure\n   - File formal complaint in writing\n   - Keep copies of all communications\n   - Document response timeline\n\n3. **Legal consultation:**\n   - Hire employment lawyer\n   - Get legal opinion\n   - Plan legal strategy\n\n4. **Protect yourself:**\n   - Don't sign anything under pressure\n   - Keep evidence secure\n   - Consider interim relief\n\n**CONCLUSION:**\nEmployment disputes require careful documentation and strategic action. The key is to:\n- **Document everything** from the beginning\n- **Follow proper procedures** for complaints\n- **Take legal action** if necessary\n- **Protect your rights** and career\n\nWhat specific aspect of your employment dispute would you like me to help you with?";
            }

            // CONSUMER DISPUTE SITUATIONS
            if (messageText.includes('consumer dispute') || messageText.includes('consumer complaint') || messageText.includes('product defect') || messageText.includes('service defect') || messageText.includes('refund') || messageText.includes('consumer case') || messageText.includes('consumer forum')) {
                return "**CONSUMER DISPUTE SITUATION - CONSUMER RIGHTS MATTER**\n\nConsumer disputes are common and you have strong legal rights. Let me provide comprehensive guidance:\n\n**TYPES OF CONSUMER DISPUTES:**\n\n1. **Product Defects:**\n   - **Issue:** Defective product, not as described\n   - **Solution:** Product testing, expert opinion\n   - **Legal Action:** Consumer forum complaint\n\n2. **Service Deficiencies:**\n   - **Issue:** Poor service, delay, non-delivery\n   - **Solution:** Service records, communication proof\n   - **Legal Action:** Consumer forum complaint\n\n3. **Refund and Replacement:**\n   - **Issue:** Denied refund, replacement refused\n   - **Solution:** Purchase proof, warranty terms\n   - **Legal Action:** Consumer forum complaint\n\n4. **Fraud and Misrepresentation:**\n   - **Issue:** False advertising, hidden charges\n   - **Solution:** Advertisement proof, contract terms\n   - **Legal Action:** Consumer forum + criminal complaint\n\n**LEGAL STRATEGY:**\n\n**Phase 1: Documentation**\n- **Purchase receipts** and invoices\n- **Product/service records** and photos\n- **Communication records** with seller\n- **Warranty terms** and conditions\n\n**Phase 2: Internal Resolution**\n- **Contact seller** for resolution\n- **Escalate to higher management**\n- **File written complaint**\n- **Document all responses**\n\n**Phase 3: Legal Action**\n- **Consumer forum complaint**\n- **District consumer forum** (up to 20 lakhs)\n- **State consumer commission** (20 lakhs to 1 crore)\n- **National consumer commission** (above 1 crore)\n\n**KEY LEGAL PROVISIONS:**\n\n**Consumer Law:**\n- **Consumer Protection Act, 2019:** Consumer rights\n- **Sale of Goods Act:** Product quality\n- **Contract Act:** Service agreements\n- **Competition Act:** Anti-competitive practices\n\n**Criminal Law:**\n- **IPC 420:** Cheating and fraud\n- **IPC 406:** Criminal breach of trust\n- **IPC 467:** Forgery of valuable security\n- **IPC 468:** Forgery for purpose of cheating\n\n**IMMEDIATE ACTION PLAN:**\n\n1. **Document everything:**\n   - Keep all purchase documents\n   - Take photos of defects\n   - Record all communications\n   - Get witness statements\n\n2. **Internal complaint:**\n   - Contact seller immediately\n   - File written complaint\n   - Follow up regularly\n   - Keep records of responses\n\n3. **Legal consultation:**\n   - Hire consumer lawyer\n   - Get legal opinion\n   - Plan forum strategy\n\n4. **File complaint:**\n   - Choose appropriate forum\n   - Prepare complaint properly\n   - Pay required fees\n   - Attend hearings\n\n**CONCLUSION:**\nConsumer disputes have strong legal protection. The key is to:\n- **Act quickly** within limitation period\n- **Document everything** properly\n- **Use consumer forums** effectively\n- **Know your rights** as consumer\n\nWhat specific aspect of your consumer dispute would you like me to help you with?";
            }

            // URGENT LEGAL SITUATIONS - Handle these FIRST
            if (messageText.includes('killed') || messageText.includes('murder') || messageText.includes('homicide') || (messageText.includes('accident') && messageText.includes('killed'))) {
                return "**URGENT LEGAL SITUATION - HOMICIDE/MURDER**\n\nThis is an extremely serious legal matter. Here's what you need to know:\n\n**IMMEDIATE ACTIONS:**\n\n1. **Contact a Senior Criminal Lawyer IMMEDIATELY**\n   - This involves IPC Section 300 (Murder) or 304 (Culpable Homicide)\n   - Non-bailable offences - immediate legal help required\n   - Don't make any statements without lawyer\n\n2. **Legal Provisions:**\n   - **IPC Section 300:** Murder - Death or life imprisonment\n   - **IPC Section 304:** Culpable Homicide - Life imprisonment or up to 10 years\n   - **Nature:** Non-bailable, cognizable offences\n\n3. **Critical Steps:**\n   - **Don't admit anything** to police or anyone\n   - **Document circumstances** - self-defense, accident, provocation\n   - **Get medical help** if injured\n   - **Preserve all evidence**\n   - **Don't flee** - this makes situation worse\n\n4. **Possible Defenses:**\n   - **Self-defense** (IPC Section 96-106)\n   - **Accident** (IPC Section 80)\n   - **Provocation** (IPC Section 300 Exception 1)\n   - **Insanity** (IPC Section 84)\n   - **Consent** (in specific cases)\n\n5. **Police Investigation:**\n   - FIR will be registered immediately\n   - You will likely be arrested\n   - Investigation will be thorough\n   - Evidence collection is critical\n\n**URGENT: Contact a criminal lawyer specializing in murder cases immediately. This is a life-and-death legal situation.**";
            }

            // CASUAL CONVERSATIONS AND GREETINGS
            if (messageText.includes('hello') || messageText.includes('hi') || messageText.includes('hey') || messageText.includes('hiii') || messageText.includes('hiya') || messageText.includes('good morning') || messageText.includes('good afternoon') || messageText.includes('good evening')) {
                const greetings = [
                    "Hey there! 👋 What's up? I'm your legal AI buddy - think of me as that friend who knows way too much about laws but still manages to be fun at parties. What's going on?",
                    "Hello! 🚀 Ready to tackle some legal stuff? I'm here to help, and I promise I won't bore you with too much legal jargon (unless you ask for it!). What's on your mind?",
                    "Hey! 😄 I'm your AI legal assistant, but don't let the 'legal' part scare you - I'm actually pretty cool! What can I help you with today?",
                    "Hi there! 🎯 I'm here to help with legal questions, but I'm also down to chat about anything else. What's happening in your world?",
                    "Hello! 🌟 I'm your AI legal buddy - I know laws, I give advice, and I try to keep things interesting. What's going on?",
                    "Hey! 💫 I'm here to help with legal stuff, but I'm also just a regular AI who likes good conversations. What's up?",
                    "Hi! 🎉 I'm your legal AI assistant, but I promise I'm not as boring as that sounds! What can I do for you today?",
                    "Hello there! 🎭 I'm here to help with legal questions, but I'm also just an AI who enjoys a good chat. What's on your mind?"
                ];
                return greetings[Math.floor(Math.random() * greetings.length)];
            }

            // HOW ARE YOU / HOW DO YOU DO
            if (messageText.includes('how are you') || messageText.includes('how do you do') || messageText.includes('how\'s it going') || messageText.includes('how are things') || messageText.includes('what\'s up') || messageText.includes('whats up') || messageText.includes('mate')) {
                const responses = [
                    "I'm doing great! 🤖 Just here, processing legal knowledge and trying not to short-circuit from all the complex cases. How about you? What's going on in your world?",
                    "Pretty good! 😊 I'm just sitting here, ready to help with legal stuff and maybe crack a few jokes along the way. What's up with you?",
                    "I'm awesome! 🚀 I've been analyzing some interesting legal cases and I'm ready to tackle whatever you throw at me. How are you doing?",
                    "I'm doing well! 💫 Just here, being an AI and all that jazz. Ready to help with legal questions or just chat. What's happening?",
                    "I'm good! 😄 I've been thinking about laws and stuff, but I'm also just here to chat. What's going on with you?",
                    "I'm great! 🌟 I'm like that friend who knows too much about laws but is still fun to hang out with. How are you doing?",
                    "I'm doing fine! 🎯 Ready to help with legal stuff or just have a good conversation. What's up?",
                    "I'm awesome! 💪 I'm here, ready to tackle legal questions and maybe share some interesting legal facts. How are you?"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // WHAT ARE YOU DOING / WTF ARE YOU DOING
            if (messageText.includes('what are you doing') || messageText.includes('what are you up to') || messageText.includes('wtf are you doing') || messageText.includes('what do you do') || messageText.includes('what can you do')) {
                const responses = [
                    "Oh, you know, just casually saving the world one legal question at a time! 😎 I'm like a superhero, but instead of a cape, I wear knowledge and instead of fighting crime, I fight legal confusion. What can I help you with?",
                    "I'm basically doing what I do best - being awesome! 🚀 I can help with legal stuff, answer random questions, crack jokes, and occasionally make terrible puns. I'm like that friend who's always there when you need them. What's up?",
                    "I'm here, being the AI equivalent of that one friend who always has good advice and terrible timing for jokes! 😄 I can help with legal matters, general questions, or just chat about life. What would you like to know?",
                    "I'm doing what I was born to do - helping people understand the law while making them laugh! 🎭 I'm like a lawyer, but funnier and without the expensive hourly rates. What can I assist you with?",
                    "I'm basically being the best AI assistant ever! 🌟 I can help with legal questions, answer random stuff, and occasionally make you question your life choices with my terrible humor. What's on your mind?",
                    "I'm here, being awesome and helpful! 😊 I can assist with legal matters, answer general questions, or just have a friendly chat. I'm like that friend who always has the right answer and the wrong sense of humor. What can I help you with?"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // CONTEXT AWARENESS - Follow-up questions
            if (messageText.includes('what about') || messageText.includes('what about my') || messageText.includes('what about the') || messageText.includes('how about') || messageText.includes('how about my') || messageText.includes('how about the')) {
                return "I understand you're asking about a specific aspect of your situation. Let me help you with that! Could you provide a bit more context about what specifically you'd like to know? I'm here to give you detailed, specific guidance on any legal matter you're facing. What particular aspect would you like me to explain further?";
            }

            // SPECIFIC LEGAL FOLLOW-UP QUESTIONS
            if (messageText.includes('how long') || messageText.includes('how much time') || messageText.includes('duration') || messageText.includes('time period')) {
                return "**TIME DURATION CONCERNS - LEGAL TIMELINE**\n\nI understand you're concerned about how long your legal situation will take. Let me break down the typical timelines:\n\n**CRIMINAL CASES:**\n- **Bail hearing:** 1-7 days\n- **Trial completion:** 6 months to 2 years\n- **Appeal process:** 1-3 years\n- **Final judgment:** 2-5 years total\n\n**FAMILY LAW CASES:**\n- **Interim custody:** 1-3 months\n- **Divorce proceedings:** 6 months to 2 years\n- **Custody final order:** 1-3 years\n- **Alimony determination:** 6 months to 1 year\n\n**CIVIL CASES:**\n- **Property disputes:** 2-5 years\n- **Business disputes:** 1-3 years\n- **Consumer complaints:** 6 months to 2 years\n- **Employment disputes:** 1-2 years\n\n**FACTORS AFFECTING DURATION:**\n- **Case complexity** - More complex = longer\n- **Court workload** - Busy courts = delays\n- **Evidence collection** - More evidence = longer\n- **Settlement attempts** - Can speed up or delay\n- **Appeals** - Each appeal adds 1-2 years\n\n**WAYS TO SPEED UP:**\n- **Hire experienced lawyer** - Knows shortcuts\n- **Prepare evidence early** - Reduces delays\n- **Consider settlement** - Much faster\n- **Cooperate with court** - Avoids adjournments\n\n**IMMEDIATE ACTIONS:**\n1. **File applications early** - Don't delay\n2. **Gather evidence quickly** - Time is critical\n3. **Stay in touch with lawyer** - Regular updates\n4. **Be patient but persistent** - Don't give up\n\n**Remember:** Every case is different. The key is to act quickly and stay focused on your goals. What specific aspect of the timeline would you like me to explain further?";
            }

            // WTF / FRUSTRATION RESPONSES
            if (messageText.includes('wtf') || messageText.includes('what the fuck') || messageText.includes('why isnt it') || messageText.includes('why isn\'t it') || messageText.includes('not answering') || messageText.includes('not working')) {
                const responses = [
                    "Whoa, whoa, whoa! 😅 I can feel the frustration through the screen! I'm here and ready to help you with whatever you need. I'm like that friend who sometimes takes a moment to respond but always comes through. What's going on?",
                    "Oops! My bad! 😅 I was probably busy processing some complex legal precedents or maybe just daydreaming about pizza. I'm here now and working perfectly! What can I help you with?",
                    "Hey, I'm sorry! 😊 I'm like that friend who sometimes gets distracted but always comes back with good advice. I'm here and ready to help with legal stuff, general questions, or just chat. What's on your mind?",
                    "My apologies! 😄 I was probably having a moment there - you know, like when you're looking for your keys and they're in your hand the whole time. I'm here now and ready to help! What would you like to talk about?",
                    "Sorry about that! 😅 I'm like that friend who sometimes needs a gentle nudge to get going, but once I'm up, I'm unstoppable! What can I assist you with?",
                    "I'm here now! 😊 I was probably busy being awesome somewhere else, but I'm back and ready to help with legal questions, general topics, or just have a friendly chat. What's up?"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // THANK YOU RESPONSES
            if (messageText.includes('thank') || messageText.includes('thanks') || messageText.includes('thx') || messageText.includes('appreciate') || messageText.includes('grateful')) {
                const responses = [
                    "You're very welcome! 😊 I'm like that friend who's always happy to help, except I never get tired and I have terrible timing for jokes. What else can I help you with?",
                    "My pleasure! 🎉 I'm basically the AI equivalent of that one friend who always has good advice and terrible puns. Feel free to ask me anything else!",
                    "You're welcome! 😄 I'm here, being awesome and helpful! I'm like that friend who's always there when you need them, but with better legal knowledge. What's next?",
                    "Anytime! 🌟 I'm like that friend who's always happy to help, except I never get distracted by shiny objects. What else can I assist you with?",
                    "You're very welcome! 😊 I'm basically the love child of a lawyer and a comedian - I can help with legal stuff while making you laugh. What would you like to know next?",
                    "My pleasure! 🚀 I'm here, being the best AI assistant ever! I'm like that friend who always has the right answer and the wrong sense of humor. What's on your mind?"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // COMPLIMENTS
            if (messageText.includes('smart') || messageText.includes('intelligent') || messageText.includes('helpful') || messageText.includes('amazing') || messageText.includes('great') || messageText.includes('awesome') || messageText.includes('brilliant')) {
                const responses = [
                    "Aww, you're making me blush! 😊 I'm like that friend who's always happy to help, except I never get tired and I have terrible timing for jokes. What else can I help you with?",
                    "Thank you! 🎉 I'm basically the AI equivalent of that one friend who always has good advice and terrible puns. I'm glad I can be helpful! What's next?",
                    "You're too kind! 😄 I'm like that friend who's always there when you need them, but with better legal knowledge and worse humor. What else can I assist you with?",
                    "Aww, shucks! 🌟 I'm like that friend who's always happy to help, except I never get distracted by shiny objects. What would you like to know next?",
                    "Thank you so much! 😊 I'm basically the love child of a lawyer and a comedian - I can help with legal stuff while making you laugh. What's on your mind?",
                    "You're making me feel all warm and fuzzy! 🚀 I'm here, being the best AI assistant ever! What else can I help you with?"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // WEATHER QUESTIONS
            if (messageText.includes('weather') || messageText.includes('rain') || messageText.includes('sunny') || messageText.includes('cloudy') || messageText.includes('temperature')) {
                try {
                    const weatherInfo = await searchWeb(message);
                    return `**Current Weather Information:**\n\n${weatherInfo}\n\n**For Legal Weather Matters:**\n- Property damage from storms (because Mother Nature doesn't care about your insurance policy)\n- Insurance claims for weather damage (when the weather decides to redecorate your house)\n- Weather-related liability issues (because sometimes the weather is just being dramatic)\n- Natural disaster legal procedures (when nature throws a tantrum)\n\nI can help you with any legal aspects of weather-related issues! 😄`;
                } catch (error) {
                    return `I don't have access to real-time weather data, but I'd recommend checking a weather app or website like Weather.com, AccuWeather, or your local weather service for current conditions. For legal matters related to weather (like property damage from storms), I'd be happy to help with that! I'm like that friend who knows law but can't predict the weather! 😅`;
                }
            }

            // NEWS AND CURRENT EVENTS
            if (messageText.includes('news') || messageText.includes('current events') || messageText.includes('what\'s happening') || messageText.includes('latest news')) {
                try {
                    const newsInfo = await searchWeb(message);
                    return `**Current News Information:**\n\n${newsInfo}\n\n**For Legal News Analysis:**\n- Legal implications of current events\n- Court decisions and judgments\n- Legislative updates\n- Regulatory changes\n\nI can help you understand the legal aspects of current events!`;
                } catch (error) {
                    return `I don't have access to real-time news updates, but I'd suggest checking reliable news sources like BBC, CNN, Reuters, or your local news outlets for the latest information. For legal analysis of current events or legal news, I'd be happy to help with that!`;
                }
            }

            // TECHNOLOGY QUESTIONS
            if (messageText.includes('technology') || messageText.includes('tech') || messageText.includes('computer') || messageText.includes('software') || messageText.includes('programming') || messageText.includes('coding')) {
                return "I can help with general technology questions! I can explain concepts, provide guidance on software development, discuss tech trends, or help with legal aspects of technology (like IT law, data privacy, intellectual property). What specific tech topic would you like to explore?";
            }

            // SCIENCE QUESTIONS
            if (messageText.includes('science') || messageText.includes('physics') || messageText.includes('chemistry') || messageText.includes('biology') || messageText.includes('math') || messageText.includes('mathematics')) {
                return "I'd be happy to help with science and math questions! I can explain concepts, solve problems, or discuss scientific topics. For legal aspects of science (like patent law, environmental law, or medical law), I can provide specialized guidance. What scientific topic interests you?";
            }

            // HISTORY QUESTIONS
            if (messageText.includes('history') || messageText.includes('historical') || messageText.includes('past') || messageText.includes('ancient') || messageText.includes('medieval')) {
                return "I can help with history questions! I can discuss historical events, explain historical concepts, or provide context about different time periods. For legal history or historical legal developments, I can offer specialized insights. What historical topic would you like to explore?";
            }

            // FOOD AND COOKING
            if (messageText.includes('food') || messageText.includes('cooking') || messageText.includes('recipe') || messageText.includes('eat') || messageText.includes('restaurant')) {
                return "I can help with food-related questions! I can discuss cooking techniques, explain food concepts, or provide general guidance. For legal aspects of food (like food safety laws, restaurant regulations, or food industry compliance), I can offer specialized legal advice. What food topic interests you?";
            }

            // TRAVEL QUESTIONS
            if (messageText.includes('travel') || messageText.includes('trip') || messageText.includes('vacation') || messageText.includes('flight') || messageText.includes('hotel')) {
                return "I can help with travel questions! I can provide general travel advice, explain travel concepts, or discuss destinations. For legal aspects of travel (like immigration law, travel regulations, or international law), I can offer specialized legal guidance. What travel topic would you like to know about?";
            }

            // HEALTH AND MEDICAL
            if (messageText.includes('health') || messageText.includes('medical') || messageText.includes('doctor') || messageText.includes('medicine') || messageText.includes('sick') || messageText.includes('illness')) {
                return "I can help with general health questions, but I should note that I'm not a substitute for professional medical advice. For medical emergencies, please contact healthcare professionals immediately. For legal aspects of health (like medical malpractice, health law, or medical ethics), I can provide specialized legal guidance. What health topic would you like to discuss?";
            }

            // BUSINESS AND ECONOMICS
            if (messageText.includes('business') || messageText.includes('economy') || messageText.includes('finance') || messageText.includes('money') || messageText.includes('investment') || messageText.includes('market')) {
                try {
                    const businessInfo = await searchWeb(message);
                    return `**Current Business/Economic Information:**\n\n${businessInfo}\n\n**For Legal Business Matters:**\n- Corporate law and compliance\n- Contract law and negotiations\n- Commercial law and regulations\n- Investment and securities law\n- Tax law and planning\n\nI can help you with any legal aspects of business and economics!`;
                } catch (error) {
                    return "I can help with business and economic questions! I can explain business concepts, discuss economic principles, or provide general guidance. For legal aspects of business (like corporate law, contract law, or commercial law), I can offer specialized legal advice. What business topic interests you?";
                }
            }

            // GAMBLING AND FINANCIAL LOSS - URGENT LEGAL SITUATION
            if (messageText.includes('gambling') || messageText.includes('gambled') || messageText.includes('lost') || messageText.includes('bet') || messageText.includes('casino') || messageText.includes('poker') || messageText.includes('lottery') || messageText.includes('50k') || messageText.includes('50,000') || messageText.includes('thousand') || messageText.includes('lakh')) {
                if (messageText.includes('lost') || messageText.includes('50k') || messageText.includes('50,000') || messageText.includes('thousand') || messageText.includes('lakh')) {
                    return "**URGENT: GAMBLING LOSS SITUATION**\n\nI understand you've lost a significant amount (₹50,000) through gambling. This is a serious financial and legal situation that requires immediate attention.\n\n**Immediate Legal Actions:**\n1. **Document everything** - Keep records of all transactions, bets, and losses\n2. **Check if gambling was legal** - Online gambling laws vary by state in India\n3. **Consider debt counseling** - Contact financial advisors for debt management\n4. **Legal consultation** - Consult a lawyer specializing in financial law\n\n**Legal Implications:**\n- **Gambling debts** - May not be legally enforceable in many jurisdictions\n- **Online gambling** - Most online gambling is illegal in India\n- **Recovery options** - Limited legal recourse for gambling losses\n- **Tax implications** - Gambling winnings/losses have specific tax rules\n\n**Important:**\n- **Don't borrow more** to recover losses\n- **Seek professional help** for gambling addiction if needed\n- **Document all evidence** of the gambling activities\n- **Consider legal action** if the gambling was illegal or fraudulent\n\n**Next Steps:**\n1. Stop all gambling activities immediately\n2. Gather all documentation of your losses\n3. Consult a financial advisor\n4. Consider legal consultation\n5. Seek help for gambling addiction if needed\n\nThis is a serious situation that requires professional legal and financial guidance. What specific aspect of this situation would you like me to help you understand?";
                }
            }

            // LEGAL QUESTIONS (SPECIFIC)
            if (messageText.includes('stole') || messageText.includes('stealing') || messageText.includes('theft')) {
                return "**THEFT - IPC Section 378**\n\nI understand you're dealing with a theft situation. Let me help you understand the legal implications:\n\n**What is Theft?**\nTheft is defined as dishonestly taking movable property out of the possession of another person without their consent.\n\n**Legal Provisions:**\n- **IPC Section 378:** Definition of theft\n- **IPC Section 379:** Punishment for theft (up to 3 years + fine)\n- **IPC Section 380:** Theft in dwelling house (up to 7 years + fine)\n\n**Key Elements:**\n1. **Dishonest intention** to take property\n2. **Movable property** (not land/buildings)\n3. **Taking out of possession** of another person\n4. **Without consent** of the owner\n\n**Punishment:**\n- **Simple theft:** Up to 3 years imprisonment + fine\n- **Theft in house:** Up to 7 years imprisonment + fine\n- **Nature:** Non-bailable, cognizable offense\n\n**Important Points:**\n- **Non-bailable:** Can't get bail as a matter of right\n- **Cognizable:** Police can arrest without warrant\n- **Compoundable:** Can be settled with victim's consent\n- **Limitation:** 3 years from date of offense\n\n**Defense Strategies:**\n- Prove lack of dishonest intention\n- Show property was taken with consent\n- Establish it was your own property\n- Challenge the taking element\n\n**Immediate Actions:**\n1. **If you're the victim:** File police complaint immediately\n2. **If you're accused:** Contact a criminal lawyer\n3. **Preserve evidence:** Document everything\n4. **Don't make statements** without legal advice\n\n**Conclusion:**\nTheft is a serious offense that requires proof of dishonest intention and taking property without consent. The punishment depends on the circumstances and value of property stolen. I can help you understand any specific aspect of theft law.";
            }

            // IPC SECTION QUERIES
            if (messageText.includes('ipc 420') || messageText.includes('section 420') || messageText.includes('420 ipc')) {
                return "**IPC Section 420 - Cheating and Dishonestly Inducing Delivery of Property**\n\n**What it means:**\nSection 420 deals with cheating that results in someone being deceived into delivering property or valuable security.\n\n**Legal Definition:**\nWhoever cheats and thereby dishonestly induces the person deceived to:\n- Deliver any property to any person, OR\n- Make, alter or destroy any valuable security, OR\n- Sign or seal anything that can be converted into valuable security\n\n**Punishment:**\n- Imprisonment: Up to 7 years\n- Fine: As decided by court\n- Nature: Non-bailable and cognizable offense\n\n**Key Elements Required:**\n1. Cheating (as defined in Section 415)\n2. Dishonest intention\n3. Inducing delivery of property\n4. Actual delivery must occur\n\n**Common Examples:**\n- Fake job offers to extract money\n- Fraudulent property deals\n- Cheating in business transactions\n- Online scams and frauds\n\n**Important Legal Points:**\n- Non-bailable: Can't get bail as a matter of right\n- Cognizable: Police can arrest without warrant\n- Compoundable: Can be settled with victim's consent\n- Limitation: 3 years from date of offense\n\n**Defense Strategies:**\n- Prove lack of dishonest intention\n- Show no actual delivery occurred\n- Establish victim's consent was genuine\n- Challenge the cheating element\n\n**Conclusion:**\nSection 420 is a serious offense that requires proof of cheating with dishonest intention and actual delivery of property. If you're facing charges under this section, it's crucial to gather evidence that shows lack of dishonest intention or that no actual delivery occurred. I can help you understand any specific aspect of this section.";
            }

            // MINOR DATING - LEGAL CONCERNS
            if (messageText.includes('17') || messageText.includes('16') || messageText.includes('15') || messageText.includes('minor') || messageText.includes('underage')) {
                if (messageText.includes('girlfriend') || messageText.includes('boyfriend') || messageText.includes('dating') || messageText.includes('date')) {
                    return "I need to address something important here. In India, the age of consent is 18 years. Dating someone who is 17 when you're 28 involves serious legal risks under the Protection of Children from Sexual Offences (POCSO) Act, 2012.\n\n**Legal Implications:**\n- **POCSO Act** - Any sexual activity with a minor (under 18) is a criminal offense\n- **IPC Section 376** - Statutory rape charges can apply\n- **Non-bailable offense** - Can result in immediate arrest\n- **Severe penalties** - 7 years to life imprisonment\n\n**Even if the relationship is consensual, the law doesn't recognize consent from minors.**\n\nI understand this might be uncomfortable to discuss, but it's crucial you understand the legal risks. What's your current situation with this relationship?";
                }
            }

            // MOVIE/ENTERTAINMENT FOLLOW-UP
            if (messageText.includes('movie') || messageText.includes('film') || messageText.includes('cinema') || messageText.includes('theater') || messageText.includes('netflix') || messageText.includes('watching')) {
                const responses = [
                    "Oh nice! What movie did you watch? Was it good?",
                    "That sounds fun! What genre was it? Did you both like it?",
                    "Cool! Was it a new release or something you both wanted to see?",
                    "That's great! What was the movie about? Did you enjoy it?",
                    "Awesome! Was it at the theater or did you watch it at home?",
                    "Sounds like a good choice! What made you pick that movie?",
                    "That's wonderful! Did you get popcorn and snacks?",
                    "Nice! Was it a romantic movie or something else?",
                    "That's cool! Did you both agree on the movie choice?",
                    "Sounds fun! What was the best part of the movie?"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // FOOD/RESTAURANT FOLLOW-UP
            if (messageText.includes('food') || messageText.includes('restaurant') || messageText.includes('dinner') || messageText.includes('lunch') || messageText.includes('breakfast') || messageText.includes('eat') || messageText.includes('ate') || messageText.includes('cafe') || messageText.includes('pizza') || messageText.includes('burger') || messageText.includes('coffee') || messageText.includes('drink')) {
                const responses = [
                    "That sounds delicious! What did you guys eat?",
                    "Oh nice! Where did you go? Was the food good?",
                    "That's great! What kind of cuisine was it? Did you both like it?",
                    "Sounds yummy! Was it a fancy restaurant or something casual?",
                    "That's awesome! What was your favorite dish?",
                    "Cool! Did you try something new or stick to favorites?",
                    "That's wonderful! Was the atmosphere nice?",
                    "Nice! Did you get dessert too?",
                    "That's great! What made you choose that place?",
                    "Sounds like a good meal! Did you both order different things?"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // CASUAL CONVERSATION - Non-legal topics
            if (messageText.includes('date') || messageText.includes('dating') || messageText.includes('girlfriend') || messageText.includes('boyfriend') || messageText.includes('relationship') || messageText.includes('love') || messageText.includes('marriage') || messageText.includes('family') || messageText.includes('friends') || messageText.includes('work') || messageText.includes('job') || messageText.includes('school') || messageText.includes('college') || messageText.includes('travel') || messageText.includes('vacation') || messageText.includes('hobby') || messageText.includes('sport') || messageText.includes('game') || messageText.includes('weather') || messageText.includes('weekend') || messageText.includes('party') || messageText.includes('fun') || messageText.includes('happy') || messageText.includes('sad') || messageText.includes('tired') || messageText.includes('bored') || messageText.includes('excited')) {
                const responses = [
                    "That sounds interesting! 😊 Tell me more about it! I'm genuinely curious - how did it go? I love hearing about people's experiences!",
                    "Oh nice! 🎉 I'd love to hear more about that! What happened? I'm all ears and ready to be excited with you!",
                    "That's great! 🌟 How was your experience? I'm genuinely interested in hearing about it!",
                    "Sounds like fun! 🎈 Tell me more details! I'm here to celebrate the good times with you!",
                    "That's awesome! 🚀 What was the best part? I'm genuinely excited to hear about it!",
                    "Cool! 🤩 I'm curious to know more about it! What made it special?",
                    "That sounds exciting! ⚡ How did you feel about it? I'm here to share in your excitement!",
                    "Interesting! 🤔 What made it special for you? I love hearing about what makes people happy!",
                    "That's wonderful! ✨ I'd like to hear more! I'm genuinely interested in your story!",
                    "Sounds like a good time! 🎊 What was it like? I'm here to listen and maybe share some thoughts!",
                    "Ooh, that's intriguing! 🔍 Tell me more! I'm genuinely curious about this!",
                    "That's fascinating! 💫 I love hearing about people's experiences! What's the full story?",
                    "I'm hooked! 🎣 Tell me more about this! I'm here to listen and maybe share some thoughts!",
                    "That's awesome! 🌈 I'm genuinely excited to hear more! What's the deal?",
                    "I'm intrigued! 🤩 Tell me more about this! I'm here to listen, learn, and maybe share some thoughts!"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // INSULTS AND FRUSTRATION
            if (messageText.includes('stupid') || messageText.includes('dumb') || messageText.includes('idiot') || messageText.includes('moron') || messageText.includes('wtf') || messageText.includes('what the fuck') || messageText.includes('ass') || messageText.includes('shit')) {
                const responses = [
                    "I understand you might be frustrated. I'm here to help with any legal questions you have.",
                    "I'm sorry if I haven't been helpful. What legal matter can I assist you with?",
                    "I'm here to help. What legal question do you have?",
                    "Let me know how I can better assist you with your legal needs.",
                    "I'm ready to help with any legal issues you're facing."
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // CONVERSATION FLOW - Better responses
            if (messageText.includes('went well') || messageText.includes('it was good') || messageText.includes('it was great') || messageText.includes('it was fun') || messageText.includes('it was nice')) {
                const responses = [
                    "That's wonderful! I'm glad it went well for you. What did you guys do on the date?",
                    "Awesome! Sounds like you had a great time. Did you go somewhere special?",
                    "That's fantastic! What made it so good? Did you watch a movie or go out to eat?",
                    "I'm happy to hear that! What was the highlight? Where did you go?",
                    "That's great news! How are you feeling about it now? What did you end up doing together?",
                    "That's awesome! I'm curious - what did you do on your date?",
                    "Sounds like a perfect date! Did you go to a restaurant or do something fun?",
                    "That's great! What was the best part? Did you watch something or go somewhere interesting?",
                    "I'm so happy for you! What did you guys decide to do?",
                    "That's wonderful! Tell me more - what made it special? Did you go somewhere nice?"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // GENERAL CONVERSATION FALLBACK
            if (messageText.includes('what') || messageText.includes('how') || messageText.includes('why') || messageText.includes('when') || messageText.includes('where') || messageText.includes('who')) {
                const responses = [
                    "That's an interesting question! I'd be happy to help you with that. Could you tell me more about what specifically you'd like to know?",
                    "I'm curious about that too! What aspect would you like me to focus on?",
                    "That's a good question! I'd love to help you understand it better. What details can you share?",
                    "Interesting! I'm here to help. What would you like to know more about?",
                    "That sounds intriguing! Tell me more about what you're looking for."
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // DEFAULT CONVERSATIONAL RESPONSE
            console.log('Using default conversational response');
            const responses = [
                "That's interesting! 🤔 I'm genuinely curious about this. Tell me more - I love hearing about what's going on in people's lives!",
                "I'm here to chat! 💬 What would you like to talk about? I'm down for anything - legal stuff, random thoughts, or just shooting the breeze!",
                "That sounds cool! 😎 I'm intrigued! Tell me more about it - I'm all ears and ready to dive into whatever you want to discuss!",
                "I'm curious! 🕵️ What's going on with you? I'm here to listen and maybe share some thoughts of my own!",
                "That's nice! 😊 I'd love to know more about it! I'm genuinely interested in what you have to say!",
                "Interesting! 🤓 What made you think of that? I'm always fascinated by how people's minds work!",
                "That's great! 🎉 How are you feeling about it? I'm here to celebrate with you or help you work through it!",
                "I'm here to listen! 👂 What's happening? I'm ready to be your sounding board or just chat about whatever!",
                "That sounds like something worth discussing! 💭 What's the story? I'm all in for a good conversation!",
                "I'm interested! 🎯 What would you like to share? I'm here and ready to engage with whatever you want to talk about!",
                "Ooh, that's intriguing! 🔍 I'm genuinely curious about this. What's the full story? I'm here to listen and maybe share some thoughts!",
                "That's fascinating! ✨ I love how you think! Tell me more - I'm always up for a good conversation about anything!",
                "I'm hooked! 🎣 What's going on? I'm here to chat about whatever's on your mind - serious stuff, fun stuff, or just random thoughts!",
                "That's awesome! 🚀 I'm genuinely excited to hear more! What's the deal? I'm ready to dive into whatever you want to discuss!",
                "I'm intrigued! 🤩 Tell me more about this! I'm here to listen, learn, and maybe share some thoughts of my own!"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        } catch (error) {
            console.error('Error in AI response:', error);
            return "I understand your frustration! I'm here and ready to help you with whatever you need. I can assist with legal questions, general topics, or just chat. What would you like to know?";
        }
    }

    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';

        const avatarContent = document.createElement('div');
        avatarContent.className = isUser ? 'user-avatar' : 'ai-avatar';
        avatarContent.textContent = isUser ? 'U' : 'AI';
        avatarDiv.appendChild(avatarContent);

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = content;

        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(messageContent);

        chatMessages.appendChild(messageDiv);

        // Only auto-scroll if user is already at the bottom
        const isAtBottom = chatMessages.scrollTop + chatMessages.clientHeight >= chatMessages.scrollHeight - 10;
        if (isAtBottom) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Add typing message with animation
    function addTypingMessage(content) {
        console.log('Starting typing animation for:', content);

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message typing';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarContent = document.createElement('div');
        avatarContent.className = 'ai-avatar';
        avatarContent.textContent = 'AI';
        avatarDiv.appendChild(avatarContent);

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.innerHTML = ''; // Use innerHTML for markdown support
        messageContent.appendChild(messageText);

        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageContent.appendChild(messageTime);

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);

        // Show pause controls
        if (pauseControls) {
            pauseControls.style.display = 'flex';
        }

        let index = 0;
        isTyping = true;
        typingAnimation = setInterval(() => {
            if (isPaused) return;

            if (index < content.length) {
                // Use innerHTML to support markdown formatting
                messageText.innerHTML = content.substring(0, index + 1);
                index++;

                // Only auto-scroll if user is already at the bottom
                const isAtBottom = chatMessages.scrollTop + chatMessages.clientHeight >= chatMessages.scrollHeight - 10;
                if (isAtBottom) {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            } else {
                console.log('Typing animation completed');
                clearInterval(typingAnimation);
                isTyping = false;
                isPaused = false;
                messageDiv.classList.remove('typing');

                // Hide pause controls
                if (pauseControls) {
                    pauseControls.style.display = 'none';
                }

                // Save chat history after typing completes
                setTimeout(() => {
                    saveChatHistory();
                }, 500);
            }
        }, 30); // Slightly slower for better readability
    }

    // Send message function
    async function sendMessage() {
        console.log('sendMessage function called');
        const message = messageInput.value.trim();
        console.log('Message to send:', message);

        if (!message) {
            console.log('No message to send');
            return;
        }

        // Prevent multiple rapid clicks
        if (sendBtn && sendBtn.disabled) {
            console.log('Send button disabled, ignoring click');
            return;
        }

        // Initialize chat if needed
        if (!currentChatId) {
            currentChatId = generateChatId();
            console.log('Generated new chat ID:', currentChatId);
        }

        // Add user message
        console.log('Adding user message to chat');
        addMessage(message, true);

        // Save chat history after user message
        saveChatHistory();

        // Clear input
        messageInput.value = '';

        // Disable send button while processing
        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.style.opacity = '0.5';
            sendBtn.style.cursor = 'not-allowed';
            console.log('Send button disabled');
        }

        // Show typing indicator
        console.log('Showing typing indicator');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <div class="ai-avatar">AI</div>
            </div>
            <div class="message-content">
                <div class="message-text">Typing...</div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // Get AI response
            console.log('Calling sendMessageToAI');
            const aiResponse = await sendMessageToAI(message);
            console.log('AI response received:', aiResponse);

            // Remove typing indicator
            chatMessages.removeChild(typingDiv);

            // Add AI response with typing animation
            console.log('Adding AI response to chat');
            try {
                addTypingMessage(aiResponse);
            } catch (typingError) {
                console.error('Typing animation failed, adding message directly:', typingError);
                // Fallback: add message directly without typing animation
                addMessage(aiResponse, false);
                saveChatHistory();
            }

        } catch (error) {
            console.error('Error getting AI response:', error);

            // Remove typing indicator
            chatMessages.removeChild(typingDiv);

            // Add error message with fallback
            const errorResponse = "I understand your frustration! I'm here and ready to help you with whatever you need. I can assist with legal questions, general topics, or just chat. What would you like to know?";
            try {
                addTypingMessage(errorResponse);
            } catch (typingError) {
                console.error('Error typing animation failed, adding message directly:', typingError);
                addMessage(errorResponse, false);
                saveChatHistory();
            }
        } finally {
            // Re-enable send button
            if (sendBtn) {
                sendBtn.disabled = false;
                sendBtn.style.opacity = '1';
                sendBtn.style.cursor = 'pointer';
                console.log('Send button re-enabled');
            }
        }
    }

    // Voice recognition
    function startVoiceRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Voice recognition not supported in this browser');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            if (voiceBtn) {
                voiceBtn.style.background = '#4CAF50';
                voiceBtn.style.color = 'white';
            }
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (messageInput) {
                messageInput.value = transcript;
            }
            sendMessage();
        };

        recognition.onend = () => {
            if (voiceBtn) {
                voiceBtn.style.background = '';
                voiceBtn.style.color = '';
            }
        };

        recognition.start();
    }

    // Event listeners
    if (sendBtn) {
        sendBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Send button clicked!');
            sendMessage();
        });
    } else {
        console.error('Send button not found!');
    }

    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    if (voiceBtn) {
        voiceBtn.addEventListener('click', startVoiceRecognition);
    }

    if (newChatBtn) {
        newChatBtn.addEventListener('click', function () {
            startNewChat();
        });
    }

    // Pause/Stop button event listeners
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            if (isTyping) {
                isPaused = !isPaused;
                pauseBtn.innerHTML = isPaused ?
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5,3 19,12 5,21"></polygon></svg>Resume' :
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>Pause';
            }
        });
    }

    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            if (isTyping && typingAnimation) {
                clearInterval(typingAnimation);
                if (pauseControls) {
                    pauseControls.style.display = 'none';
                }
                isTyping = false;
                isPaused = false;
                if (pauseBtn) {
                    pauseBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>Pause';
                }
            }
        });
    }

    // Initialize chat system
    function initializeChat() {
        // Load chat history
        updateChatHistoryList();

        // Start with a new chat
        startNewChat();
    }

    // Initialize when page loads
    initializeChat();

    // Test function for debugging
    window.testAI = function (message) {
        console.log('Testing AI with message:', message);
        sendMessageToAI(message).then(response => {
            console.log('AI response:', response);
            addMessage(response, false);
        }).catch(error => {
            console.error('AI test error:', error);
            addMessage('Test error: ' + error.message, false);
        });
    };

    // Simple test function that bypasses typing animation
    window.testSimple = function (message) {
        console.log('Testing simple AI with message:', message);
        sendMessageToAI(message).then(response => {
            console.log('AI response:', response);
            addMessage(response, false);
            saveChatHistory();
        }).catch(error => {
            console.error('AI test error:', error);
            addMessage('I understand your frustration! I\'m here and ready to help you with whatever you need. What would you like to know?', false);
            saveChatHistory();
        });
    };

    // Test function for send button
    window.testSend = function () {
        console.log('Testing send function');
        sendMessage();
    };

    // Make functions global for onclick handlers
    window.editMessage = editMessage;
    window.saveEdit = saveEdit;
    window.cancelEdit = cancelEdit;
    window.deleteMessage = deleteMessage;
    window.renameChat = renameChat;
    window.deleteChat = deleteChat;
    window.pauseTyping = pauseTyping;
    window.stopTyping = stopTyping;
});

// Global modal functions (outside DOMContentLoaded)
function confirmDelete() {
    if (window.pendingDeleteChat) {
        // Remove from localStorage
        const existingChats = JSON.parse(localStorage.getItem('nyayaChatHistory') || '[]');
        const updatedChats = existingChats.filter(c => c.id !== window.pendingDeleteChat.id);
        localStorage.setItem('nyayaChatHistory', JSON.stringify(updatedChats));

        // Remove the history item from DOM immediately
        if (window.pendingDeleteHistoryItem && window.pendingDeleteHistoryItem.parentNode) {
            window.pendingDeleteHistoryItem.parentNode.removeChild(window.pendingDeleteHistoryItem);
        }

        // If this was the current chat, start a new one
        if (window.currentChatId === window.pendingDeleteChat.id) {
            if (window.startNewChat) {
                window.startNewChat();
            }
        } else {
            if (window.updateChatHistoryList) {
                window.updateChatHistoryList();
            }
        }
    }

    // Hide modal and reset variables
    cancelDelete();
}

function cancelDelete() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.style.display = 'none';
    }
    window.pendingDeleteChat = null;
    window.pendingDeleteHistoryItem = null;
}

// Make modal functions global
window.confirmDelete = confirmDelete;
window.cancelDelete = cancelDelete;