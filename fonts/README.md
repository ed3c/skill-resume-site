# Display font fallback

The page loads `BubbledotICG-FinePos` from the CDN specified in `index.html`.

`Geist Pixel Circle` is an optional local fallback. This repository does not distribute the font binary. A browser that already has the font installed can use it through `local("Geist Pixel Circle")`; otherwise the stack falls back to `monospace`.

Expected display stack:

```css
"BubbledotICG-FinePos", "Geist Pixel Circle", monospace
```
