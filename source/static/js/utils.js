let searchActive = false;

function toggleSearch() {
    const dir = document.getElementById('current-directory');
    const input = document.getElementById('search-input');
    const btn = document.getElementById('search-button');

    searchActive = !searchActive;

    if (searchActive) {
        dir.style.opacity = '0';
        input.style.opacity = '1';
        input.style.pointerEvents = 'auto';
        input.value = '';
        btn.classList.add('active');
        setTimeout(() => input.focus(), 300);
    } else {
        dir.style.opacity = '1';
        input.style.opacity = '0';
        input.style.pointerEvents = 'none';
        btn.classList.remove('active');
        filterFiles('');
    }
}

function filterFiles(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('.file-item').forEach(item => {
        const name = item.querySelector('.file-name').textContent.toLowerCase();
        item.style.display = (!q || name.startsWith(q)) ? '' : 'none';
    });
}

function prevDir() {
    if (!currentPath) return;

    const normalized = currentPath.replace(/\\/g, '/').replace(/\/$/, '');
    const basePath = BASE_PATH.replace(/\\/g, '/').replace(/\/$/, '');

    if (normalized === basePath) return;

    const lastSlash = normalized.lastIndexOf('/');
    if (lastSlash < 0) return;

    loadDirectory(normalized.substring(0, lastSlash));
}

function copyCurrentPath() {
    if (!currentPath) return;
    navigator.clipboard.writeText(currentPath);

    const btn = document.getElementById('copy-button');
    btn.classList.remove('copied');
    void btn.offsetWidth;
    btn.classList.add('copied');

    btn.addEventListener('animationend', () => btn.classList.remove('copied'), { once: true });
}