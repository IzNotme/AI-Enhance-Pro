// Global variables
let selectedFile = null;
let isProcessing = false;

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const videoInput = document.getElementById('videoInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const previewVideo = document.getElementById('previewVideo');
const videoPlaceholder = document.getElementById('videoPlaceholder');
const enhanceBtn = document.getElementById('enhanceBtn');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const status = document.getElementById('status');
const sharpnessSlider = document.getElementById('sharpness');
const sharpnessValue = document.getElementById('sharpnessValue');
const resolutionSelect = document.getElementById('resolution');
const noiseReduction = document.getElementById('noiseReduction');
const fpsBoost = document.getElementById('fpsBoost');
const uploadTitle = document.getElementById('uploadTitle');

// File upload handlers
function setupFileUpload() {
    if (!videoInput || !uploadArea) return;

    // Click to upload
    videoInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('click', () => videoInput.click());
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file && isValidVideoFile(file)) {
        selectedFile = file;
        displayFileInfo(file);
        loadVideoPreview(file);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(0, 212, 255, 0.7)';
    uploadArea.style.background = 'rgba(0, 212, 255, 0.05)';
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(0, 212, 255, 0.4)';
    uploadArea.style.background = 'transparent';
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(0, 212, 255, 0.4)';
    uploadArea.style.background = 'transparent';
    
    const file = e.dataTransfer.files[0];
    if (file && isValidVideoFile(file)) {
        videoInput.files = e.dataTransfer.files;
        handleFileSelect({ target: { files: [file] } });
    }
}

function isValidVideoFile(file) {
    const validTypes = ['video/mp4', 'video/quicktime', 'video/avi', 'video/mpeg'];
    const maxSize = 500 * 1024 * 1024; // 500MB
    return validTypes.includes(file.type) && file.size <= maxSize;
}

function displayFileInfo(file) {
    fileName.textContent = file.name;
    fileInfo.style.display = 'flex';
    uploadTitle.textContent = 'File selected successfully!';
    uploadArea.style.borderStyle = 'solid';
}

function clearFile() {
    selectedFile = null;
    videoInput.value = '';
    fileInfo.style.display = 'none';
    previewVideo.style.display = 'none';
    videoPlaceholder.style.display = 'flex';
    uploadTitle.textContent = 'Drop your video here or click to browse';
    uploadArea.style.borderStyle = 'dashed';
}

function loadVideoPreview(file) {
    const url = URL.createObjectURL(file);
    previewVideo.src = url;
    previewVideo.style.display = 'block';
    videoPlaceholder.style.display = 'none';
    
    // Clean up object URL when video ends or page unloads
    previewVideo.addEventListener('loadeddata', () => {
        URL.revokeObjectURL(url);
    });
}

// Control handlers
function setupControls() {
    if (sharpnessSlider) {
        sharpnessSlider.addEventListener('input', (e) => {
            sharpnessValue.textContent = e.target.value + '%';
        });
    }

    if (resolutionSelect) {
        resolutionSelect.addEventListener('change', (e) => {
            console.log('Resolution changed to:', e.target.value);
        });
    }
}

// Enhancement process
function startEnhance() {
    if (!selectedFile) {
        showStatus('Please select a video file first!', 'error');
        return;
    }

    if (isProcessing) return;

    isProcessing = true;
    enhanceBtn.disabled = true;
    enhanceBtn.textContent = 'Processing...';
    progressContainer.style.display = 'block';
    status.textContent = '';

    // Simulate AI processing steps
    const steps = [
        { percent: 10, text: 'Loading AI model...' },
        { percent: 25, text: 'Analyzing video frames...' },
        { percent: 45, text: 'Applying AI upscaling...' },
        { percent: 65, text: 'Noise reduction processing...' },
        { percent: 80, text: 'FPS interpolation...' },
        { percent: 95, text: 'Final sharpening pass...' },
        { percent: 100, text: 'Enhancement complete!' }
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
        if (stepIndex < steps.length) {
            const step = steps[stepIndex];
            updateProgress(step.percent, step.text);
            stepIndex++;
        } else {
            clearInterval(interval);
            finishEnhance();
        }
    }, 800);
}

function updateProgress(percent, text) {
    progressFill.style.width = percent + '%';
    progressText.textContent = text;
}

function finishEnhance() {
    setTimeout(() => {
        isProcessing = false;
        enhanceBtn.disabled = false;
        enhanceBtn.textContent = '✅ Enhanced!';
        enhanceBtn.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
        
        showStatus('Enhancement complete! 🎉 Your video is now ready.', 'success');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            enhanceBtn.textContent = '🚀 Enhance Again';
            enhanceBtn.style.background = 'linear-gradient(45deg, #00d4ff, #8a2be2)';
        }, 3000);
        
        progressContainer.style.display = 'none';
    }, 500);
}

function showStatus(message, type) {
    status.textContent = message;
    status.style.color = type === 'error' ? '#ff6b6b' : '#00ff88';
    status.style.fontWeight = '600';
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    setupFileUpload();
    setupControls();
    
    // Navbar smooth scroll for landing page
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Responsive adjustments
window.addEventListener('resize', function() {
    if (window.innerWidth < 768) {
        document.querySelector('.app-container')?.style.gridTemplateColumns = '1fr';
    }
});

// Prevent context menu on video elements
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'VIDEO') {
        e.preventDefault();
    }
});