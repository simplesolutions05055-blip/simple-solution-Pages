"""Downloads the page's Kolbo-hosted media into this folder (runs in GitHub Actions)."""
import os, subprocess, urllib.request
from PIL import Image
D = os.path.dirname(os.path.abspath(__file__))
for line in open(os.path.join(D, 'list.txt')):
    line = line.strip()
    if not line: continue
    name, url = line.split(None, 1)
    raw = os.path.join(D, '_' + name + os.path.splitext(url)[1])
    urllib.request.urlretrieve(url, raw)
    if url.endswith('.mp4'):
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-an', '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', os.path.join(D, name + '.mp4')], check=True)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', os.path.join(D, name + '.mp4'), '-frames:v', '1', '-q:v', '4', os.path.join(D, name + '-poster.jpg')], check=True)
    else:
        im = Image.open(raw).convert('RGBA')
        if im.width > 900: im = im.resize((900, round(im.height * 900 / im.width)), Image.LANCZOS)
        im.save(os.path.join(D, name + '.webp'), 'WEBP', quality=86, method=6)
    os.remove(raw)
    print('ok', name)
