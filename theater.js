// Movie Theater JavaScript Functionality

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
        
        card.innerHTML = `
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
    const videoPlayer = document.getElementById('moviePlayer');
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
    videoPlayer.style.display = 'block';
    videoContainer.style.display = 'flex';
    
    // Start trailer rotation
    currentTrailerIndex = 0;
    updateTrailerContent();
    trailerInterval = setInterval(updateTrailerContent, 3000); // Change trailer every 3 seconds
    
    // Try to load the video file
    const videoFileName = 'the-dre-movie.mp4';
    
    // Optimize video settings for large files
    videoPlayer.preload = 'auto'; // Load the entire video
    videoPlayer.load(); // Reset video element
    
    // Additional optimizations for large files
    videoPlayer.setAttribute('playsinline', 'true');
    videoPlayer.setAttribute('webkit-playsinline', 'true');
    
    // Enable hardware acceleration hints
    videoPlayer.style.transform = 'translateZ(0)';
    videoPlayer.style.willChange = 'auto';
    
    // Track loading progress
    let progressInterval;
    function updateLoadingProgress() {
        if (videoPlayer.buffered.length > 0 && videoPlayer.duration > 0) {
            const bufferedEnd = videoPlayer.buffered.end(videoPlayer.buffered.length - 1);
            const percent = Math.round((bufferedEnd / videoPlayer.duration) * 100);
            loadingProgress.textContent = `Loading... ${percent}%`;
            progressFill.style.width = `${percent}%`;
        } else if (videoPlayer.readyState >= 1) {
            // Show metadata loading
            loadingProgress.textContent = 'Preparing...';
        }
    }
    
    // Set up progress tracking
    progressInterval = setInterval(updateLoadingProgress, 200);
    
    // Handle buffering states
    let bufferingTimeout;
    
    videoPlayer.addEventListener('waiting', () => {
        bufferingTimeout = setTimeout(() => {
            bufferingIndicator.style.display = 'flex';
        }, 500);
    });
    
    videoPlayer.addEventListener('playing', () => {
        clearTimeout(bufferingTimeout);
        bufferingIndicator.style.display = 'none';
    });
    
    // Monitor for stalls during playback
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const buffered = videoPlayer.buffered;
        
        if (buffered.length > 0) {
            const bufferedEnd = buffered.end(buffered.length - 1);
            const timeUntilBufferEnd = bufferedEnd - currentTime;
            
            // If buffer is running low (less than 3 seconds), show indicator
            if (timeUntilBufferEnd < 3 && !videoPlayer.paused) {
                if (!bufferingIndicator.style.display || bufferingIndicator.style.display === 'none') {
                    bufferingIndicator.style.display = 'flex';
                }
            } else {
                bufferingIndicator.style.display = 'none';
            }
        }
    });
    
    videoPlayer.addEventListener('canplay', () => {
        clearTimeout(bufferingTimeout);
        bufferingIndicator.style.display = 'none';
        // Don't hide loading overlay here - wait for canplaythrough
    });
    
    videoPlayer.addEventListener('progress', () => {
        updateLoadingProgress();
    });
    
    // Load video with optimized settings
    videoPlayer.src = videoFileName;
    
    // Set up video for optimal playback
    videoPlayer.addEventListener('loadedmetadata', () => {
        // Video metadata loaded, now we can start buffering
        videoPlayer.preload = 'auto'; // Start loading video data
        loadingProgress.textContent = 'Preparing playback...';
    });
    
    // Show placeholder if video fails to load
    videoPlayer.addEventListener('error', (e) => {
        clearInterval(progressInterval);
        clearInterval(trailerInterval);
        clearTimeout(bufferingTimeout);
        loadingOverlay.style.display = 'none';
        bufferingIndicator.style.display = 'none';
        if (theaterEnvironment) {
            theaterEnvironment.style.display = 'none';
        }
        videoPlayer.style.display = 'none';
        
        const videoContainerDiv = document.querySelector('.video-container');
        const placeholder = document.createElement('div');
        placeholder.className = 'video-placeholder';
        placeholder.style.cssText = `
            width: 100%;
            aspect-ratio: 16/9;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d1a1a 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            padding: 40px;
            border-radius: 8px;
        `;
        placeholder.innerHTML = `
            <div style="font-size: 5rem; margin-bottom: 20px;">🎬</div>
            <h2 style="font-size: 2rem; margin-bottom: 15px; color: #ffd700;">The Dre Movie</h2>
            <p style="font-size: 1.2rem; margin-bottom: 10px;">Video file will be uploaded soon!</p>
            <p style="font-size: 1rem; color: #ccc;">Runtime: 2 minutes</p>
            <p style="font-size: 1rem; color: #ccc; margin-top: 20px;">Showtime: ${showtime.date} at ${showtime.time}</p>
            <p style="font-size: 0.9rem; color: #888; margin-top: 15px;">Please upload the video file as "${videoFileName}"</p>
        `;
        if (videoContainerDiv) {
            videoContainerDiv.appendChild(placeholder);
        }
    });
    
    // Only play when FULLY loaded (canplaythrough means entire video is buffered)
    let hasStartedPlaying = false;
    const theaterEnvironment = document.getElementById('theaterEnvironment');
    
    videoPlayer.addEventListener('canplaythrough', () => {
        if (!hasStartedPlaying) {
            hasStartedPlaying = true;
            clearInterval(progressInterval);
            clearInterval(trailerInterval);
            
            // Update to final loading message
            const trailerContent = document.getElementById('trailerContent');
            if (trailerContent) {
                trailerContent.innerHTML = `
                    <div class="trailer-title">READY TO PLAY</div>
                    <div class="trailer-subtitle">The Dre Movie</div>
                    <div class="trailer-text">Starting in 2 seconds...</div>
                `;
            }
            
            // Wait 2 seconds then hide overlay, show theater, and play
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                loadingProgress.textContent = '100%';
                progressFill.style.width = '100%';
                
                // Show theater background (subtle)
                if (theaterEnvironment) {
                    theaterEnvironment.style.display = 'block';
                }
                
                // Auto-play when fully loaded
                videoPlayer.play().catch(err => {
                    console.log('Autoplay prevented, user interaction required:', err);
                    loadingOverlay.style.display = 'none';
                    if (theaterEnvironment) {
                        theaterEnvironment.style.display = 'block';
                    }
                });
            }, 2000);
        }
    });
    
    // Update progress during loading
    videoPlayer.addEventListener('progress', () => {
        updateLoadingProgress();
    });
    
    // Close video function
    function closeVideo() {
        clearInterval(progressInterval);
        clearInterval(trailerInterval);
        clearTimeout(bufferingTimeout);
        videoContainer.style.display = 'none';
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.src = ''; // Clear source to stop loading
        loadingOverlay.style.display = 'flex';
        bufferingIndicator.style.display = 'none';
        if (theaterEnvironment) {
            theaterEnvironment.style.display = 'none';
        }
        hasStartedPlaying = false;
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
    
    // Prevent closing when clicking on video
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
    
    // Mobile: Auto fullscreen on landscape orientation
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let orientationHandler;
    let isFullscreen = false;
    
    if (isMobile) {
        const checkAndEnterFullscreen = () => {
            const isLandscape = window.innerWidth > window.innerHeight;
            const videoElement = videoPlayer;
            const containerElement = videoContainer;
            
            if (isLandscape && containerElement.style.display === 'flex' && !videoPlayer.paused && !isFullscreen) {
                // Try to enter fullscreen - prefer container for better control
                const elementToFullscreen = containerElement;
                
                if (elementToFullscreen.requestFullscreen) {
                    elementToFullscreen.requestFullscreen().then(() => {
                        isFullscreen = true;
                    }).catch(err => {
                        console.log('Fullscreen request failed:', err);
                        // Fallback to video element
                        tryVideoFullscreen(videoElement);
                    });
                } else if (elementToFullscreen.webkitRequestFullscreen) {
                    // iOS Safari
                    elementToFullscreen.webkitRequestFullscreen();
                    isFullscreen = true;
                } else if (videoElement.webkitEnterFullscreen) {
                    // iOS specific - video element fullscreen
                    videoElement.webkitEnterFullscreen();
                    isFullscreen = true;
                } else if (elementToFullscreen.mozRequestFullScreen) {
                    elementToFullscreen.mozRequestFullScreen();
                    isFullscreen = true;
                } else if (elementToFullscreen.msRequestFullscreen) {
                    elementToFullscreen.msRequestFullscreen();
                    isFullscreen = true;
                } else {
                    // Fallback
                    tryVideoFullscreen(videoElement);
                }
            }
        };
        
        const tryVideoFullscreen = (videoElement) => {
            if (videoElement.webkitEnterFullscreen) {
                videoElement.webkitEnterFullscreen();
                isFullscreen = true;
            }
        };
        
        orientationHandler = checkAndEnterFullscreen;
        
        // Listen for orientation changes
        window.addEventListener('orientationchange', () => {
            // Small delay to ensure dimensions are updated
            setTimeout(() => {
                checkAndEnterFullscreen();
            }, 200);
        });
        
        // Also listen for resize (handles some cases)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (isMobile) {
                    checkAndEnterFullscreen();
                }
            }, 200);
        });
        
        // Check on video play
        videoPlayer.addEventListener('playing', () => {
            if (isMobile) {
                setTimeout(() => {
                    checkAndEnterFullscreen();
                }, 500);
            }
        });
        
        // Reset fullscreen flag when exiting
        const fullscreenChangeHandler = () => {
            if (!document.fullscreenElement && 
                !document.webkitFullscreenElement && 
                !document.mozFullScreenElement && 
                !document.msFullscreenElement) {
                isFullscreen = false;
            }
        };
        
        document.addEventListener('fullscreenchange', fullscreenChangeHandler);
        document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
        document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
        document.addEventListener('MSFullscreenChange', fullscreenChangeHandler);
    }
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

