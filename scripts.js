    function showWeek(weekId, element) {
            // Only redirect if we're not already on the target page
            if (weekId === 'gallery' && !window.location.pathname.includes('gallery.html')) {
                window.location.href = 'gallery.html';
                return;
            }
            
            // Only redirect if we're not already on the target page
            if (weekId === 'projects' && !window.location.pathname.includes('projects.html')) {
                window.location.href = 'projects.html';
                return;
            }
            
            // Only redirect if we're not already on the target page
            if (weekId === 'Week0' && !window.location.pathname.includes('week0.html')) {
                window.location.href = 'week0.html';
                return;
            }
            if (weekId === 'Week1' && !window.location.pathname.includes('week1.html')) {
                window.location.href = 'week1.html';
                return;
            }
            if (weekId === 'Week2' && !window.location.pathname.includes('week2.html')) {
                window.location.href = 'week2.html';
                return;
            }
            if (weekId === 'Week3' && !window.location.pathname.includes('week3.html')) {
                window.location.href = 'week3.html';
                return;
            }
            if (weekId === 'Week4' && !window.location.pathname.includes('week4.html')) {
                window.location.href = 'week4.html';
                return;
            }
            if (weekId === 'Week5' && !window.location.pathname.includes('week5.html')) {
                window.location.href = 'week5.html';
                return;
            }
            // Hide all weeks
            document.querySelectorAll('.main-content > div').forEach(div => {
                div.style.display = 'none';
            });
            
            // Show selected week
            document.getElementById(weekId).style.display = 'block';
            
            // Update dropdown selection
            const dropdown = document.getElementById('section-selector');
            if (dropdown) {
                dropdown.value = weekId;
            }

            // Update URL only if it's different from current hash
            if (window.location.hash !== `#${weekId}`) {
                history.pushState({}, '', `#${weekId}`);
            }
        }

        // Handle URL-based navigation
        function handleUrlSection() {
            let defaultSection = 'Week4'; // default for most pages
            
            // Set appropriate default based on current page
            if (window.location.pathname.includes('gallery.html')) {
                defaultSection = 'gallery';
            } else if (window.location.pathname.includes('projects.html')) {
                defaultSection = 'projects';
            } else if (window.location.pathname.includes('week0.html')) {
                defaultSection = 'Week0';
            } else if (window.location.pathname.includes('week1.html')) {
                defaultSection = 'Week1';
            }
            else if (window.location.pathname.includes('week2.html')) {
                defaultSection = 'Week2';
            }
            else if (window.location.pathname.includes('week3.html')) {
                defaultSection = 'Week3';
            }
            else if (window.location.pathname.includes('week4.html')) {
                defaultSection = 'Week4';
            }
            else if (window.location.pathname.includes('week5.html')) {
                defaultSection = 'Week5';
            }
            
            const hash = window.location.hash.slice(1) || defaultSection;
            showWeek(hash);
        }

        // Listen for URL changes (back/forward navigation)
        window.addEventListener('popstate', handleUrlSection);

        // Initialize the correct section based on URL on page load
        window.addEventListener('load', handleUrlSection);
        window.addEventListener('hashchange', handleUrlSection);

        function toggleComplete(checkbox) {
            const moduleCard = checkbox.closest('.module-card');
            if (checkbox.checked) {
                moduleCard.classList.add('completed');
            } else {
                moduleCard.classList.remove('completed');
            }
            
            // Save state to localStorage
            saveProgress();
        }

        function saveProgress() {
            const progress = {};
            document.querySelectorAll('.module-card:not(.event-card)').forEach((card, index) => {
                const checkbox = card.querySelector('.task-checkbox');
                if (checkbox) {
                    progress[index] = checkbox.checked;
                }
            });
            localStorage.setItem('moduleProgress', JSON.stringify(progress));
        }

        function loadProgress() {
            const progress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
            document.querySelectorAll('.module-card:not(.event-card)').forEach((card, index) => {
                const checkbox = card.querySelector('.task-checkbox');
                if (checkbox && progress[index]) {
                    checkbox.checked = true;
                    card.classList.add('completed');
                }
            });
        }

        // Load saved progress when page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadProgress();
            
            // Add CSS for event cards
            const style = document.createElement('style');
            style.textContent = `
                .event-card {
                    background: linear-gradient(135deg, #2a3a4a 0%, #1a2a3a 100%);
                    border-left: 4px solid #9dfcff;
                }
                .event-card h3 {
                    color: #9dfcff;
                }
                
                /* Ensure container is responsive */
                .container {
                    width: 95%;
                    padding: 0 10px;
                }
                
                /* Fix for tables on mobile */
                @media (max-width: 768px) {
                    .task-content table, .task-content tbody, .task-content tr {
                        display: block;
                        width: 100%;
                    }
                    
                    #countdown-timer {
                        font-size: 0.9rem;
                        margin: 0.5rem 0;
                    }
                }
                
                #countdown-timer {
                    background-color: rgba(0, 0, 0, 0.2);
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 1rem;
                }
            `;
            document.head.appendChild(style);
            
            // Calculate and display countdown to demo day
            updateDemoCountdown();
            // Update countdown every second instead of every day
            setInterval(updateDemoCountdown, 1000);
        });

        function updateDemoCountdown() {
            const demoDate = new Date('November 1, 2025 00:00:00');
            const today = new Date();
            
            // Calculate time difference in milliseconds
            const timeDiff = demoDate.getTime() - today.getTime();
            
            // If the demo date has passed, show 0
            if (timeDiff <= 0) {
                document.getElementById('days-remaining').textContent = '0';
                document.getElementById('digital-clock').textContent = '00:00:00';
                return;
            }
            
            // Calculate days, hours, minutes, and seconds
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            // Update the countdown display only if elements exist
            const daysElement = document.getElementById('days-remaining');
            const clockElement = document.getElementById('digital-clock');
            
            if (daysElement) {
                daysElement.textContent = days;
            }
            
            if (clockElement) {
                // Format digital clock (HH:MM:SS)
                const formattedHours = hours.toString().padStart(2, '0');
                const formattedMinutes = minutes.toString().padStart(2, '0');
                const formattedSeconds = seconds.toString().padStart(2, '0');
                clockElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            }
            
            // Add color based on urgency
            if (daysElement) {
                if (days <= 7) {
                    daysElement.style.color = '#ff6b6b'; // Red for urgent
                } else if (days <= 30) {
                    daysElement.style.color = '#ffd166'; // Yellow for approaching
                } else {
                    daysElement.style.color = '#06d6a0'; // Green for plenty of time
                }
            }
        }

        // Add responsive handling for orientation changes
        window.addEventListener('resize', function() {
            // Adjust any elements that need resizing on window change
            const moduleCards = document.querySelectorAll('.module-card');
            if (window.innerWidth <= 480) {
                moduleCards.forEach(card => {
                    card.style.width = '100%';
                });
            }
        });