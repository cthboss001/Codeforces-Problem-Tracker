// ==UserScript==
// @name         Codeforces Problem Tracker with Time Tracking
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Track Codeforces problems with timestamps, access count, and time spent
// @author       cthboss01
// @match        https://codeforces.com/*
// @match        http://codeforces.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Add custom styles
    GM_addStyle(`
        .cf-tracker-icon {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            border-radius: 50%;
            box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: all 0.3s ease;
            border: 3px solid rgba(255, 255, 255, 0.2);
        }

        .cf-tracker-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(255, 107, 53, 0.6);
        }

        .cf-tracker-icon svg {
            width: 32px;
            height: 32px;
            fill: white;
        }

        .cf-tracker-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff3838;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            border: 2px solid #1a1a1a;
        }

        .cf-live-timer {
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);
            z-index: 9999;
            display: none;
            align-items: center;
            gap: 8px;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .cf-live-timer.active {
            display: flex;
        }

        .cf-live-timer-icon {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .cf-tracker-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            z-index: 10001;
            display: none;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        }

        .cf-tracker-modal.active {
            display: flex;
        }

        .cf-tracker-content {
            background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
            border-radius: 20px;
            width: 90%;
            max-width: 900px;
            max-height: 85vh;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 2px solid rgba(255, 107, 53, 0.3);
            display: flex;
            flex-direction: column;
        }

        .cf-tracker-header {
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            padding: 25px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid rgba(255, 107, 53, 0.5);
        }

        .cf-tracker-header h2 {
            margin: 0;
            color: white;
            font-size: 28px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .cf-tracker-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .cf-tracker-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
        }

        .cf-tracker-body {
            padding: 25px 30px;
            overflow-y: auto;
            flex: 1;
        }

        .cf-tracker-empty {
            text-align: center;
            padding: 60px 20px;
            color: #888;
            font-size: 18px;
        }

        .cf-tracker-problem {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            border: 1px solid rgba(255, 107, 53, 0.2);
            transition: all 0.3s ease;
        }

        .cf-tracker-problem:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 107, 53, 0.5);
            transform: translateX(5px);
        }

        .cf-tracker-problem.active-problem {
            border: 2px solid #2ecc71;
            background: rgba(46, 204, 113, 0.1);
        }

        .cf-problem-title {
            font-size: 18px;
            font-weight: bold;
            color: #ff6b35;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .cf-problem-title a {
            color: #ff6b35;
            text-decoration: none;
            flex: 1;
        }

        .cf-problem-title a:hover {
            color: #f7931e;
            text-decoration: underline;
        }

        .cf-problem-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
            margin-top: 12px;
        }

        .cf-stat-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #ccc;
            font-size: 14px;
        }

        .cf-stat-icon {
            color: #ff6b35;
            font-weight: bold;
        }

        .cf-stat-label {
            color: #999;
        }

        .cf-stat-value {
            color: #fff;
            font-weight: 500;
        }

        .cf-stat-value.time-highlight {
            color: #2ecc71;
            font-weight: bold;
        }

        .cf-access-count {
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: bold;
        }

        .cf-active-indicator {
            background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .cf-tracker-footer {
            background: rgba(0, 0, 0, 0.3);
            padding: 20px 30px;
            border-top: 1px solid rgba(255, 107, 53, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .cf-tracker-clear {
            background: linear-gradient(135deg, #ff3838 0%, #ff6b35 100%);
            color: white;
            border: none;
            padding: 10px 25px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        .cf-tracker-clear:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(255, 56, 56, 0.4);
        }

        .cf-tracker-info {
            color: #999;
            font-size: 14px;
        }

        /* Scrollbar styling */
        .cf-tracker-body::-webkit-scrollbar {
            width: 8px;
        }

        .cf-tracker-body::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }

        .cf-tracker-body::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            border-radius: 10px;
        }

        .cf-tracker-body::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #f7931e 0%, #ff6b35 100%);
        }
    `);

    // Initialize storage
    const STORAGE_KEY = 'cf_problem_tracker_data';
    const MAX_PROBLEMS = 100;

    // Time tracking variables
    let activeTimer = null;
    let currentProblemUrl = null;
    let sessionStartTime = null;
    let liveTimerDisplay = null;
    let liveTimerInterval = null;

    // Get stored data
    function getData() {
        const data = GM_getValue(STORAGE_KEY, '[]');
        return JSON.parse(data);
    }

    // Save data
    function saveData(data) {
        GM_setValue(STORAGE_KEY, JSON.stringify(data));
    }

    // Check if current page is a problem page
    function isProblemPage() {
        const path = window.location.pathname;
        return /\/(contest|problemset|gym)\/\d+\/problem\/[A-Z]\d*/.test(path) ||
               /\/problemset\/problem\/\d+\/[A-Z]\d*/.test(path);
    }

    // Extract problem info from current page
    function extractProblemInfo() {
        const url = window.location.href;
        const titleElement = document.querySelector('.problem-statement .title, .header .title');
        const title = titleElement ? titleElement.textContent.trim() : 'Unknown Problem';

        return {
            title: title,
            url: url,
            firstOpen: Date.now(),
            lastAccessed: Date.now(),
            accessCount: 1,
            timeSpent: 0 // in seconds
        };
    }

    // Start time tracking for current problem
    function startTimeTracking() {
        if (!isProblemPage()) return;

        currentProblemUrl = window.location.href;
        sessionStartTime = Date.now();

        // Show live timer
        if (liveTimerDisplay) {
            liveTimerDisplay.classList.add('active');
        }

        // Update time every second
        if (activeTimer) clearInterval(activeTimer);

        activeTimer = setInterval(() => {
            updateTimeSpent();
        }, 1000);

        // Update live display every second
        if (liveTimerInterval) clearInterval(liveTimerInterval);

        liveTimerInterval = setInterval(() => {
            updateLiveTimer();
        }, 1000);
    }

    // Stop time tracking
    function stopTimeTracking() {
        if (activeTimer) {
            clearInterval(activeTimer);
            activeTimer = null;
        }

        if (liveTimerInterval) {
            clearInterval(liveTimerInterval);
            liveTimerInterval = null;
        }

        if (currentProblemUrl && sessionStartTime) {
            updateTimeSpent();
            currentProblemUrl = null;
            sessionStartTime = null;
        }

        // Hide live timer
        if (liveTimerDisplay) {
            liveTimerDisplay.classList.remove('active');
        }
    }

    // Update time spent on current problem
    function updateTimeSpent() {
        if (!currentProblemUrl || !sessionStartTime) return;

        const problems = getData();
        const existingIndex = problems.findIndex(p => p.url === currentProblemUrl);

        if (existingIndex !== -1) {
            const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
            problems[existingIndex].timeSpent = (problems[existingIndex].timeSpent || 0) + sessionTime;
            saveData(problems);
            sessionStartTime = Date.now(); // Reset for next interval
        }
    }

    // Update live timer display
    function updateLiveTimer() {
        if (!liveTimerDisplay || !currentProblemUrl || !sessionStartTime) return;

        const problems = getData();
        const problem = problems.find(p => p.url === currentProblemUrl);

        if (problem) {
            const currentSessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
            const totalTime = (problem.timeSpent || 0) + currentSessionTime;
            const timeText = liveTimerDisplay.querySelector('.cf-timer-text');
            if (timeText) {
                timeText.textContent = formatTime(totalTime);
            }
        }
    }

    // Format time duration
    function formatTime(seconds) {
        if (seconds < 60) return `${seconds}s`;

        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            const remainingHours = hours % 24;
            return `${days}d ${remainingHours}h`;
        }
        if (hours > 0) {
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}m`;
        }
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }

    // Update problem tracking
    function trackProblem() {
        if (!isProblemPage()) {
            stopTimeTracking();
            return;
        }

        const currentProblem = extractProblemInfo();
        let problems = getData();

        // Check if problem already exists
        const existingIndex = problems.findIndex(p => p.url === currentProblem.url);

        if (existingIndex !== -1) {
            // Update existing problem
            problems[existingIndex].lastAccessed = Date.now();
            problems[existingIndex].accessCount++;
        } else {
            // Add new problem
            problems.unshift(currentProblem);

            // Keep only the latest problems
            if (problems.length > MAX_PROBLEMS) {
                problems = problems.slice(0, MAX_PROBLEMS);
            }
        }

        saveData(problems);
        updateBadge();
        startTimeTracking();
    }

    // Format date
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // Create live timer display
    function createLiveTimer() {
        liveTimerDisplay = document.createElement('div');
        liveTimerDisplay.className = 'cf-live-timer';
        liveTimerDisplay.innerHTML = `
            <span class="cf-live-timer-icon">⏱️</span>
            <span class="cf-timer-text">0s</span>
        `;
        document.body.appendChild(liveTimerDisplay);
    }

    // Create tracker icon
    function createTrackerIcon() {
        const icon = document.createElement('div');
        icon.className = 'cf-tracker-icon';
        icon.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            <div class="cf-tracker-badge">0</div>
        `;

        icon.addEventListener('click', openModal);
        document.body.appendChild(icon);

        updateBadge();
    }

    // Update badge count
    function updateBadge() {
        const problems = getData();
        const badge = document.querySelector('.cf-tracker-badge');
        if (badge) {
            badge.textContent = problems.length;
        }
    }

    // Create modal
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'cf-tracker-modal';
        modal.innerHTML = `
            <div class="cf-tracker-content">
                <div class="cf-tracker-header">
                    <h2>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                        </svg>
                        Problem Tracker
                    </h2>
                    <button class="cf-tracker-close">&times;</button>
                </div>
                <div class="cf-tracker-body"></div>
                <div class="cf-tracker-footer">
                    <div class="cf-tracker-info">Tracking last ${MAX_PROBLEMS} problems</div>
                    <button class="cf-tracker-clear">Clear All Data</button>
                </div>
            </div>
        `;

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        modal.querySelector('.cf-tracker-close').addEventListener('click', closeModal);
        modal.querySelector('.cf-tracker-clear').addEventListener('click', clearAllData);

        document.body.appendChild(modal);
    }

    // Open modal
    function openModal() {
        const modal = document.querySelector('.cf-tracker-modal');
        modal.classList.add('active');
        renderProblems();
    }

    // Close modal
    function closeModal() {
        const modal = document.querySelector('.cf-tracker-modal');
        modal.classList.remove('active');
    }

    // Render problems list
    function renderProblems() {
        const problems = getData();
        const body = document.querySelector('.cf-tracker-body');

        if (problems.length === 0) {
            body.innerHTML = `
                <div class="cf-tracker-empty">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="#444" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                    <p>No problems tracked yet.<br>Start solving problems to see them here!</p>
                </div>
            `;
            return;
        }

        const currentUrl = window.location.href;

        body.innerHTML = problems.map((problem, index) => {
            const isActive = currentUrl === problem.url && isProblemPage();
            const activeClass = isActive ? 'active-problem' : '';
            const activeIndicator = isActive ? '<span class="cf-active-indicator"><span class="cf-live-timer-icon">⏱️</span> Active Now</span>' : '';

            return `
            <div class="cf-tracker-problem ${activeClass}">
                <div class="cf-problem-title">
                    <span>${index + 1}.</span>
                    <a href="${problem.url}" target="_blank">${problem.title}</a>
                    ${activeIndicator}
                    <span class="cf-access-count">${problem.accessCount}× opened</span>
                </div>
                <div class="cf-problem-stats">
                    <div class="cf-stat-item">
                        <span class="cf-stat-icon">⏱️</span>
                        <span class="cf-stat-label">Time spent:</span>
                        <span class="cf-stat-value time-highlight">${formatTime(problem.timeSpent || 0)}</span>
                    </div>
                    <div class="cf-stat-item">
                        <span class="cf-stat-icon">🕐</span>
                        <span class="cf-stat-label">First opened:</span>
                        <span class="cf-stat-value">${formatDate(problem.firstOpen)}</span>
                    </div>
                    <div class="cf-stat-item">
                        <span class="cf-stat-icon">🔄</span>
                        <span class="cf-stat-label">Last accessed:</span>
                        <span class="cf-stat-value">${formatDate(problem.lastAccessed)}</span>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    }

    // Clear all data
    function clearAllData() {
        if (confirm('Are you sure you want to clear all tracked problems?')) {
            saveData([]);
            updateBadge();
            renderProblems();
        }
    }

    // Initialize
    function init() {
        createTrackerIcon();
        createLiveTimer();
        createModal();
        trackProblem();

        // Handle page visibility changes (tab switching, minimizing)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopTimeTracking();
            } else if (isProblemPage()) {
                startTimeTracking();
            }
        });

        // Handle page unload
        window.addEventListener('beforeunload', () => {
            stopTimeTracking();
        });

        // Handle navigation within single page (for SPA-like behavior)
        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                stopTimeTracking();
                setTimeout(() => {
                    trackProblem();
                }, 500);
            }
        }).observe(document.body, { subtree: true, childList: true });
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
