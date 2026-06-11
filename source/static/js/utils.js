function prevDir() {
    if (!currentPath) return;

    const normalized = currentPath.replace(/\\/g, '/').replace(/\/$/, '');
    const basePath = BASE_PATH.replace(/\\/g, '/').replace(/\/$/, '');

    if (normalized === basePath) return;

    const lastSlash = normalized.lastIndexOf('/');
    if (lastSlash < 0) return;

    loadDirectory(normalized.substring(0, lastSlash));
}