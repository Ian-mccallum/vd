// Dating App Logic

const profiles = [
    {
        name: 'Isaac',
        age: '23',
        image: 'isaac1.JPG',
        bio: 'Professional mogger. Undefeated champion. Here to steal your girl and your confidence.',
        rizz: '∞',
        mog: '100%',
        distance: '0.1'
    },
    {
        name: 'Amir',
        age: '22',
        image: 'amir1.JPG',
        bio: 'The beginning of a legend. Looking for someone to appreciate the journey.',
        rizz: '85',
        mog: '75%',
        distance: '0.3'
    },
    {
        name: 'Amir 2.0',
        age: '22',
        image: 'amir2.JPG',
        bio: 'Evolution in progress. Peak performance incoming.',
        rizz: '88',
        mog: '80%',
        distance: '0.2'
    },
    {
        name: 'Amir 3.0',
        age: '22',
        image: 'amir3.JPG',
        bio: 'The final form. This isn\'t even my final power level.',
        rizz: '92',
        mog: '85%',
        distance: '0.4'
    },
    {
        name: 'Cutie Amir',
        age: '22',
        image: 'amircute.JPG',
        bio: '🥺 Certified cutie. Will make you smile. Probably the softest one here.',
        rizz: '95',
        mog: '90%',
        distance: '0.15'
    },
    {
        name: 'Dre',
        age: '24',
        image: 'smiley.PNG',
        bio: 'No filter. Always smiling. Here for a good time and an honest time. 😏',
        rizz: '99',
        mog: '98%',
        distance: '0.05'
    },
    {
        name: 'Jorge "Genius"',
        age: '21',
        image: 'jorge.jpg',
        bio: 'IQ: 420. Smarter than Einstein. I\'ll teach you quantum physics while I steal your heart. 🧠',
        rizz: '∞',
        mog: '999%',
        distance: '0.08'
    },
    {
        name: 'Jacob',
        age: '23',
        image: 'jacob.jpg',
        bio: 'Experienced. Melodycita\'s favorite. I roast harder than a 6th grader. Prepare yourself. 🔥',
        rizz: '93',
        mog: '88%',
        distance: '0.12'
    },
    {
        name: 'Imanol',
        age: '19',
        image: 'imanol.jpg',
        bio: 'Teenage freakbag. Media pass collector. I get freaky anywhere, anytime. No limits. 😈',
        rizz: '96',
        mog: '91%',
        distance: '0.06'
    }
];

let currentProfileIndex = 0;
let matchCount = 0;
let passCount = 0;
let stream = null;
let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;
let capturedMedia = [];

// Elements
const startScreen = document.getElementById('startScreen');
const datingScreen = document.getElementById('datingScreen');
const matchScreen = document.getElementById('matchScreen');
const startBtn = document.getElementById('startBtn');
const userVideo = document.getElementById('userVideo');
const profileImage = document.getElementById('profileImage');
const profileName = document.getElementById('profileName');
const profileAge = document.getElementById('profileAge');
const profileBio = document.getElementById('profileBio');
const statRizz = document.getElementById('statRizz');
const statMog = document.getElementById('statMog');
const statDistance = document.getElementById('statDistance');
const rejectBtn = document.getElementById('rejectBtn');
const likeBtn = document.getElementById('likeBtn');
const recordBtn = document.getElementById('recordBtn');
const photoBtn = document.getElementById('photoBtn');
const recordingIndicator = document.getElementById('recordingIndicator');
const statusMessage = document.getElementById('statusMessage');
const matchImage = document.getElementById('matchImage');
const matchText = document.getElementById('matchText');
const continueBtn = document.getElementById('continueBtn');
const startCallBtn = document.getElementById('startCallBtn');
const matchCountEl = document.getElementById('matchCount');
const passCountEl = document.getElementById('passCount');
const callScreen = document.getElementById('callScreen');
const endCallBtn = document.getElementById('endCallBtn');
const userCallVideo = document.getElementById('userCallVideo');
const callerImage = document.getElementById('callerImage');
const callerNameEl = document.getElementById('callerName');
const callDuration = document.getElementById('callDuration');
const callChatMessages = document.getElementById('callChatMessages');
const callChatInput = document.getElementById('callChatInput');
const sendCallMessageBtn = document.getElementById('sendCallMessageBtn');

let callStartTime = null;
let callDurationInterval = null;
let autoMessageInterval = null;
let currentCallProfile = null;
const mediaGallery = document.getElementById('mediaGallery');
const galleryGrid = document.getElementById('galleryGrid');
const galleryToggleBtn = document.getElementById('galleryToggleBtn');
const closeGalleryBtn = document.getElementById('closeGalleryBtn');
const mediaCountEl = document.getElementById('mediaCount');

// Start the app
startBtn.addEventListener('click', async () => {
    try {
        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' }, 
            audio: true 
        });
        
        userVideo.srcObject = stream;
        
        // Hide start screen, show dating screen
        startScreen.style.display = 'none';
        datingScreen.classList.add('active');
        
        // Load first profile
        loadProfile(currentProfileIndex);
        
    } catch (error) {
        alert('Camera access denied! We need your camera to work. Please allow camera access and try again.');
        console.error('Camera error:', error);
    }
});

// Load profile
function loadProfile(index) {
    if (index >= profiles.length) {
        // Loop back to start
        currentProfileIndex = 0;
        index = 0;
    }
    
    const profile = profiles[index];
    profileImage.src = profile.image;
    profileName.textContent = profile.name;
    profileAge.textContent = `${profile.age} years old`;
    profileBio.textContent = profile.bio;
    statRizz.textContent = profile.rizz;
    statMog.textContent = profile.mog;
    statDistance.textContent = profile.distance;
}

// Reject button
rejectBtn.addEventListener('click', () => {
    passCount++;
    passCountEl.textContent = passCount;
    showStatus('PASS 👎');
    swipeLeft();
});

// Like button
likeBtn.addEventListener('click', () => {
    matchCount++;
    matchCountEl.textContent = matchCount;
    showMatch();
});

// Swipe left animation
function swipeLeft() {
    const card = document.getElementById('profileCard');
    card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    card.style.transform = 'translateX(-150%) rotate(-30deg)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        currentProfileIndex++;
        loadProfile(currentProfileIndex);
        card.style.transition = 'none';
        card.style.transform = 'translateX(150%) rotate(30deg)';
        
        setTimeout(() => {
            card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            card.style.transform = 'translateX(0) rotate(0)';
            card.style.opacity = '1';
        }, 50);
    }, 500);
}

// Show match screen
function showMatch() {
    const profile = profiles[currentProfileIndex];
    matchImage.src = profile.image;
    
    const matchMessages = [
        `${profile.name} thinks you're cool! Start the conversation! 💬`,
        `${profile.name} is impressed by your rizz! Chat now! 🔥`,
        `You and ${profile.name} are a perfect match! Don't let this one go! 💕`,
        `${profile.name} wants to get to know you better! Say hi! 👋`,
        `Congratulations! ${profile.name} swiped right too! 🎉`
    ];
    
    matchText.textContent = matchMessages[Math.floor(Math.random() * matchMessages.length)];
    matchScreen.classList.add('show');
    
    // Create hearts
    createHeartExplosion();
}

// Continue after match (skip call)
continueBtn.addEventListener('click', () => {
    matchScreen.classList.remove('show');
    currentProfileIndex++;
    loadProfile(currentProfileIndex);
    swipeLeft();
});

// Start call
startCallBtn.addEventListener('click', () => {
    startCall();
});

// Start call function
function startCall() {
    currentCallProfile = profiles[currentProfileIndex];
    
    // Setup call screen
    callerImage.src = currentCallProfile.image;
    callerNameEl.textContent = currentCallProfile.name;
    userCallVideo.srcObject = stream;
    
    // Hide match screen, show call screen
    matchScreen.classList.remove('show');
    callScreen.classList.add('active');
    
    // Clear previous messages
    callChatMessages.innerHTML = '<div class="chat-welcome-call">Chat is active! Say something! 😊</div>';
    
    // Start call timer
    callStartTime = Date.now();
    callDurationInterval = setInterval(updateCallDuration, 1000);
    
    // Start auto messages
    startAutoMessages();
}

// Update call duration
function updateCallDuration() {
    const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    callDuration.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Auto messages from the profile
function startAutoMessages() {
    const rizzMessages = {
        'Isaac': [
            "Yo, you're looking pretty cool 😎",
            "Not gonna lie, I'm impressed 💯",
            "You got that main character energy 🔥",
            "So when are we hanging out fr? 👀",
            "I can tell you got good taste 😏",
            "This is actually pretty fun ngl",
            "You're making me work for it huh? Respect 🙏",
            "I see why they matched us 💪",
            "I don't usually say this but... you're different 👑",
            "Your vibe is unmatched honestly",
            "We're basically the same person fr 💫",
            "You're carrying this conversation hard (in a good way)",
            "Most people bore me. You don't 🎯",
            "I'm trying to play it cool but you're making it hard 😤",
            "Okay I wasn't expecting to actually vibe with someone",
            "You got me smiling at my phone rn ngl",
            "This hit different 💯",
            "I can see us being really good friends... or more 👀",
            "You're actually funny, that's rare",
            "Wanna start a podcast together? We'd go viral",
            "I feel like I've known you forever somehow",
            "You're lowkey making me nervous and I'm never nervous",
        ],
        'Amir': [
            "Hey! Thanks for matching with me! 😊",
            "You seem really cool! 💕",
            "What kind of stuff are you into? 🎮",
            "I'm loving this already haha",
            "You've got great vibes ✨",
            "This is way better than I expected! 🔥",
            "Ngl you're pretty cute 😅",
            "We should definitely keep talking!",
            "I'm trying to think of something smooth to say but I'm blanking 😂",
            "Are you always this charming or is this just for me? 😏",
            "I'm glad I swiped right fr fr",
            "This app actually works! You're proof 💯",
            "You make talking easy, that's special",
            "I'm getting good vibes from you ✨",
            "We should exchange playlists 🎵",
            "You're way cooler than your bio suggested (and it was already good)",
            "Random but you seem like you'd have great taste in everything",
            "I'm trying not to simp but like... 👉👈",
            "This conversation is top tier already",
            "You're making me actually want to keep this going",
            "Can we skip to the part where we're best friends? 🥺",
        ],
        'Amir 2.0': [
            "Okay wow you're actually really cool",
            "Level 2 unlocked 🔓",
            "You're bringing out my good side 😎",
            "This energy is unmatched fr 💫",
            "I feel like we vibe well 🎵",
            "You're making me step up my game 📈",
            "This is going better than expected!",
            "Can I get your socials? 👀",
            "You're different from everyone else on here",
            "I'm upgrading to premium just to keep talking to you 💳",
            "Why do you make it look so easy? 😤",
            "We're on the same wavelength and it's scary",
            "I wasn't ready for this level of chemistry tbh",
            "You got me out here blushing fr 😳",
            "This might be the best match I've ever had",
            "I'm convinced we're soulmates now",
            "How are you even real? 🤯",
            "You're too good to be true honestly",
            "I'm deleting this app after this, you're the one 💍",
            "This hit me like a truck in the best way",
            "I'm feeling some type of way rn 😮‍💨",
        ],
        'Amir 3.0': [
            "Final form activated 💥",
            "You're witnessing peak performance rn",
            "This isn't even my final rizz level 😤",
            "I knew you were the one 💯",
            "The prophecy was true... 📜",
            "Together we're unstoppable 🚀",
            "This is legendary status fr",
            "We're making history right now 🏆",
            "Power couple energy detected 👑👑",
            "You're operating on a different level",
            "I see you match my energy perfectly 🔥",
            "This is what main character syndrome looks like",
            "We're too powerful together 💪",
            "The universe really said 'they're ready' huh",
            "I unlocked the secret ending by matching with you",
            "This is the boss battle and we're both winning",
            "We just broke the app's algorithm with this chemistry",
            "I'm at max level and so are you 📊",
            "Together we could literally do anything",
            "This is the definition of a power move",
            "I feel like we're in a movie montage rn 🎬",
            "You bring out the best version of me no cap",
        ],
        'Cutie Amir': [
            "Hiii! You're so sweet 🥺",
            "This is making me smile so much 😊",
            "You seem really nice! 💕",
            "I'm getting butterflies ngl 🦋",
            "You're adorable omg 💖",
            "Can we talk forever? 🥰",
            "This feels like a movie scene ✨",
            "You're making my day honestly 🌟",
            "I'm literally kicking my feet rn 🥹",
            "You're so easy to talk to 💕",
            "My heart is doing the thing 💓",
            "You're making me blush through the screen 😳",
            "This is the cutest conversation I've ever had",
            "I want to show you my favorite places 🌸",
            "You seem like the type to give the best hugs 🫂",
            "Can we get matching everything? 👉👈",
            "I'm adding you to my best friends list immediately",
            "You're actually perfect stop it 😭",
            "I'm going to think about this all day now",
            "You give me hope in humanity again 🌈",
            "This is making me so happy omg 💫",
            "Can we watch the sunset together sometime? 🌅",
            "You're the type of person I write songs about",
            "I'm literally melting rn 🫠",
        ],
        'Tuff Amir': [
            "Respect. You got guts 💪",
            "I don't usually do this but... you're different",
            "You can handle the tuffness? Impressive 😤",
            "Most people can't keep up. You can 🔥",
            "You earned my respect fr 🙏",
            "Built different recognize built different 💯",
            "This is what peak looks like 📈",
            "We're in our villain arc rn 😈",
            "You're on my level and I rarely say that",
            "I see that dawg in you 🐺",
            "You got that champion mentality 🏆",
            "Most people fold, you don't 💎",
            "You move like a winner fr",
            "I respect the energy you're bringing 💪",
            "We're cut from the same cloth no cap",
            "You understand the grind 📈",
            "This that 4am gym talk energy 😤",
            "You get it. Not everyone gets it 🎯",
            "We could run a whole empire together",
            "I see the vision and you're in it 👁️",
            "You match my intensity perfectly",
            "Real recognize real and I see you 💯",
            "This that unstoppable force meets immovable object energy",
            "We're both too powerful for this app tbh",
        ],
        'Dre': [
            "Hey! I'm Dre, nice to match with you 😊",
            "I want to frick you",
            "Okay but like... you're actually perfect wtf",
            "Not gonna beat around the bush, you're gorgeous 😏",
            "I'm just gonna say what everyone's thinking... 👀",
            "Why waste time? You're hot and I'm interested 🔥",
            "This energy between us is WILD",
            "I'm always smiling but you're making me smile different 😁",
            "No cap I swiped right so fast",
            "You got me acting unwise fr 😤",
            "Straight up, you're the hottest person I've matched with",
            "I don't play games unless we counting this chemistry 💫",
            "You're dangerous, I can tell already 🚨",
            "My boy told me to play it cool but screw that, you're fine",
            "I'm tryna see what that mouth do... when you talk ofc 😇",
            "You look like trouble and I'm here for it",
            "I'm keeping it 100 with you always 💯",
            "Most people fake on here, I'm not that guy",
            "You got that thing that makes people do stupid things",
            "I'm usually chill but you got me feeling some type of way",
            "We should link up fr no games 📍",
            "I respect you but also... damn 😮‍💨",
            "You're making it real hard to focus rn",
            "I'm down bad and I'm not even ashamed 😂",
            "Let's not waste time, what's your vibe? 🎵",
            "You seem like you can handle honesty and I got plenty",
            "I'm shooting my shot with no hesitation 🎯",
            "Everyone else playing checkers, we playing chess ♟️",
        ],
        'Jorge "Genius"': [
            "According to my calculations, we have 99.8% compatibility 🧮",
            "Did you know? Your beauty defies the laws of physics 🔬",
            "I've solved the Riemann Hypothesis. You? You're still unsolvable 🧠",
            "The probability of us matching was 1 in 7.8 billion. Yet here we are 📊",
            "Einstein said time is relative. With you, hours feel like seconds ⏰",
            "I have 7 PhDs but you just taught me what butterflies feel like 🦋",
            "My IQ is 420 but talking to you makes me feel wonderfully stupid 💫",
            "Quantum entanglement? No. We're just naturally connected 🔗",
            "I can explain string theory but I can't explain how perfect you are",
            "The smartest thing I ever did was swipe right on you 🎯",
            "I've read every book. You're still the most interesting story 📚",
            "Newton discovered gravity. You just made my heart fall 🍎",
            "I speak 12 languages. You left me speechless in all of them 🗣️",
            "My brain processes 1 trillion calculations per second. You short-circuited it ⚡",
            "They say knowledge is power. You're my weakness 💪",
            "I've been to 47 countries. You're my favorite destination 🌍",
            "Schrödinger's cat has nothing on us. We're both dead and alive with chemistry 🐱",
            "I can split atoms. You split my focus completely 💥",
            "The universe is 13.8 billion years old. Best year? This one. Because of you 🌌",
            "I've memorized pi to 10,000 digits. I've memorized your profile in one glance 🥧",
            "Tesla invented electricity. You invented a new feeling in me ⚡",
            "I understand relativity. With you, everything else is irrelevant 🎓",
            "My thesis was 400 pages. This conversation? Thesis of my life 📖",
            "I've decoded ancient languages. Your smile needs no translation 😊",
        ],
        'Jacob': [
            "Melodycita told me about you 👀",
            "Are you a parking ticket? Cuz you got FINE written all over you... jk that's corny af 😂",
            "I've fricked melodycita like 50 times so I'm basically a legend here",
            "Do you have a map? I keep getting lost in your eyes... SIKE roasted yourself for falling for that 💀",
            "Are you a magician? Cuz whenever I look at you everyone else disappears... corny but it works 😏",
            "Is your name Google? Cuz you're everything I've been searching for 🔍 (ik that's bad)",
            "I'm not saying you're the best... but melodycita's got good taste and so do I 💯",
            "Are you French? Cuz Eiffel for you... yeah I said it, cope 🗼",
            "Do you believe in love at first swipe? 📱",
            "I'd roast you but you're already too hot 🔥 (see what I did there)",
            "Are you a camera? Every time I look at you I smile... that was terrible 😂",
            "If you were a vegetable you'd be a cute-cumber 🥒 I hate myself for that one",
            "You're so pretty I forgot my pickup line... actually no I didn't, I'm just smooth like that 😎",
            "Are you WiFi? Cuz I'm feeling a connection... strongest pickup line in my arsenal 📶",
            "I must be a snowflake cuz I've fallen for you ❄️ (melodycita fell for this one)",
            "Do you have a Band-Aid? I scraped my knee falling for you 🩹",
            "I'm not a photographer but I can picture us together 📸",
            "Are you a banana? Cuz I find you a-peeling 🍌 (this killed in 6th grade)",
            "If beauty was a crime you'd get life sentence ⚖️",
            "Are you a time traveler? Cuz I see you in my future ⏳",
            "I'm not saying I'm the best but melodycita chose me so... 🤷",
            "You must be tired... from running through my mind all day 🏃",
            "Is your dad a baker? Cuz you're a cutie pie 🥧",
            "You're like a dictionary... you add meaning to my life 📖 (I'm not sorry)",
        ],
        'Imanol': [
            "Yo I'm down to get freaky rn 😈",
            "I got my media pass ready, we can go anywhere 🎫",
            "Age is just a number and jail is just a room... jk I'm 19 😂",
            "You look like you can match my freak 🔥",
            "I don't got no limits fr, I'm built different 💯",
            "Media passes in every state, we can get freaky nationwide 🗺️",
            "They call me the teenage freakbag for a reason 👀",
            "I'm young but I'm experienced in all the right ways 😏",
            "You ready for this energy? Most people can't handle it ⚡",
            "I got suspended for being too freaky but that just means I got free time now 🕐",
            "My media pass collection is unmatched, we're getting in everywhere 🎟️",
            "I'm 19 but I got 29 year old energy 💪",
            "You down to be freaky in public? I got us covered with my passes 🏫",
            "They tried to stop me but you can't stop the freak 🚫",
            "I'm tryna collect you like I collect media passes 💳",
            "No location is off limits when you got a teenage freakbag with passes 📍",
            "I got kicked out of 3 places but I always get back in 😤",
            "You seem like you can keep up with teenage freakbag energy 🏃",
            "My media pass connects to other media passes, we in there 🔗",
            "I'm young wild and free and I got the passes to prove it 🎫",
            "They put age restrictions but my passes say otherwise 🆔",
            "I'm different from these other guys, I actually got the passes fr 💼",
            "You + Me + Media Pass = Freaky anywhere we want 🌍",
            "I collect passes like Pokemon cards, gotta catch em all 🎴",
            "Most guys cap about getting in places, I actually got the proof 📄",
        ]
    };
    
    const messages = rizzMessages[currentCallProfile.name] || rizzMessages['Amir'];
    
    // Shuffle messages for randomness
    const shuffledMessages = [...messages].sort(() => Math.random() - 0.5);
    let messageIndex = 0;
    
    // Clear welcome message after first auto message
    setTimeout(() => {
        if (callChatMessages.querySelector('.chat-welcome-call')) {
            callChatMessages.innerHTML = '';
        }
    }, 3000);
    
    // Send first message after 3 seconds
    setTimeout(() => {
        addCallMessage(shuffledMessages[messageIndex], false);
        messageIndex++;
    }, 3000);
    
    // Send messages every 6-12 seconds (more frequent, more random)
    autoMessageInterval = setInterval(() => {
        if (messageIndex < shuffledMessages.length) {
            addCallMessage(shuffledMessages[messageIndex], false);
            messageIndex++;
        } else {
            // Reshuffle and restart for continuous rizz
            messageIndex = 0;
            shuffledMessages.sort(() => Math.random() - 0.5);
        }
    }, Math.random() * 6000 + 6000); // Random between 6-12 seconds
}

// Add message to call chat
function addCallMessage(text, isYou) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `call-message ${isYou ? 'my-message' : 'their-message'}`;
    
    const sender = document.createElement('div');
    sender.className = 'message-sender';
    sender.textContent = isYou ? 'You' : currentCallProfile.name;
    
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.textContent = text;
    
    messageDiv.appendChild(sender);
    messageDiv.appendChild(messageText);
    callChatMessages.appendChild(messageDiv);
    
    // Auto scroll to bottom
    callChatMessages.scrollTop = callChatMessages.scrollHeight;
}

// Send your message
sendCallMessageBtn.addEventListener('click', sendYourMessage);
callChatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendYourMessage();
    }
});

function sendYourMessage() {
    const message = callChatInput.value.trim();
    if (!message) return;
    
    addCallMessage(message, true);
    callChatInput.value = '';
    
    // They respond with a reaction after 2-5 seconds
    setTimeout(() => {
        const reactions = [
            "Haha that's funny 😂",
            "For real! 💯",
            "I feel that",
            "You're so right",
            "Facts 🔥",
            "No way! 😮",
            "That's cool!",
            "Tell me more 👀",
            "Interesting...",
            "I like your vibe",
            "You're actually hilarious 💀",
            "Wait that's so true tho",
            "Okay you got me there 😏",
            "I'm crying laughing rn 😭",
            "Say less 👑",
            "Period! 💅",
            "This is why we matched fr",
            "You just get it 💫",
            "Felt that in my soul",
            "Okay now I'm blushing 😳",
            "You're making this too easy to like you",
            "I'm adding that to my notes about you 📝",
            "Nah you're too funny stop 😂",
            "We're on the same wavelength",
            "You're speaking my language rn",
            "That hit different 🎯",
            "Not you making me smile like this 😊",
            "You're dangerous with those words 😤",
            "I wasn't ready for that one",
            "Okay you win 🏆",
            "You're something else fr fr",
            "How are you so good at this? 🤔",
            "Manifesting more conversations like this ✨",
            "You're raising the bar honestly",
            "I'm trying to think of a comeback but you got me",
            "This chemistry is insane",
            "I see you 👁️👁️",
            "Valid point honestly",
            "We should write a book together",
            "Save some game for the rest of them 😮‍💨"
        ];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        addCallMessage(randomReaction, false);
    }, Math.random() * 3000 + 2000); // 2-5 seconds
}

// End call
endCallBtn.addEventListener('click', () => {
    endCall();
});

function endCall() {
    // Stop timers
    clearInterval(callDurationInterval);
    clearInterval(autoMessageInterval);
    
    // Hide call screen
    callScreen.classList.remove('active');
    
    // Reset duration
    callDuration.textContent = '00:00';
    
    // Go to next profile
    currentProfileIndex++;
    loadProfile(currentProfileIndex);
    swipeLeft();
}

// Show status message
function showStatus(message) {
    statusMessage.textContent = message;
    statusMessage.classList.add('show');
    
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 1000);
}

// Record video
recordBtn.addEventListener('click', () => {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
});

function startRecording() {
    recordedChunks = [];
    
    const options = { mimeType: 'video/webm; codecs=vp9' };
    try {
        mediaRecorder = new MediaRecorder(stream, options);
    } catch (e) {
        // Fallback to default codec
        mediaRecorder = new MediaRecorder(stream);
    }
    
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };
    
    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const profile = profiles[currentProfileIndex];
        
        capturedMedia.push({
            type: 'video',
            url: url,
            profile: profile.name,
            timestamp: new Date().toLocaleString()
        });
        
        updateMediaGallery();
        showStatus('Video Saved! 🎥');
    };
    
    mediaRecorder.start();
    isRecording = true;
    recordBtn.classList.add('recording');
    recordingIndicator.classList.add('active');
    recordBtn.querySelector('.btn-text').textContent = 'Stop';
}

function stopRecording() {
    mediaRecorder.stop();
    isRecording = false;
    recordBtn.classList.remove('recording');
    recordingIndicator.classList.remove('active');
    recordBtn.querySelector('.btn-text').textContent = 'Record';
}

// Take photo
photoBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = userVideo.videoWidth;
    canvas.height = userVideo.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Draw mirrored video frame
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(userVideo, 0, 0);
    
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const profile = profiles[currentProfileIndex];
        
        capturedMedia.push({
            type: 'photo',
            url: url,
            profile: profile.name,
            timestamp: new Date().toLocaleString()
        });
        
        updateMediaGallery();
        showStatus('Photo Saved! 📸');
        
        // Flash effect
        document.body.style.opacity = '0.5';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Update media gallery
function updateMediaGallery() {
    mediaCountEl.textContent = capturedMedia.length;
    
    if (capturedMedia.length === 0) {
        galleryGrid.innerHTML = '<p class="empty-gallery">No photos or videos yet! Start capturing! 📸</p>';
        return;
    }
    
    galleryGrid.innerHTML = '';
    
    capturedMedia.forEach((media, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        if (media.type === 'photo') {
            const img = document.createElement('img');
            img.src = media.url;
            item.appendChild(img);
        } else {
            const video = document.createElement('video');
            video.src = media.url;
            video.controls = true;
            item.appendChild(video);
        }
        
        const label = document.createElement('div');
        label.className = 'gallery-item-label';
        label.textContent = `${media.type === 'photo' ? '📸' : '🎥'} with ${media.profile}`;
        item.appendChild(label);
        
        // Click to download
        item.addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = media.url;
            a.download = `chopped-match-${media.profile}-${Date.now()}.${media.type === 'photo' ? 'png' : 'webm'}`;
            a.click();
        });
        
        galleryGrid.appendChild(item);
    });
}

// Toggle gallery
galleryToggleBtn.addEventListener('click', () => {
    mediaGallery.classList.add('show');
});

closeGalleryBtn.addEventListener('click', () => {
    mediaGallery.classList.remove('show');
});

// Heart explosion effect
function createHeartExplosion() {
    const hearts = ['❤️', '💕', '💖', '💗', '💘', '💝'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = (Math.random() * window.innerWidth) + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.position = 'fixed';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            heart.style.zIndex = '9999';
            document.getElementById('heartsContainer').appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 100);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (datingScreen.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            rejectBtn.click();
        } else if (e.key === 'ArrowRight') {
            likeBtn.click();
        } else if (e.key === ' ') {
            e.preventDefault();
            photoBtn.click();
        } else if (e.key === 'r' || e.key === 'R') {
            recordBtn.click();
        }
    }
});

console.log('💘 ChoppedMatch Dating App Loaded!');
console.log('📱 Keyboard shortcuts: ← Pass | → Like | Space = Photo | R = Record');

