"""One continuous owl performance: concat the 4 chained clips, remove background (parallel), 960px webp at native fps."""
import json, os, subprocess, tempfile, urllib.request, glob
from multiprocessing import Pool
D = os.path.dirname(os.path.abspath(__file__))
urls = [l.strip() for l in open(os.path.join(D, 'full_urls.txt')) if l.strip()]
OUT = os.path.join(D, 'full'); os.makedirs(OUT, exist_ok=True)

def init():
    global sess, remove, np, Image, fill
    import numpy as np, PIL.Image as Image
    from rembg import remove, new_session
    from scipy.ndimage import binary_fill_holes as fill
    sess = new_session('isnet-general-use')

def work(a):
    i, f = a
    im = Image.open(f).convert('RGB')
    m = np.array(remove(im, session=sess, only_mask=True, post_process_mask=True))
    s = fill(m > 128); m = np.where(s & (m < 255), 255, m).astype('uint8')
    im.putalpha(Image.fromarray(m))
    im.resize((960, 960), Image.LANCZOS).save(os.path.join(OUT, f'{i:04d}.webp'), 'WEBP', quality=86)

if __name__ == '__main__':
    tmp = tempfile.mkdtemp(); parts = []
    for k, u in enumerate(urls):
        p = os.path.join(tmp, f'p{k}.mp4'); urllib.request.urlretrieve(u, p); parts.append(p)
    lst = os.path.join(tmp, 'l.txt'); open(lst, 'w').write(''.join(f"file '{p}'\n" for p in parts))
    # normalise every part to 24fps square before joining; drop the duplicated first frame of parts 2..n
    fr = os.path.join(tmp, 'f'); os.makedirs(fr)
    n = 0
    for k, p in enumerate(parts):
        d = os.path.join(tmp, f'x{k}'); os.makedirs(d)
        subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-vf', "fps=24,crop='min(iw,ih)':'min(iw,ih)',scale=1080:1080", os.path.join(d, '%05d.png')], check=True)
        fs = sorted(glob.glob(os.path.join(d, '*.png')))
        if k > 0: fs = fs[1:]
        for f in fs:
            os.rename(f, os.path.join(fr, f'{n:05d}.png')); n += 1
    files = sorted(glob.glob(os.path.join(fr, '*.png')))
    with Pool(4, initializer=init) as pool:
        pool.map(work, list(enumerate(files)), chunksize=8)
    json.dump({'full': {'frames': len(files), 'fps': 24.0}}, open(os.path.join(D, 'meta_full.json'), 'w'))
    print('frames', len(files))
