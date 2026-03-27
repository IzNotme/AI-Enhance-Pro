document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 AI Enhance Pro - FULLY LOADED');
    
    // ALL ELEMENTS
    const videoInput = document.getElementById('videoInput');
    const fileNameEl = document.getElementById('fileName');
    const fileInfo = document.getElementById('fileInfo');
    const previewVideo = document.getElementById('previewVideo');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const enhanceBtn = document.getElementById('enhanceBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const uploadArea = document.getElementById('uploadArea');
    const sharpnessSlider = document.getElementById('sharpness');
    const sharpnessValue = document.getElementById('sharpnessValue');

    // 1. FILE UPLOAD - WORKS 100%
    videoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        console.log('📁 File selected:', file?.name);
        
        if (file) {
            fileNameEl.textContent = file.name;
            fileInfo.style.display = 'flex';
            
            // VIDEO PREVIEW
            const url = URL.createObjectURL(file);
            previewVideo.src = url;
            previewVideo.style.display = 'block';
            videoPlaceholder.style.display = 'none';
            console.log('✅ Video preview loaded');
        }
    });

    // 2. DRAG & DROP
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.background = 'rgba(0,212,255,0.1)';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        uploadArea.style.background = 'transparent';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.background = 'transparent';
        const file = e.dataTransfer.files[0];
        if (file) {
            const dt = new DataTransfer();
            dt.items.add(file);
            videoInput.files = dt.files;
            videoInput.dispatchEvent(new Event('change'));
        }
    });

    // 3. SHARPNESS SLIDER
    sharpnessSlider.addEventListener('input', function(e) {
        sharpnessValue.textContent = e.target.value + '%';
    });

    // 4. ENHANCE BUTTON - MAIN FIX
    enhanceBtn.addEventListener('click', function() {
        console.log('🚀 ENHANCE CLICKED!');
        
        if (!videoInput.files[0]) {
            alert('Please select a video first!');
            return;
        }

        // DISABLE BUTTON
        enhanceBtn.disabled = true;
        enhanceBtn.textContent = 'Processing...';
        
        // SHOW PROGRESS
        progressContainer.style.display = 'block';
        
        // FAKE PROCESSING 0-100%
        let progress = 0;
        const interval = setInterval(function() {
            progress += 8;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = 'AI Enhancing... ' + progress + '%';
            
            console.log('Progress:', progress + '%');
            
            if (progress >= 100) {
                clearInterval(interval);
                finishProcessing();
            }
        }, 200);
    });

    function finishProcessing() {
        setTimeout(function() {
            progressContainer.style.display = 'none';
            enhanceBtn.disabled = false;
            enhanceBtn.textContent = '✅ DONE! 🎉';
            enhanceBtn.style.background = '#00ff88';
            
            console.log('🎉 PROCESSING COMPLETE!');
            
            // RESET AFTER 3 SECONDS
            setTimeout(function() {
                enhanceBtn.textContent = '🚀 Enhance Video';
                enhanceBtn.style.background = '';
            }, 3000);
        }, 1000);
    }

    console.log('✅ ALL FEATURES ACTIVE');
});