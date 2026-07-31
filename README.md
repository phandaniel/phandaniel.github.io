# Phantom Telemetry

A collection of dashboards that track version histories, sports schedules, and release data.

Currently tracking:
* Operating Systems: Windows 11, macOS, iOS, Android, Fedora, Ubuntu, RHEL
* Artificial Intelligence: ChatGPT, Claude, Gemini, Grok
* Aerospace: SpaceX Starship, ULA Vulcan, Blue Origin New Glenn
* Developer Tools: Kubernetes, Python
* Sports: UFC 329, 2026 US Track & Field, Liberty Flames, Commanders, Washington Wizards

## Live Demo
View the live tracking pages at: [https://phandaniel.github.io/](https://phandaniel.github.io/)

## Features
* Automated Data Pipelines: Python scrapers (`scraper.py`, `parse_track.py`, `parse_ufc.py`) running on GitHub Actions fetch and parse data from Wikipedia daily.
* Data Parsing: Scripts extract release dates, device support, game scores, combat sports outcomes, and status indicators.
* DRY Architecture: Boilerplate HTML has been virtually eliminated. CSS and Javascript logic are centralized in the `assets/` directory (with `app.js` generating all UI structures dynamically). Data is cleanly separated in the `data/` folder.
* UI: Uses a sleek dark theme with status badges, dynamic dropdown menus, sticky headers, and responsive layouts.
* Zero-Dependency Frontend: Built strictly with vanilla HTML, CSS, and Javascript.
* Automated Testing: Includes a Puppeteer regression test suite for layout validation and data integrity checks.

## Directory Structure
```text
/
├── assets/
│   ├── css/style.css
│   └── js/app.js, categories.js, render*.js
├── data/
│   └── *.json
├── .github/workflows/
│   └── scrape.yml, deploy.yml
├── scraper/
│   └── scraper.py, parse_track.py, parse_ufc.py
├── tests/
│   └── test.js
├── release/
│   └── ai/, dev/, linux/, os/, space/, sports/
└── index.html
```

## How it works
1. GitHub Actions runs a daily cron job.
2. It executes the Python scraper scripts, which download HTML pages from Wikipedia and other sources.
3. The scripts extract tables, schedules, and event results, formatting them into normalized JSON.
4. The JSON files are written to the `data/` directory and committed back to the repository.
5. GitHub Pages hosts the static site, and the frontend uses `fetch` to asynchronously load the JSON data and build the UI dynamically.
