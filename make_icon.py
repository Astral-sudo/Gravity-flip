from PIL import Image, ImageDraw
import os
os.makedirs("assets", exist_ok=True)

def vgrad(w, h, c1, c2):
    g = Image.new("RGB", (1, h))
    for y in range(h):
        t = y / (h - 1)
        g.putpixel((0, y), tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)))
    return g.resize((w, h))

def cube(sz, rot=0):
    s = sz * 3
    body = vgrad(s, s, (255, 214, 63), (255, 140, 28)).convert("RGBA")
    m = Image.new("L", (s, s), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, s - 1, s - 1), int(s * .28), fill=255)
    out = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    out.paste(body, (0, 0), m)
    d = ImageDraw.Draw(out)
    o = int(s * .03)
    d.rounded_rectangle((o, o, s - o - 1, s - o - 1), int(s * .26), outline=(255, 255, 255, 230), width=int(s * .045))
    for ex in (.32, .68):
        x, y, r = int(s * ex), int(s * .42), int(s * .095)
        d.ellipse((x - r, y - r, x + r, y + r), fill="white")
        r2 = int(r * .55)
        d.ellipse((x - r2 + int(r * .2), y - r2, x + r2 + int(r * .2), y + r2), fill=(20, 20, 30))
    d.arc((int(s * .28), int(s * .5), int(s * .72), int(s * .8)), 20, 160, fill=(40, 30, 30), width=int(s * .05))
    out = out.resize((sz, sz), Image.LANCZOS)
    if rot:
        out = out.rotate(rot, expand=True, resample=Image.BICUBIC)
    return out

def bg(S):
    im = vgrad(S, S, (124, 92, 255), (255, 106, 213)).convert("RGBA")
    ov = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    b = int(S * .07)
    d.rectangle((0, int(S * .16), S, int(S * .16) + b), fill=(255, 255, 255, 70))
    d.rectangle((0, int(S * .77), S, int(S * .77) + b), fill=(255, 255, 255, 70))
    for i in range(5):
        x = int(S * (.08 + i * .2))
        d.polygon([(x, int(S * .77)), (x + int(S * .06), int(S * .69)), (x + int(S * .12), int(S * .77))], fill=(255, 84, 112, 200))
    im.alpha_composite(ov)
    return im

def put(base, img):
    base.alpha_composite(img, ((base.width - img.width) // 2, (base.height - img.height) // 2))

S = 1024
icon = bg(S); put(icon, cube(430, -14)); icon.convert("RGB").save("assets/icon-only.png")
fg = Image.new("RGBA", (S, S), (0, 0, 0, 0)); put(fg, cube(400, -14)); fg.save("assets/icon-foreground.png")
bg(S).convert("RGB").save("assets/icon-background.png")
sp = vgrad(2732, 2732, (14, 20, 51), (27, 42, 90)).convert("RGBA"); put(sp, cube(700, -14))
sp = sp.convert("RGB"); sp.save("assets/splash.png"); sp.save("assets/splash-dark.png")
  
