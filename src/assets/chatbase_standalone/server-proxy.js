/**
 * Secure Backend Proxy Router (Node.js + Express)
 * Protects Chatbase secret API credentials from public client-side inspect tools
 */

const express = require('express');
const cors = require('cors');
// Optional: Use JWT for client identity validation if configuring secure custom variables
const jwt = require('jsonwebtoken');

const router = express.Router();

// Parse credentials securely from environment configuration variables
const CHATBASE_API_KEY = process.env.CHATBASE_API_KEY || 'YOUR_API_KEY_HERE';
const CHATBOT_IDENTITY_SECRET = process.env.CHATBOT_IDENTITY_SECRET || 'wrihlrhhuj3jdu9g3hqzm36gzclha6a2';

// Standard routing configuration
router.use(express.json());
router.use(cors());

/**
 * 1. SECURE API PROXY FORWARDING
 * Proxies messages from chatbot.js directly to Chatbase API securely.
 * Route: POST /api/chatbase
 */
router.post('/chatbase', async (req, res) => {
    try {
        const { messages, chatbotId, stream, temperature } = req.body;
        
        // Validation Checks
        if (!chatbotId) {
            return res.status(400).json({ error: 'Required chatbotId parameter was not provided.' });
        }
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Required messages parameter must be a valid list.' });
        }

        // Forward payload securely using Authorization Header
        const response = await fetch('https://www.chatbase.co/api/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CHATBASE_API_KEY}` // Protected from the user's browser inspector!
            },
            body: JSON.stringify({
                messages,
                chatbotId,
                stream: stream || false,
                temperature: temperature || 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Chatbase API error response received:`, errorText);
            return res.status(response.status).json({ 
                error: `Chatbase gateway responded with code ${response.status}`,
                details: errorText
            });
        }

        const data = await response.json();
        return res.json(data);
        
    } catch (error) {
        console.error('Fatal Proxy Exception:', error);
        return res.status(500).json({ error: 'Server proxy encountered an internal error routing your request.' });
    }
});

/**
 * 2. SECURE USER IDENTIFICATION / JWT GENERATION
 * Use this route if you have signed-in users on your site and want to identify them in Chatbase.
 * Route: GET /api/chatbase/token
 */
router.get('/chatbase/token', (req, res) => {
    try {
        // Mock getting current signed-in user from system session headers
        const user = getSessionUser(req); 
        
        if (!user) {
            return res.status(401).json({ error: 'Authorized session required to generate tokens.' });
        }

        // Generate the jwt token signed with CHATBOT_IDENTITY_SECRET
        const token = jwt.sign(
            { 
                user_id: user.id,
                email: user.email,
                name: user.name,
                // You can add custom properties here that Chatbase can utilize!
                custom_attributes: {
                    plan: user.plan || 'Free Tier'
                }
            }, 
            CHATBOT_IDENTITY_SECRET, 
            { expiresIn: '1h' } // Short-lived token for security
        );

        return res.json({ token });
    } catch (error) {
        console.error('Identity Token Signature Exception:', error);
        return res.status(500).json({ error: 'Failed to generate user identity token.' });
    }
});

// Mock session helper
function getSessionUser(req) {
    // Replace this code with your custom authorization query or session handler (Passport/Auth0)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        // Return structured user info decode
        return {
            id: 'u-1025',
            name: 'Fortune Kemboi',
            email: 'kemboifortune98@gmail.com',
            plan: 'Premium Agency'
        };
    }
    return null;
}

module.exports = router;
