const chatbox = document.getElementById("chatbox");

// Connect to Binance BTC/USDT order book
const ws = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@depth@100ms"
);

// Set threshold for a “stack” (change this if you want)
const STACK_THRESHOLD = 50; // BTC size

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  // Check bids (buy orders)
  data.bids.forEach(([price, size]) => {
    if (parseFloat(size) >= STACK_THRESHOLD) {
      addMessage(`🟢 BUY STACK → $${price} (${size} BTC)`);
    }
  });

  // Check asks (sell orders)
  data.asks.forEach(([price, size]) => {
    if (parseFloat(size) >= STACK_THRESHOLD) {
      addMessage(`🔴 SELL STACK → $${price} (${size} BTC)`);
    }
  });
};

// Function to add messages to chatbox
function addMessage(text) {
  const msg = document.createElement("div");
  const time = new Date().toLocaleTimeString();
  msg.textContent = `[${time}] ${text}`;
  chatbox.prepend(msg);
}
