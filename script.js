// Rizz Meter Functionality
let rizzLevel = 0;
const rizzMeter = document.getElementById('rizzMeter');
const rizzText = document.getElementById('rizzText');
const activateBtn = document.getElementById('activateRizz');

const rizzMessages = [
    "Initializing rizz protocols...",
    "Scanning for rizz levels... 20%",
    "Rizz detection: MODERATE 🔥",
    "Rizz levels: ELEVATED 🔥🔥",
    "WARNING: HIGH RIZZ DETECTED 🔥🔥🔥",
    "CRITICAL: MAXIMUM RIZZ ACHIEVED 🔥🔥🔥🔥",
    "LEGENDARY RIZZ STATUS UNLOCKED! 💯🔥✨"
];

function updateRizzMeter() {
    if (rizzLevel < rizzMessages.length) {
        rizzMeter.style.width = ((rizzLevel + 1) / rizzMessages.length * 100) + '%';
        rizzText.textContent = rizzMessages[rizzLevel];
        rizzLevel++;
        
        if (rizzLevel < rizzMessages.length) {
            setTimeout(updateRizzMeter, 800);
        } else {
            createFireworks();
        }
    }
}

updateRizzMeter();

activateBtn.addEventListener('click', () => {
    rizzLevel = 0;
    updateRizzMeter();
    createHeartExplosion();
});

// Hearts Animation
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.getElementById('heartsContainer').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

function createHeartExplosion() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart(
                Math.random() * window.innerWidth,
                window.innerHeight
            );
        }, i * 100);
    }
}

// Random hearts throughout the page
setInterval(() => {
    if (Math.random() > 0.7) {
        createHeart(
            Math.random() * window.innerWidth,
            window.innerHeight
        );
    }
}, 2000);

// Message Button
const messages = [
    "Hey Melodycita! 👋 You're looking absolutely stunning today! ✨",
    "Did you know? Scientists say you're 100% certified amazing 🔬💕",
    "Fun fact: Every time you smile, an angel gets its wings 😇",
    "Breaking news: You've been elected as the coolest person ever! 🎉",
    "Roses are red, violets are blue, this website is cool, but not as cool as you! 💐",
    "I would say you're one in a million, but that's an understatement! 🌟",
    "If being gorgeous was a crime, you'd be serving a life sentence! 😎",
    "You must be made of stars because you're absolutely stellar! ⭐",
    "Warning: Prolonged exposure to your smile may cause uncontrollable happiness! 😊",
    "Plot twist: You're the main character and everyone else is just an NPC 🎮"
];

let messageIndex = 0;
const messageBtn = document.getElementById('messageBtn');
const messageBox = document.getElementById('messageBox');

messageBtn.addEventListener('click', () => {
    messageBox.style.display = 'block';
    messageBox.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    createHeartExplosion();
});

// Isaac's Mogging Section - Battle Arena
const isaacMog = document.getElementById('isaacMog');
const mogBtn = document.getElementById('mogBtn');
const mogCounter = document.getElementById('mogCounter');
const mogQuote = document.getElementById('mogQuote');
const mogStatus = document.getElementById('mogStatus');
const challengerImg = document.getElementById('challengerImg');
const challengerName = document.getElementById('challengerName');
const challengerPower = document.getElementById('challengerPower');
const battleResult = document.getElementById('battleResult');

let mogCount = 0;
let currentChallengerIndex = 0;
let isBattling = false;

const challengers = [
    { name: 'AMIR', img: 'amir1.JPG', power: '42' },
    { name: 'AMIR V2', img: 'amir2.JPG', power: '67' },
    { name: 'AMIR V3', img: 'amir3.JPG', power: '89' },
    { name: 'CUTE AMIR', img: 'amircute.JPG', power: '95' },
    { name: 'TUFF AMIR', img: 'tuffness.JPG', power: '120' }
];

const mogQuotes = [
    '"Isaac doesn\'t just walk into a room, he mogs into it." - Ancient Proverb',
    '"They say legends never die. Isaac proves legends never started, they just mogged." - Unknown',
    '"Some are born great, some achieve greatness, Isaac was born mogging." - Shakespeare (probably)',
    '"I came, I saw, I mogged." - Isaac Caesar',
    '"One small step for man, one giant mog for mankind." - Neil Armstrong after meeting Isaac',
    '"To mog or not to mog? Isaac doesn\'t ask such questions." - Hamlet',
    '"Houston, we have a mog situation." - Apollo 13 (Isaac was on board)',
    '"The only thing we have to fear is not being as cool as Isaac." - FDR',
    '"Ask not what Isaac can do for you, ask what you can do to reach his mog level." - JFK',
    '"Float like a butterfly, mog like Isaac." - Muhammad Ali'
];

const mogStatuses = [
    'Status: ACTIVELY MOGGING',
    'Status: MAXIMUM MOGGING DETECTED',
    'Status: LEGENDARY MOG MODE',
    'Status: ULTRA INSTINCT MOG',
    'Status: GOD-TIER MOGGING',
    'Status: CRITICAL MOG LEVELS',
    'Status: MOG SINGULARITY ACHIEVED',
    'Status: TRANSCENDENT MOGGING'
];

function loadNextChallenger() {
    const challenger = challengers[currentChallengerIndex];
    challengerImg.src = challenger.img;
    challengerName.textContent = challenger.name;
    challengerPower.textContent = `Power Level: ${challenger.power}`;
    
    // Reset challenger appearance
    challengerImg.style.opacity = '1';
    challengerImg.style.transform = 'scale(1) rotate(0deg)';
    challengerImg.style.filter = 'none';
    
    currentChallengerIndex = (currentChallengerIndex + 1) % challengers.length;
}

mogBtn.addEventListener('click', () => {
    if (isBattling) return; // Prevent clicking during battle
    
    isBattling = true;
    mogCount++;
    mogCounter.textContent = mogCount;
    
    mogBtn.disabled = true;
    mogBtn.textContent = 'BATTLE IN PROGRESS...';
    battleResult.textContent = '⚔️ BATTLE STARTING! ⚔️';
    
    // Change quote
    const randomQuote = mogQuotes[Math.floor(Math.random() * mogQuotes.length)];
    mogQuote.textContent = randomQuote;
    
    // Change status
    const randomStatus = mogStatuses[Math.floor(Math.random() * mogStatuses.length)];
    mogStatus.textContent = randomStatus;
    
    // BATTLE SEQUENCE
    setTimeout(() => {
        battleResult.textContent = '💥 CHALLENGER ATTACKS! 💥';
        
        // Challenger tries to compete
        challengerImg.classList.add('trying-to-compete');
        
        setTimeout(() => {
            battleResult.textContent = '🔥 ISAAC COUNTERS WITH MAXIMUM MOG! 🔥';
            
            // INTENSE ISAAC ANIMATION
            isaacMog.classList.add('mogging-intensify');
            
            setTimeout(() => {
                battleResult.textContent = '💀 CHALLENGER DEFEATED! 💀';
                
                // Challenger gets mogged
                challengerImg.classList.remove('trying-to-compete');
                challengerImg.classList.add('got-mogged');
                
                // Create golden particle effect
                createGoldenParticles();
                
                setTimeout(() => {
                    battleResult.textContent = '👑 ISAAC WINS! FLAWLESS VICTORY! 👑';
                    battleResult.style.color = '#ffd700';
                    
                    // Clean up animations
                    isaacMog.classList.remove('mogging-intensify');
                    challengerImg.classList.remove('got-mogged');
                    
                    // Load next challenger
                    setTimeout(() => {
                        loadNextChallenger();
                        battleResult.textContent = '';
                        battleResult.style.color = '';
                        mogBtn.disabled = false;
                        mogBtn.textContent = 'START MOG BATTLE';
                        isBattling = false;
                    }, 1000);
                }, 1500);
            }, 1000);
        }, 1000);
    }, 500);
    
    // Alert messages based on mog count
    if (mogCount === 1) {
        setTimeout(() => alert('🫡 Isaac dominates! The mogging has begun!'), 4000);
    } else if (mogCount === 5) {
        setTimeout(() => alert('😎 5 victories! Isaac is unstoppable!'), 4000);
    } else if (mogCount === 10) {
        setTimeout(() => alert('🏆 Achievement Unlocked: "10 Mog Streak" - Isaac is legendary!'), 4000);
    } else if (mogCount === 25) {
        setTimeout(() => alert('👑 25 WINS! Isaac has achieved MOG GOD STATUS!'), 4000);
        createFireworks();
    } else if (mogCount === 50) {
        setTimeout(() => alert('💎 ULTIMATE ACHIEVEMENT: 50 VICTORIES! Isaac is the undisputed MOG CHAMPION! 🔥'), 4000);
        createFireworks();
    }
});

// Click on Isaac for surprise
isaacMog.addEventListener('click', () => {
    const surprises = [
        'Isaac is judging you... Verdict: You\'re cool 😎',
        '⚠️ WARNING: Direct eye contact with Isaac may cause increased confidence!',
        'Isaac\'s power level: IT\'S OVER 9000! 💥',
        'You have received Isaac\'s blessing! Mog power +500 🙏',
        '📸 Isaac notices you noticing him. Respect earned!',
        'The prophecy is true... Isaac really is that cool 🌟'
    ];
    
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    alert(randomSurprise);
    createGoldenParticles();
});

function createGoldenParticles() {
    const particles = ['✨', '⭐', '🌟', '💫', '🏆', '👑', '💎'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'floating-heart';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = (Math.random() * window.innerWidth) + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.fontSize = (20 + Math.random() * 20) + 'px';
            document.getElementById('heartsContainer').appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }, i * 60);
    }
}

// Smiley Game
let score = 0;
let timeLeft = 10;
let gameActive = false;
let highScore = 0;
let gameTimer;

const smiley = document.getElementById('smiley');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startGameBtn = document.getElementById('startGame');
const highScoreDisplay = document.getElementById('highScore');

smiley.addEventListener('click', () => {
    if (gameActive) {
        score++;
        scoreDisplay.textContent = score;
        
        // Fun animations
        smiley.style.transform = `scale(${0.8 + Math.random() * 0.4}) rotate(${Math.random() * 720 - 360}deg)`;
        setTimeout(() => {
            smiley.style.transform = 'scale(1) rotate(0deg)';
        }, 100);
        
        createHeart(
            smiley.offsetLeft + smiley.offsetWidth / 2,
            smiley.offsetTop
        );
    }
});

startGameBtn.addEventListener('click', () => {
    if (!gameActive) {
        gameActive = true;
        score = 0;
        timeLeft = 10;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        startGameBtn.textContent = 'Game Running...';
        startGameBtn.disabled = true;
        smiley.classList.remove('disabled');
        
        gameTimer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
});

function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    smiley.classList.add('disabled');
    startGameBtn.textContent = 'Play Again!';
    startGameBtn.disabled = false;
    
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = `High Score: ${highScore} 🏆`;
        alert(`NEW HIGH SCORE! You clicked ${score} times! You're a legend! 🎉`);
    } else {
        alert(`Game Over! You clicked ${score} times! Nice job! 😄`);
    }
}

// Question Section
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');

yesBtn.addEventListener('click', () => {
    response.textContent = "YESSSS! 🎉🎊 You've made the right choice! 💕✨";
    response.style.color = '#43e97b';
    createFireworks();
});

let noAttempts = 0;
noBtn.addEventListener('click', () => {
    noAttempts++;
    const noResponses = [
        "Are you sure? Think about it... 🤔",
        "Come on, give it another chance! 😊",
        "The No button is looking kinda suspicious... 👀",
        "I don't think you really mean that! 💭",
        "Okay but like... really though? 🥺",
        "The No button is malfunctioning! Try the Yes button instead! ⚠️",
        "ERROR 404: No option not found. Please select Yes! 🚫",
        "Plot twist: The No button was a test all along! 🎭",
        "You've been clicking No for a while... Maybe it's a sign to say Yes? 😉"
    ];
    
    if (noAttempts <= noResponses.length) {
        response.textContent = noResponses[Math.min(noAttempts - 1, noResponses.length - 1)];
        response.style.color = '#ff6b6b';
        
        // Make the No button run away on hover after a few clicks
        if (noAttempts > 3) {
            noBtn.addEventListener('mouseenter', moveNoButton);
        }
    }
});

function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 100;
    const maxY = window.innerHeight - noBtn.offsetHeight - 100;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
}

// Gallery Item Click Effects
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const caption = item.getAttribute('data-caption');
        alert(caption);
        createHeartExplosion();
    });
});

// Fireworks Effect
function createFireworks() {
    const colors = ['🎆', '🎇', '✨', '🌟', '💫', '⭐', '🎉', '🎊'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'floating-heart';
            firework.textContent = colors[Math.floor(Math.random() * colors.length)];
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = window.innerHeight + 'px';
            firework.style.fontSize = (20 + Math.random() * 30) + 'px';
            document.getElementById('heartsContainer').appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 4000);
        }, i * 80);
    }
}

// Add some spice to the page load
window.addEventListener('load', () => {
    setTimeout(() => {
        createHeartExplosion();
    }, 500);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        alert('🎮 CHEAT CODE ACTIVATED! ULTRA RIZZ MODE ENGAGED! 🔥💯');
        document.body.style.animation = 'rainbow 2s infinite';
        createFireworks();
        setTimeout(() => {
            createFireworks();
        }, 1000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('🔥 Welcome to HuzzFrick.com - The Rizzler\'s Domain! 🔥');
console.log('💡 Pro tip: Try the Konami code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');

