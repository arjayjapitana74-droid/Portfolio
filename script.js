// ----------------------- Main Portfolio Website JavaScript -----------------------

// Initialize EmailJS
(function() {
    emailjs.init('jpfq_Uru2wkJcCvdY');
})();

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    if (CONFIG.features.contactForm) initializeContactForm();
    if (CONFIG.features.chatbot) initializeChatbot();
});

// ------------------------- Navigation -------------------------
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    });

    // Collapse navbar on link click (Bootstrap)
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse?.classList.contains('show')) navbarToggler.click();
        });
    });
}

// ------------------------- Contact Form (EmailJS) -------------------------
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, textarea, select');

    // Input validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    function validateField(e) {
        const field = e.target;
        const feedback = field.parentNode.querySelector('.form-feedback');
        if (field.hasAttribute('required') && !field.value.trim()) {
            showFieldError(field, feedback, 'This field is required');
            return false;
        }
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, feedback, 'Please enter a valid email address');
                return false;
            }
        }
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
                showFieldError(field, feedback, 'Please enter a valid phone number');
                return false;
            }
        }
        showFieldSuccess(field, feedback);
        return true;
    }

    function showFieldError(field, feedback, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        feedback.textContent = message;
        feedback.className = 'form-feedback invalid';
    }

    function showFieldSuccess(field, feedback) {
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
        feedback.textContent = '✓';
        feedback.className = 'form-feedback valid';
    }

    function clearFieldError(e) {
        const field = e.target;
        const feedback = field.parentNode.querySelector('.form-feedback');
        field.classList.remove('is-invalid', 'is-valid');
        feedback.textContent = '';
        feedback.className = 'form-feedback';
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) isValid = false;
        });
        if (!isValid) {
            showFormStatus('Please fix the errors above', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('.contact-submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        emailjs.sendForm('service_3oppuei', 'template_cv1n14e', contactForm)
            .then(() => resetForm('Message sent successfully! I\'ll get back to you soon.'))
            .catch(() => resetForm('Sorry, there was an error sending your message.'));

        function resetForm(message) {
            contactForm.reset();
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
                const feedback = input.parentNode.querySelector('.form-feedback');
                feedback.textContent = '';
                feedback.className = 'form-feedback';
            });
            showFormStatus(message, message.includes('error') ? 'error' : 'success');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type} show`;
        setTimeout(() => formStatus.classList.remove('show'), 5000);
    }
}

// ------------------------- Chatbot (n8n webhook) -------------------------
function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotTyping = document.getElementById('chatbot-typing');
    const chatbotNotification = document.getElementById('chatbot-notification');

    if (!chatbotToggle) return;

    let isOpen = false;
    let messageCount = 0;
    const N8N_WEBHOOK_URL = CONFIG.webhooks.n8n;

    chatbotToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        chatbotWindow.classList.toggle('show', isOpen);
        if (isOpen) chatbotInput.focus();
        if (isOpen) hideNotification();
    });

    chatbotClose?.addEventListener('click', () => {
        isOpen = false;
        chatbotWindow.classList.remove('show');
    });

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        addMessage(message, 'user');
        chatbotInput.value = '';
        showTyping();
        sendToN8N(message);
    }

    chatbotSend?.addEventListener('click', sendMessage);
    chatbotInput?.addEventListener('keypress', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-avatar">${sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>'}</div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        `;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
        if (!isOpen && sender === 'bot') showNotification();
    }

    function showTyping() { if (chatbotTyping) chatbotTyping.style.display = 'flex'; scrollToBottom(); }
    function hideTyping() { if (chatbotTyping) chatbotTyping.style.display = 'none'; }
    function scrollToBottom() { chatbotMessages.scrollTop = chatbotMessages.scrollHeight; }
    function getCurrentTime() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
    function showNotification() { if (chatbotNotification) { messageCount++; chatbotNotification.textContent = messageCount; chatbotNotification.classList.add('show'); } }
    function hideNotification() { if (chatbotNotification) { messageCount = 0; chatbotNotification.classList.remove('show'); } }

    function sendToN8N(message) {
        showTyping();

        fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            body: JSON.stringify({ message: message })
        })
        .then(async response => {
            hideTyping();
            if (!response.ok) throw new Error('Webhook response was not OK: ' + response.status);
            
            // Treat response as plain text directly
            const text = await response.text();

            addMessage(text?.trim() || "Thank you for your message! I'll get back to you soon.", 'bot');
        })
        .catch(error => {
            hideTyping();
            console.error('Error sending message to webhook:', error);
            addMessage(
                "I'm sorry, I'm having trouble connecting right now. Please try again later or contact me directly.",
                'bot'
            );
        });
    }

    setTimeout(() => { if (!isOpen) showNotification(); }, 5000);
}
