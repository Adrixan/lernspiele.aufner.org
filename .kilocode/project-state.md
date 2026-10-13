# Project State

## Overview
Educational games website serving kids (Volksschule) and teens with interactive learning games.

## Environment
- Static HTML/CSS/JS website
- Hosted at lernspiele.aufner.org
- PWA-enabled games

## Game Categories

### Kids Games (8)
| Game | Path | Status |
|------|------|--------|
| DaZ | /kids/daz | Active |
| Deutsch | /kids/deutsch | Active |
| Englisch | /kids/englisch | Active |
| Kunst | /kids/kunst | Active |
| Mathematik | /kids/mathematik | Active |
| Musik | /kids/musik | Active |
| Sachunterricht | /kids/sachunterricht | Active |
| Technik | /kids/technik | Active |

### Teens Games (19)
| Game | Path | Status |
|------|------|--------|
| In Memoriam Pascal | /teens/in-memoriam-pascal | Active |
| Venomous Snake | /teens/venomous-snake | Active |
| LinguaFusion | /teens/linguafusion | Active |
| Biologie | /teens/biologie | Active |
| BKO | /teens/bko | Active |
| Chemie | /teens/chemie | Active |
| Deutsch | /teens/deutsch | Active |
| Digitale Grundbildung | /teens/digitale | Active |
| Englisch | /teens/englisch | Active |
| Geographie | /teens/geographie | Active |
| Geschichte | /teens/geschichte | Active |
| Kunst | /teens/kunst | Active |
| Latein | /teens/latein | Active |
| Mathematik | /teens/mathematik | Active |
| Musik | /teens/musik | Active |
| Physik | /teens/physik | Active |
| Religion | /teens/religion | Active |
| Sport | /teens/sport | Active |
| Technik | /teens/technik | Active |

## History

### 2026-10-13
- Landing page rewritten to the "Bioluminescent Night" styleguide (dark default, self-hosted fonts in /fonts, css/site.css, js/site.js, strict CSP meta)
- Fixed garbled text and wrong BKO description on the landing page
- Service workers of the Mini/Maxi Trainer games resolve paths against their scope (offline mode and fresh exercise data work under /kids/* and /teens/*)
- Manifests of the trainer games point to existing SVG icons; Pascal/LinguaFusion manifests use relative start_url
- Trainer games: lang="de", proper subject names for six kids games

### 2026-03-14
- Added "Venomous Snake" game to teens section in index.html

### 2026-03-11
- Updated index.html to match game-list.md structure
- Fixed paths: Kids games now at /kids/*, Teens at /teens/*
- Added all 17 teen games to main landing page
