# Custom Chatbase Chatbot Integration Guide 🤖

Follow this step-by-step documentation to integrate your Chatbase chatbot cleanly, securely, and seamlessly into your website dashboard.

---

## 📂 File Package Contents
* `chatbot.html` — The markup template representing the floating action and animated slide-out container frame.
* `chatbot.css` — High-end styling specs supporting real responsive viewports, custom colors, matching text variables, and hover glow pulses.
* `chatbot.js` — Core browser clients logic maintaining state lists, local history sync, and input form handlers.
* `server-proxy.js` — Production-grade Express controller proxy routing client packets safely without credentials leakage.

---

## 🛠️ Step-by-Step Deployment Instructions

### Option 1: Official Iframe Embed (Easiest and Highly Recommended)
This options requires **zero server installation** or backend configurations. Chatbase manages its own conversations securely, completely bulletproofing you from API Key vulnerability leaks.

1. Locate the dynamic iframe viewport container inside `chatbot.html`:
   ```html
   <iframe
       src="https://www.chatbase.co/chatbot-iframe/R6w20MElns5JwFniAs9Wb"
       title="BLACKPIXEL Chatbase Assistant"
       width="100%"
       height="100%"
       frameBorder="0"
       style="border: none;"
   ></iframe>
   ```
2. Replace `"R6w20MElns5JwFniAs9Wb"` with your own personal public **Chatbase Chatbot ID**.
3. Place the HTML markup from `chatbot.html` inside your index footer, and mount the `chatbot.css` stylesheets inside your browser head.

### Option 2: Live Proxy API Integration (Secure Full-stack Customization)
If you wish to build custom speech bubbles, modify color themes explicitly, or maintain custom UI controllers:

#### Step 1: Establish Secure Variables
Locate your Chatbase API Secret Token and configure them securely on your deployment host environment (such as Vercel, Heroku, or Render):
* `CHATBASE_API_KEY` = `wrihlrhhuj3jdu9g3hqzm36gzclha6a2` *(Your private secret tokens!)*
* `CHATBOT_IDENTITY_SECRET` = `wrihlrhhuj3jdu9g3hqzm36gzclha6a2`

#### Step 2: Integrate Node.js Express Controller
Mount `server-proxy.js` router pathways onto your primary Node API handler:
```javascript
const express = require('express');
const app = express();
const chatbaseRouter = require('./server-proxy');

// Mount router under standard pathways
app.use('/api', chatbaseRouter);

app.listen(3000, () => console.log('Primary Gateway Booted.'));
```

#### Step 3: Synchronize client script endpoints
Identify the targeting endpoint inside `chatbot.js` line 12:
```javascript
const API_PROXY_URL = '/api/chatbase'; // Point this directly to your fresh Node.js express proxy!
```

---

## 🔐 Security Best Practices Checklist
- [x] **Never hardcode Chatbase API Keys (`Authorization Bearer`) in client-side JS.** Doing so allows any visitor to inspect your source code and steal your API tokens.
- [x] **Forward requests using safe Server Proxies.** All requests from the client should hit your endpoint (like `/api/chatbase`), which then appends the authorization credentials server-side.
- [x] **Employ Short-Term JSON Web Tokens (JWT).** Encrypt user emails and user attributes using `jwt.sign()` with `CHATBOT_IDENTITY_SECRET` when configuring chat base security verification.

---

## 📝 Integration Testing Checklist
* [ ] **Verify Overlay Positions:** Confirm that the chatbot triggers and float containers align nicely on modern tablets and ultra-wide desktops.
* [ ] **Verify mobile-safety boundaries:** Expand the widget on a mobile device and verify it wraps bounds without vertical alignment clips.
* [ ] **Confirm localStorage state sync:** Initiate a dialogue thread, refresh the webpage, and confirm that previous logs show up successfully.
* [ ] **Verify error protection fallbacks:** Intentionally disable credentials and confirm that standard failure systems alerts output gracefully.
