// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');

    if (!loadingScreen) {
        // Fallback: hide any loading screen after 3 seconds
        setTimeout(() => {
            const anyLoadingScreen = document.querySelector('.loading-screen, #loadingScreen');
            if (anyLoadingScreen) {
                anyLoadingScreen.style.display = 'none';
                document.body.classList.add('animations-ready');
            }
        }, 3000);
        return;
    }

    // Show loading screen for 2.5 seconds (like Ferrari)
    setTimeout(() => {
        try {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Trigger text animations after loading screen is hidden
                document.body.classList.add('animations-ready');
            }, 500); // Wait for fade transition to complete
        } catch (error) {
            console.error('Error hiding loading screen:', error);
            // Fallback: force hide
            loadingScreen.style.display = 'none';
            document.body.classList.add('animations-ready');
        }
    }, 2500);

    // Emergency fallback: hide loading screen after 5 seconds no matter what
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        document.body.classList.add('animations-ready');
    }, 5000);

    const ctaButton = document.getElementById('ctaButton');
    const tryAiButton = document.getElementById('tryAiButton');
    const logoFlag = document.querySelector('.logo-flag');
    const brandName = document.querySelector('.brand-name');
    const tagline = document.querySelector('.tagline');
    const primaryButton = document.querySelector('.primary-button');
    const secondaryButton = document.querySelector('.secondary-button');
    const featureCards = document.querySelectorAll('.feature-card');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const featureBoxes = document.querySelectorAll('.feature-box');
    const subscribeButton = document.querySelector('.subscribe-button');
    const emailInput = document.querySelector('.email-input');
    const loginBtn = document.querySelector('.nav-login-btn');
    const signupBtn = document.querySelector('.nav-signup-btn');
    const signupModal = document.getElementById('signupModal');
    const closeSignup = document.getElementById('closeSignup');
    const signupForm = document.getElementById('signupForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginBtnInModal = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');
    const loginForm = document.getElementById('loginForm');
    const loginPasswordToggle = document.getElementById('loginPasswordToggle');
    const signupBtnInModal = document.getElementById('signupBtnInModal');
    const aiDashboard = document.getElementById('aiDashboard');
    const closeAiDashboard = document.getElementById('closeAiDashboard');
    const newChatBtn = document.getElementById('newChatBtn');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const attachBtn = document.getElementById('attachBtn');
    const chatMessages = document.getElementById('chatMessages');
    const userProfile = document.getElementById('userProfile');

    // Hide scroll indicator when user scrolls down
    let scrollIndicatorVisible = true;
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100 && scrollIndicatorVisible) {
            scrollIndicator.classList.add('hidden');
            scrollIndicatorVisible = false;
        } else if (window.scrollY <= 100 && !scrollIndicatorVisible) {
            scrollIndicator.classList.remove('hidden');
            scrollIndicatorVisible = true;
        }
    });

    // Add click animation to CTA button
    ctaButton.addEventListener('click', function (e) {
        e.preventDefault();

        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Add bounce effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);

        // Simulate action (you can replace this with actual functionality)
        console.log('Get Started clicked!');

        // Optional: Add a success message or redirect
        showSuccessMessage();
    });

    // Add hover effects to logo
    logoFlag.addEventListener('mouseenter', function () {
        this.style.animationPlayState = 'paused';
        this.style.transform = 'rotate(90deg) perspective(100px) rotateX(0deg) scale(1.1)';
    });

    logoFlag.addEventListener('mouseleave', function () {
        this.style.animationPlayState = 'running';
        this.style.transform = 'rotate(90deg) perspective(100px) rotateX(5deg) scale(1)';
    });

    // Add typing animation to brand name
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Add scroll-triggered animations
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        // Parallax effect for logo
        logoFlag.style.transform = `rotate(90deg) perspective(100px) rotateX(5deg) translateY(${parallax * 0.1}px)`;

        // Fade effect for text elements
        const opacity = Math.max(0, 1 - scrolled / 300);
        brandName.style.opacity = opacity;
        tagline.style.opacity = opacity;
    }

    // Throttled scroll handler
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }

    function handleScrollEnd() {
        ticking = false;
    }

    window.addEventListener('scroll', requestTick);
    window.addEventListener('scroll', handleScrollEnd);

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            ctaButton.click();
        }
    });

    // Add focus styles for accessibility
    ctaButton.addEventListener('focus', function () {
        this.style.outline = '2px solid #666';
        this.style.outlineOffset = '2px';
    });

    ctaButton.addEventListener('blur', function () {
        this.style.outline = 'none';
    });

    // Success message function
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.textContent = 'Welcome to Nyaya!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #000;
            color: #fff;
            padding: 1rem 2rem;
            border-radius: 5px;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.5s ease-out;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => message.remove(), 500);
        }, 2000);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
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

    // Initialize page with staggered animations
    setTimeout(() => {
        logoFlag.style.animation = 'slideDown 0.8s ease-out both';
    }, 200);

    setTimeout(() => {
        brandName.style.animation = 'slideUp 0.8s ease-out both';
    }, 400);

    setTimeout(() => {
        tagline.style.animation = 'slideUp 0.8s ease-out both';
    }, 600);

    setTimeout(() => {
        ctaButton.style.animation = 'slideUp 0.8s ease-out both';
    }, 800);

    // Add mouse movement parallax effect
    document.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;

        logoFlag.style.transform = `rotate(90deg) perspective(100px) rotateX(5deg) translate(${moveX}px, ${moveY}px)`;
    });

    // Smooth scrolling functionality
    function smoothScrollTo(target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // CTA button scroll to main content
    ctaButton.addEventListener('click', function (e) {
        e.preventDefault();
        const mainContent = document.querySelector('.main-content');
        smoothScrollTo(mainContent);
    });

    // Try AI Button click handler
    if (tryAiButton) {
        tryAiButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Add loading animation to button
            this.style.transform = 'scale(0.95)';
            this.style.opacity = '0.8';

            // Change button text to show loading
            const buttonText = this.querySelector('span:first-child');
            const originalText = buttonText.textContent;
            buttonText.textContent = 'Loading AI...';

            // Disable button during animation
            this.disabled = true;
            this.style.cursor = 'not-allowed';

            // Create page transition animation
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.5s ease;
            `;

            // Add AI loading animation
            const loadingContent = document.createElement('div');
            loadingContent.style.cssText = `
                text-align: center;
                color: white;
                font-family: 'Inter', sans-serif;
            `;

            const loadingText = document.createElement('h2');
            loadingText.textContent = 'Initializing Nyaya AI';
            loadingText.style.cssText = `
                margin-bottom: 20px;
                font-size: 2rem;
                font-weight: 600;
                opacity: 0;
                animation: fadeInUp 0.8s ease 0.2s forwards;
            `;

            const loadingSpinner = document.createElement('div');
            loadingSpinner.style.cssText = `
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-top: 3px solid #ffffff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
                opacity: 0;
                animation: fadeInUp 0.8s ease 0.4s forwards, spin 1s linear infinite 0.6s;
            `;

            const loadingSubtext = document.createElement('p');
            loadingSubtext.textContent = 'Preparing your legal assistant...';
            loadingSubtext.style.cssText = `
                margin-top: 20px;
                font-size: 1rem;
                opacity: 0.7;
                opacity: 0;
                animation: fadeInUp 0.8s ease 0.6s forwards;
            `;

            loadingContent.appendChild(loadingText);
            loadingContent.appendChild(loadingSpinner);
            loadingContent.appendChild(loadingSubtext);
            overlay.appendChild(loadingContent);

            // Add CSS animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            document.body.appendChild(overlay);

            // Fade in overlay
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 100);

            // Open AI Dashboard after animation
            setTimeout(() => {
                window.open('ai-dashboard.html', '_blank');

                // Reset button state
                this.style.transform = 'scale(1)';
                this.style.opacity = '1';
                this.disabled = false;
                this.style.cursor = 'pointer';
                buttonText.textContent = originalText;

                // Fade out and remove overlay
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    style.remove();
                }, 500);
            }, 2000);
        });
    }


    // Scroll indicator functionality
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function () {
            const mainContent = document.querySelector('.main-content');
            smoothScrollTo(mainContent);
        });
    }

    // Primary button functionality
    if (primaryButton) {
        primaryButton.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Try AI clicked!');
            // Add your AI functionality here
        });
    }

    // Secondary button functionality
    if (secondaryButton) {
        secondaryButton.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Join As A Lawyer clicked!');
            // Add your lawyer registration functionality here
        });
    }

    // Enhanced 3D card effects
    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) rotateX(8deg) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
            this.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
        });

        // Add click effect
        card.addEventListener('click', function () {
            this.style.transform = 'translateY(-10px) rotateX(5deg) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) rotateX(8deg) scale(1.02)';
            }, 150);
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe main content elements
    const mainContent = document.querySelector('.main-content');
    const mainHeadline = document.querySelector('.main-headline');
    const actionButtons = document.querySelector('.action-buttons');
    const howItWorks = document.querySelector('.how-it-works');

    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(50px)';
        mainContent.style.transition = 'all 0.8s ease-out';
        observer.observe(mainContent);
    }

    if (mainHeadline) {
        mainHeadline.style.opacity = '0';
        mainHeadline.style.transform = 'translateY(30px)';
        mainHeadline.style.transition = 'all 0.6s ease-out 0.2s';
        observer.observe(mainHeadline);
    }

    if (actionButtons) {
        actionButtons.style.opacity = '0';
        actionButtons.style.transform = 'translateY(30px)';
        actionButtons.style.transition = 'all 0.6s ease-out 0.4s';
        observer.observe(actionButtons);
    }

    if (howItWorks) {
        howItWorks.style.opacity = '0';
        howItWorks.style.transform = 'translateY(30px)';
        howItWorks.style.transition = 'all 0.6s ease-out 0.6s';
        observer.observe(howItWorks);
    }

    // Staggered card animations on scroll
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(10deg)';
        card.style.transition = `all 0.6s ease-out ${0.8 + (index * 0.2)}s`;
        observer.observe(card);
    });

    // Parallax scrolling effect for background
    let parallaxTicking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;

        // Update background position
        document.body.style.backgroundPosition = `center ${parallax}px`;

        parallaxTicking = false;
    }

    function requestParallaxUpdate() {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    }

    window.addEventListener('scroll', requestParallaxUpdate);

    // Enhanced 3D effects for feature boxes
    featureBoxes.forEach((box, index) => {
        box.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });

        box.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });

        // Add click effect
        box.addEventListener('click', function () {
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-12px) scale(1.03)';
            }, 150);
        });
    });

    // Subscribe form functionality
    if (subscribeButton && emailInput) {
        subscribeButton.addEventListener('click', function (e) {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (email && isValidEmail(email)) {
                // Add your subscription logic here
                console.log('Subscribed with email:', email);

                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);

                // Clear input
                emailInput.value = '';

                // Show success message (you can customize this)
                showNotification('Successfully subscribed!', 'success');
            } else {
                // Show error message
                showNotification('Please enter a valid email address', 'error');
            }
        });

        // Enter key support
        emailInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                subscribeButton.click();
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.5s ease-out;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Intersection Observer for feature boxes
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe feature boxes for scroll animations
    featureBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(50px) scale(0.9)';
        box.style.transition = `all 0.8s ease-out ${index * 0.1}s`;
        featureObserver.observe(box);
    });

    // Login Modal Functionality
    function openLoginModal() {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLoginModal() {
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Navigation button functionality
    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openLoginModal();
        });
    }

    // Sign Up Modal Functionality
    function openSignupModal() {
        signupModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSignupModal() {
        signupModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openSignupModal();
        });
    }

    // Close signup modal when close button is clicked
    if (closeSignup) {
        closeSignup.addEventListener('click', function (e) {
            e.preventDefault();
            closeSignupModal();
        });
    }

    // Close signup modal when clicking outside the modal
    if (signupModal) {
        signupModal.addEventListener('click', function (e) {
            if (e.target === signupModal) {
                closeSignupModal();
            }
        });
    }

    // Close signup modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && signupModal && signupModal.classList.contains('active')) {
            closeSignupModal();
        }
    });

    // Password toggle functionality
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function (e) {
            e.preventDefault();
            const passwordInput = document.getElementById('password');
            const toggleText = this.querySelector('.toggle-text');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleText.textContent = 'Show';
            } else {
                passwordInput.type = 'password';
                toggleText.textContent = 'Hide';
            }
        });
    }

    // Form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const terms = document.getElementById('terms').checked;

            // Basic validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            if (password.length < 8) {
                showNotification('Password must be at least 8 characters long', 'error');
                return;
            }

            if (!terms) {
                showNotification('Please accept the Terms of Use and Privacy Policy', 'error');
                return;
            }

            // Firebase Authentication - Create user
            if (window.auth) {
                window.auth.createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // User created successfully
                        showNotification('Account created successfully!', 'success');
                        closeSignupModal();
                        signupForm.reset();

                        // You can add additional user data here if needed
                        console.log('User created:', userCredential.user);
                    })
                    .catch((error) => {
                        // Handle errors
                        let errorMessage = 'An error occurred during signup.';

                        switch (error.code) {
                            case 'auth/email-already-in-use':
                                errorMessage = 'This email is already registered.';
                                break;
                            case 'auth/weak-password':
                                errorMessage = 'Password should be at least 6 characters.';
                                break;
                            case 'auth/invalid-email':
                                errorMessage = 'Please enter a valid email address.';
                                break;
                            default:
                                errorMessage = error.message;
                        }

                        showNotification(errorMessage, 'error');
                    });
            } else {
                // Fallback if Firebase is not loaded
                showNotification('Account created successfully!', 'success');
                closeSignupModal();
                signupForm.reset();
            }
        });
    }

    // Login button in modal
    if (loginBtnInModal) {
        loginBtnInModal.addEventListener('click', function (e) {
            e.preventDefault();
            closeSignupModal();
            // Here you would typically open a login modal or redirect to login page
            showNotification('Login functionality coming soon!', 'info');
        });
    }

    // Close login modal when close button is clicked
    if (closeLogin) {
        closeLogin.addEventListener('click', function (e) {
            e.preventDefault();
            closeLoginModal();
        });
    }

    // Close login modal when clicking outside the modal
    if (loginModal) {
        loginModal.addEventListener('click', function (e) {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
    }

    // Close login modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
            closeLoginModal();
        }
    });

    // Login password toggle functionality
    if (loginPasswordToggle) {
        loginPasswordToggle.addEventListener('click', function (e) {
            e.preventDefault();
            const passwordInput = document.getElementById('loginPassword');
            const toggleText = this.querySelector('.toggle-text');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleText.textContent = 'Show';
            } else {
                passwordInput.type = 'password';
                toggleText.textContent = 'Hide';
            }
        });
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Basic validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Firebase Authentication - Sign in user
            if (window.auth) {
                window.auth.signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // User signed in successfully
                        showNotification('Login successful!', 'success');
                        closeLoginModal();
                        loginForm.reset();

                        // You can add additional logic here like redirecting to dashboard
                        console.log('User signed in:', userCredential.user);
                    })
                    .catch((error) => {
                        // Handle errors
                        let errorMessage = 'An error occurred during login.';

                        switch (error.code) {
                            case 'auth/user-not-found':
                                errorMessage = 'No account found with this email address.';
                                break;
                            case 'auth/wrong-password':
                                errorMessage = 'Incorrect password.';
                                break;
                            case 'auth/invalid-email':
                                errorMessage = 'Please enter a valid email address.';
                                break;
                            case 'auth/user-disabled':
                                errorMessage = 'This account has been disabled.';
                                break;
                            case 'auth/too-many-requests':
                                errorMessage = 'Too many failed attempts. Please try again later.';
                                break;
                            default:
                                errorMessage = error.message;
                        }

                        showNotification(errorMessage, 'error');
                    });
            } else {
                // Fallback if Firebase is not loaded
                showNotification('Login successful!', 'success');
                closeLoginModal();
                loginForm.reset();
            }
        });
    }

    // Sign up button in login modal
    if (signupBtnInModal) {
        signupBtnInModal.addEventListener('click', function (e) {
            e.preventDefault();
            closeLoginModal();
            openSignupModal();
        });
    }

    // Google Login Function
    function signInWithGoogle() {
        console.log('Google login clicked');
        console.log('Auth available:', !!window.auth);
        console.log('Google provider available:', !!window.googleProvider);

        if (window.auth && window.googleProvider) {
            console.log('Attempting Google sign-in...');
            window.auth.signInWithPopup(window.googleProvider)
                .then((result) => {
                    // Google Sign-In was successful
                    const user = result.user;
                    showNotification('Google login successful!', 'success');

                    // Close any open modals
                    closeLoginModal();
                    closeSignupModal();

                    console.log('Google user signed in:', user);
                })
                .catch((error) => {
                    // Handle errors
                    let errorMessage = 'Google login failed. Please try again.';

                    switch (error.code) {
                        case 'auth/popup-closed-by-user':
                            errorMessage = 'Google login was cancelled.';
                            break;
                        case 'auth/popup-blocked':
                            errorMessage = 'Popup was blocked. Please allow popups and try again.';
                            break;
                        case 'auth/cancelled-popup-request':
                            errorMessage = 'Google login was cancelled.';
                            break;
                        case 'auth/account-exists-with-different-credential':
                            errorMessage = 'An account already exists with this email using a different sign-in method.';
                            break;
                        default:
                            errorMessage = error.message;
                    }

                    showNotification(errorMessage, 'error');
                    console.error('Google sign-in error:', error);
                });
        } else {
            console.error('Google login not available:');
            console.error('window.auth:', window.auth);
            console.error('window.googleProvider:', window.googleProvider);
            console.error('firebase:', typeof firebase);
            showNotification('Google login is not available. Please check console for details.', 'error');
        }
    }

    // Social login buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            if (this.classList.contains('google-btn')) {
                // Handle Google login
                signInWithGoogle();
            } else {
                // Handle other social logins (Facebook, Apple)
                const provider = this.classList.contains('facebook-btn') ? 'Facebook' : 'Apple';
                showNotification(`${provider} login coming soon!`, 'info');
            }
        });
    });

    // Firebase Authentication State Monitoring
    if (window.auth) {
        // Monitor authentication state changes
        window.auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                console.log('User is signed in:', user);

                // Update UI to show user is logged in
                updateAuthUI(user);
            } else {
                // User is signed out
                console.log('User is signed out');

                // Update UI to show user is logged out
                updateAuthUI(null);
            }
        });
    }

    // Function to update UI based on authentication state
    function updateAuthUI(user) {
        const loginBtn = document.querySelector('.nav-login-btn');
        const signupBtn = document.querySelector('.nav-signup-btn');

        if (user) {
            // User is logged in
            if (loginBtn) {
                loginBtn.textContent = 'LOGOUT';
                loginBtn.onclick = function (e) {
                    e.preventDefault();
                    logoutUser();
                };
            }
            if (signupBtn) {
                signupBtn.style.display = 'none';
            }
        } else {
            // User is logged out
            if (loginBtn) {
                loginBtn.textContent = 'LOGIN';
                loginBtn.onclick = function (e) {
                    e.preventDefault();
                    openLoginModal();
                };
            }
            if (signupBtn) {
                signupBtn.style.display = 'inline-block';
            }
        }
    }

    // Function to logout user
    function logoutUser() {
        if (window.auth) {
            window.auth.signOut()
                .then(() => {
                    showNotification('Logged out successfully!', 'success');
                    console.log('User signed out');
                })
                .catch((error) => {
                    showNotification('Error logging out. Please try again.', 'error');
                    console.error('Error signing out:', error);
                });
        }
    }

    // AI Dashboard Functionality
    function openAiDashboard() {
        aiDashboard.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Update user profile if logged in
        if (window.auth && window.auth.currentUser) {
            updateUserProfile(window.auth.currentUser);
        }
    }

    function closeAiDashboardModal() {
        aiDashboard.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Update user profile in AI dashboard
    function updateUserProfile(user) {
        if (userProfile) {
            const profileImg = userProfile.querySelector('.profile-img');
            if (profileImg) {
                profileImg.src = user.photoURL || `https://via.placeholder.com/32x32/000000/ffffff?text=${user.email ? user.email[0].toUpperCase() : 'U'}`;
                profileImg.alt = user.displayName || 'User';
            }
        }
    }

    // OpenAI API Integration
    async function sendMessageToAI(message) {
        try {
            // Check if OpenAI is available
            if (window.callOpenAI) {
                const response = await window.callOpenAI(message);
                return response;
            } else {
                // Fallback to mock responses if OpenAI is not configured
                const responses = [
                    "Based on Indian law, I can help you understand the legal aspects of your query. Could you provide more specific details about your situation?",
                    "Under the Indian Penal Code (IPC), this matter falls under Section 420 for fraud. I recommend consulting with a criminal lawyer for detailed guidance.",
                    "For property disputes, the Transfer of Property Act, 1882 would be applicable. You may want to consider mediation before approaching the court.",
                    "This appears to be a civil matter. I suggest you gather all relevant documents and consult with a civil lawyer in your area.",
                    "Based on your description, this could involve consumer protection laws. You might want to file a complaint with the Consumer Forum."
                ];

                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                return randomResponse;
            }
        } catch (error) {
            console.error('Error calling OpenAI API:', error);

            // Fallback responses based on error type
            if (error.message.includes('API key not configured')) {
                return "I'm currently in demo mode. To enable full AI functionality, please configure your OpenAI API key. For now, I can provide general legal guidance based on Indian law.";
            } else {
                return "I apologize, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists.";
            }
        }
    }

    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';

        const avatarContent = document.createElement('div');
        avatarContent.className = isUser ? 'user-avatar' : 'ai-avatar';
        avatarContent.textContent = isUser ? 'U' : 'AI';
        avatarDiv.appendChild(avatarContent);

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = content;

        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(messageContent);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        messageInput.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <div class="ai-avatar">AI</div>
            </div>
            <div class="message-content">
                <div class="message-text">AI is typing...</div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Get AI response
        const aiResponse = await sendMessageToAI(message);

        // Remove typing indicator
        chatMessages.removeChild(typingDiv);

        // Add AI response
        addMessage(aiResponse, false);
    }

    // Voice recognition
    function startVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                voiceBtn.style.background = '#ff4444';
                voiceBtn.style.color = '#ffffff';
                messageInput.placeholder = 'Listening...';
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                messageInput.value = transcript;
                sendMessage();
            };

            recognition.onend = () => {
                voiceBtn.style.background = '';
                voiceBtn.style.color = '';
                messageInput.placeholder = 'Type a message...';
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                voiceBtn.style.background = '';
                voiceBtn.style.color = '';
                messageInput.placeholder = 'Type a message...';
            };

            recognition.start();
        } else {
            showNotification('Voice recognition not supported in this browser', 'error');
        }
    }

    // Event listeners for AI Dashboard
    if (closeAiDashboard) {
        closeAiDashboard.addEventListener('click', closeAiDashboardModal);
    }

    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            chatMessages.innerHTML = `
                <div class="message ai-message">
                    <div class="message-avatar">
                        <div class="ai-avatar">AI</div>
                    </div>
                    <div class="message-content">
                        <div class="message-text">Hello! I'm Nyaya AI, your legal assistant. How may I help you today? You can ask me about any legal matter, and I'll provide guidance based on Indian law.</div>
                        <div class="message-time">Just now</div>
                    </div>
                </div>
            `;
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    if (voiceBtn) {
        voiceBtn.addEventListener('click', startVoiceRecognition);
    }

    if (attachBtn) {
        attachBtn.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*,.pdf,.doc,.docx';
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    showNotification(`File "${file.name}" selected. File upload functionality will be implemented soon.`, 'info');
                }
            };
            fileInput.click();
        });
    }

    // Add CSS for notification animations
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
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
    document.head.appendChild(notificationStyle);
});