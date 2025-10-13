# MathExercisesWeb — NRB Codeworks (Web Port)

This repository contains a web port of your `MathExercises.java` console tool.  
Features include multi-variable solvers (kinematics, projectile), a full trig evaluator (including inverse functions), triangle solver, shape calculators, math quiz, number guessing, and utilities.

## Files
- `index.html` — main page
- `style.css` — dark theme + typing animation styles
- `script.js` — all logic (solvers, games, typing)
- `README.md` — this file

## How to publish on GitHub Pages (beginner-friendly)
1. Create a GitHub account at https://github.com (if you don't have one).
2. Click the green **New** button on your repositories page.
3. Name the repo `MathExercisesWeb` (or whatever you like), set visibility to Public, and click **Create repository**.
4. On the repository page, click **Add file → Upload files**, drag & drop the four files (`index.html`, `style.css`, `script.js`, `README.md`) and click **Commit changes**.
5. Enable Pages:
   - Go to **Settings → Pages**.
   - Under **Build and deployment**, set **Branch** to `main` (or `master`) and **Folder** to `/ (root)`.
   - Click **Save**.
6. GitHub will provide a URL like `https://<your-username>.github.io/MathExercisesWeb/`. It can take a minute to publish.

## Local testing
1. Download the repo as ZIP (Code → Download ZIP) or clone it with Git.
2. Open `index.html` in your browser. (No server required.)
3. For development you can use a simple HTTP server (recommended):
   - Python 3: `python -m http.server 8000`
   - Visit `http://localhost:8000` in your browser.

## Next steps I can help with
- Porting every remaining Java function (energy menus, more physics calculators, chemistry helpers).
- Adding unit tests for the math functions.
- Improving UI: animations, responsive layout, detailed forms for each calculator.
- Setting up a Git workflow using Git CLI or GitHub Desktop.

---

If you want, I can now:
- create a GitHub repo for you (I can't operate your account, but I can provide exact commands or a step-by-step with screenshots),
- or give the exact git commands to run locally to push the project (copy + paste).
Tell me which you prefer and I’ll provide the step-by-step commands.
