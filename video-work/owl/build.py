"""Owl clips for the video: native-fps frames, background removed, hole-filled, 960px webp."""
import json, os, subprocess, tempfile, urllib.request, glob
import numpy as np
from PIL import Image
from rembg import remove, new_session
from scipy.ndimage import binary_fill_holes
D = os.path.dirname(os.path.abspath(__file__))
jobs = json.load(open(os.path.join(D, '..', '..', 'landing-pages', 'haamit-finance', 'anim', 'jobs.json')))
want = ['hero', 'calc', 'pain', 'contact', 'fee']
sess = new_session('isnet-general-use')
meta = {}
for name in want:
    url = jobs[name]['url']
    tmp = tempfile.mkdtemp()
    src = os.path.join(tmp, 'v.mp4'); urllib.request.urlretrieve(url, src)
    fps = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=r_frame_rate', '-of', 'csv=p=0', src], capture_output=True, text=True).stdout.strip()
    a, b = fps.split('/'); fps = float(a) / float(b)
    subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vf', "crop='min(iw,ih)':'min(iw,ih)'", os.path.join(tmp, '%04d.png')], check=True)
    out = os.path.join(D, name); os.makedirs(out, exist_ok=True)
    files = sorted(glob.glob(os.path.join(tmp, '*.png')))
    for i, f in enumerate(files):
        im = Image.open(f).convert('RGB')
        m = np.array(remove(im, session=sess, only_mask=True, post_process_mask=True))
        solid = binary_fill_holes(m > 128)
        m = np.where(solid & (m < 255), 255, m).astype('uint8')
        cut = im.copy(); cut.putalpha(Image.fromarray(m))
        cut.resize((960, 960), Image.LANCZOS).save(os.path.join(out, f'{i:03d}.webp'), 'WEBP', quality=88)
    meta[name] = {'frames': len(files), 'fps': fps}
    print(name, len(files), fps, flush=True)
json.dump(meta, open(os.path.join(D, 'meta.json'), 'w'), indent=1)
