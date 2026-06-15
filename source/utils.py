TEXT_EXTENSIONS = {".html", ".py", ".js", ".css", ".txt", ".md", ".json", ".xml", ".csv"}

def calculate_size(size: int) -> str:
    if size < 1024 ** 2:
        return f"{size / 1024:.2f} KB"
    elif size < 1024 ** 3:
        return f"{size / (1024 ** 2):.2f} MB"
    else:
        return f"{size / (1024 ** 3):.2f} GB"