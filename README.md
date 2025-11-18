# gocaving.ai - Landing Page

Official landing page for the **AI in Caving** online discussion series.

## Overview

This site serves as the public entry point for gocaving.ai, a platform dedicated to exploring artificial intelligence, data science, and technology applications in cave exploration.

## Features

- **Email Subscription**: Visitors can subscribe to receive updates about upcoming discussions
- **Upcoming Discussions**: Display scheduled online sessions with dates, times, and join links
- **Past Recordings**: Archive of previous discussion recordings with links to YouTube
- **Feedback Form**: Allow visitors to submit comments, suggestions, and topic requests

## Tech Stack

- **Frontend**: Static HTML with Tailwind CSS (via CDN)
- **Forms**: Netlify Forms (no backend required)
- **Hosting**: Netlify
- **Version Control**: GitHub

## Local Development

### Prerequisites

- A modern web browser
- (Optional) A local web server for testing

### Running Locally

#### Option 1: Open directly in browser
```bash
# Navigate to the project directory
cd gocaving-landing

# Open index.html in your browser
# On Linux/WSL:
explorer.exe index.html
# Or use your browser's File > Open option
```

#### Option 2: Use Python's built-in server
```bash
# Navigate to the project directory
cd gocaving-landing

# Start a local server (Python 3)
python3 -m http.server 8000

# Open in browser
# Visit: http://localhost:8000
```

#### Option 3: Use Node's http-server
```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to the project directory
cd gocaving-landing

# Start server
http-server -p 8000

# Visit: http://localhost:8000
```

## Updating Content

### Adding Upcoming Discussions

Edit `index.html` and locate the "Upcoming Discussions Section" (around line 89). Duplicate a discussion card and update:
- Date and time
- Timezone
- Discussion title
- Description
- Meeting link

### Adding Past Recordings

Edit `index.html` and locate the "Past Recordings Section" (around line 133). Duplicate a recording card and update:
- Recording date
- Title
- Description
- YouTube link
- (Optional) Replace the placeholder with actual YouTube thumbnail

To use actual YouTube thumbnails, replace the SVG placeholder with:
```html
<img src="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
     alt="Video thumbnail"
     class="w-full h-full object-cover">
```

## Deployment

### Deploying to Netlify

1. **Create a GitHub repository**
   ```bash
   cd gocaving-landing
   git init
   git add .
   git commit -m "Initial commit: gocaving.ai landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gocaving-landing.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Log in to [Netlify](https://netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub account
   - Select the `gocaving-landing` repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `/` (root)
   - Click "Deploy site"

3. **Configure Custom Domain**
   - In Netlify dashboard, go to Site settings > Domain management
   - Add custom domain: `gocaving.ai`
   - Follow DNS configuration instructions
   - SSL certificate will be automatically provisioned

4. **Enable Netlify Forms**
   - Forms are automatically detected via `data-netlify="true"` attribute
   - View submissions: Site dashboard > Forms
   - Configure notifications: Forms > Form notifications
   - (Optional) Set up email notifications for new submissions

### Form Submissions

After deployment, you can:
- View all form submissions in the Netlify dashboard
- Export submissions as CSV
- Set up email notifications
- Integrate with Zapier or other services

## File Structure

```
gocaving-landing/
├── index.html          # Main landing page
├── script.js           # JavaScript for interactivity
├── netlify.toml        # Netlify configuration
├── README.md           # This file
├── DESIGN.md           # (Optional) Design documentation
└── assets/
    └── images/         # Logo, icons, images (if needed)
```

## Future Enhancements

### Phase 2 (Backend Integration)
- Dynamic content loading via API
- Database for events and recordings
- Backend on Render (Flask/FastAPI)
- PostgreSQL database

### Phase 3 (Expanded Features)
- AI tools for cavers
- Interactive cave survey visualizations
- Project showcase pages
- Community forum
- User accounts and authentication

## Design Guidelines

### Color Palette
- Background: Slate dark (`#0f172a`, `#1e293b`)
- Primary accent: Emerald (`#10b981`, `#34d399`)
- Text: Light gray (`#e5e7eb`) and muted gray (`#9ca3af`)

### Typography
- Font: System fonts (Tailwind defaults)
- Headings: Bold, with emerald accent colors
- Body: Light gray on dark background

### Components
- Cards: Semi-transparent background with emerald borders
- Hover effects: Subtle lift and border glow
- Border radius: 12px for cards, 8px for inputs
- Responsive: Mobile-first, works on all screen sizes

## Support

For questions, issues, or suggestions:
- Submit feedback via the form on the site
- (Coming soon) GitHub Issues
- Email: (to be added)

## License

Copyright © 2024 gocaving.ai
