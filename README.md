<div align="center">

# File Explorer

**A clean, self-hosted web file explorer built with FastAPI + Vanilla JS**

![Python](https://img.shields.io/badge/Python-3.14%2B-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688?style=flat-square&logo=fastapi&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![uv](https://img.shields.io/badge/uv-0.22-DE5FE9?style=flat-square&logo=astral&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

Browse your server filesystem through a minimal, dark-themed web interface — no Electron, no npm, no bloat.

</div>

---

## 📸 Preview

> ![alt-text](https://i.imgur.com/EYk5c8y.png)

---

## ✨ Features

- **Zero-dependency frontend** — pure HTML, CSS and JavaScript, no frameworks
- **FastAPI backend** — fast, async, and easy to extend
- **Dark UI** — easy on the eyes, smooth hover transitions
- **Directory navigation** — click into folders, go back up with one button
- **File preview** — open files in a new tab directly from the browser
- **Smart file sizes** — auto-formatted as KB / MB / GB
- **Security** — all requests are sandboxed to a configurable root directory; directory traversal is blocked at the API level
- **HTML source viewer** — `.html` files are served as plain text so you see source, not a rendered page

---

## 🚀 Quick Start

**Requirements:** Python 3.14+ (verified version)

```bash
# 1. Clone the repo
git clone https://github.com/Defaultik/file-explorer.git
cd file-explorer

# 2. Set your root directory in config.py
#    ALLOWED_DIR = "/your/path/"

# 3. Run
uvicorn main:app --reload
```

Then open **http://localhost:8000** in your browser.

### Installing dependencies
<details><summary>pip</summary>
  
```bash
pip install -r requirements.txt
```
</details>

<details><summary>uv</summary>
  
```bash
uv sync
```
</details>

---

## ⚙️ Configuration

Edit `config.py`:

```python
ALLOWED_DIR = "/your/path/"
```

This is the **only** directory the server will expose. Any request attempting to navigate outside it returns `403 Forbidden`.

---

## 📂 Project Structure

```
file-explorer/
├── main.py          # FastAPI app & API routes
├── config.py        # Root directory config
├── utils.py         # File size formatting
├── index.html       # App shell
├── static/
│   ├── css/
│   │   └── main.css
│   └── js/
│       ├── visual.js   # DOM rendering & directory loading
│       └── utils.js    # Navigation helpers (goUp)
└── assets/
    ├── rsz_folder.png
    └── rsz_file.png
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serves the UI |
| `GET` | `/api/get_dir_content?path=...` | Lists directory contents |
| `GET` | `/api/open_file?path=...` | Serves a file for viewing |
| `GET` | `/api/config` | Allowed directory |

---

## 🛡️ Security Notes

- The server enforces path boundaries using `os.path.abspath()` + `str.startswith(ALLOWED_DIR)` on every request
- No write operations are exposed — this is a **read-only** explorer
- Bind to `127.0.0.1` (default) to keep it local; do **not** expose to a public network without adding authentication

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/cool-thing`
3. Commit your changes: `git commit -m 'Add cool thing'`
4. Push: `git push origin feature/cool-thing`
5. Open a Pull Request

---

<div align="center">
  i'll glad to get a star from you ❤️
</div>
