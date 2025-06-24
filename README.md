# 🪙 CryptoHunter

**CryptoHunter** is a powerful and visually appealing cryptocurrency tracker built with React and Material-UI. It fetches live data from CoinGecko API and allows users to explore prices, charts, and details of various cryptocurrencies in real-time.



## CryptoHunter includes the following features:


- 🔍 Search Coins – Instantly search by coin name or symbol.
- 💹 Live Price Updates – Real-time market cap, 24h change, and prices.
- 📈 Detailed Coin View – Charts, historical data, and coin overview.
- 🔄 Currency Selector – Toggle between USD, INR.
- 📊 Coin Comparison  – Side-by-side performance comparison.
- 📄 Pagination- to efficiently browse a large list of coins
- 🤖 Simple Chatbot – A basic chatbot to assist users by answering cryptocurrency-related queries like "What is Bitcoin?", "Top 5 coins today".
- 🧾 Watchlist - Add your favourite coins to watchlist

## Tech Stack:

- Frontend: React.js 
- UI Framework: Material-UI 
- State Management: React Context API
- API: CoinGecko API



## To run the project locally:

```bash
# Clone the repository
git clone https://github.com/SHANKAR-YADAVA/Crypto_hunter.git

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Folder Structure:

```
cryptohunter/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components (Home, CoinPage)
│   ├── CryptoContext.js  # Global state for currency and coins
│   ├── App.js
│   └── index.js

```


## Live Demo:  
🔗 https://crypto-hunter-sage.vercel.app



## Future Enhancements:

- 🧠 AI-powered market predictions and alerts
- 🔔 Push notifications for price thresholds
- 📱 Mobile PWA support


License:  
This project is licensed under the MIT License.
