// gocaving.ai - Interactive enhancements

document.addEventListener('DOMContentLoaded', function() {

    // Form submission handling with user feedback
    const forms = document.querySelectorAll('form[data-netlify]');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Netlify handles the actual submission
            // This just provides visual feedback
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Note: In production with Netlify, the form will redirect or show success
            // This is just for local testing feedback
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    });

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
