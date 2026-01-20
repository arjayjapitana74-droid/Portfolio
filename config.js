// Configuration file for portfolio
// This file contains configuration that can be easily modified for different environments

const CONFIG = {
    // Webhook URLs - Replace with your actual URLs
    webhooks: {
        n8n: 'https://n8n.keithjapitana.io/webhook/588af73a-5ea0-4a6b-88f9-f7c782cbb263',
    },
    
    // API Keys and tokens
    api: {
        key: 'YOUR_API_KEY_HERE',
        secret: 'YOUR_SECRET_TOKEN_HERE'
    },
    
    // Environment settings
    environment: 'development', // 'development' or 'production'
    
    // Feature flags
    features: {
        chatbot: true,
        contactForm: true,
        analytics: false
    },
    
    // URLs and endpoints
    urls: {
        portfolio: 'https://your-portfolio-domain.com',
        api: 'https://your-api-domain.com'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
