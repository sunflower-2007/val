// Initialize 3D Heart Background with Three.js
function initializeThreedHeartBackground() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    container.appendChild(renderer.domElement);

    // Create actual 3D heart shape
    function createOrganicHeartGeometry() {
        const shape = new THREE.Shape();
        
        // Create 2D heart shape using bezier curves
        const x = 0;
        const y = 0;
        
        // Start at bottom point
        shape.moveTo(x, y - 5);
        
        // Left bottom curve
        shape.bezierCurveTo(x - 8, y - 2, x - 10, y + 2, x - 10, y + 6);
        
        // Left lobe
        shape.bezierCurveTo(x - 10, y + 10, x - 8, y + 12, x - 4, y + 12);
        shape.bezierCurveTo(x - 1, y + 12, x - 0.5, y + 10, x, y + 8);
        
        // Right lobe
        shape.bezierCurveTo(x + 0.5, y + 10, x + 1, y + 12, x + 4, y + 12);
        shape.bezierCurveTo(x + 8, y + 12, x + 10, y + 10, x + 10, y + 6);
        
        // Right bottom curve
        shape.bezierCurveTo(x + 10, y + 2, x + 8, y - 2, x, y - 5);
        
        // Extrude into 3D
        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 3,
            bevelEnabled: true,
            bevelThickness: 0.3,
            bevelSize: 0.2,
            bevelSegments: 8
        });
        
        geometry.center();
        geometry.scale(0.35, 0.35, 0.35);
        
        return geometry;
    }

    // Create matte finish heart material
    const heartMaterial = new THREE.MeshStandardMaterial({
        color: 0x4f020e,
        metalness: 0.1,
        roughness: 0.8,
        emissive: 0x3d1218,
        emissiveIntensity: 0.2,
        side: THREE.FrontSide
    });

    const heartGeometry = createOrganicHeartGeometry();
    const heart = new THREE.Mesh(heartGeometry, heartMaterial);
    heart.castShadow = true;
    heart.receiveShadow = true;
    heart.rotation.x = 0.3;
    scene.add(heart);

    // Cinematic lighting setup for premium feel
    
    // Key light - warm, from upper right front
    const keyLight = new THREE.DirectionalLight(0xff8888, 1.3);
    keyLight.position.set(6, 8, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -15;
    keyLight.shadow.camera.right = 15;
    keyLight.shadow.camera.top = 15;
    keyLight.shadow.camera.bottom = -15;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Rim light - elegant edge highlighting from back left
    const rimLight = new THREE.DirectionalLight(0xffaaaa, 0.7);
    rimLight.position.set(-8, 6, 10);
    scene.add(rimLight);

    // Fill light - subtle, from lower right
    const fillLight = new THREE.DirectionalLight(0xdd7777, 0.5);
    fillLight.position.set(5, -4, 4);
    scene.add(fillLight);

    // Ambient light - warm overall glow
    const ambientLight = new THREE.AmbientLight(0xbb8888, 0.7);
    scene.add(ambientLight);

    // Point light - subtle glow effect around heart
    const pointLight = new THREE.PointLight(0xff6b6b, 0.6, 60);
    pointLight.position.set(0, 0, 6);
    scene.add(pointLight);

    // Additional point light from back for rim glow
    const backPointLight = new THREE.PointLight(0xff9999, 0.4, 50);
    backPointLight.position.set(0, 0, -8);
    scene.add(backPointLight);

    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);

    // Animation loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth rotation around Y axis - centered and elegant
        heart.rotation.y += 0.004;
        
        // Subtle floating motion - gentle and calming
        heart.position.y = Math.sin(elapsedTime * 0.4) * 0.25;

        // Very subtle scale breathing - almost imperceptible
        const breatheScale = 1 + Math.sin(elapsedTime * 0.6) * 0.015;
        heart.scale.set(breatheScale, breatheScale, breatheScale);

        // Animate lighting intensity subtly for living effect
        pointLight.intensity = 0.6 + Math.sin(elapsedTime * 1.2) * 0.25;
        rimLight.intensity = 0.7 + Math.sin(elapsedTime * 0.8) * 0.15;

        renderer.render(scene, camera);
    }

    animate();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initializeThreedHeartBackground);

// Valentine Week Date-Based Unlocking System
class ValentineWeekManager {
    constructor() {
        this.currentDate = new Date();
        this.currentYear = 2026; // Updated to 2026
        this.valentineDays = {
            7: { name: 'Rose Day', page: 'rose-day.html' },
            8: { name: 'Propose Day', page: 'propose-day.html' },
            9: { name: 'Chocolate Day', page: 'chocolate-day.html' },
            10: { name: 'Teddy Day', page: 'teddy-day.html' },
            11: { name: 'Promise Day', page: 'promise-day.html' },
            12: { name: 'Hug Day', page: 'hug-day.html' },
            13: { name: 'Kiss Day', page: 'kiss-day.html' },
            14: { name: "Valentine's Day", page: 'valentines-day.html' }
        };
        this.init();
    }

    init() {
        if (document.querySelector('.days-grid')) {
            this.initHomePage();
        } else if (document.querySelector('.day-page') || document.querySelector('.lock-screen')) {
            this.initDayPage();
        }
    }

    initHomePage() {
        this.updateCards();
        // Check every minute for unlocks
        setInterval(() => this.updateCards(), 60000);
        
        // Add click handlers to cards
        document.querySelectorAll('.day-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleCardClick(e));
        });
    }

    initDayPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const day = parseInt(urlParams.get('day'));
        
        if (day) {
            this.checkDayAccess(day);
        }
    }

    isDayUnlocked(day) {
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed
        const currentYear = today.getFullYear();
        
        // Check if we're in February 2026 (or current year)
        if (currentMonth === 2 && currentYear === 2026) {
            return currentDay >= day;
        }
        
        // If not February, all days are locked
        return false;
    }

    updateCards() {
        document.querySelectorAll('.day-card').forEach(card => {
            const day = parseInt(card.dataset.day);
            const isUnlocked = this.isDayUnlocked(day);
            
            if (isUnlocked) {
                card.classList.remove('locked');
                card.classList.add('unlocked');
            } else {
                card.classList.add('locked');
                card.classList.remove('unlocked');
            }
        });
    }

    handleCardClick(e) {
        const card = e.currentTarget;
        const day = parseInt(card.dataset.day);
        const page = card.dataset.page;
        
        if (this.isDayUnlocked(day)) {
            window.location.href = page;
        } else {
            this.showLockedMessage(card);
        }
    }

    showLockedMessage(card) {
        const day = parseInt(card.dataset.day);
        const dayName = this.valentineDays[day].name;
        const unlockDate = new Date(this.currentYear, 1, day); // February is month 1
        const now = new Date();
        
        if (unlockDate > now) {
            const timeUntilUnlock = this.getTimeUntilUnlock(unlockDate);
            this.createNotification(`💌 ${dayName} unlocks in ${timeUntilUnlock}. Have patience baby 💋`);
        } else {
            this.createNotification(`💌 ${dayName} coming soon!`);
        }
    }

    getTimeUntilUnlock(unlockDate) {
        const now = new Date();
        const diff = unlockDate - now;
        
        if (diff <= 0) return 'soon!';
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        return 'less than a minute';
    }

    createNotification(message) {
        // Remove existing notification if any
        const existingNotif = document.querySelector('.notification');
        if (existingNotif) {
            existingNotif.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #dc143c, #ff69b4);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 500;
            max-width: 300px;
        `;

        // Add animation keyframes if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    checkDayAccess(day) {
        if (this.isDayUnlocked(day)) {
            this.showDayContent();
        } else {
            this.showLockScreen(day);
        }
    }

    showDayContent() {
        const lockScreen = document.querySelector('.lock-screen');
        const dayPage = document.querySelector('.day-page');
        
        if (lockScreen) {
            lockScreen.style.display = 'none';
        }
        if (dayPage) {
            dayPage.style.display = 'flex';
        }
    }

    showLockScreen(day) {
        const lockScreen = document.querySelector('.lock-screen');
        const dayPage = document.querySelector('.day-page');
        const dayName = this.valentineDays[day].name;
        const unlockDate = new Date(2026, 1, day); // February 2026
        
        if (lockScreen) {
            // Update lock screen content
            const lockMessage = lockScreen.querySelector('.lock-message');
            const countdown = lockScreen.querySelector('.countdown');
            
            if (lockMessage) {
                lockMessage.textContent = `Not yet, love 💌 Come back at 12:00 AM. Have patience baby 🥺`;
            }
            
            if (countdown) {
                this.updateCountdown(countdown, unlockDate);
                setInterval(() => this.updateCountdown(countdown, unlockDate), 1000);
            }
            
            lockScreen.style.display = 'flex';
        }
        
        if (dayPage) {
            dayPage.style.display = 'none';
        }
    }

    updateCountdown(element, unlockDate) {
        const now = new Date();
        const diff = unlockDate - now;
        
        if (diff <= 0) {
            element.textContent = 'Unlocked! Refreshing...';
            setTimeout(() => window.location.reload(), 1000);
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
        
        element.textContent = `Unlocks in: ${timeString}`;
    }
}

// Initialize the Valentine Week Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ValentineWeekManager();
});

// Add romantic floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓'];
    heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.cssText = `
        position: fixed;
        bottom: -100px;
        left: ${Math.random() * 100}%;
        font-size: ${Math.random() * 60 + 40}px;
        opacity: ${Math.random() * 0.4 + 0.4};
        z-index: 1;
        pointer-events: none;
        animation: floatUp ${Math.random() * 4 + 6}s linear;
        transform: translateX(-50%);
        filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5));
    `;
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#heart-styles')) {
        const style = document.createElement('style');
        style.id = 'heart-styles';
        style.textContent = `
            @keyframes floatUp {
                to {
                    bottom: 100vh;
                    transform: translateX(-50%) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 8000);
}

// Add floating roses for Rose Day
function createFloatingRose() {
    const rose = document.createElement('div');
    const roseEmojis = ['🌹', '�', '�', '�', '🌸'];
    rose.innerHTML = roseEmojis[Math.floor(Math.random() * roseEmojis.length)];
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
    
    // Add rose animation keyframes if not already present
    if (!document.querySelector('#rose-styles')) {
        const style = document.createElement('style');
        style.id = 'rose-styles';
        style.textContent = `
            @keyframes floatUpSlow {
                to {
                    bottom: 100vh;
                    transform: translateX(-50%) rotate(360deg) scale(1.2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(rose);
    
    setTimeout(() => rose.remove(), 10000);
}

// Create floating hearts more frequently
setInterval(createFloatingHeart, 1500);
