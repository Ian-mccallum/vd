// Movie Theater JavaScript Functionality

// Google Drive Video File ID
// IMPORTANT: For the video to work when deployed, ensure the Google Drive file is set to:
// 1. Right-click the file in Google Drive
// 2. Click "Share"
// 3. Set to "Anyone with the link can view" (not "Restricted")
// 4. This allows the video to be embedded on any website
const GOOGLE_DRIVE_FILE_ID = '1LNZ_g-ubh5D-E-5SC4rdsl2XGoWVrEte';
const GOOGLE_DRIVE_EMBED_URL = `https://drive.google.com/file/d/${GOOGLE_DRIVE_FILE_ID}/preview`;

// Generate showtimes for "The Dre Movie"
function generateShowtimes() {
    const showtimesGrid = document.getElementById('showtimesGrid');
    
    // Set to Thursday, December 11, 2025 at 9:10 AM Central Time
    const premiereDate = new Date(2025, 11, 11, 9, 10, 0, 0); // Month is 0-indexed, so 11 = December
    
    const dateStr = premiereDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
    });
    
    // Update the showtimes section title to include the date
    const showtimesSection = document.querySelector('.showtimes-section .section-title');
    if (showtimesSection) {
        showtimesSection.textContent = `📅 Showtimes for "The Dre Movie" - ${dateStr}`;
    }
    
    // Generate showtimes every 10 minutes starting at 9:10 AM
    // Go until 10:00 PM to fill the grid nicely
    const showtimes = [];
    const startHour = 9;
    const startMinute = 10;
    const endHour = 22; // 10 PM
    const endMinute = 0; // Last showing at 10:00 PM
    
    let currentHour = startHour;
    let currentMinute = startMinute;
    let showtimeIndex = 0;
    
    // Generate showtimes every 10 minutes
    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
        const timeStr = formatTime(currentHour, currentMinute);
        // Create date for this specific showtime
        const showtimeDate = new Date(premiereDate);
        // Set to the specific hour and minute for this showtime
        showtimeDate.setHours(currentHour, currentMinute, 0, 0);
        
        showtimes.push({
            date: dateStr,
            time: timeStr,
            fullDate: showtimeDate,
            id: `showtime-${showtimeIndex}`
        });
        
        // Increment by 10 minutes
        currentMinute += 10;
        if (currentMinute >= 60) {
            currentMinute = 0;
            currentHour++;
        }
        showtimeIndex++;
    }
    
    // TEST SHOWTIMES: Add test showtimes for today at the top
    const today = new Date();
    
    // Test showtime 1: 9:33 PM
    const testShowtimeDate1 = new Date(today);
    testShowtimeDate1.setHours(21, 33, 0, 0); // 9:33 PM (21:33 in 24-hour format)
    
    const testDateStr1 = testShowtimeDate1.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
    });
    
    const testShowtime1 = {
        date: testDateStr1,
        time: formatTime(21, 33), // 9:33 PM
        fullDate: testShowtimeDate1,
        id: 'showtime-test-1',
        isTest: true // Mark as test showtime
    };
    
    // Test showtime 2: 10:00 PM
    const testShowtimeDate2 = new Date(today);
    testShowtimeDate2.setHours(22, 0, 0, 0); // 10:00 PM (22:00 in 24-hour format)
    
    const testDateStr2 = testShowtimeDate2.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
    });
    
    const testShowtime2 = {
        date: testDateStr2,
        time: formatTime(22, 0), // 10:00 PM
        fullDate: testShowtimeDate2,
        id: 'showtime-test-2',
        isTest: true // Mark as test showtime
    };
    
    // Add test showtimes at the beginning of the array
    // Order: 9:33 PM first, then 10:00 PM (unshift adds to beginning, so add in reverse order)
    showtimes.unshift(testShowtime2); // 10:00 PM (added first, appears second)
    showtimes.unshift(testShowtime1); // 9:33 PM (added second, appears first)
    
    // Store showtimes globally
    allShowtimes = showtimes;
    
    // Render showtimes with time-based status
    renderShowtimes(showtimes);
}

// Check showtime status based on current time
function getShowtimeStatus(showtime) {
    const now = new Date();
    const showtimeDate = showtime.fullDate;
    const timeDiff = now - showtimeDate; // milliseconds
    const minutesDiff = timeDiff / (1000 * 60);
    
    if (minutesDiff < 0) {
        return 'future'; // Showtime hasn't happened yet
    } else if (minutesDiff >= 0 && minutesDiff <= 5) {
        return 'available'; // Showtime has passed, within 5 minutes
    } else {
        return 'expired'; // More than 5 minutes past showtime
    }
}

// Render showtimes with current status
function renderShowtimes(showtimes) {
    const showtimesGrid = document.getElementById('showtimesGrid');
    if (!showtimesGrid) return;
    
    // Clear existing showtimes
    showtimesGrid.innerHTML = '';
    
    showtimes.forEach((showtime, index) => {
        const status = getShowtimeStatus(showtime);
        const card = document.createElement('div');
        card.className = 'showtime-card';
        card.id = showtime.id;
        card.dataset.time = showtime.time;
        card.dataset.date = showtime.date;
        card.dataset.status = status;
        
        // Add status classes
        if (status === 'future') {
            card.classList.add('future');
        } else if (status === 'expired') {
            card.classList.add('expired');
        } else {
            card.classList.add('available');
        }
        
        let statusText = '';
        if (status === 'future') {
            statusText = 'UPCOMING';
        } else if (status === 'expired') {
            statusText = 'EXPIRED';
        } else {
            statusText = 'AVAILABLE';
        }
        
        // Add TEST indicator for test showtime
        const testIndicator = showtime.isTest ? '<div style="background: #ff6b00; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; margin-bottom: 8px; display: inline-block;">🧪 TEST</div>' : '';
        
        card.innerHTML = `
            ${testIndicator}
            <div class="showtime-time">${showtime.time}</div>
            <div class="showtime-status status-${status}">
                ${statusText}
            </div>
        `;
        
        // Only allow clicking on available showtimes
        if (status === 'available') {
            card.addEventListener('click', () => selectShowtime(card, showtime));
            card.style.cursor = 'pointer';
        } else {
            card.style.cursor = 'not-allowed';
            if (status === 'future') {
                card.style.opacity = '0.7';
            } else if (status === 'expired') {
                card.style.opacity = '0.5';
            }
        }
        
        showtimesGrid.appendChild(card);
    });
}

// Select a showtime
function selectShowtime(card, showtime) {
    // Check if showtime is actually available
    const status = getShowtimeStatus(showtime);
    if (status !== 'available') {
        return; // Don't allow selection if not available
    }
    
    // Remove previous selection
    document.querySelectorAll('.showtime-card').forEach(c => {
        c.classList.remove('selected');
    });
    
    // Add selection to clicked card
    card.classList.add('selected');
    
    // Update screen
    const screen = document.getElementById('movieScreen');
    const screenContent = screen.querySelector('.screen-content');
    
    const now = new Date();
    const showtimeDate = showtime.fullDate;
    const timeDiff = now - showtimeDate;
    const minutesDiff = timeDiff / (1000 * 60);
    
    // Check if showtime has actually passed
    if (minutesDiff < 0) {
        // Showtime hasn't started yet
        const minutesUntil = Math.ceil(-minutesDiff);
        screenContent.innerHTML = `
            <div class="screen-placeholder">
                <div class="play-icon">⏰</div>
                <p class="screen-text">Showtime hasn't started yet</p>
                <p class="screen-subtext">${showtime.date} at ${showtime.time}</p>
                <p class="screen-subtext">Starts in ${minutesUntil} minute${minutesUntil !== 1 ? 's' : ''}</p>
            </div>
        `;
        return;
    }
    
    // Showtime has passed, show loading
    screenContent.innerHTML = `
        <div class="screen-placeholder">
            <div class="play-icon">▶</div>
            <p class="screen-text">Loading "The Dre Movie"...</p>
            <p class="screen-subtext">${showtime.date} at ${showtime.time}</p>
        </div>
    `;
    
    // Start playing the movie
    const isMobile = window.innerWidth <= 768;
    const delay = isMobile ? 500 : 300;
    
    setTimeout(() => {
        playMovie(showtime);
    }, delay);
}

// Trailer messages for loading screen
const trailerMessages = [
    {
        title: "THE DRE MOVIE",
        subtitle: "A Cinematic Masterpiece",
        text: "Experience the film that's breaking all records..."
    },
    {
        title: "ONE TRILLION DOLLARS",
        subtitle: "Box Office Sensation",
        text: "The most anticipated premiere in history"
    },
    {
        title: "LEGENDARY PERFORMANCE",
        subtitle: "Unforgettable Moments",
        text: "A story that will captivate audiences worldwide"
    },
    {
        title: "PREMIER EVENT",
        subtitle: "Exclusive Screening",
        text: "You're about to witness cinematic history"
    },
    {
        title: "THE DRE MOVIE",
        subtitle: "Pure Excellence",
        text: "Two minutes of pure cinematic perfection"
    },
    {
        title: "CRITICS ARE RAVING",
        subtitle: "10/10 Rating",
        text: "The greatest film ever created"
    },
    {
        title: "AWARD WINNING",
        subtitle: "Best Picture",
        text: "A masterpiece that transcends time"
    },
    {
        title: "THE DRE MOVIE",
        subtitle: "Coming Soon",
        text: "Prepare yourself for the ultimate experience"
    }
];

let currentTrailerIndex = 0;
let trailerInterval;

// Function to update trailer content
function updateTrailerContent() {
    const trailerContent = document.getElementById('trailerContent');
    if (!trailerContent) return;
    
    const trailer = trailerMessages[currentTrailerIndex];
    trailerContent.innerHTML = `
        <div class="trailer-title">${trailer.title}</div>
        <div class="trailer-subtitle">${trailer.subtitle}</div>
        <div class="trailer-text">${trailer.text}</div>
    `;
    
    // Animate in
    trailerContent.style.opacity = '0';
    trailerContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
        trailerContent.style.opacity = '1';
        trailerContent.style.transform = 'translateY(0)';
    }, 100);
    
    currentTrailerIndex = (currentTrailerIndex + 1) % trailerMessages.length;
}

// Play the movie
function playMovie(showtime) {
    const videoContainer = document.getElementById('videoPlayerContainer');
    const youtubePlayerDiv = document.getElementById('youtubePlayer');
    const loadingOverlay = document.getElementById('videoLoadingOverlay');
    const loadingProgress = document.getElementById('loadingProgress');
    const progressFill = document.getElementById('progressFill');
    const bufferingIndicator = document.getElementById('bufferingIndicator');
    
    // Check if showtime has actually passed
    const now = new Date();
    const showtimeDate = showtime.fullDate;
    const timeDiff = now - showtimeDate;
    const minutesDiff = timeDiff / (1000 * 60);
    
    if (minutesDiff < 0) {
        // Showtime hasn't started yet - don't show video
        alert(`The showtime hasn't started yet. Please wait until ${showtime.time} to watch the movie.`);
        return;
    }
    
    // Show loading overlay with trailers
    loadingOverlay.style.display = 'flex';
    videoContainer.style.display = 'flex';
    
    // Start trailer rotation
    currentTrailerIndex = 0;
    updateTrailerContent();
    trailerInterval = setInterval(updateTrailerContent, 3000); // Change trailer every 3 seconds
    
    // Simulate loading progress
    let progressPercent = 0;
    const progressInterval = setInterval(() => {
        if (progressPercent < 90) {
            progressPercent += 5;
            loadingProgress.textContent = `Loading... ${progressPercent}%`;
            progressFill.style.width = `${progressPercent}%`;
        }
    }, 200);
    
    // Create Google Drive video iframe
    const createGoogleDrivePlayer = () => {
        // Clear the div
        youtubePlayerDiv.innerHTML = '';
        
        // Create iframe for Google Drive video
        const iframe = document.createElement('iframe');
        iframe.src = GOOGLE_DRIVE_EMBED_URL;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.style.border = '0';
        iframe.style.borderRadius = '8px';
        iframe.style.display = 'block';
        
        // Add iframe to container
        youtubePlayerDiv.appendChild(iframe);
        
        // Wait for iframe to load
        iframe.addEventListener('load', () => {
            console.log('✅ Google Drive video loaded');
            clearInterval(progressInterval);
            loadingProgress.textContent = '100%';
            progressFill.style.width = '100%';
            
            // Update to final loading message
            const trailerContent = document.getElementById('trailerContent');
            if (trailerContent) {
                trailerContent.innerHTML = `
                    <div class="trailer-title">READY TO PLAY</div>
                    <div class="trailer-subtitle">The Dre Movie</div>
                    <div class="trailer-text">Starting in 2 seconds...</div>
                `;
            }
            
            // Wait 2 seconds then hide overlay
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                bufferingIndicator.style.display = 'none';
                
                // Show theater background
                const theaterEnvironment = document.getElementById('theaterEnvironment');
                if (theaterEnvironment) {
                    theaterEnvironment.style.display = 'block';
                }
                
                // Try to autoplay (may require user interaction)
                try {
                    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                } catch (e) {
                    console.log('Autoplay may require user interaction');
                }
                
                // Handle fullscreen on mobile landscape
                const isMobile = window.innerWidth <= 768;
                if (isMobile && window.orientation !== undefined) {
                    // Check if already in landscape
                    if (Math.abs(window.orientation) === 90) {
                        setTimeout(() => {
                            toggleFullscreen(iframe);
                        }, 500);
                    }
                }
            }, 2000);
        });
        
        // Handle iframe errors
        iframe.addEventListener('error', () => {
            console.error('❌ Google Drive video error');
            clearInterval(progressInterval);
            clearInterval(trailerInterval);
            loadingOverlay.style.display = 'none';
            bufferingIndicator.style.display = 'none';
            
            youtubePlayerDiv.innerHTML = `
                <div style="width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, #1a1a1a 0%, #2d1a1a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; padding: 40px; border-radius: 8px;">
                    <div style="font-size: 5rem; margin-bottom: 20px;">🎬</div>
                    <h2 style="font-size: 2rem; margin-bottom: 15px; color: #ffd700;">The Dre Movie</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 10px; color: #ff6b6b;">Error loading video</p>
                    <p style="font-size: 1rem; color: #ccc;">Runtime: 2 minutes</p>
                    <p style="font-size: 1rem; color: #ccc; margin-top: 20px;">Showtime: ${showtime.date} at ${showtime.time}</p>
                    <p style="font-size: 0.8rem; color: #666; margin-top: 10px;">Please ensure the Google Drive file is set to "Anyone with the link can view".</p>
                </div>
            `;
        });
    };
    
    // Start creating the player
    createGoogleDrivePlayer();
    
    // Close video function
    function closeVideo() {
        clearInterval(progressInterval);
        clearInterval(trailerInterval);
        videoContainer.style.display = 'none';
        
        // Clear the iframe
        youtubePlayerDiv.innerHTML = '';
        loadingOverlay.style.display = 'flex';
        bufferingIndicator.style.display = 'none';
        
        const theaterEnvironment = document.getElementById('theaterEnvironment');
        if (theaterEnvironment) {
            theaterEnvironment.style.display = 'none';
        }
    }
    
    // Click outside video container to close
    const videoContainerEl = document.getElementById('videoPlayerContainer');
    const videoContainerDiv = document.querySelector('.video-container');
    
    videoContainerEl.addEventListener('click', (e) => {
        // Only close if clicking on the container itself, not the video
        if (e.target === videoContainerEl || e.target.classList.contains('theater-background')) {
            closeVideo();
        }
    });
    
    // Prevent closing when clicking on YouTube player
    if (videoContainerDiv) {
        videoContainerDiv.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Exit button with confirmation
    const exitButton = document.getElementById('exitButton');
    if (exitButton) {
        // Use touchstart for better mobile responsiveness
        const exitHandler = (e) => {
            e.stopPropagation();
            e.preventDefault();
            const confirmed = confirm('Are you sure you want to exit?');
            if (confirmed) {
                closeVideo();
            }
        };
        
        exitButton.addEventListener('click', exitHandler);
        exitButton.addEventListener('touchend', exitHandler);
    }
    
    // Close on escape key with confirmation
    function escapeHandler(e) {
        if (e.key === 'Escape' && videoContainer.style.display === 'flex') {
            const confirmed = confirm('Are you sure you want to exit?');
            if (confirmed) {
                closeVideo();
                document.removeEventListener('keydown', escapeHandler);
            }
        }
    }
    document.addEventListener('keydown', escapeHandler);
}

// Generate theater seats (visual only)
function generateSeats() {
    const seatsContainer = document.getElementById('seatsContainer');
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    
    rows.forEach((row, rowIndex) => {
        // Add row label
        const rowLabel = document.createElement('div');
        rowLabel.style.cssText = `
            width: 100%;
            text-align: center;
            margin: 15px 0 5px 0;
            font-weight: bold;
            color: #ffd700;
        `;
        rowLabel.textContent = `Row ${row}`;
        seatsContainer.appendChild(rowLabel);
        
        // Create seats for this row
        const rowDiv = document.createElement('div');
        rowDiv.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-bottom: 15px;
        `;
        
        for (let i = 1; i <= seatsPerRow; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.textContent = i;
            seat.style.fontSize = '0.7rem';
            seat.style.display = 'flex';
            seat.style.alignItems = 'center';
            seat.style.justifyContent = 'center';
            
            // Randomly mark some seats as occupied
            if (Math.random() < 0.3) {
                seat.classList.add('occupied');
            }
            
            // Add aisle spacing
            if (i === Math.floor(seatsPerRow / 2) || i === Math.floor(seatsPerRow / 2) + 1) {
                seat.style.marginRight = '20px';
            }
            
            rowDiv.appendChild(seat);
        }
        
        seatsContainer.appendChild(rowDiv);
    });
}

// Helper function to format time
function formatTime(hour, minute) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
}

// Store showtimes globally for periodic updates
let allShowtimes = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    generateShowtimes();
    generateSeats();
    
    // Update showtimes every 30 seconds to check status changes
    setInterval(() => {
        if (allShowtimes.length > 0) {
            renderShowtimes(allShowtimes);
        }
    }, 30000);
    
    console.log('🎬 Huzz Frick Movie Theater initialized!');
    console.log('📽️ Ready to watch "The Dre Movie"!');
});

