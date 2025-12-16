// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmlkkY303hGBpeyqxgiRlfmo7rLJOb304",
    authDomain: "nyaya-ai-5360d.firebaseapp.com",
    projectId: "nyaya-ai-5360d",
    storageBucket: "nyaya-ai-5360d.appspot.com",
    messagingSenderId: "731322835309",
    appId: "1:731322835309:web:53d2b174d66dd564493a64",
    measurementId: "G-9S3ML6H1XF"
};

// Initialize Firebase when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    try {
        // Check if Firebase is available
        if (typeof firebase === 'undefined') {
            console.error('Firebase is not loaded!');
            return;
        }

        // Initialize Firebase (using CDN approach)
        const app = firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();

        // Initialize Google Auth Provider
        const googleProvider = new firebase.auth.GoogleAuthProvider();

        // Configure Google provider
        googleProvider.addScope('email');
        googleProvider.addScope('profile');
        googleProvider.setCustomParameters({
            'prompt': 'select_account'
        });

        // Make auth and provider available globally
        window.auth = auth;
        window.googleProvider = googleProvider;

        // Debug: Check if Firebase is loaded
        console.log('Firebase initialized successfully!');
        console.log('Firebase app:', app);
        console.log('Firebase auth:', auth);
        console.log('Google provider:', googleProvider);
    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }
});
