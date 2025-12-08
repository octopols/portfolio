# Portfolio

Professional portfolio website showcasing software engineering experience, open-source contributions, and technical projects.

## Overview

A modern, high-performance portfolio built with vanilla JavaScript and advanced CSS animations. Features comprehensive SEO optimization, accessibility compliance, and production-ready security configurations.

**Live Site**: [hirnaymay.com](https://hirnaymay.com)

## Features

- Custom cursor with hover interactions
- Percentage-based preloader animation
- Intersection Observer scroll reveals
- Horizontal scroll sections
- Multi-layer parallax effects
- 3D mouse-tracking card interactions
- Canvas-based particle network
- Full-screen animated navigation
- Photography showcase page

## Technical Stack

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript
- Tailwind CSS
- Lucide Icons

## Project Structure

```
portfolio/
├── index.html           # Main portfolio page
├── photography.html     # Photography showcase
├── css/
│   └── styles.css      # Styles and animations
├── js/
│   └── main.js         # Interactive functionality
├── assets/
│   ├── images/         # Image assets
│   ├── logos/          # Logo files
│   ├── photography/    # Photography collection
│   └── projects/       # Project screenshots
├── docs/               # Documentation and resources
└── .github/
    └── workflows/
        └── deploy.yml  # Automated deployment
```

## Local Development

```bash
git clone https://github.com/octopols/portfolio.git
cd portfolio
python3 -m http.server 8000
```

Visit `http://localhost:8000` in your browser.

## Deployment

The site automatically deploys to GitHub Pages on push to main branch. Custom domain configured via CNAME file.

## Performance

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- SEO Score: 95+

## SEO & Optimization

- Open Graph and Twitter Card metadata
- Structured data (JSON-LD)
- XML sitemap and robots.txt
- Resource preloading and DNS prefetching
- Deferred script loading

## Security

- Content Security Policy headers
- XSS protection
- Clickjacking prevention
- HTTPS enforcement

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Skip links for screen readers
- Reduced motion support
- Semantic HTML structure

## License

See LICENSE file for details.

## Contact

**Hirnaymay Bhaskar**

- Website: [hirnaymay.com](https://hirnaymay.com)
- GitHub: [@octopols](https://github.com/octopols)
- LinkedIn: [hirnaymay](https://linkedin.com/in/hirnaymay)
- Email: hirnaymay@gmail.com
