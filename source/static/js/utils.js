function goUp() {
    if (!currentPath) return;
    const normalized = currentPath.replace(/\\/g, '/');

    if (normalized === BASE_PATH) return;

    const parts = normalized.split('/');
        parts.pop();
        loadDirectory(parts.join('/'));
    }