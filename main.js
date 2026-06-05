// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Create mailto link
            const subject = encodeURIComponent('Newsletter Subscription Request');
            const body = encodeURIComponent(`New subscriber email: ${email}`);
            window.location.href = `mailto:yinchaoji@coze.email?subject=${subject}&body=${body}`;
            
            // Show confirmation
            this.innerHTML = '<p style="color: #10b981; font-weight: 600;">Thanks for subscribing! Check your email to confirm.</p>';
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
