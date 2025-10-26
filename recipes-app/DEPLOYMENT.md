# Deployment Guide

Your recipe app has been built as a static site and is ready for deployment!

## 📁 Build Output

The static files are in the `build/` folder:
```
build/
├── index.html              # Homepage with recipe list
├── recipe/
│   ├── dampfnudeln.html    # Individual recipe pages
│   ├── kartoffelsuppe.html
│   └── kuchen-schokostueckchen.html
├── _app/                   # JavaScript and CSS assets
└── __data.json            # Recipe data
```

## 🚀 Deployment Options

### Option 1: Simple Web Server Upload
1. **Upload the entire `build/` folder** to your web server
2. Point your domain to the `build/` folder as the document root
3. Done! Your recipes will be accessible at your domain

### Option 2: FTP/SFTP Upload
```bash
# Upload everything in the build folder to your web server
scp -r build/* username@yourserver.com:/path/to/web/root/
```

### Option 3: Using cPanel File Manager
1. Zip the contents of the `build/` folder
2. Upload the zip to your web hosting via cPanel
3. Extract it to your `public_html` or equivalent folder

## 🔧 Web Server Configuration

### Apache (.htaccess)
No special configuration needed - all files are static!

### Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/your/build/folder;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }
}
```

## 📝 Adding New Recipes

To add new recipes:

1. **Add new `.md` file** to the `recipes/` folder
2. **Update prerender entries** in `svelte.config.js`:
   ```js
   prerender: {
       entries: [
           '*',
           '/recipe/dampfnudeln',
           '/recipe/kartoffelsuppe', 
           '/recipe/kuchen-schokostueckchen',
           '/recipe/your-new-recipe'  // Add this line
       ],
       // ...
   }
   ```
3. **Rebuild**: `npm run build`
4. **Upload** the new `build/` folder contents

## 🔄 Automation Script

Create a `deploy.bat` (Windows) or `deploy.sh` (Linux/Mac) script:

```bash
#!/bin/bash
echo "Building recipe app..."
npm run build

echo "Uploading to server..."
scp -r build/* username@yourserver.com:/path/to/web/root/

echo "Deployment complete!"
```

## ✅ Verification

After deployment, check:
- [ ] Homepage loads with all recipes listed
- [ ] Individual recipe pages load correctly
- [ ] Navigation between pages works
- [ ] Styling and layout appear correctly

Your recipe app is now live! 🎉