# 📊 Codeforces Problem Tracker

A sleek TamperMonkey userscript that automatically tracks your Codeforces problem-solving journey with detailed statistics and a beautiful dark theme interface.

![Version](https://img.shields.io/badge/version-1.0-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![TamperMonkey](https://img.shields.io/badge/TamperMonkey-Required-green)

## ✨ Features

- 🎯 **Automatic Problem Tracking** - Automatically records every problem you visit
- 📈 **Detailed Statistics** - Track first open time, last accessed time, and access count
- 🔥 **Smart Storage Management** - Keeps the latest 20 problems, automatically removes older ones
- 🎨 **Beautiful UI** - Modern dark theme with orange accents and smooth animations
- 🌐 **Universal Coverage** - Works with Contest, Problemset, and Gym problems
- 💾 **Persistent Data** - Your data is saved locally and persists across sessions
- 🚀 **Zero Performance Impact** - Lightweight and efficient implementation

## 📸 Screenshots

### Floating Tracker Icon
A stylish floating button in the bottom-right corner with a badge showing your tracked problem count.

### Dashboard View
Click the icon to see your comprehensive problem tracking dashboard with:
- Problem titles with direct links
- Access count for each problem
- First opened timestamp
- Last accessed timestamp
- Beautiful hover effects and animations

## 🚀 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.)
- [TamperMonkey](https://www.tampermonkey.net/) browser extension installed

### Steps

1. **Install TamperMonkey**
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. **Install the Script**
   - Click on the TamperMonkey icon in your browser
   - Select "Create a new script"
   - Delete the default content
   - Copy and paste the entire script code
   - Save (Ctrl+S or Cmd+S)

3. **Start Using**
   - Visit any Codeforces problem page
   - The tracker icon will appear in the bottom-right corner
   - Click it anytime to view your tracked problems!

## 📖 How to Use

### Automatic Tracking
Simply visit any Codeforces problem page. The script automatically:
- Records the problem name and URL
- Timestamps your first visit
- Updates the last accessed time on each visit
- Counts how many times you've opened the problem

### Viewing Your Statistics
1. Click the floating orange icon in the bottom-right corner
2. View all tracked problems with detailed statistics
3. Click on any problem title to revisit it
4. See access counts and timestamps at a glance

### Managing Data
- **Auto-cleanup**: The script automatically keeps only your latest 20 problems
- **Manual clear**: Click "Clear All Data" button in the dashboard footer to reset
- **Confirmation**: You'll be asked to confirm before clearing all data

## 🎨 Design Features

- **Dark Theme**: Easy on the eyes during long coding sessions
- **Orange Accents**: Vibrant orange gradients matching Codeforces branding
- **Smooth Animations**: Polished hover effects and transitions
- **Responsive Design**: Works perfectly on all screen sizes
- **Custom Scrollbar**: Themed scrollbar for the problem list
- **Glassmorphism**: Modern frosted glass effects

## 🔧 Technical Details

### Storage
- Uses TamperMonkey's `GM_setValue` and `GM_getValue` for persistent storage
- Data is stored locally in your browser
- No server communication - completely private
- JSON format for easy data management

### Compatibility
- ✅ All Codeforces problem types (Contest, Problemset, Gym)
- ✅ Both HTTP and HTTPS
- ✅ All modern browsers with TamperMonkey support

### Performance
- Minimal DOM manipulation
- Efficient event handling
- No background processes
- Instant load times

## 📊 What Gets Tracked

For each problem, the script stores:

| Field | Description |
|-------|-------------|
| **Title** | Problem name as displayed on Codeforces |
| **URL** | Direct link to the problem |
| **First Open** | Timestamp of your first visit |
| **Last Accessed** | Timestamp of your most recent visit |
| **Access Count** | Number of times you've opened the problem |

## 🛠️ Customization

Want to customize the script? Here are some easy modifications:

### Change the maximum number of tracked problems
```javascript
const MAX_PROBLEMS = 20; // Change this number (line 270)
```

### Change the icon position
```css
.cf-tracker-icon {
    bottom: 30px;  // Adjust vertical position
    right: 30px;   // Adjust horizontal position
}
```

### Change the color scheme
Replace the orange colors (`#ff6b35`, `#f7931e`) with your preferred colors throughout the CSS.

## 🐛 Troubleshooting

### Icon not appearing?
- Make sure TamperMonkey is enabled
- Check if the script is active for codeforces.com
- Refresh the page

### Data not saving?
- Ensure TamperMonkey has storage permissions
- Check browser console for errors
- Try clearing and retracking

### Modal not opening?
- Check for JavaScript console errors
- Ensure no other scripts are conflicting
- Try disabling other userscripts temporarily

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

This project is licensed under the MIT License - feel free to use, modify, and distribute as you wish.

## 🙏 Acknowledgments

- Built for the Codeforces competitive programming community
- Inspired by the need to track problem-solving progress
- Thanks to all competitive programmers who test and provide feedback

## 📬 Support

If you encounter any issues or have suggestions:
- Open an issue on GitHub
- Provide detailed information about the problem
- Include browser and TamperMonkey version

## ⭐ Show Your Support

If you find this script helpful, please:
- Give it a star on GitHub
- Share it with fellow competitive programmers
- Contribute improvements

---

**Made with ❤️ for the Competitive Programming Community**

Happy Coding! 🚀
