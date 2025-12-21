import os
import math
import numpy as np
from PIL import Image, ImageFilter
import moviepy as mp

# Config
W, H = 1280, 720
FPS = 60
DELAY_START = 0.25
TRANS_DUR = 1.1
DELAY_END = 0.25
TOTAL_DUR = DELAY_START + TRANS_DUR + DELAY_END
OUT_PATH = os.path.join("output", "logo_morph.mp4")

DISNAKER_PATHS = [
    os.path.join("images", "disnaker.jpg"),
    os.path.join("images", "ikon.png"),
    os.path.join("images", "kecamatan.png"),
]
TIKTOK_LOCAL = os.path.join("images", "tiktok_logo.png")
TIKTOK_REMOTE = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Tiktok_Icon.png"


def ensure_dirs():
    os.makedirs("output", exist_ok=True)
    os.makedirs("images", exist_ok=True)


def try_download_tiktok():
    if os.path.isfile(TIKTOK_LOCAL):
        return
    try:
        import requests
        r = requests.get(TIKTOK_REMOTE, timeout=15)
        if r.status_code == 200:
            with open(TIKTOK_LOCAL, "wb") as f:
                f.write(r.content)
    except Exception:
        pass


def load_first_existing(paths):
    for p in paths:
        if os.path.isfile(p):
            return p
    return None


def ease_in_out_cubic(x):
    return 4*x*x*x if x < 0.5 else 1 - pow(-2*x + 2, 3)/2


def make_glow_clip(img_clip, color=(0, 200, 255), radius=12, strength=0.65):
    # Create blurred glow using PIL on each frame
    def glow_frame(get_frame, t):
        frame = get_frame(t)
        im = Image.fromarray(frame)
        # Create color overlay
        overlay = Image.new("RGBA", im.size, color + (0,))
        # Convert to alpha mask by luminance
        alpha = im.convert("L").filter(ImageFilter.GaussianBlur(radius))
        overlay.putalpha(alpha)
        combined = Image.alpha_composite(im.convert("RGBA"), overlay)
        # Slight extra blur to soften
        combined = combined.filter(ImageFilter.GaussianBlur(radius))
        # Blend original with glow
        final = Image.blend(im.convert("RGBA"), combined, strength)
        return np.array(final.convert("RGB"))
    return img_clip.transform(lambda gf, t: glow_frame(gf, t))


def make_particles(duration):
    rng = np.random.default_rng(42)
    n = 35
    pts = rng.uniform([0, 0], [W, H], size=(n, 2))
    vel = rng.uniform([-20, -10], [20, 10], size=(n, 2))  # px/s
    sizes = rng.integers(2, 5, size=n)
    colors = [(200, 255, 255), (255, 230, 180), (200, 220, 255)]

    def frame(t):
        img = np.zeros((H, W, 3), dtype=np.uint8)
        # Update positions
        for i in range(n):
            x = (pts[i, 0] + vel[i, 0] * t) % W
            y = (pts[i, 1] + vel[i, 1] * t) % H
            r = int(sizes[i])
            c = colors[i % len(colors)]
            # draw small soft particles
            x0 = max(0, int(x - r))
            y0 = max(0, int(y - r))
            x1 = min(W, int(x + r))
            y1 = min(H, int(y + r))
            img[y0:y1, x0:x1] = np.maximum(img[y0:y1, x0:x1], np.array(c, dtype=np.uint8))
        # subtle transparency via mask in Composite
        return img

    return mp.VideoClip(frame_function=frame, duration=duration).with_opacity(0.08)


def main():
    ensure_dirs()
    try_download_tiktok()
    disnaker_path = load_first_existing(DISNAKER_PATHS)
    if not disnaker_path:
        raise FileNotFoundError("Tidak menemukan logo DISNAKER. Tambahkan images/disnaker.jpg atau gunakan images/ikon.png.")
    tiktok_path = TIKTOK_LOCAL if os.path.isfile(TIKTOK_LOCAL) else load_first_existing([os.path.join("images", "ikon.png")])
    if not tiktok_path:
        raise FileNotFoundError("Tidak menemukan logo TikTok. Pastikan images/tiktok_logo.png tersedia.")

    # Base background
    bg = mp.ColorClip((W, H), color=(5, 10, 18)).with_duration(TOTAL_DUR)

    # Load logos
    logo1 = mp.ImageClip(disnaker_path).with_duration(TOTAL_DUR)
    logo2 = mp.ImageClip(tiktok_path).with_duration(TOTAL_DUR)

    # Fit logos to canvas
    def fit_clip(clip, target_w=780, target_h=420):
        w, h = clip.size
        scale = min(target_w / w, target_h / h)
        return clip.resized(scale)

    logo1 = fit_clip(logo1)
    logo2 = fit_clip(logo2)

    # Center positions
    def center_pos(clip):
        cw, ch = clip.size
        return ((W - cw) // 2, (H - ch) // 2)

    # Anim transforms
    def scale1(t):
        if t < DELAY_START:
            return 1.0
        if t > DELAY_START + TRANS_DUR:
            return 0.95
        x = (t - DELAY_START) / TRANS_DUR
        return 1.0 - 0.05 * ease_in_out_cubic(x)

    def rot1(t):
        if t < DELAY_START:
            return 0
        if t > DELAY_START + TRANS_DUR:
            return -3
        x = (t - DELAY_START) / TRANS_DUR
        return -3 * ease_in_out_cubic(x)

    def scale2(t):
        if t < DELAY_START:
            return 0.95
        if t > DELAY_START + TRANS_DUR:
            return 1.0
        x = (t - DELAY_START) / TRANS_DUR
        return 0.95 + 0.05 * ease_in_out_cubic(x)

    def rot2(t):
        if t < DELAY_START:
            return 3
        if t > DELAY_START + TRANS_DUR:
            return 0
        x = (t - DELAY_START) / TRANS_DUR
        return 3 - 3 * ease_in_out_cubic(x)

    # Alpha masks for crossfade with easing and delays
    def alpha1(t):
        if t < DELAY_START:
            return 1.0
        if t > DELAY_START + TRANS_DUR:
            return 0.0
        return 1.0 - ease_in_out_cubic((t - DELAY_START) / TRANS_DUR)

    def alpha2(t):
        if t < DELAY_START:
            return 0.0
        if t > DELAY_START + TRANS_DUR:
            return 1.0
        return ease_in_out_cubic((t - DELAY_START) / TRANS_DUR)

    mask1 = mp.VideoClip(lambda t: np.full((H, W), alpha1(t), dtype=np.float32), is_mask=True).with_duration(TOTAL_DUR)
    mask2 = mp.VideoClip(lambda t: np.full((H, W), alpha2(t), dtype=np.float32), is_mask=True).with_duration(TOTAL_DUR)

    # Apply transforms
    logo1_anim = (logo1
                  .rotated(lambda t: rot1(t))
                  .resized(lambda t: scale1(t))
                  .with_position(lambda t: center_pos(logo1.resized(scale1(t))))
                  .with_mask(mask1))
    logo2_anim = (logo2
                  .rotated(lambda t: rot2(t))
                  .resized(lambda t: scale2(t))
                  .with_position(lambda t: center_pos(logo2.resized(scale2(t))))
                  .with_mask(mask2))

    # Glow layers
    glow1 = make_glow_clip(logo1_anim.with_duration(TOTAL_DUR), color=(0, 180, 140), radius=10, strength=0.4).with_opacity(0.35)
    glow2 = make_glow_clip(logo2_anim.with_duration(TOTAL_DUR), color=(255, 0, 85), radius=10, strength=0.4).with_opacity(0.35)

    # Particles subtle
    particles = make_particles(TOTAL_DUR)

    comp = mp.CompositeVideoClip([bg, particles, glow1, glow2, logo1_anim, logo2_anim], size=(W, H))

    comp.write_videofile(
        OUT_PATH,
        fps=FPS,
        codec="libx264",
        preset="medium",
        bitrate="3000k",
        audio=False
    )


if __name__ == "__main__":
    main()
