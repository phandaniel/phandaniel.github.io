# Version History Tracker

A collection of dashboards that track version histories and release data.

Currently tracking:
* Operating Systems: Fedora, Ubuntu, Linux Kernel, RHEL, Apple iOS, Android
* Artificial Intelligence: ChatGPT, Claude, Gemini, Grok
* Aerospace: SpaceX Starship, ULA Vulcan, Blue Origin New Glenn
* Developer Tools: Kubernetes, Python
* Sports: Liberty Flames, Commanders, Wizards

## Live Demo
View the live tracking pages at: [https://phandaniel.github.io/](https://phandaniel.github.io/)

## Features
* Automated Data Pipelines: A Python scraper running on GitHub Actions fetches and parses data from Wikipedia daily.
* Data Parsing: A table parser extracts release dates, device support, and status indicators.
* DRY Architecture: CSS and Javascript are modularized in the assets/ directory. Data is stored in the data/ folder.
* UI: Uses a dark theme with status badges and a top navigation menu.
* Zero-Dependency Frontend: Built with vanilla HTML, CSS, and Javascript.

## Directory Structure
```text
/
├── assets/
│   ├── css/style.css
│   └── js/app.js
├── data/
│   └── *.json
├── .github/workflows/
│   └── scrape.yml
├── scraper/
│   └── scraper.py
├── tests/
│   └── test.js
├── release/
│   └── ai/, dev/, linux/, os/, space/, sports/
└── index.html
```

## How it works
1. GitHub Actions runs a daily cron job.
2. It executes scraper.py, which downloads Wikipedia HTML.
3. The script extracts release tables and formats them into JSON.
4. The JSON is written to the data/ directory and committed to the master branch.
5. GitHub Pages hosts the site, and the frontend fetches the JSON data to build the UI.
