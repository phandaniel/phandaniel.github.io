# Version History Tracker

A sleek, automated, and dynamic set of tracking dashboards that provide up-to-date version histories and release data for major tech ecosystems. 

Currently tracking:
- **Fedora Linux**
- **Ubuntu Linux**
- **Linux Kernel**
- **Apple iOS**
- **SpaceX Starship Launches**

## 🚀 Live Demo
View the live tracking pages at: [https://phandaniel.github.io/](https://phandaniel.github.io/)

## ✨ Features
- **Automated Data Pipelines**: A custom Python scraper running on GitHub Actions seamlessly fetches and parses raw data directly from Wikipedia every single day.
- **Robust Data Parsing**: Equipped with a custom intelligent table parser that tracks merged `rowspan` and `colspan` HTML elements to perfectly extract chronological release dates, device support, and status indicators.
- **DRY Architecture**: Engineered using strict "Don't Repeat Yourself" principles. CSS and Javascript are highly modularized inside the `assets/` directory, while dynamic data rests cleanly in the `data/` folder.
- **Modern UI**: Designed with a sleek, dark-mode glassmorphism aesthetic, complete with dynamic status badges, micro-animations, and a unified top-right dropdown navigation menu.
- **Zero-Dependency Frontend**: The UI is built with purely vanilla HTML, CSS, and Javascript. No massive frameworks required.

## 📁 Directory Structure
```text
/
├── assets/
│   ├── css/style.css       # Unified glassmorphism styling
│   └── js/app.js           # Dynamic navigation and utility functions
├── data/
│   └── *.json              # Daily auto-generated raw data payloads
├── .github/workflows/
│   └── scrape.yml          # GitHub Actions cron automation
├── scraper.py              # The core Python Wikipedia scraping engine
└── *.html                  # Individual frontend tracking dashboards
```

## 🛠️ How it works
1. **GitHub Actions** spins up an environment daily.
2. It executes `scraper.py`, which pulls down Wikipedia's raw HTML.
3. The script isolates the relevant release tables and intelligently formats them into clean JSON structures.
4. The JSON is written to the `data/` directory and automatically pushed back to the `master` branch.
5. GitHub Pages deploys the updated data, which the frontend fetches asynchronously to dynamically build the user interface!
