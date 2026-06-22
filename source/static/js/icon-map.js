const ICON_BASE = "assets/file_extensions/resized/";

const ICONS = {
    picture:     ICON_BASE + "picture.png",
    gif:         ICON_BASE + "gif.png",
    video:       ICON_BASE + "video.png",
    pdf:         ICON_BASE + "pdf.png",
    doc:         ICON_BASE + "doc.png",
    spreadsheet: ICON_BASE + "spreadsheet.png",
    code:        ICON_BASE + "code.png",
    archive:     ICON_BASE + "archive.png",
};

const ICON_MAP = {
    // Images
    "png":    ICONS.picture,
    "jpg":    ICONS.picture,
    "jpeg":   ICONS.picture,
    "bmp":    ICONS.picture,
    "gif":    ICONS.gif,

    // Videos
    "mp4":    ICONS.video,
    "mov":    ICONS.video,
    "mkv":    ICONS.video,
    "avi":    ICONS.video,

    // Documents
    "pdf":    ICONS.pdf,
    "doc":    ICONS.doc,
    "docx":   ICONS.doc,
    "odt":    ICONS.doc,

    "xlsx":   ICONS.spreadsheet,
    "csv":    ICONS.spreadsheet,

    // Programming Languages
    "py":     ICONS.code,
    "pyw":    ICONS.code,
    "pyc":    ICONS.code,
    "js":     ICONS.code,
    "ts":     ICONS.code,
    "java":   ICONS.code,
    "c":      ICONS.code,
    "h":      ICONS.code,
    "cpp":    ICONS.code,
    "hpp":    ICONS.code,
    "cs":     ICONS.code,
    "go":     ICONS.code,
    "rs":     ICONS.code,
    "swift":  ICONS.code,
    "kt":     ICONS.code,
    "rb":     ICONS.code,
    "php":    ICONS.code,
    "html":   ICONS.code,
    "css":    ICONS.code,
    "sh":     ICONS.code,
    "ps1":    ICONS.code,
    "bat":    ICONS.code,
    "cmd":    ICONS.code,
    "lua":    ICONS.code,
    "asm":    ICONS.code,

    // Archive Formats
    "zip":    ICONS.archive,
    "rar":    ICONS.archive,
    "tar":    ICONS.archive,
    "gz":     ICONS.archive,
    "tar.gz": ICONS.archive,
    "7z":     ICONS.archive,
};