function checkOrientation() {
    window.addEventListener('resize', checkOrientation);
    const isProbablyMobile = window.innerWidth <= 1180;
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    const landscapeWrapper = document.getElementById('landscape_modal');
    const body = document.body;
    if (isPortrait && isProbablyMobile) {
        landscapeWrapper.classList.remove('hidden');
        body.classList.add('no_scroll');
    } else {
        landscapeWrapper.classList.add('hidden');
        body.classList.remove('no_scroll');
    }
};
