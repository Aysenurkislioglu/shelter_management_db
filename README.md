# Happy Paws — Learn SQL at the Animal Shelter

An interactive, browser-based SQL learning game set inside a real animal shelter database. Write SQL queries to help rescue animals find their forever homes — no installation required.

**Live demo:** https://6hearts1mission.github.io/happy-paws/

---

## What is it?

Happy Paws puts you in the role of a new volunteer at **PawShelter**, a rescue organisation with branches in Istanbul, Ankara, and Izmir. To help the shelter run better, you answer real operational questions by writing SQL — finding available pets, generating reports, joining tables, and more.

Everything runs entirely in the browser using [sql.js](https://github.com/sql-js/sql.js) (SQLite compiled to WebAssembly). There is no backend, no sign-up, and no data ever leaves your device.

---

## Features

- **15 missions across 6 levels** — from basic SELECT to multi-table JOINs
- **Real database** — 21 shelter pets, staff, adopters, medical reports, photos
- **Progressive level locking** — complete a level to unlock the next
- **Hint system** — one hint per challenge; Show Answer unlocks after 3 failed attempts
- **Animated characters** — a dog or cat slides in with each new challenge
- **Badges & certificate** — earn a badge per level, get a diploma at the end
- **Donation nudge** — final screen encourages supporting real animal shelters
- **No install** — pure HTML, CSS, vanilla JS; runs on any static host

---

## Database Schema

| Table | Key Columns |
|---|---|
| `SHELTER` | Shelter_id, City, Food, Capacity |
| `PERSON` | ID, F_name, L_name, Gender, Phone_no, E_mail, Birth_date, Address |
| `STAFF` | Staff_ID → PERSON, Position, Shelter_id → SHELTER |
| `ADOPTER` | Adopter_ID → PERSON, Adoption_experience |
| `PET` | Pet_id, Pet_name, Birth_d, Sex, Species, Adoption_status, Arrival_date, Shelter_id |
| `APPLICATION` | Application_id, Application_date, Application_status, Pet_id, Staff_ID, Adopter_ID |
| `ADOPTS` | Pet_id → PET, Adopter_ID, Adoption_fee, Adoption_date |
| `MEDICAL_REPORT` | Pet_id + Report_id (PK), Report_date, Treatments, Notes, Diagnosis |
| `Pet_Photos` | photo_id, pet_id, photo_url |

**Adoption_status values:** `Available` · `Pending` · `Adopted`  
**Staff positions:** `Director` · `Veterinarian` · `Cleaner` · `Caretaker`  
**Shelters:** 1 = Istanbul · 2 = Ankara · 3 = Izmir

---

## Levels

| # | Name | Topics |
|---|---|---|
| 1 | Pawfect Basics | `SELECT *`, specific columns, photo queries |
| 2 | Finding Friends | `WHERE` with text and numeric filters |
| 3 | Sorting it Out | `ORDER BY`, `LIMIT` |
| 4 | Counting Paws | `COUNT`, `GROUP BY` |
| 5 | Joining Forces | `JOIN` across 2–3 tables |
| 6 | SQL Expert | `!=`, multi-condition `WHERE`, compound `ORDER BY` |

---

## Running Locally

```bash
git clone https://github.com/6hearts1mission/happy-paws.git
cd happy-paws
python3 -m http.server 4321
# open http://localhost:4321
```

No build step, no dependencies to install.

---

## Tech Stack

| Layer | Tool |
|---|---|
| SQL engine | [sql.js](https://github.com/sql-js/sql.js) 1.10.2 (SQLite / WASM) |
| Icons | [Lucide](https://lucide.dev) (CDN) |
| Fonts | Nunito + JetBrains Mono (Google Fonts) |
| Hosting | GitHub Pages |
| Language | Vanilla HTML · CSS · JavaScript |

---

## Project Structure

```
happy-paws/
├── index.html              # App shell & all screens
├── style.css               # All styles
├── js/
│   ├── app.js              # Game logic, SQL runner, UI
│   └── challenges.js       # 15 challenge definitions
├── assets/
│   └── logo.png
└── shelter_management_db.sql  # Original MySQL schema
```

---

## About

Built as a database systems course project to make SQL approachable and fun. The shelter theme was chosen because the domain maps naturally to real relational database concepts — entities, relationships, status workflows, and reporting.
