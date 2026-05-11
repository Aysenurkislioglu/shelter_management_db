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
let db = null;
let currentChallengeId = null;
let hintShown = false;
const attemptCounts = {};

const STORAGE_KEY = 'pawsql_progress';

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
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

// ── Sidebar ────────────────────────────────────────────────────────────────
function renderSidebar() {
  const progress = loadProgress();
  const list = document.getElementById('challenge-list');
  let html = '';
  let lastLevel = null;

  CHALLENGES.forEach(ch => {
    if (ch.level !== lastLevel) {
      if (lastLevel !== null) html += '</div>';
      html += `<div class="level-group">
        <div class="level-header">${ch.levelEmoji} ${ch.levelName}</div>`;
      lastLevel = ch.level;
    }
    const done = progress[ch.id]?.completed;
    const active = ch.id === currentChallengeId;
    html += `<button class="challenge-btn ${done ? 'done' : ''} ${active ? 'active' : ''}"
      onclick="selectChallenge(${ch.id})">
      <span class="ch-status">${done ? '✅' : '○'}</span>
      <span class="ch-title">${ch.title}</span>
      <span class="ch-pts">${ch.points}pt</span>
    </button>`;
  });
  if (lastLevel !== null) html += '</div>';
  list.innerHTML = html;

  document.getElementById('score-display').textContent = totalScore(progress);
  document.getElementById('progress-display').textContent =
    `${completedCount(progress)}/${CHALLENGES.length}`;
}

// ── Challenge view ─────────────────────────────────────────────────────────
function selectChallenge(id) {
  currentChallengeId = id;
  hintShown = false;
  const ch = CHALLENGES.find(c => c.id === id);
  const progress = loadProgress();
  const done = progress[id]?.completed;

  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('challenge-view').classList.remove('hidden');

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
  const idx = CHALLENGES.findIndex(c => c.id === completedId);
  const next = CHALLENGES[idx + 1];
  if (!next) return;
  const progress = loadProgress();
  if (!progress[next.id]?.completed) {
    setTimeout(() => {
      const btn = document.querySelector(`.challenge-btn[onclick="selectChallenge(${next.id})"]`);
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

// ── Reset ──────────────────────────────────────────────────────────────────
function resetProgress() {
  if (!confirm('Reset all progress? This cannot be undone!')) return;
  localStorage.removeItem(STORAGE_KEY);
  currentChallengeId = null;
  document.getElementById('welcome').classList.remove('hidden');
  document.getElementById('challenge-view').classList.add('hidden');
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

    document.getElementById('run-btn').addEventListener('click', handleRun);
    document.getElementById('hint-btn').addEventListener('click', handleHint);
    document.getElementById('show-answer-btn').addEventListener('click', handleShowAnswer);
    document.getElementById('reset-btn').addEventListener('click', resetProgress);
    document.getElementById('start-btn').addEventListener('click', () => selectChallenge(1));
    document.getElementById('schema-toggle').addEventListener('click', toggleSchema);

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
