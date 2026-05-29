# Campaign decks

Drop animated MP4 exports of each campaign deck here. Filenames must match
the campaign slug used in `src/lib/data.ts`:

- upwind.mp4
- dabur.mp4
- lunara.mp4
- preganews.mp4
- vibemate.mp4
- salttree.mp4
- amchi-events.mp4

## How to export from PowerPoint (preserves all animations)

1. Open the .pptx
2. File → Export → Create a Video
3. Set quality to **Full HD (1080p)** or higher
4. Set "Seconds spent on each slide" if your deck doesn't auto-advance
5. Export as MP4 and rename to match the slug above

## Alternative: Canva / Google Slides

If a deck lives on Canva or Google Slides, set `embed` on that campaign
in `src/lib/data.ts` instead of `video` — paste the public embed URL.
