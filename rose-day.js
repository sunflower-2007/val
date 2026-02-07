// Rose Day Specific JavaScript - Floating Roses Animation

// Date checking for Rose Day
function checkRoseDayAccess() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    
    // Check if we're in February 2026 and it's February 7 or later
    // Or if it's any year after 2026 and February 7 or later
    const isUnlocked = (currentYear === 2026 && currentMonth === 2 && currentDay >= 7) || 
                      (currentYear > 2026) || 
                      (currentYear === 2026 && currentMonth > 2) ||
                      (currentYear === 2026 && currentMonth === 2 && currentDay >= 7);
    
    if (isUnlocked) {
        document.querySelector('.day-page').style.display = 'flex';
        document.querySelector('.lock-screen').style.display = 'none';
        console.log('Rose Day is unlocked!');
    } else {
        document.querySelector('.day-page').style.display = 'none';
        document.querySelector('.lock-screen').style.display = 'flex';
        console.log('Rose Day is locked - starting countdown');
        startCountdown();
    }
}

// Countdown timer for lock screen
function startCountdown() {
    const unlockDate = new Date(2026, 1, 7); // February 7, 2026
    const countdownElement = document.querySelector('.countdown');
    
    function updateCountdown() {
        const now = new Date();
        const diff = unlockDate - now;
        
        if (diff <= 0) {
            countdownElement.textContent = 'Unlocked! Refreshing...';
            setTimeout(() => {
                checkRoseDayAccess(); // Check again to unlock permanently
            }, 1000);
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        let timeString = '';
        if (days > 0) timeString += `${days}d `;
        if (hours > 0) timeString += `${hours}h `;
        if (minutes > 0) timeString += `${minutes}m `;
        timeString += `${seconds}s`;
        
        countdownElement.textContent = `Unlocks in: ${timeString}`;
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Stop countdown when unlocked
    setTimeout(() => {
        clearInterval(countdownInterval);
    }, unlockDate - new Date() + 2000);
}

// Add floating roses for Rose Day
function createFloatingRose() {
    console.log('Creating rose...'); // Debug log
    const rose = document.createElement('div');
    rose.innerHTML = '🌹'; // Only rose emoji
    rose.style.cssText = `
        position: fixed;
        bottom: -100px;
        left: ${Math.random() * 100}%;
        font-size: ${Math.random() * 80 + 60}px;
        opacity: ${Math.random() * 0.4 + 0.5};
        z-index: 0;
        pointer-events: none;
        animation: floatUpSlow ${Math.random() * 6 + 8}s linear;
        transform: translateX(-50%);
        filter: drop-shadow(0 0 12px rgba(255, 0, 0, 0.6));
    `;
    
    document.body.appendChild(rose);
    console.log('Rose added to body'); // Debug log
    
    setTimeout(() => {
        rose.remove();
        console.log('Rose removed'); // Debug log
    }, 10000);
}

// Add rose animation keyframes
const roseStyle = document.createElement('style');
roseStyle.id = 'rose-styles';
roseStyle.textContent = `
    @keyframes floatUpSlow {
        from {
            bottom: -100px;
            opacity: 0;
        }
        10% {
            opacity: ${Math.random() * 0.4 + 0.5};
        }
        to {
            bottom: 110vh;
            transform: translateX(-50%) rotate(360deg) scale(1.2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(roseStyle);

// Start creating roses when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Rose Day page loaded - starting roses'); // Debug log
    
    // Check if Rose Day is unlocked
    checkRoseDayAccess();
    
    // Create initial roses immediately
    for(let i = 0; i < 5; i++) {
        setTimeout(createFloatingRose, i * 200);
    }
    
    // Create multiple rose generators for heavy rose shower
    setInterval(createFloatingRose, 800);
    
    // Add additional staggered rose generators
    for(let i = 0; i < 3; i++) {
        setTimeout(() => setInterval(createFloatingRose, 1000), i * 300);
    }
});

// Also start immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM ready - starting roses');
        checkRoseDayAccess();
        setTimeout(createFloatingRose, 100);
    });
} else {
    console.log('DOM already loaded - starting roses immediately');
    checkRoseDayAccess();
    setTimeout(createFloatingRose, 100);
}
