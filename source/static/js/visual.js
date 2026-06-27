let currentPath = "";

function drawItemIcon(item) {
    const icon = document.createElement("img");
    const extension = item.name.split(".").pop().toLowerCase();

    if (item.is_dir) {
        icon.src = "assets/icons/files/folder.png";
    } else {
        icon.src = ICON_MAP[extension] ?? "assets/icons/files/file.png";
    }
    
    icon.className = "file-icon";

    return icon;
}

async function drawItemName(item) {
    const nameElement = document.createElement("p");
    nameElement.innerText = item.name;
    nameElement.className = "file-name";

    return nameElement;
}

async function drawItemSize(item) {
    const sizeElement = document.createElement("p");
    sizeElement.innerText = item.is_dir ? "" : `${item.size}`;
    sizeElement.className = "file-size";

    return sizeElement;
}

async function drawItemBox(item) {
    const itemBox = document.createElement("div");
    const itemIcon = await drawItemIcon(item);
    const itemName = await drawItemName(item);
    const itemSize = await drawItemSize(item);

    itemBox.className = "file-item";
    itemBox.onclick = () => {
        if (item.is_dir) {
            loadDirectory(item.path);
        } else {
            window.open(`/api/open_file?path=${encodeURIComponent(item.path)}`, "_blank");
        }
    };

    itemBox.appendChild(itemIcon);
    itemBox.appendChild(itemName);
    itemBox.appendChild(itemSize);
    
    return itemBox;
}

function updateCurrentDirectory(path) {
    const currentDirectory = document.getElementById("current-directory");
    currentDirectory.innerText = path;

    if (currentDirectory.scrollWidth <= currentDirectory.clientWidth) return;

    const sep = path.includes("\\") ? "\\" : "/";
    const parts = path.split(/[\\/]/);

    for (let i = 1; i < parts.length; i++) {
        currentDirectory.innerText = "..." + sep + parts.slice(i).join(sep);
        if (currentDirectory.scrollWidth <= currentDirectory.clientWidth) return;
    }

    currentDirectory.innerText = "..." + sep + parts[parts.length - 1];
}

async function loadDirectory(path) {
    if (searchActive) toggleSearch();
    try {
        const response = await fetch(`/api/get_dir_content?path=${encodeURIComponent(path)}`);
        if (!response.ok) {
            throw new Error("Directory not found");
        }

        const data = await response.json();

        currentPath = data.current_path;
        updateCurrentDirectory(currentPath);

        const container = document.getElementById("file-list");
        container.innerHTML = "";

        for (const item of data.items) {
            const itemBox = await drawItemBox(item);
            container.appendChild(itemBox);
        }
        
        document.getElementById('file-box').scrollTop = 0;
        updateScrollProgress();
    } catch (e) {
        alert(e.message);
    }
}