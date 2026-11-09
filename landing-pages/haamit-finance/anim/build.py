import json, os, subprocess, urllib.request, glob, shutil
from PIL import Image
from rembg import remove, new_session
base = os.path.dirname(os.path.abspath(__file__))
jobs = json.load(open(os.path.join(base, 'jobs.json')))
sess = new_session('isnet-general-use')
manifest_path = os.path.join(base, 'manifest.json')
manifest = json.load(open(manifest_path)) if os.path.exists(manifest_path) else {}
for name, job in jobs.items():
    if manifest.get(name, {}).get('src') == job['url']:
        continue
    out = os.path.join(base, name); shutil.rmtree(out, ignore_errors=True)
    os.makedirs(out + '/d'); os.makedirs(out + '/m')
    tmp = f'/tmp/{name}'; shutil.rmtree(tmp, ignore_errors=True); os.makedirs(tmp)
    urllib.request.urlretrieve(job['url'], tmp + '/v.mp4')
    fps = job.get('fps', 12)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', tmp + '/v.mp4', '-vf', f'fps={fps}', tmp + '/f%03d.png'], check=True)
    frames = sorted(glob.glob(tmp + '/f*.png'))
    for i, f in enumerate(frames):
        im = Image.open(f).convert('RGB')
        cut = remove(im, session=sess, post_process_mask=True)
        cut.resize((job.get('d', 720),) * 2, Image.LANCZOS).save(f'{out}/d/{i:03d}.webp', 'WEBP', quality=82, method=6)
        cut.resize((job.get('m', 360),) * 2, Image.LANCZOS).save(f'{out}/m/{i:03d}.webp', 'WEBP', quality=78, method=6)
    manifest[name] = {'src': job['url'], 'frames': len(frames)}
    print(name, len(frames))
json.dump(manifest, open(manifest_path, 'w'), indent=1)
