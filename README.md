# Elevyx

Elevyx is a static marketing landing page for an automation agency focused on lead handling and workflow automation.

## Implemented Features

- Hero section with centered messaging and CTA
- Animated background orbit canvas (`bg-orbits`)
- Service timeline cards and workflow strip
- Testimonial marquee
- About and trust sections
- Book-a-call modal that builds a `mailto:` request
- Responsive navigation with active link highlighting
- Scroll animations via GSAP + ScrollTrigger
- Optional embedded chat widget loader script (Texterz)

## Deployment

- `CNAME` is configured for custom domain: `elevyx.in`

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- GSAP + ScrollTrigger

## Project Structure

- `index.html`
- `styles.css`
- `script.js`
- `CNAME`

## Local Run

```bash
python -m http.server 5500
```

Open `http://127.0.0.1:5500`.

## Notes

- This is a frontend-only site.
- The book-a-call form opens the user email client; there is no server-side form processing in this repo.

