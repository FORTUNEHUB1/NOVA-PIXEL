import os
import re

used_files = set()
for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.css', '.html')):
            with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                content = f.read()
                matches = re.findall(r'[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|gif|webp|svg|mp4|webm)', content)
                used_files.update(matches)

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
    matches = re.findall(r'[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|gif|webp|svg|mp4|webm)', content)
    used_files.update(matches)

print("Used files:", used_files)

media_dirs = ['src/assets', 'src/assets/images', 'public', '.']
deleted_count = 0
for d in media_dirs:
    if not os.path.isdir(d) and d != '.': continue
    for file in os.listdir(d):
        if not file.endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.webm')):
            continue
        if file not in used_files:
            filepath = os.path.join(d, file)
            print(f"Deleting {filepath}")
            os.remove(filepath)
            deleted_count += 1

print(f"Deleted {deleted_count} files.")
