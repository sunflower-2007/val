# Valentine Week for Chetan 💕

A romantic Valentine Week website dedicated to Chetan with date-based unlocking functionality.

## 🌹 Features

- **8 Interactive Day Cards**: Rose Day through Valentine's Day (February 7-14)
- **Date-Based Unlocking**: Pages automatically unlock at 12:00 AM on their respective dates
- **Romantic Design**: Red and pink theme with elegant animations
- **Fully Responsive**: Works beautifully on mobile and desktop
- **Lock Screens**: Beautiful lock screens with countdown timers for locked pages
- **Floating Hearts**: Romantic animated hearts floating across the screen

## 📁 Project Structure

```
val/
├── index.html              # Main page with 8 day cards
├── styles.css              # All styling and animations
├── script.js               # Date-based unlocking logic
├── rose-day.html           # Rose Day page (Feb 7)
├── propose-day.html        # Propose Day page (Feb 8)
├── chocolate-day.html      # Chocolate Day page (Feb 9)
├── teddy-day.html          # Teddy Day page (Feb 10)
├── promise-day.html        # Promise Day page (Feb 11)
├── hug-day.html            # Hug Day page (Feb 12)
├── kiss-day.html           # Kiss Day page (Feb 13)
├── valentines-day.html     # Valentine's Day page (Feb 14)
└── README.md               # This file
```

## 🚀 How to Use

### Option 1: Direct File Access
Simply open `index.html` in your web browser. The website will work perfectly with all features.

### Option 2: Local Server (Recommended for full functionality)
If you have Python installed:
```bash
cd val
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

If you have Node.js installed:
```bash
cd val
npx http-server -p 8000
```

## 🔐 Unlocking Logic

- **Current Date Check**: The website checks the current date and time
- **February 2025**: All days unlock sequentially from February 7-14, 2025
- **Midnight Unlock**: Each page unlocks exactly at 12:00 AM on its respective date
- **Auto-Refresh**: Pages automatically refresh when unlocked
- **Testing Mode**: Uncomment line 65 in `script.js` to test all days as unlocked

## 🎨 Design Features

- **Gradient Backgrounds**: Animated romantic gradients
- **Glass Morphism**: Modern frosted glass effects
- **Smooth Animations**: Fade-ins, hover effects, and transitions
- **Responsive Grid**: Adapts to all screen sizes
- **Typography**: Elegant Georgia serif font
- **Color Scheme**: Romantic reds, pinks, and whites

## 📱 Mobile Responsive

The website is fully responsive and works beautifully on:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop computers (1024px+)

## 🔧 Customization

### To Change Messages
Edit the message text in each day's HTML file:
```html
<p class="day-message">Your custom message here</p>
```

### To Change Dates
Modify the year in `script.js` (line 6):
```javascript
this.currentYear = 2025; // Change to your desired year
```

### To Change Colors
Edit the CSS variables in `styles.css`:
```css
background: linear-gradient(135deg, 
    rgba(220, 20, 60, 0.9) 0%,    /* Dark Red */
    rgba(255, 105, 180, 0.8) 25%, /* Hot Pink */
    /* ... */
);
```

## 🌟 Special Features

### Floating Hearts
Animated hearts float up from the bottom of the screen every 3 seconds for added romance.

### Countdown Timers
Locked pages display real-time countdowns showing exactly when they'll unlock.

### Notification System
Clicking locked cards shows elegant notifications with unlock timing.

### Smooth Transitions
All interactions feature smooth, romantic animations.

## 💌 Messages for Chetan

Each day contains a special romantic message:

1. **Rose Day**: "Good morning, my love. Wishing you a beautiful Rose Day filled with lots of roses and love 🌹"
2. **Propose Day**: "Good morning, my sunshine. Will you accept my proposal for a date? 💍"
3. **Chocolate Day**: "Good morning, baby. Want to go on a chocolate date? 🍫"
4. **Teddy Day**: "Good morning, starlight. Can I be your personal teddy bear? 🧸"
5. **Promise Day**: "Good morning, lovely. Do you promise to share your highs and lows with me? 🤍"
6. **Hug Day**: "Good morning, honey. Can I give you lots of hugs? 🤗"
7. **Kiss Day**: "Good morning, darlinggg. I'm shy to write the question here… you already know what I want to say anyway (not that I am… uh, well)."
8. **Valentine's Day**: "Good morning, my favorite notification. I LOVE YOUUU ❤️"

## 💝 Technical Details

- **Pure HTML/CSS/JavaScript**: No external dependencies
- **Modern CSS Features**: Backdrop filters, gradients, animations
- **ES6 JavaScript**: Classes, arrow functions, template literals
- **Semantic HTML5**: Proper structure and accessibility
- **Cross-Browser Compatible**: Works on all modern browsers

## 🎯 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

Made with ❤️ for Chetan
