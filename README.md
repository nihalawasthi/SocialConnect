
# 🧵 SocialConnect — Frontend-Only Social Media Platform

**SocialConnect** is a modern, visually polished frontend social media web application designed for a CodeCircuit hackathon. It features a responsive layout, interactive comment threads, live reply posting, like buttons with animation, and a themed profile and explore page — all without any backend.

---

## 🌟 Features

- 🗨️ **Interactive Comment Threads** with nested replies
- ❤️ **Like Buttons** with real-time UI updates
- 🔁 **Threaded Conversations** in a clean, card-based layout
- 🌓 **Dark Mode Toggle** (Alpine.js)
- 👤 **Profile Section** with tabs for Posts, Replies, and Likes
- 🔍 **Searchable Feed** and Explore Page with Trending Tags
- 🧠 **Data-driven UI** rendered from JavaScript `posts[]` array
- 💬 **Live Commenting & Reply Box** with nesting
- ⚡ **Animated Icons**, hover effects, and transitions using TailwindCSS
- 🎨 Fully responsive layout using **TailwindCSS**
- ✅ No backend — data is managed purely via JavaScript objects

---

## 🛠 Tech Stack

- **HTML5**
- **Tailwind CSS**
- **Alpine.js** (dark mode, UI state)
- **FontAwesome 6** (icons)
- **ApexCharts** (for future data visualization)
- **Vanilla JavaScript** (dynamic rendering)

---

## 🚀 Getting Started

1. Clone or download this repository.
2. Open `index.html` directly in a browser — no server needed.
3. You can edit `script.js` to add/edit post content.

---

## 📁 File Structure

```
.
├── index.html        # Main frontend layout
├── script.js         # Handles post rendering, comments, and reply logic
├── public/
│   ├── icon.ico
│   ├── me.jpeg
│   ├── cc.png
│   └── SL.png
```

---

## 👨‍💻 Developer

- **Nihal Awasthi**  
  [@nihalawasthi](https://github.com/nihalawasthi)

---

## 📄 License

This project was built for educational and hackathon purposes. Free to reuse with attribution.

---

## 🏁 Notes

- Mobile responsiveness was intentionally ignored for this hackathon.
- Comments and replies are dynamically rendered using in-browser data.
- Like counts and comments are not persisted — all data resets on refresh.
