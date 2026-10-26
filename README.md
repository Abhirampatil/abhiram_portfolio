# Abhiram Patil: 3D Portfolio (React + Vite + Three.js)

A single-screen interactive room. Loading screen, then Start. Drag to look around, click objects (or use the bottom dock) to open Projects, About, Skills and Contact. Custom cursor on desktop.

## Run
    npm install
    npm run dev          # open the printed URL (http://localhost:5173)
    npm run build        # production build into dist/
    npm run preview      # test the production build

## Edit
- Content (projects, skills, links): `src/data/content.js`
- Resume: replace `public/resume.pdf`
- 3D scene and colors: `src/three/Scene.jsx`
- Cursor: `src/components/Cursor.jsx`, styles in `src/styles/global.css`

## Deploy (Vercel)
Push to GitHub, import the repo on vercel.com. Framework Vite, build `npm run build`, output `dist`.
## Deploy (GitHub Pages)
`npm run build` then `npx gh-pages -d dist`; set Pages source to the gh-pages branch. Paths are relative, so any repo name works.
