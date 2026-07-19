/**
 * Custom Floating Chatbase Widget Client Logic
 * Standard vanilla ES6 Javascript
 */

// --- USER CONFIGURATIONS ---
// Public Chatbot identification code
const CHATBASE_CHATBOT_ID = 'R6w20MElns5JwFniAs9Wb'; 

// Target API Proxy endpoint url (safely forwards questions without leaking secret API key)
const API_PROXY_URL = '/api/chatbase'; 

// --- STATE MANAGEMENT ---
let chatMessages = [];
const DEFAULT_WELCOME = `👋 Hi! Welcome to **BLACKPIXEL**. I am your personal Chatbase-powered support assistant.

Ask me any questions about our digital strategies, web engineering packages, or custom branding works!`;

// --- DOM ELEMENTS REFERENCE ---
const chatFab = document.getElementById('chat-fab');
const chatWidget = document.getElementById('chat-widget');
const closeChatBtn = document.getElementById('close-chat-widget');
const clearChatBtn = document.getElementById('clear-chat-history');
const messageForm = document.getElementById('chat-input-form');
const messageInput = document.getElementById('chat-message-input');
const messagesContainer = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('chat-typing');

// --- EVENT HANDLERS REGISTRATION ---
document.addEventListener('DOMContentLoaded', () => {
    initChatHistory();
    
    // Toggle widget opening
    chatFab.addEventListener('click', toggleWidget);
    closeChatBtn.addEventListener('click', toggleWidget);
    
    // Form trigger
    messageForm.addEventListener('submit', sendMessage);
    
    // Reset triggers
    clearChatBtn.addEventListener('click', clearChatHistory);
});

// Open / Close helper animations
function toggleWidget() {
    chatWidget.classList.toggle('hidden');
    chatFab.classList.toggle('active');
    
    // Mark as read when widget expands
    if(!chatWidget.classList.contains('hidden')) {
        chatFab.querySelector('.unread-dot').style.display = 'none';
        scrollToBottom();
    }
}

// Retrieve cache on initialization
function initChatHistory() {
    const cached = localStorage.getItem('chatbase_embedded_history');
    if (cached) {
        try {
            chatMessages = JSON.parse(cached);
        } catch (e) {
            console.error('Error deserializing cached logs', e);
        }
    }
    
    if (chatMessages.length === 0) {
        // Hydrate default greeting
        chatMessages.push({
            id: 'init-greet',
            role: 'assistant',
            content: DEFAULT_WELCOME,
            time: getFormattedTime()
        });
    }
    
    renderMessages();
}

// Sync logs back to LocalStorage
function saveChatHistory() {
    localStorage.setItem('chatbase_embedded_history', JSON.stringify(chatMessages));
}

// Erase log lists
function clearChatHistory() {
    if (confirm('Are you sure you want to clear your conversation history?')) {
        chatMessages = [{
            id: 'init-greet',
            role: 'assistant',
            content: `🧹 Conversation logs cleared. Let us begin a fresh thread! How can I help you today?`,
            time: getFormattedTime()
        }];
        saveChatHistory();
        renderMessages();
    }
}

// Paint UI components inside list viewport
function renderMessages() {
    messagesContainer.innerHTML = '';
    chatMessages.forEach(msg => {
        const row = document.createElement('div');
        row.className = `msg-row ${msg.role === 'user' ? 'user' : 'bot'} ${msg.isError ? 'error' : ''}`;
        
        row.innerHTML = `
            <span class="sender-tag">${msg.role === 'user' ? 'You' : 'Agent'}</span>
            <div class="bubble">${parseMarkdown(msg.content)}</div>
            <span class="msg-time">${msg.time}</span>
        `;
        
        messagesContainer.appendChild(row);
    });
    scrollToBottom();
}

// Core submit handling
async function sendMessage(e) {
    e.preventDefault();
    const query = messageInput.value.trim();
    if(!query) return;
    
    messageInput.value = '';
    
    const userMessage = {
        id: `usr-${Date.now()}`,
        role: 'user',
        content: query,
        time: getFormattedTime()
    };
    
    chatMessages.push(userMessage);
    renderMessages();
    
    // Toggle typing loaders
    showTyping(true);
    
    try {
        // Fire request to secure backend proxy endpoint
        const response = await fetch(API_PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: chatMessages.map(m => ({
                    role: m.role,
                    content: m.content
                })),
                chatbotId: CHATBASE_CHATBOT_ID,
                stream: false
            })
        });
        
        if(!response.ok) {
            throw new Error(`Failed network request with status: ${response.status}`);
        }
        
        const data = await response.json();
        const responseText = data.text || data.message || "No coherent response generated.";
        
        const botMessage = {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: responseText,
            time: getFormattedTime()
        };
        
        chatMessages.push(botMessage);
        saveChatHistory();
        renderMessages();
        
    } catch(err) {
        console.error('Error invoking chatbase API:', err);
        
        // Render systems failure info
        chatMessages.push({
            id: `err-${Date.now()}`,
            role: 'system',
            content: `⚠️ **Security Shield Alert**: Connection refused. 
            
If you are running in production, please ensure your Node backend proxy server is booted and configuration credentials match.`,
            time: getFormattedTime(),
            isError: true
        });
        saveChatHistory();
        renderMessages();
    } finally {
        showTyping(false);
    }
}

// Utilities helpers
function showTyping(show) {
    if(show) {
        typingIndicator.classList.remove('hidden');
    } else {
        typingIndicator.classList.add('hidden');
    }
    scrollToBottom();
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getFormattedTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Primitive text compiler parsing bold markdown sequences strictly for layout
function parseMarkdown(text) {
    if (!text) return "";
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code style="background-color:rgba(0,0,0,0.05);padding:2px 4px;border-radius:4px;font-family:var(--font-mono);">$1</code>')
        .replace(/\n/g, '<br>');
}
