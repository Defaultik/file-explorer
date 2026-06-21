let currentPath = "";

function drawItemIcon(item) {
    const icon = document.createElement("img");
    const extension = item.name.split(".").pop().toLowerCase();

    if (item.is_dir) {
        icon.src = "assets/file_extensions/resized/folder.png";
    } else {
        icon.src = ICON_MAP[extension] ?? "assets/file_extensions/resized/file.png";
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

async function loadDirectory(path) {
    try {
        const response = await fetch(`/api/get_dir_content?path=${encodeURIComponent(path)}`);
        if (!response.ok) {
            throw new Error("Directory not found");
        }

        const data = await response.json();

        currentPath = data.current_path;
        document.getElementById("current-directory").innerText = currentPath;

        const container = document.getElementById("file-list");
        container.innerHTML = "";

        for (const item of data.items) {
            const itemBox = await drawItemBox(item);
            container.appendChild(itemBox);
        }
    } catch (e) {
        alert(e.message);
    }
}