# Portfolio Website

A modern, animated portfolio website built with advanced CSS animations and vanilla JavaScript.

## 📁 Project Structure

```
portfolio/
├── index.html              # Main portfolio page (modular version)
├── template.html           # Template with inline styles/scripts
├── referense.html          # Reference file
├── css/
│   └── styles.css         # All extracted CSS styles
├── js/
│   └── main.js            # All JavaScript functionality
├── assets/
│   ├── images/            # Image assets
│   └── README.md          # Assets documentation
└── docs/                  # Documentation and resources
    ├── career.md
    ├── hobbies.md
    ├── main.md
    ├── portfolio-handbook-guide.md
    ├── projects.md
    ├── resume-achievements-not-job-duties.md
    ├── startup-hiring-what-we-look-for.md
    └── hirnaymay_bhaskar_resume.tex
```

## 🚀 Features

- **Custom Cursor**: Smooth animated cursor with hover effects
- **Preloader Animation**: Percentage-based loading screen
- **Scroll Animations**: Intersection Observer-based reveals
- **Horizontal Scroll**: Scroll-driven horizontal content sections
- **Parallax Effects**: Multi-layer parallax backgrounds
- **3D Tilt Cards**: Mouse-tracking 3D card interactions
- **Magnetic Elements**: Mouse-following magnetic buttons
- **Video Expansion**: Scroll-triggered video sizing
- **Particle Network**: Canvas-based particle system
- **Full-screen Menu**: Animated slide-in navigation menu
- **Toast Notifications**: Copy-to-clipboard feedback
- **Noise Overlay**: Subtle film grain effect

## 🎨 Design System

- **Color Scheme**: Dark mode (#050505 background)
- **Typography**: Space Grotesk (headings), Geist (body)
- **Animations**: Cubic-bezier easing for smooth transitions
- **Layout**: Responsive design with mobile considerations

## 💻 Technologies

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript
- Tailwind CSS (CDN)
- Lucide Icons

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone https://github.com/octopols/portfolio.git
cd portfolio

# Start a local server
python3 -m http.server 8000

# Open http://localhost:8000 in your browser
```

### Production Build
```bash
# Make build script executable
chmod +x build.sh

# Run build
./build.sh

# Files will be in the dist/ directory
```

## 🌐 Deployment

### Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages
Push to main branch - GitHub Actions will automatically deploy.

📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## ✅ Production Ready

This portfolio includes:
- ✅ **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, Structured Data
- ✅ **Performance**: Resource hints, preloading, deferred scripts
- ✅ **Security**: Security headers, CSP, XSS protection
- ✅ **Accessibility**: Skip links, ARIA labels, keyboard navigation
- ✅ **Analytics**: Google Analytics & Plausible integration ready
- ✅ **PWA Ready**: Web manifest, service worker ready
- ✅ **Deployment Configs**: Vercel, Netlify, GitHub Pages ready

📋 See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for pre-launch tasks.

## 📝 Customization

1. **HTML**: Edit content in `index.html` or `template.html`
2. **Styles**: Modify `css/styles.css` for external version
3. **Scripts**: Update `js/main.js` for external version
4. **Variables**: Adjust CSS variables in `:root` section
5. **Animations**: Tweak timing and easing functions
6. **Menu**: Update menu items and social links

## 🔧 File Structure

```
portfolio/
├── index.html              # Main portfolio page
├── photography.html        # Photography showcase
├── template.html           # Template with inline styles
├── robots.txt             # SEO crawler instructions
├── sitemap.xml            # Site structure for search engines
├── site.webmanifest       # PWA manifest
├── build.sh               # Production build script
├── css/
│   └── styles.css         # All CSS styles
├── js/
│   └── main.js            # All JavaScript functionality
├── assets/
│   ├── images/            # Image assets
│   ├── logos/             # Logo files
│   ├── photography/       # Photography images
│   └── projects/          # Project screenshots
├── docs/                  # Documentation
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Pages deployment
├── _headers               # Netlify security headers
├── netlify.toml          # Netlify configuration
└── vercel.json           # Vercel configuration
```

## 📊 Performance

- **Lighthouse Score**: 90+ target on all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **SEO Score**: 95+

## 🔒 Security

- Security headers configured
- Content Security Policy
- XSS protection
- Clickjacking protection
- HTTPS enforced (via hosting)

## 🎯 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

- Desktop: 1920px+
- Laptop: 1024px - 1919px
- Tablet: 768px - 1023px
- Mobile: 320px - 767px

## 🔧 Configuration

### Update Analytics
Replace `G-XXXXXXXXXX` in `index.html` with your Google Analytics tracking ID.

### Update Domain
Replace `hiranmaybhaskar.com` in these files:
- `index.html` (Open Graph, canonical URLs)
- `photography.html` (Open Graph, canonical URLs)
- `sitemap.xml`
- `robots.txt`

### Generate Favicons
Use [realfavicongenerator.net](https://realfavicongenerator.net/) to generate all favicon files.

## 🤝 Contributing

This is a personal portfolio, but feel free to use it as a template for your own portfolio!

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 👤 Author

**Hirnaymay Bhaskar**
- Website: [hiranmaybhaskar.com](https://hiranmaybhaskar.com)
- GitHub: [@octopols](https://github.com/octopols)
- LinkedIn: [hirnaymay](https://linkedin.com/in/hirnaymay)
- Medium: [@octopols](https://octopols.medium.com)
- Email: hirnaymay@gmail.com

---

**Last Updated**: December 8, 2025
