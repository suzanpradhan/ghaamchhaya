// Video Autoplay Handler
(function() {
    const video = document.getElementById('bgVideo');
    if (!video) return;
    
    function tryPlay() {
        video.play().catch(() => {});
    }
    
    // Try on user interaction (iOS fallback)
    function onInteraction() {
        video.muted = true;
        tryPlay();
    }
    
    document.addEventListener('touchstart', onInteraction, { passive: true, once: true });
    document.addEventListener('click', onInteraction, { once: true });
    video.addEventListener('canplay', tryPlay, { once: true });
    tryPlay();
})();

// Countdown Timer
(function() {
    if (typeof IS_FINISHED !== 'undefined' && IS_FINISHED) return;
    if (typeof TARGET_DATE === 'undefined') return;
    
    function updateCountdown() {
        const diff = TARGET_DATE - Date.now();
        
        if (diff > 0) {
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            
            document.getElementById('days').textContent = String(d).padStart(2, '0');
            document.getElementById('hours').textContent = String(h).padStart(2, '0');
            document.getElementById('minutes').textContent = String(m).padStart(2, '0');
            document.getElementById('seconds').textContent = String(s).padStart(2, '0');
        } else {
            document.getElementById('countdownTimer').classList.add('hidden');
            document.getElementById('finishedTitle').classList.remove('hidden');
            document.getElementById('orderBtn').textContent = 'Buy Now';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
})();
