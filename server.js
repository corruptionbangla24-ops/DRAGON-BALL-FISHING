const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - মেগা সকেট প্রোটোকল লক]
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 🔮 ওরিজিনাল ড্রাগন বল ফিশিং ক্যাসিনো লাক ম্যাট্রিক্স পুল
const dragonBallPool = {
    "BABY_DRAGON": { minOdds: 2, maxOdds: 5 },
    "TURTLE_ROSHI": { minOdds: 6, maxOdds: 15 },
    "SHENRON_BLUE": { minOdds: 20, maxOdds: 40 },
    "GOLDEN_KRAKEN": { minOdds: 50, maxOdds: 100 },
    "SAIYAN_SHARK": { minOdds: 120, maxOdds: 250 },
    "SUPREME_SHENRON": { minOdds: 450, maxOdds: 450 } // ৪৫০ গুণ ফিক্সড সুপ্রিম ড্রাগন জ্যাকপট!
};

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স নিয়ে আসার ডেডিকেটেড গেটওয়ে
app.get('/api/dragonball-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: 0,
            wallet: targetWallet
        }, { timeout: 30000 });

        if (response.data && response.data.status === "ok" && response.data.balance !== undefined) {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. রিয়েল-টাইম এনার্জি বল কস্ট রাউট (প্লেয়ার যখন প্রতিটি ট্রিগার চাপবে - ব্যালেন্স ডিডাকশন বর্ম)
app.post('/api/dragonball-shoot', async (req, res) => {
    const { userId, bulletCost, wallet } = req.body;
    const targetWallet = wallet || "main";
    const cost = parseFloat(bulletCost) || 1;

    // 🔒 [বুলেট কস্ট ফিল্টার]: প্রতিটি কামানের গুলির কস্ট ১ টাকা থেকে ৫০০০ টাকা পর্যন্ত লক ভাই ভাই!
    if (cost < 1 || cost > 5000) {
        return res.json({ success: false, message: "🚨 Invalid Bullet Cost (৳১ - ৳৫০০০)" });
    }

    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: cost,
            wallet: targetWallet
        }, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, message: "❌ Ammunition Declined by Database!" });
    } catch (e) { return res.json({ success: false, message: "⚠️ Timeout!" }); }
});

// 🎯 ৩. এনার্জি বল যখন ড্রাগনে হিট করবে - ওরিজিনাল ৯৫% ক্যাসিনো RTP ভ্যালিডেশন ও রিওয়ার্ড প্রসেসর চাবি
app.post('/api/dragonball-hit', async (req, res) => {
    const { userId, dragonType, bulletCost, wallet } = req.body;
    const targetWallet = wallet || "main";
    const originalBulletValue = parseFloat(bulletCost) || 1;

    if (!dragonBallPool[dragonType]) {
        return res.json({ success: false, message: "🚨 Target Out of Frame!" });
    }

    const currentDragon = dragonBallPool[dragonType];
    let isCaptured = false;
    let finalWinMultiplier = 0;

    // 🎰 [৯৫% ওরিজিনাল ক্যাসিনো RTP শুটিং ভ্যালিডেশন ম্যাথ লুপ ভাই ভাই]
    let hitRandomizer = Math.random();
    
    if (dragonType === "BABY_DRAGON" && hitRandomizer <= 0.44) isCaptured = true;
    else if (dragonType === "TURTLE_ROSHI" && hitRandomizer <= 0.24) isCaptured = true;
    else if (dragonType === "SHENRON_BLUE" && hitRandomizer <= 0.11) isCaptured = true;
    else if (dragonType === "GOLDEN_KRAKEN" && hitRandomizer <= 0.05) isCaptured = true;
    else if (dragonType === "SAIYAN_SHARK" && hitRandomizer <= 0.02) isCaptured = true;
    else if (dragonType === "SUPREME_SHENRON" && hitRandomizer <= 0.006) isCaptured = true; // ৪৫০ গুণ মেগা বস চান্স ০.৬% এ টাইট লক ভাই ভাই!

    if (isCaptured) {
        // ডাইনামিক ওッズ রেঞ্জ থেকে র্যান্ডম প্রফিট জেনারেটর চাবি
        finalWinMultiplier = Math.floor(Math.random() * (currentDragon.maxOdds - currentDragon.minOdds + 1)) + currentDragon.minOdds;
    }

    if (!isCaptured || finalWinMultiplier <= 0) {
        return res.json({ success: true, captured: false, winAmount: 0 });
    }

    let calculatedWinAmount = parseFloat((originalBulletValue * finalWinMultiplier).toFixed(2));

    try {
        let phpPayload = {
            action: "win",
            username: userId,
            amount: calculatedWinAmount,
            wallet: targetWallet,
            bet_amount: originalBulletValue,
            multiplier: finalWinMultiplier.toFixed(2),
            status: "win",
            type: "win",
            is_win: 1,
            win_status: "win",
            log_status: "win"
        };

        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, phpPayload, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });
            return res.json({
                success: true,
                captured: true,
                balance: response.data.balance,
                winAmount: calculatedWinAmount,
                odds: finalWinMultiplier
            });
        }
        return res.json({ success: false, message: "❌ Balance Sync Error!" });
    } catch (e) {
        return res.json({ success: false, message: "⚠️ Connection Timeout!" });
    }
});

app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'index.html')); });

io.on('connection', (socket) => { console.log("Player connected to Royal Dragon Ball Fishing Engine!"); });

// ড্রাগন বল ফিশিং কাস্টম ৭২০০ পোর্টে কড়া নিয়নে অন ফায়ার ভাই ভাই!
const PORT = process.env.PORT || 7200; 
server.listen(PORT, () => { console.log(`🎡 Royal Dragon Ball Fishing Engine Running on port ${PORT}`); });
