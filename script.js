// gocaving.ai - Interactive enhancements

document.addEventListener('DOMContentLoaded', function() {

    // Email subscription form handling
    const subscribeForm = document.getElementById('email-updates-form');
    const subscribeStatus = document.getElementById('subscribe-status');
    const subscribeBtn = document.getElementById('subscribe-btn');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(subscribeForm);
            const originalText = subscribeBtn.textContent;

            // Update button state
            subscribeBtn.textContent = 'Subscribing...';
            subscribeBtn.disabled = true;
            subscribeStatus.classList.add('hidden');

            try {
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    showMessage(subscribeStatus, result.message, 'success');
                    subscribeForm.reset();
                } else {
                    showMessage(subscribeStatus, result.message, 'error');
                }
            } catch (error) {
                showMessage(subscribeStatus, 'An error occurred. Please try again.', 'error');
            } finally {
                subscribeBtn.textContent = originalText;
                subscribeBtn.disabled = false;
            }
        });
    }

    // Feedback form handling
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackStatus = document.getElementById('feedback-status');
    const feedbackBtn = document.getElementById('feedback-btn');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(feedbackForm);
            const originalText = feedbackBtn.textContent;

            // Update button state
            feedbackBtn.textContent = 'Sending...';
            feedbackBtn.disabled = true;
            feedbackStatus.classList.add('hidden');

            try {
                const response = await fetch('/api/feedback', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    showMessage(feedbackStatus, result.message, 'success');
                    feedbackForm.reset();
                } else {
                    showMessage(feedbackStatus, result.message, 'error');
                }
            } catch (error) {
                showMessage(feedbackStatus, 'An error occurred. Please try again.', 'error');
            } finally {
                feedbackBtn.textContent = originalText;
                feedbackBtn.disabled = false;
            }
        });
    }

    // Helper function to show status messages
    function showMessage(element, message, type) {
        element.textContent = message;
        element.classList.remove('hidden');

        if (type === 'success') {
            element.className = 'mb-4 p-4 rounded-lg bg-green-900/50 border border-green-500 text-green-200';
        } else {
            element.className = 'mb-4 p-4 rounded-lg bg-red-900/50 border border-red-500 text-red-200';
        }

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                element.classList.add('hidden');
            }, 5000);
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add animation on scroll for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards for scroll animation
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Email validation helper
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Console message for developers
    console.log('%c🔦 gocaving.ai ', 'background: #10b981; color: #fff; padding: 8px 12px; border-radius: 4px; font-weight: bold;');
    console.log('Welcome to gocaving.ai - AI in Caving discussion series');
    console.log('Interested in contributing? Check out our GitHub repository (coming soon)');
});
