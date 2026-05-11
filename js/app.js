// SQLite-compatible version of the shelter database (no MySQL-specific syntax)
const INIT_SQL = `
CREATE TABLE SHELTER (
  Shelter_id INTEGER PRIMARY KEY,
  City       TEXT NOT NULL,
  Food       INTEGER,
  Capacity   INTEGER NOT NULL
);
CREATE TABLE PERSON (
  ID         INTEGER PRIMARY KEY,
  F_name     TEXT NOT NULL,
  L_name     TEXT NOT NULL,
  Gender     TEXT NOT NULL,
  Phone_no   TEXT,
  E_mail     TEXT UNIQUE,
  Birth_date TEXT,
  Address    TEXT
);
CREATE TABLE STAFF (
  Staff_ID   INTEGER PRIMARY KEY,
  Position   TEXT NOT NULL,
  Shelter_id INTEGER,
  FOREIGN KEY (Staff_ID)   REFERENCES PERSON(ID),
  FOREIGN KEY (Shelter_id) REFERENCES SHELTER(Shelter_id)
);
CREATE TABLE ADOPTER (
  Adopter_ID          INTEGER PRIMARY KEY,
  Adoption_experience INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (Adopter_ID) REFERENCES PERSON(ID)
);
CREATE TABLE PET (
  Pet_id          INTEGER PRIMARY KEY,
  Pet_name        TEXT,
  Birth_d         TEXT,
  Sex             TEXT,
  Species         TEXT NOT NULL,
  Adoption_status TEXT NOT NULL DEFAULT 'Available',
  Arrival_date    TEXT NOT NULL,
  Photo           TEXT,
  Shelter_id      INTEGER,
  FOREIGN KEY (Shelter_id) REFERENCES SHELTER(Shelter_id)
);
CREATE TABLE APPLICATION (
  Application_id     INTEGER PRIMARY KEY,
  Application_date   TEXT NOT NULL,
  Application_status TEXT NOT NULL DEFAULT 'Pending',
  Pet_id             INTEGER,
  Staff_ID           INTEGER,
  Adopter_ID         INTEGER,
  FOREIGN KEY (Pet_id)     REFERENCES PET(Pet_id),
  FOREIGN KEY (Staff_ID)   REFERENCES STAFF(Staff_ID),
  FOREIGN KEY (Adopter_ID) REFERENCES ADOPTER(Adopter_ID)
);
CREATE TABLE ADOPTS (
  Pet_id        INTEGER PRIMARY KEY,
  Adopter_ID    INTEGER,
  Adoption_fee  REAL,
  Adoption_date TEXT NOT NULL,
  FOREIGN KEY (Pet_id)     REFERENCES PET(Pet_id),
  FOREIGN KEY (Adopter_ID) REFERENCES ADOPTER(Adopter_ID)
);
CREATE TABLE MEDICAL_REPORT (
  Pet_id      INTEGER,
  Report_id   INTEGER,
  Report_date TEXT NOT NULL,
  Treatments  TEXT,
  Notes       TEXT,
  Diagnosis   TEXT,
  PRIMARY KEY (Pet_id, Report_id),
  FOREIGN KEY (Pet_id) REFERENCES PET(Pet_id)
);
CREATE TABLE Pet_Photos (
  photo_id  INTEGER PRIMARY KEY AUTOINCREMENT,
  pet_id    INTEGER,
  photo_url TEXT,
  FOREIGN KEY (pet_id) REFERENCES PET(Pet_id) ON DELETE CASCADE
);

INSERT INTO SHELTER VALUES (1,'Istanbul',450,100),(2,'Ankara',320,75),(3,'Izmir',280,60);

INSERT INTO PERSON VALUES
(1,'Oguzhan','Duyar','M','05377801446','oguzhan.duyar0@shelter.com','2005-01-18','Bagcilar, Istanbul'),
(2,'Yusuf Ziya','Coskun','M','05551428990','yusuf.zcoskun@shelter.com','2005-03-15','Kadikoy, Istanbul'),
(3,'Melis Sanem','Bilecen','F','05304713020','melis.sbilecen@shelter.com','2006-02-06','Basaksehir, Istanbul'),
(4,'Sude Su','Toprak','F','05356749050','sude.stoprak@shelter.com','2003-09-14','Umraniye, Istanbul'),
(5,'Aysenurkislioglu','K','F','05061412969','aysenurkslgl@shelter.com','2005-11-11','Cankaya, Ankara'),
(6,'Zeynep','Yondem','F','05437865364','zeynep.yondem@shelter.com','1987-02-25','Kecioren, Ankara'),
(7,'Bilge Nur','Taner','F','05374025842','bilge.ntaner@shelter.com','1991-06-10','Altindag, Ankara'),
(8,'Berika Irem','Yazici','F','05523887261','berika.iyazici@shelter.com','1989-12-03','Etimesgut, Ankara'),
(9,'Mustafa','Erbas','M','05571810729','mustafa.eralp@shelter.com','1981-05-19','Konak, Izmir'),
(10,'Kemal','Vatansever','M','05324113014','kemal.vtnsvr@shelter.com','1981-04-23','Bornova, Izmir'),
(11,'Ismet','Malazgirt','M','05256170491','ismet.malazgirt@shelter.com','1977-08-30','Karsiyaka, Izmir'),
(12,'Kazim','Taarruz','M','05376616032','kazim.taarruz@shelter.com','1978-03-12','Buca, Izmir'),
(13,'Veysel','Sari','M','05336521453','vsari1010@gmail.com','1988-07-25','Kadikoy, Istanbul'),
(14,'Ramazan','Civelek','M','05426197040','rmzn.cvlk@gmail.com','1996-01-20','Besiktas, Istanbul'),
(15,'Ismail','Koybasi','M','05359830115','koybasismail@gmail.com','1989-07-10','Sisli, Istanbul'),
(16,'Ilkin','Aydin','F','05345711905','ilkinaydin.gs@gmail.com','2000-01-05','Uskudar, Istanbul'),
(17,'Umut','Bulut','M','05306134791','blt.umt61@gmail.com','1983-03-15','Maltepe, Istanbul'),
(18,'Edin','Visca','M','05552134652','edinvisca07@gmail.com','1990-02-17','Cankaya, Ankara'),
(19,'Hande','Baladin','F','05375421331','bldn.handu@gmail.com','1997-09-01','Kecioren, Ankara'),
(20,'Efecan','Karaca','M','05079142327','efe.cankrc07@gmail.com','1989-11-16','Yenimahalle, Ankara'),
(21,'Zeynep','Sonmez','F','05316967345','sonmezeynepp@gmail.com','2002-04-30','Etimesgut, Ankara'),
(22,'Emre','Akbaba','M','05415611905','akbappemre10@gmail.com','1992-10-04','Mamak, Ankara'),
(23,'Okan','Buruk','M','05341905026','buruk.okans@gmail.com','1973-09-19','Konak, Izmir'),
(24,'Eylul','Akarcesme','F','05514732040','eyllakarcsm@gmail.com','1999-10-01','Bornova, Izmir'),
(25,'Zehra','Gunes','F','05304628172','guness.zehra@gmail.com','1999-07-07','Karsiyaka, Izmir'),
(26,'Sila','Gencoglu','F','05357504936','silagencoglu@gmail.com','1980-06-17','Buca, Izmir'),
(27,'Cem','Adrian','M','05438137562','adrian.cem@gmail.com','1980-11-30','Gaziemir, Izmir');

INSERT INTO STAFF VALUES
(1,'Director',1),(2,'Veterinarian',1),(3,'Cleaner',1),(4,'Caretaker',1),
(5,'Director',2),(6,'Veterinarian',2),(7,'Cleaner',2),(8,'Caretaker',2),
(9,'Director',3),(10,'Veterinarian',3),(11,'Cleaner',3),(12,'Caretaker',3);

INSERT INTO ADOPTER VALUES
(13,1),(14,1),(15,1),(16,0),(17,1),
(18,0),(19,0),(20,0),(21,0),(22,0),
(23,1),(24,1),(25,1),(26,0),(27,1);

INSERT INTO PET VALUES
(1,'Luna','2020-04-12','F','Siamese','Adopted','2023-06-01',NULL,1),
(2,'Garip','2019-08-30','M','German Shepherd','Available','2023-07-15',NULL,1),
(3,'Kul Kedisi','2022-02-18','F','British Shorthair','Pending','2024-11-01',NULL,1),
(4,'Serafettin','2021-05-25','M','Tabby','Adopted','2023-08-10',NULL,1),
(5,'Hayat','2020-11-03','F','Turkish Angora','Available','2024-02-20',NULL,1),
(6,'Pasa','2022-09-14','M','Kangal','Pending','2024-12-05',NULL,1),
(7,'Kleopatra','2023-01-07','F','Sphynx','Available','2024-05-14',NULL,1),
(8,'Sansli','2020-03-22','M','Golden Retriever','Adopted','2023-07-05',NULL,2),
(9,'Prenses','2021-07-11','F','Persian','Available','2023-09-18',NULL,2),
(10,'Ragnar','2022-01-29','M','Husky','Pending','2024-10-22',NULL,2),
(11,'Isik','2020-10-08','F','Scottish Fold','Adopted','2023-10-10',NULL,2),
(12,'Serif','2021-04-16','M','Labrador','Available','2024-01-15',NULL,2),
(13,'Kibar','2022-06-30','F','Domestic Shorthair','Available','2024-03-08',NULL,2),
(14,'Rifki','2023-02-14','M','Pug','Pending','2024-11-18',NULL,2),
(15,'Daisy','2020-07-19','F','Golden Retriever','Adopted','2023-08-20',NULL,3),
(16,'Hans','2021-11-05','M','German Shepherd','Available','2023-10-05',NULL,3),
(17,'Kibirli','2022-04-23','F','Siamese','Pending','2025-01-10',NULL,3),
(18,'Dost','2021-08-17','M','Beagle','Available','2024-02-14',NULL,3),
(19,'Emma','2022-12-01','F','Scottish Fold','Adopted','2024-04-01',NULL,3),
(20,'Dyson','2023-03-09','M','Poodle','Available','2024-06-22',NULL,3),
(21,'Zara','2023-06-15','F','Kangal','Available','2024-08-30',NULL,3);

INSERT INTO APPLICATION VALUES
(1,'2023-06-10','Rejected',1,4,14),(2,'2023-06-15','Approved',1,4,13),
(3,'2023-08-18','Approved',4,4,15),(4,'2023-09-05','Rejected',2,4,16),
(5,'2024-11-08','Pending',3,4,17),(6,'2024-12-10','Pending',6,4,14),
(7,'2023-07-10','Rejected',8,8,21),(8,'2023-07-18','Approved',8,8,19),
(9,'2023-10-18','Approved',11,8,20),(10,'2023-11-02','Rejected',9,8,22),
(11,'2024-10-28','Pending',10,8,18),(12,'2024-11-25','Pending',14,8,21),
(13,'2024-12-03','Pending',14,8,22),(14,'2023-08-28','Approved',15,12,23),
(15,'2024-04-05','Rejected',19,12,26),(16,'2024-04-10','Approved',19,12,24),
(17,'2023-11-14','Rejected',16,12,25),(18,'2025-01-15','Pending',17,12,27);

INSERT INTO ADOPTS VALUES
(1,13,500.00,'2023-06-20'),(4,15,450.00,'2023-08-25'),
(8,19,600.00,'2023-07-25'),(11,20,350.00,'2023-10-25'),
(15,23,400.00,'2023-09-05'),(19,24,475.00,'2024-04-18');

INSERT INTO MEDICAL_REPORT VALUES
(1,1,'2023-06-05','Vaccination, Deworming','Healthy Siamese on arrival','Healthy'),
(2,2,'2023-07-19','Vaccination, Deworming','Healthy adult shepherd','Healthy'),
(3,3,'2024-11-05','Vaccination, Flea treatment','Flea infestation detected on arrival','Flea infestation'),
(4,4,'2023-08-14','Vaccination, Deworming','Good condition, playful','Healthy'),
(5,5,'2024-02-24','Vaccination, Nutritional supplements','Slightly underweight on arrival','Mild malnutrition'),
(6,6,'2024-12-09','Vaccination, Deworming','Large dog, healthy','Healthy'),
(7,7,'2024-05-18','Vaccination, Deworming','Young sphynx, good condition','Healthy'),
(8,8,'2023-07-09','Vaccination, Deworming','Active golden retriever, healthy','Healthy'),
(9,9,'2023-09-22','Vaccination, Ear cleaning, Medication','Ear mites detected','Ear mites'),
(10,10,'2024-10-26','Vaccination, Deworming','Young husky, good condition','Healthy'),
(11,11,'2023-10-14','Vaccination, Deworming','Healthy Scottish Fold','Healthy'),
(12,12,'2024-01-19','Vaccination, Dental cleaning','Minor dental tartar observed','Dental issues'),
(13,13,'2024-03-12','Vaccination, Deworming','Healthy domestic shorthair','Healthy'),
(14,14,'2024-11-22','Vaccination, Flea treatment','Flea infestation on arrival','Flea infestation'),
(15,15,'2023-08-24','Vaccination, Deworming','Healthy golden retriever','Healthy'),
(16,16,'2023-10-09','Vaccination, Deworming','Adult shepherd, good weight','Healthy'),
(17,17,'2025-01-14','Vaccination, Fluid therapy','Slightly dehydrated on arrival','Dehydration'),
(18,18,'2024-02-18','Vaccination, Deworming','Healthy beagle','Healthy'),
(19,19,'2024-04-05','Vaccination, Deworming','Young Scottish Fold, healthy','Healthy'),
(20,20,'2024-06-26','Vaccination, Deworming','Healthy poodle, playful','Healthy'),
(21,21,'2024-09-03','Vaccination, Deworming','Young, healthy','Healthy');

INSERT INTO Pet_Photos (pet_id, photo_url) VALUES
(1,'https://hizliresim.com/t7azort'),(2,'https://hizliresim.com/sonoyw9'),
(3,'https://hizliresim.com/4ggf1y4'),(3,'https://hizliresim.com/s561nck'),
(4,'https://hizliresim.com/p7kjmb9'),(4,'https://hizliresim.com/4buvogf'),
(5,'https://hizliresim.com/17v5p1m'),(6,'https://hizliresim.com/shz7hcw'),
(7,'https://hizliresim.com/b68p5cm'),(8,'https://hizliresim.com/cwsli2m'),
(8,'https://hizliresim.com/9h60jm9'),(9,'https://hizliresim.com/8xantf2'),
(10,'https://hizliresim.com/n34b7c7'),(11,'https://hizliresim.com/cw5to0x'),
(12,'https://hizliresim.com/a2b9ui3'),(13,'https://hizliresim.com/fzga7ri'),
(14,'https://hizliresim.com/rc1vbzj'),(15,'https://hizliresim.com/h0cfdgh'),
(16,'https://hizliresim.com/s3rs4kz'),(17,'https://hizliresim.com/53ui7zn'),
(18,'https://hizliresim.com/kbvi9fl'),(18,'https://hizliresim.com/2cxrwp9'),
(19,'https://hizliresim.com/c5t1fae'),(20,'https://hizliresim.com/8t0ifbl'),
(21,'https://hizliresim.com/p8u18uz');
`;

// ── State ──────────────────────────────────────────────────────────────────
const LEVEL_COLORS = ['#FF7043','#26C6DA','#AB47BC','#66BB6A','#5C7CFA','#FFB300'];

const LEVEL_BADGES = [
  { icon: 'database',      name: 'Database Explorer', color: '#FF7043' },
  { icon: 'filter',        name: 'Filter Master',     color: '#26C6DA' },
  { icon: 'arrow-up-down', name: 'Sort Wizard',       color: '#AB47BC' },
  { icon: 'bar-chart-2',   name: 'Number Cruncher',   color: '#66BB6A' },
  { icon: 'git-merge',     name: 'Data Connector',    color: '#5C7CFA' },
  { icon: 'award',         name: 'SQL Expert',        color: '#FFB300' },
];

const LEVEL_ICONS = ['database','filter','arrow-up-down','bar-chart-2','git-merge','award'];

let db = null;
let currentChallengeId = null;
let hintShown = false;
let expandedLevel = 1;
const attemptCounts = {};

const STORAGE_KEY = 'pawsql_progress';

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ── Player name ────────────────────────────────────────────────────────────
function getPlayerName() {
  return localStorage.getItem('pawsql_name') || 'Volunteer';
}
function savePlayerName(name) {
  localStorage.setItem('pawsql_name', name.trim() || 'Volunteer');
}

// ── Mascot ─────────────────────────────────────────────────────────────────
function updateMascot(text, mood = 'normal') {
  const textEl = document.getElementById('mascot-text');
  const bubble = document.getElementById('mascot-bubble');
  const avatar = document.getElementById('mascot-avatar');
  if (!textEl) return;
  textEl.innerHTML = text;
  bubble.className = `sm-bubble mood-${mood}`;
  if (avatar) avatar.className = `sm-avatar mood-${mood}`;
}

// ── Sidebar badges ─────────────────────────────────────────────────────────
function updateSidebarBadges() {
  const el = document.getElementById('sidebar-badges');
  if (!el) return;
  const progress = loadProgress();
  const earned = LEVEL_BADGES.filter((_, i) => {
    const lv = i + 1;
    return CHALLENGES.filter(c => c.level === lv).every(c => progress[c.id]?.completed);
  });
  if (earned.length === 0) { el.innerHTML = ''; return; }
  el.innerHTML = `<div class="sb-label">Badges Earned</div>
    <div class="sb-row">${earned.map((b, i) =>
      `<span class="sb-badge" title="${b.name}" style="animation-delay:${i*0.08}s;color:${b.color}">
        <i data-lucide="${b.icon}"></i>
      </span>`
    ).join('')}</div>`;
  if (window.lucide) lucide.createIcons();
}

// ── Level Complete Modal ────────────────────────────────────────────────────
function showLevelComplete(levelNum) {
  const badge  = LEVEL_BADGES[levelNum - 1];
  const isLast = levelNum >= 6;
  const name   = getPlayerName();

  document.getElementById('lc-badge-icon').innerHTML = `<i data-lucide="${badge.icon}"></i>`;
  document.getElementById('lc-badge-name').textContent = badge.name;
  document.getElementById('lc-mascot-icon').innerHTML  = isLast
    ? `<i data-lucide="trophy"></i>`
    : `<i data-lucide="award"></i>`;
  document.getElementById('lc-heading').textContent = isLast
    ? 'All Missions Complete!'
    : `Level ${levelNum} Complete!`;
  document.getElementById('lc-msg').textContent = isLast
    ? `Amazing work, ${name}! You're officially a SQL Expert! Biscuit is so proud!`
    : `Great job, ${name}! You unlocked the "${badge.name}" badge. Keep going!`;

  const nextBtn = document.getElementById('lc-next-btn');
  if (isLast) {
    nextBtn.textContent = 'Claim Your Certificate!';
    nextBtn.onclick = () => {
      document.getElementById('level-complete-modal').classList.add('hidden');
      showFinalScreen();
    };
  } else {
    const nextBadge = LEVEL_BADGES[levelNum];
    nextBtn.textContent = `Next: Level ${levelNum + 1} — ${nextBadge.name} →`;
    nextBtn.onclick = () => {
      document.getElementById('level-complete-modal').classList.add('hidden');
      expandedLevel = levelNum + 1;
      renderSidebar();
      updateMascot(`Level ${levelNum + 1} unlocked! Let's keep going!`, 'happy');
    };
  }

  document.getElementById('level-complete-modal').classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
  triggerConfetti();
  updateSidebarBadges();
}

// ── Final Certificate ──────────────────────────────────────────────────────
function showFinalScreen() {
  const progress = loadProgress();
  const name = getPlayerName();
  document.getElementById('cert-player').textContent = name;
  document.getElementById('cert-score').textContent  = totalScore(progress);

  document.getElementById('cert-badges-grid').innerHTML = LEVEL_BADGES.map((b, i) =>
    `<div class="cert-badge-item" style="--bc:${b.color};animation-delay:${i*0.1}s">
       <span class="cert-badge-emoji" style="background:linear-gradient(135deg,${b.color},${b.color}CC)">
         <i data-lucide="${b.icon}"></i>
       </span>
       <span class="cert-badge-label">${b.name}</span>
     </div>`
  ).join('');

  document.getElementById('final-screen').classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
  setTimeout(triggerConfetti, 400);
  updateMascot(`Congratulations, ${name}! You're a SQL Expert now! I'm so proud!`, 'celebrate');
  hideChallengePet();

  // Donation panel
  const score = totalScore(progress);
  const tl = Math.floor(score / 100);
  const maxScore = CHALLENGES.reduce((s, c) => s + c.points, 0);
  const pct = Math.min(100, Math.round((score / maxScore) * 100));
  const amountEl = document.getElementById('cert-donation-amount');
  const barEl = document.getElementById('cert-donation-bar');
  if (amountEl) amountEl.textContent = `${tl} TL`;
  if (barEl) setTimeout(() => { barEl.style.width = pct + '%'; }, 100);
}

// ── All-game-complete check ────────────────────────────────────────────────
function checkAllComplete(progress) {
  return CHALLENGES.every(c => progress[c.id]?.completed);
}

// ── DB Init ────────────────────────────────────────────────────────────────
async function initDB() {
  const SQL = await initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${file}`
  });
  db = new SQL.Database();
  db.run(INIT_SQL);
}

function runQuery(sql) {
  try {
    const results = db.exec(sql);
    if (!results || results.length === 0) return { columns: [], values: [], error: null };
    return { columns: results[0].columns, values: results[0].values, error: null };
  } catch (e) {
    return { columns: [], values: [], error: e.message };
  }
}

// ── Validation ─────────────────────────────────────────────────────────────
function validate(challenge, userResult) {
  if (userResult.error) return false;

  switch (challenge.validateType) {
    case 'rowCount':
      return userResult.values.length === challenge.expectedCount;

    case 'singleValue': {
      if (userResult.values.length === 0) return false;
      const val = userResult.values[0][0];
      return String(val === null ? '' : val) === challenge.expectedValue;
    }

    case 'columns': {
      if (userResult.values.length !== challenge.expectedCount) return false;
      const cols = userResult.columns.map(c => c.toLowerCase());
      return challenge.requiredColumns.every(rc => cols.includes(rc.toLowerCase()));
    }

    default:
      return false;
  }
}

// ── Render helpers ─────────────────────────────────────────────────────────
function isPhotoUrl(val) {
  if (typeof val !== 'string') return false;
  return val.startsWith('http://') || val.startsWith('https://');
}

function renderCell(cell) {
  if (cell === null) return '<span class="null">NULL</span>';
  const s = String(cell);
  if (isPhotoUrl(s)) {
    return `<a href="${escapeHtml(s)}" target="_blank" class="photo-link">📷 View Photo</a>`;
  }
  return escapeHtml(s);
}

function renderTable(result) {
  if (result.error) {
    return `<div class="sql-error"><span>❌ SQL Error:</span> ${escapeHtml(result.error)}</div>`;
  }
  if (result.columns.length === 0) {
    return '<p class="no-rows">Query ran successfully — no rows returned.</p>';
  }

  const rowCount = result.values.length;
  let html = `<p class="row-count">${rowCount} row${rowCount !== 1 ? 's' : ''} returned</p><div class="table-wrap"><table><thead><tr>`;
  result.columns.forEach(c => { html += `<th>${escapeHtml(c)}</th>`; });
  html += '</tr></thead><tbody>';
  result.values.slice(0, 200).forEach(row => {
    html += '<tr>';
    row.forEach(cell => { html += `<td>${renderCell(cell)}</td>`; });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  if (rowCount > 200) html += `<p class="row-count">Showing first 200 of ${rowCount} rows.</p>`;
  return html;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function totalScore(progress) {
  return Object.values(progress).reduce((sum, v) => sum + (v.score || 0), 0);
}

function completedCount(progress) {
  return Object.values(progress).filter(v => v.completed).length;
}

// ── Level locking ──────────────────────────────────────────────────────────
function isLevelUnlocked(levelNum, progress) {
  if (levelNum === 1) return true;
  const prev = CHALLENGES.filter(c => c.level === levelNum - 1);
  return prev.every(c => progress[c.id]?.completed);
}

function toggleLevel(levelNum) {
  expandedLevel = expandedLevel === levelNum ? null : levelNum;
  renderSidebar();
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function renderSidebar() {
  const progress = loadProgress();
  const levels = [...new Set(CHALLENGES.map(c => c.level))].sort((a, b) => a - b);
  let html = '';

  levels.forEach((levelNum, idx) => {
    const levelChs = CHALLENGES.filter(c => c.level === levelNum);
    const info = levelChs[0];
    const unlocked = isLevelUnlocked(levelNum, progress);
    const doneCount = levelChs.filter(c => progress[c.id]?.completed).length;
    const total = levelChs.length;
    const complete = doneCount === total;
    const isExp = expandedLevel === levelNum;
    const color = LEVEL_COLORS[levelNum - 1] || LEVEL_COLORS[0];
    const shortName = info.levelName.includes('—') ? info.levelName.split('—')[1].trim() : info.levelName;

    const cls = ['journey-node', unlocked ? 'unlocked' : 'locked', complete ? 'complete' : '', isExp ? 'expanded' : ''].filter(Boolean).join(' ');

    let dot;
    if (!unlocked)     dot = `<i data-lucide="lock"></i>`;
    else if (complete) dot = `<i data-lucide="check"></i>`;
    else               dot = `<i data-lucide="${LEVEL_ICONS[levelNum - 1] || 'database'}"></i>`;

    html += `
      <div class="${cls}" style="--lcolor:${color}" onclick="${unlocked ? `toggleLevel(${levelNum})` : ''}">
        <div class="jn-track">
          <div class="jn-line${idx === 0 ? ' invis' : ''}"></div>
          <div class="jn-dot">${dot}</div>
          <div class="jn-line${idx === levels.length - 1 ? ' invis' : ''}"></div>
        </div>
        <div class="jn-card">
          <div class="jn-info">
            <div class="jn-title">${shortName}</div>
            <div class="jn-sub">${unlocked ? `${doneCount}/${total} missions` : 'Complete previous level'}</div>
          </div>
          ${unlocked ? `<span class="jn-chevron"><i data-lucide="chevron-down"></i></span>` : ''}
        </div>
      </div>
      ${isExp ? `<div class="jn-challenges">${levelChs.map(ch => {
        const done = progress[ch.id]?.completed;
        const active = ch.id === currentChallengeId;
        return `<button class="challenge-btn ${done ? 'done' : ''} ${active ? 'active' : ''}"
          onclick="event.stopPropagation();selectChallenge(${ch.id})">
          <span class="ch-icon"><i data-lucide="${done ? 'check-circle-2' : 'circle'}"></i></span>
          <span class="ch-title">${ch.title}</span>
          <span class="ch-pts">${ch.points}pt</span>
        </button>`;
      }).join('')}</div>` : ''}
    `;
  });

  document.getElementById('challenge-list').innerHTML = html;
  if (window.lucide) lucide.createIcons();

  document.getElementById('score-display').textContent = totalScore(progress);
  document.getElementById('progress-display').textContent =
    `${completedCount(progress)}/${CHALLENGES.length}`;
}

// ── Challenge view ─────────────────────────────────────────────────────────
function selectChallenge(id) {
  const ch = CHALLENGES.find(c => c.id === id);
  const progress = loadProgress();
  if (!isLevelUnlocked(ch.level, progress)) return;

  currentChallengeId = id;
  hintShown = false;
  expandedLevel = ch.level;

  const accent = LEVEL_COLORS[ch.level - 1] || LEVEL_COLORS[0];
  document.getElementById('challenge-view').style.setProperty('--accent', accent);

  const done = progress[id]?.completed;

  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('challenge-view').classList.remove('hidden');
  updateChallengePet(ch.level);

  document.getElementById('ch-level').textContent = ch.levelName;
  document.getElementById('ch-title').textContent = ch.title;
  document.getElementById('ch-points').textContent = `+${ch.points} pts`;
  document.getElementById('ch-story').innerHTML = ch.story;
  document.getElementById('ch-task').innerHTML = ch.task;
  document.getElementById('hint-box').classList.add('hidden');
  document.getElementById('hint-box').innerHTML = '';
  document.getElementById('feedback').classList.add('hidden');
  document.getElementById('results').innerHTML = '';
  document.getElementById('show-answer-btn').classList.add('hidden');
  attemptCounts[id] = 0;

  // Mascot speaks the mission intro
  const snippet = ch.story.replace(/<[^>]+>/g, '').slice(0, 90).trimEnd();
  updateMascot(`${snippet}… 📋`, 'normal');

  const editor = document.getElementById('sql-editor');
  if (done && progress[id].lastQuery) {
    editor.value = progress[id].lastQuery;
  } else {
    editor.value = '';
  }

  if (done) {
    showFeedback(true, ch.successMessage, ch.points, true);
  }

  renderSidebar();
}

// ── Run ────────────────────────────────────────────────────────────────────
function handleRun() {
  const sql = document.getElementById('sql-editor').value.trim();
  if (!sql) return;

  const ch = CHALLENGES.find(c => c.id === currentChallengeId);
  const result = runQuery(sql);

  document.getElementById('results').innerHTML = renderTable(result);

  const correct = validate(ch, result);
  const progress = loadProgress();
  const alreadyDone = progress[ch.id]?.completed;

  if (correct) {
    if (!alreadyDone) {
      progress[ch.id] = { completed: true, score: ch.points, lastQuery: sql };
      saveProgress(progress);
      showFeedback(true, ch.successMessage, ch.points, false);
      triggerConfetti();
    } else {
      progress[ch.id].lastQuery = sql;
      saveProgress(progress);
      showFeedback(true, ch.successMessage, ch.points, true);
    }
    renderSidebar();
    autoAdvance(ch.id);
  } else {
    if (!alreadyDone) {
      attemptCounts[ch.id] = (attemptCounts[ch.id] || 0) + 1;
      if (attemptCounts[ch.id] >= 3) {
        document.getElementById('show-answer-btn').classList.remove('hidden');
      }
    }
    if (!result.error) {
      const got = result.values.length;
      let msg = 'Not quite right — check your query and try again!';
      if (ch.validateType === 'rowCount') {
        msg = `Your query returned <strong>${got}</strong> row${got !== 1 ? 's' : ''}, but we expected <strong>${ch.expectedCount}</strong>. Double-check your filter or table name!`;
      } else if (ch.validateType === 'singleValue') {
        const got0 = result.values[0]?.[0] ?? '?';
        msg = `Your result was <strong>${got0}</strong>, but we expected <strong>${ch.expectedValue}</strong>. Try a different approach!`;
      } else if (ch.validateType === 'columns') {
        msg = `Make sure you're selecting <strong>exactly</strong> the requested columns (${ch.requiredColumns.join(', ')}) and getting all ${ch.expectedCount} rows.`;
      }
      showFeedback(false, msg, 0, false);
    } else {
      showFeedback(false, 'Fix the SQL error above and try again.', 0, false);
    }
    if (!alreadyDone) {
      progress[ch.id] = progress[ch.id] || {};
      progress[ch.id].lastQuery = sql;
      saveProgress(progress);
    }
  }
}

function autoAdvance(completedId) {
  const completedCh = CHALLENGES.find(c => c.id === completedId);
  const progress = loadProgress();

  // Check if the whole level is now done → unlock + expand next level
  const levelChs = CHALLENGES.filter(c => c.level === completedCh.level);
  const levelDone = levelChs.every(c => progress[c.id]?.completed);
  if (levelDone) {
    setTimeout(() => showLevelComplete(completedCh.level), 1100);
    return;
  }

  // Otherwise pulse the next incomplete challenge in the same level
  const idx = CHALLENGES.findIndex(c => c.id === completedId);
  const next = CHALLENGES[idx + 1];
  if (!next || next.level !== completedCh.level) return;
  if (!progress[next.id]?.completed) {
    setTimeout(() => {
      const btn = document.querySelector(`.challenge-btn[onclick*="selectChallenge(${next.id})"]`);
      if (btn) btn.classList.add('pulse');
    }, 1500);
  }
}

// ── Feedback ───────────────────────────────────────────────────────────────
function showFeedback(correct, msg, pts, alreadyDone) {
  const box = document.getElementById('feedback');
  box.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
  const ptsBadge = (correct && !alreadyDone) ? `<span class="pts-badge">+${pts} pts!</span>` : '';
  const icon = correct ? '🎉' : '🤔';
  box.innerHTML = `<div class="feedback-inner">${icon} <span>${msg}</span>${ptsBadge}</div>`;
  box.classList.remove('hidden');

  if (correct) {
    const name = getPlayerName();
    updateMascot(`Well done, ${name}! ${msg}`, 'celebrate');
  } else {
    updateMascot("Hmm, not quite right… Try again — you've got this!", 'think');
  }
}

// ── Hint ───────────────────────────────────────────────────────────────────
function handleHint() {
  const ch = CHALLENGES.find(c => c.id === currentChallengeId);
  const box = document.getElementById('hint-box');
  if (hintShown) { box.classList.toggle('hidden'); return; }
  box.innerHTML = `<div class="hint-inner">💡 <strong>Hint:</strong> ${ch.hint}</div>`;
  box.classList.remove('hidden');
  hintShown = true;
}

// ── Show Answer ────────────────────────────────────────────────────────────
function handleShowAnswer() {
  const ch = CHALLENGES.find(c => c.id === currentChallengeId);
  if (!ch) return;
  const editor = document.getElementById('sql-editor');
  editor.value = ch.canonicalQuery;
  editor.classList.add('answer-flash');
  setTimeout(() => editor.classList.remove('answer-flash'), 600);
}

// ── Schema panel ───────────────────────────────────────────────────────────
function toggleSchema() {
  document.getElementById('schema-panel').classList.toggle('hidden');
}

// ── Confetti ───────────────────────────────────────────────────────────────
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  canvas.classList.remove('hidden');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    r: Math.random() * 8 + 4,
    d: Math.random() * 80 + 20,
    color: ['#FF7043','#26C6DA','#66BB6A','#FFA726','#AB47BC','#EC407A'][Math.floor(Math.random()*6)],
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltSpeed: Math.random() * 0.1 + 0.05
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.tiltAngle += p.tiltSpeed;
      p.y += Math.cos(frame / p.d) + 2;
      p.x += Math.sin(frame / p.d);
      p.tilt = 15 * Math.sin(p.tiltAngle);
      ctx.beginPath();
      ctx.lineWidth = p.r / 2;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
      ctx.stroke();
    });
    frame++;
    if (frame < 150) requestAnimationFrame(draw);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.classList.add('hidden'); }
  }
  draw();
}

// ── Pet character ──────────────────────────────────────────────────────────
function petDogSvg(color) {
  const dark = color + 'CC';
  const light = color + '44';
  return `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="95" rx="28" ry="22" fill="${color}"/>
    <circle cx="50" cy="52" r="26" fill="${color}"/>
    <ellipse cx="25" cy="56" rx="11" ry="18" fill="${dark}" transform="rotate(-12 25 56)"/>
    <ellipse cx="75" cy="56" rx="11" ry="18" fill="${dark}" transform="rotate(12 75 56)"/>
    <ellipse cx="41" cy="49" rx="5" ry="5.5" fill="#1a1a1a"/>
    <ellipse cx="59" cy="49" rx="5" ry="5.5" fill="#1a1a1a"/>
    <circle cx="43" cy="47" r="1.8" fill="white"/>
    <circle cx="61" cy="47" r="1.8" fill="white"/>
    <ellipse cx="50" cy="62" rx="11" ry="8" fill="${light}" style="fill:white;opacity:.6"/>
    <ellipse cx="50" cy="59" rx="5" ry="3.5" fill="#1a1a1a"/>
    <path d="M44 65 Q50 70 56 65" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M79 87 Q105 70 97 46" stroke="${color}" stroke-width="7" stroke-linecap="round" fill="none"/>
    <ellipse cx="35" cy="116" rx="11" ry="7" fill="${color}"/>
    <ellipse cx="65" cy="116" rx="11" ry="7" fill="${color}"/>
  </svg>`;
}

function petCatSvg(color) {
  return `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="95" rx="28" ry="22" fill="${color}"/>
    <circle cx="50" cy="50" r="26" fill="${color}"/>
    <polygon points="27,32 22,8 40,26" fill="${color}"/>
    <polygon points="73,32 78,8 60,26" fill="${color}"/>
    <polygon points="29,30 25,14 39,25" fill="#FFB3C1"/>
    <polygon points="71,30 75,14 61,25" fill="#FFB3C1"/>
    <ellipse cx="40" cy="48" rx="5" ry="6" fill="#1a1a1a"/>
    <ellipse cx="60" cy="48" rx="5" ry="6" fill="#1a1a1a"/>
    <circle cx="42" cy="46" r="1.8" fill="white"/>
    <circle cx="62" cy="46" r="1.8" fill="white"/>
    <ellipse cx="50" cy="58" rx="3" ry="2" fill="#FF6B9D"/>
    <path d="M46 61 Q50 65 54 61" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <line x1="18" y1="55" x2="40" y2="57" stroke="#1a1a1a" stroke-width="1" opacity=".5"/>
    <line x1="18" y1="60" x2="40" y2="60" stroke="#1a1a1a" stroke-width="1" opacity=".5"/>
    <line x1="82" y1="55" x2="60" y2="57" stroke="#1a1a1a" stroke-width="1" opacity=".5"/>
    <line x1="82" y1="60" x2="60" y2="60" stroke="#1a1a1a" stroke-width="1" opacity=".5"/>
    <path d="M78 85 Q108 65 96 38" stroke="${color}" stroke-width="7" stroke-linecap="round" fill="none"/>
    <ellipse cx="35" cy="116" rx="11" ry="7" fill="${color}"/>
    <ellipse cx="65" cy="116" rx="11" ry="7" fill="${color}"/>
  </svg>`;
}

function updateChallengePet(levelNum) {
  const el = document.getElementById('ch-pet');
  if (!el) return;
  const color = LEVEL_COLORS[(levelNum - 1) % LEVEL_COLORS.length];
  el.innerHTML = (levelNum % 2 === 0) ? petCatSvg(color) : petDogSvg(color);
  el.classList.remove('visible');
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
}

function hideChallengePet() {
  const el = document.getElementById('ch-pet');
  if (el) el.classList.remove('visible');
}

// ── Reset ──────────────────────────────────────────────────────────────────
function resetProgress() {
  if (!confirm('Reset all progress? This cannot be undone!')) return;
  localStorage.removeItem(STORAGE_KEY);
  currentChallengeId = null;
  expandedLevel = 1;
  document.getElementById('welcome').classList.remove('hidden');
  document.getElementById('challenge-view').classList.add('hidden');
  hideChallengePet();
  updateMascot("Starting fresh! Let's do this again!", 'happy');
  updateSidebarBadges();
  renderSidebar();
}

// ── Boot ───────────────────────────────────────────────────────────────────
async function boot() {
  const loading = document.getElementById('loading');
  try {
    await initDB();
    loading.classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    renderSidebar();

    // Keep name input empty on load (name stored separately, shown after start)

    document.getElementById('run-btn').addEventListener('click', handleRun);
    document.getElementById('hint-btn').addEventListener('click', handleHint);
    document.getElementById('show-answer-btn').addEventListener('click', handleShowAnswer);
    document.getElementById('reset-btn').addEventListener('click', resetProgress);
    document.getElementById('start-btn').addEventListener('click', () => {
      const n = (document.getElementById('player-name')?.value || '').trim();
      if (n) savePlayerName(n);
      const name = getPlayerName();
      updateMascot(`Welcome, ${name}! Let's start your first mission!`, 'happy');
      const overlay = document.getElementById('transition-overlay');
      // Reset animations so they replay on every click
      overlay.querySelectorAll('.tr-paw,.tr-star,.tr-icon,.tr-text').forEach(el => {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
      });
      overlay.classList.add('active');
      if (window.lucide) lucide.createIcons({ el: overlay });
      setTimeout(() => {
        selectChallenge(1);
        setTimeout(() => overlay.classList.remove('active'), 80);
      }, 700);
    });
    document.getElementById('schema-toggle').addEventListener('click', toggleSchema);
    document.getElementById('cert-close-btn')?.addEventListener('click', () => {
      document.getElementById('final-screen').classList.add('hidden');
    });
    document.getElementById('donate-btn')?.addEventListener('click', () => {
      alert('Thank you for your support! In a real version, this would redirect to our donation page. Every point counts for the animals!');
    });

    updateSidebarBadges();

    // Populate welcome screen pet characters
    const wpl = document.getElementById('ws-pet-left');
    const wpr = document.getElementById('ws-pet-right');
    if (wpl) wpl.innerHTML = petDogSvg('#FF7043');
    if (wpr) wpr.innerHTML = petCatSvg('#26C6DA');

    document.getElementById('sql-editor').addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const t = e.target;
        const s = t.selectionStart;
        t.value = t.value.substring(0, s) + '  ' + t.value.substring(t.selectionEnd);
        t.selectionStart = t.selectionEnd = s + 2;
      }
    });

  } catch (err) {
    loading.innerHTML = `<p style="color:red">Failed to load database: ${err.message}</p>`;
  }
}

boot();
