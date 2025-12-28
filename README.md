# Codeforces Problem Tracker with Time Tracking

[![Install Script](https://img.shields.io/badge/Install-Userscript-brightgreen?style=for-the-badge&logo=tampermonkey)](https://github.com/cthboss001/Codeforces-Problem-Tracker/raw/main/codeforces-problem-tracker.user.js)

A powerful TamperMonkey userscript that automatically tracks your Codeforces problem-solving journey with detailed statistics, time tracking, and a beautiful dark theme interface.

[![Version](https://img.shields.io/badge/version-2.0-orange)](https://github.com/cthboss001/Codeforces-Problem-Tracker)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![TamperMonkey](https://img.shields.io/badge/TamperMonkey-Required-green)](https://www.tampermonkey.net/)

## Features

### Core Tracking
- **Automatic Problem Tracking** - Records every problem you visit without manual input
- **Detailed Statistics** - Track first open time, last accessed time, and access count
- **Time Tracking** - Monitors how much time you spend on each problem
- **Live Timer** - Real-time display of active session time
- **Smart Storage** - Keeps the latest 100 problems with automatic cleanup

### User Interface
- **Beautiful Dark Theme** - Modern design with orange accents
- **Live Timer Display** - Visual indicator showing current session time
- **Active Problem Highlighting** - Easily identify which problem you're currently working on
- **Smooth Animations** - Polished hover effects and transitions
- **Responsive Design** - Works perfectly on all screen sizes

### Technical Features
- **Universal Coverage** - Works with Contest, Problemset, and Gym problems
- **Session Management** - Handles tab switching and page visibility
- **Persistent Storage** - Your data is saved locally and persists across sessions
- **Zero Performance Impact** - Lightweight and efficient implementation

## Screenshots

### Floating Tracker Icon
A stylish floating button in the bottom-right corner with a badge showing your tracked problem count.

### Live Timer
Real-time timer showing how long you've been working on the current problem.

### Dashboard View
Comprehensive problem tracking dashboard featuring:
- Problem titles with direct links
- Total time spent on each problem
- Access count for each problem
- First opened and last accessed timestamps
- Active problem indicator with live timer
- Beautiful hover effects and smooth animations

## Installation

### Prerequisites

You need a userscript manager extension installed in your browser:
- [Tampermonkey](https://www.tampermonkey.net/) (Recommended - Chrome, Firefox, Safari, Edge, Opera)
- [Greasemonkey](https://www.greasespot.net/) (Firefox)
- [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)

### Quick Install

1. **Install TamperMonkey**
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. **Install the Script**
   - Click the install button at the top of this README
   - Or visit: [Direct Install Link](https://github.com/cthboss001/Codeforces-Problem-Tracker/raw/main/codeforces-problem-tracker.user.js)
   - TamperMonkey will prompt you to install
   - Click "Install" to confirm

3. **Start Using**
   - Visit any Codeforces problem page
   - The tracker icon will appear in the bottom-right corner
   - Time tracking starts automatically!

## How to Use

### Automatic Tracking

Simply visit any Codeforces problem page. The script automatically:
- Records the problem name and URL
- Starts tracking time spent on the problem
- Timestamps your first visit
- Updates last accessed time on each visit
- Counts how many times you've opened the problem

### Time Tracking Features

**Live Timer:**
- Appears when you're actively working on a problem
- Shows real-time elapsed time for current session
- Updates every second
- Positioned below the tracker icon

**Session Management:**
- Timer pauses when you switch tabs or minimize browser
- Timer resumes when you return to the problem
- Time is automatically saved when you leave the page
- Accurate tracking across multiple sessions

### Viewing Your Statistics

1. Click the floating orange tracker icon in the bottom-right corner
2. View all tracked problems with comprehensive statistics
3. See total time spent on each problem
4. Click on any problem title to revisit it
5. Active problems are highlighted with a green border
6. Live timer shows current session progress

### Managing Data

- **Auto-cleanup**: Keeps the latest 100 problems automatically
- **Manual clear**: Click "Clear All Data" button in the dashboard footer
- **Confirmation**: You'll be asked to confirm before clearing all data

## Statistics Tracked

For each problem, the script records:

| Statistic | Description |
| --- | --- |
| **Title** | Problem name as displayed on Codeforces |
| **URL** | Direct link to the problem |
| **Time Spent** | Total time spent across all sessions (highlighted in green) |
| **First Open** | Timestamp of your first visit |
| **Last Accessed** | Timestamp of your most recent visit |
| **Access Count** | Number of times you've opened the problem |
| **Active Status** | Visual indicator if you're currently working on it |

## Time Format

Time is displayed in human-readable format:
- Less than 1 minute: `45s`
- 1-60 minutes: `15m 30s`
- 1-24 hours: `2h 45m`
- More than 24 hours: `3d 5h`

## Design Features

- **Dark Theme** - Easy on the eyes during long coding sessions
- **Orange Gradients** - Vibrant colors matching Codeforces branding
- **Green Accents** - Time tracking elements highlighted in green
- **Smooth Animations** - Polished hover effects and transitions
- **Glassmorphism** - Modern frosted glass effects
- **Custom Scrollbar** - Themed scrollbar for the problem list
- **Responsive Layout** - Adapts to all screen sizes

## Compatibility

- **Browsers**: Chrome, Firefox, Safari, Edge, Opera
- **Platforms**: Windows, macOS, Linux
- **Codeforces Pages**: Contest, Problemset, and Gym problems
- **URL Support**: Both HTTP and HTTPS

## Technical Details

### Storage
- Uses TamperMonkey's `GM_setValue` and `GM_getValue` for persistent storage
- Data stored locally in your browser
- No server communication - completely private
- JSON format for easy data management

### Time Tracking
- Precise second-level accuracy
- Handles tab switching and visibility changes
- Automatically saves progress on page unload
- Accumulates time across multiple sessions
- Resilient to browser crashes and unexpected closures

### Performance
- Minimal DOM manipulation
- Efficient event handling
- No background processes when tab is inactive
- Instant load times
- Less than 1KB memory footprint

## Troubleshooting

### Icon not appearing?
- Ensure TamperMonkey is enabled
- Check if the script is active for codeforces.com
- Refresh the page
- Check browser console for errors

### Timer not working?
- Ensure you're on a valid problem page
- Check that TamperMonkey has necessary permissions
- Try disabling and re-enabling the script
- Clear script data and restart

### Data not saving?
- Ensure TamperMonkey has storage permissions
- Check browser console for errors
- Try clearing and retracking problems
- Verify sufficient browser storage space

### Time seems incorrect?
- Time only tracks when tab is active and visible
- Switching tabs pauses the timer
- Minimizing browser pauses the timer
- This is intentional to track actual working time

## Customization

Want to customize the script? Here are some easy modifications:

### Change maximum tracked problems
```javascript
const MAX_PROBLEMS = 100; // Change this number (line 18)
```

### Change timer update frequency
```javascript
activeTimer = setInterval(() => {
    updateTimeSpent();
}, 1000); // Change interval in milliseconds
```

### Adjust icon position
```css
.cf-tracker-icon {
    bottom: 30px;  /* Vertical position */
    right: 30px;   /* Horizontal position */
}
```

### Change color scheme
Replace the orange colors (`#ff6b35`, `#f7931e`) and green colors (`#2ecc71`, `#27ae60`) throughout the CSS section.

## Related Projects

- [Codeforces Problem Statement Copier](https://github.com/cthboss001/codeforces-problem-copier) - Copy problem statements with one click

These scripts work great together for an enhanced Codeforces experience!

## Contributing

Contributions are welcome! Please feel free to:
- Report bugs by opening an issue
- Suggest new features
- Submit pull requests
- Improve documentation
- Share feedback

## Version History

### Version 2.0 (Current)
- Added comprehensive time tracking
- Live timer display during active sessions
- Session management (pause on tab switch)
- Active problem highlighting
- Enhanced statistics display
- Improved data persistence
- Better performance optimization

### Version 1.0
- Initial release
- Basic problem tracking
- Access count and timestamps
- Dark theme UI

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**cthboss001**

Created for competitive programmers who want to track their problem-solving journey and time investment.

## Acknowledgments

- Built for the Codeforces competitive programming community
- Inspired by the need to track problem-solving progress and time management
- Thanks to all competitive programmers who test and provide feedback

## Support

If you encounter any issues or have suggestions:
- Open an issue on GitHub
- Provide detailed information about the problem
- Include browser and TamperMonkey version
- Share console error messages if applicable

## Show Your Support

If you find this script helpful:
- Give it a star on GitHub
- Share it with fellow competitive programmers
- Contribute improvements
- Report bugs and suggest features

---

**Made with dedication for the Competitive Programming Community**

Happy Coding and may your time be well spent!
