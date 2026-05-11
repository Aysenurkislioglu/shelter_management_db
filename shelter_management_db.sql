CREATE DATABASE shelter_db;


USE shelter_db;



-- ============================================================
-- CREATE TABLES
-- ============================================================

CREATE TABLE PERSON (
    ID          INT             PRIMARY KEY AUTO_INCREMENT,
    F_name      VARCHAR(50)     NOT NULL,
    L_name      VARCHAR(50)     NOT NULL,
    Gender      ENUM('M','F')   NOT NULL,
    Phone_no    VARCHAR(15),
    E_mail      VARCHAR(100)    UNIQUE,
    Birth_date  DATE,
    Address     VARCHAR(200)
);



CREATE TABLE SHELTER (
    Shelter_id  INT             PRIMARY KEY AUTO_INCREMENT,
    City        VARCHAR(50)     NOT NULL,
    Food        INT,
    Capacity    INT             NOT NULL
);



CREATE TABLE STAFF (
    Staff_ID    INT             PRIMARY KEY,
    Position    ENUM('Director','Veterinarian','Cleaner','Caretaker') NOT NULL,
    Shelter_id  INT,
    FOREIGN KEY (Staff_ID)   REFERENCES PERSON(ID),
    FOREIGN KEY (Shelter_id) REFERENCES SHELTER(Shelter_id)
);



CREATE TABLE ADOPTER (
    Adopter_ID           INT       PRIMARY KEY,
    Adoption_experience  BOOLEAN   NOT NULL DEFAULT FALSE,
    FOREIGN KEY (Adopter_ID) REFERENCES PERSON(ID)
);



CREATE TABLE PET (
    Pet_id          INT             PRIMARY KEY AUTO_INCREMENT,
    Pet_name        VARCHAR(50),
    Birth_d         DATE,
    Sex             ENUM('M','F'),
    Species         VARCHAR(50)     NOT NULL,
    Adoption_status ENUM('Available','Pending','Adopted') NOT NULL DEFAULT 'Available',
    Arrival_date    DATE            NOT NULL,
    Photo           VARCHAR(255),
    Shelter_id      INT,
    FOREIGN KEY (Shelter_id) REFERENCES SHELTER(Shelter_id)
);



CREATE TABLE APPLICATION (
    Application_id      INT     PRIMARY KEY AUTO_INCREMENT,
    Application_date    DATE    NOT NULL,
    Application_status  ENUM('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
    Pet_id              INT,
    Staff_ID            INT,
    Adopter_ID          INT,
    FOREIGN KEY (Pet_id)     REFERENCES PET(Pet_id),
    FOREIGN KEY (Staff_ID)   REFERENCES STAFF(Staff_ID),
    FOREIGN KEY (Adopter_ID) REFERENCES ADOPTER(Adopter_ID)
);



CREATE TABLE ADOPTS (
    Pet_id          INT             PRIMARY KEY,
    Adopter_ID      INT,
    Adoption_fee    DECIMAL(10,2),
    Adoption_date   DATE            NOT NULL,
    FOREIGN KEY (Pet_id)     REFERENCES PET(Pet_id),
    FOREIGN KEY (Adopter_ID) REFERENCES ADOPTER(Adopter_ID)
);



CREATE TABLE MEDICAL_REPORT (
    Pet_id      INT,
    Report_id   INT,
    Report_date DATE            NOT NULL,
    Treatments  TEXT,
    Notes       TEXT,
    Diagnosis   VARCHAR(200),
    PRIMARY KEY (Pet_id, Report_id),
    FOREIGN KEY (Pet_id) REFERENCES PET(Pet_id)
);




-- ============================================================
-- INSERT DATA
-- ============================================================

-- SHELTER (1=Istanbul, 2=Ankara, 3=Izmir)
INSERT INTO SHELTER (City, Food, Capacity) VALUES
('Istanbul', 450, 100),
('Ankara',   320,  75),
('Izmir',    280,  60);


-- PERSON - Staff (ID 1-12)
INSERT INTO PERSON (ID, F_name, L_name, Gender, Phone_no, E_mail, Birth_date, Address) VALUES
(1,  'Oguzhan',     'Duyar',      'M', '05377801446', 'oguzhan.duyar0@shelter.com',   '2005-01-18', 'Bagcilar, Istanbul'),
(2,  'Yusuf Ziya',  'Coskun',     'M', '05551428990', 'yusuf.zcoskun@shelter.com',    '2005-03-15', 'Kadikoy, Istanbul'),
(3,  'Melis Sanem', 'Bilecen',    'F', '05304713020', 'melis.sbilecen@shelter.com',   '2006-02-06', 'Basaksehir, Istanbul'),
(4,  'Sude Su',     'Toprak',     'F', '05356749050', 'sude.stoprak@shelter.com',     '2003-09-14', 'Umraniye, Istanbul'),
(5,  'Aysenurkislioglu', 'K',     'F', '05061412969', 'aysenurkslgl@shelter.com',     '2005-11-11', 'Cankaya, Ankara'),
(6,  'Zeynep',      'Yondem',     'F', '05437865364', 'zeynep.yondem@shelter.com',    '1987-02-25', 'Kecioren, Ankara'),
(7,  'Bilge Nur',   'Taner',      'F', '05374025842', 'bilge.ntaner@shelter.com',     '1991-06-10', 'Altindag, Ankara'),
(8,  'Berika Irem', 'Yazici',     'F', '05523887261', 'berika.iyazici@shelter.com',   '1989-12-03', 'Etimesgut, Ankara'),
(9,  'Mustafa',     'Erbas',      'M', '05571810729', 'mustafa.eralp@shelter.com',    '1981-05-19', 'Konak, Izmir'),
(10, 'Kemal',       'Vatansever', 'M', '05324113014', 'kemal.vtnsvr@shelter.com',     '1981-04-23', 'Bornova, Izmir'),
(11, 'Ismet',       'Malazgirt',  'M', '05256170491', 'ismet.malazgirt@shelter.com',  '1977-08-30', 'Karsiyaka, Izmir'),
(12, 'Kazim',       'Taarruz',    'M', '05376616032', 'kazim.taarruz@shelter.com',    '1978-03-12', 'Buca, Izmir');

-- PERSON - Adopter (ID 13-27)
INSERT INTO PERSON (ID, F_name, L_name, Gender, Phone_no, E_mail, Birth_date, Address) VALUES
(13, 'Veysel',  'Sari',      'M', '05336521453', 'vsari1010@gmail.com',      '1988-07-25', 'Kadikoy, Istanbul'),
(14, 'Ramazan', 'Civelek',   'M', '05426197040', 'rmzn.cvlk@gmail.com',      '1996-01-20', 'Besiktas, Istanbul'),
(15, 'Ismail',  'Koybasi',   'M', '05359830115', 'koybasismail@gmail.com',   '1989-07-10', 'Sisli, Istanbul'),
(16, 'Ilkin',   'Aydin',     'F', '05345711905', 'ilkinaydin.gs@gmail.com',  '2000-01-05', 'Uskudar, Istanbul'),
(17, 'Umut',    'Bulut',     'M', '05306134791', 'blt.umt61@gmail.com',      '1983-03-15', 'Maltepe, Istanbul'),
(18, 'Edin',    'Visca',     'M', '05552134652', 'edinvisca07@gmail.com',    '1990-02-17', 'Cankaya, Ankara'),
(19, 'Hande',   'Baladin',   'F', '05375421331', 'bldn.handu@gmail.com',     '1997-09-01', 'Kecioren, Ankara'),
(20, 'Efecan',  'Karaca',    'M', '05079142327', 'efe.cankrc07@gmail.com',   '1989-11-16', 'Yenimahalle, Ankara'),
(21, 'Zeynep',  'Sonmez',    'F', '05316967345', 'sonmezeynepp@gmail.com',   '2002-04-30', 'Etimesgut, Ankara'),
(22, 'Emre',    'Akbaba',    'M', '05415611905', 'akbappemre10@gmail.com',   '1992-10-04', 'Mamak, Ankara'),
(23, 'Okan',    'Buruk',     'M', '05341905026', 'buruk.okans@gmail.com',    '1973-09-19', 'Konak, Izmir'),
(24, 'Eylul',   'Akarcesme', 'F', '05514732040', 'eyllakarcsm@gmail.com',    '1999-10-01', 'Bornova, Izmir'),
(25, 'Zehra',   'Gunes',     'F', '05304628172', 'guness.zehra@gmail.com',   '1999-07-07', 'Karsiyaka, Izmir'),
(26, 'Sila',    'Gencoglu',  'F', '05357504936', 'silagencoglu@gmail.com',   '1980-06-17', 'Buca, Izmir'),
(27, 'Cem',     'Adrian',    'M', '05438137562', 'adrian.cem@gmail.com',     '1980-11-30', 'Gaziemir, Izmir');

-- STAFF
INSERT INTO STAFF (Staff_ID, Position, Shelter_id) VALUES
(1,  'Director',     1), (2,  'Veterinarian', 1),
(3,  'Cleaner',      1), (4,  'Caretaker',    1),
(5,  'Director',     2), (6,  'Veterinarian', 2),
(7,  'Cleaner',      2), (8,  'Caretaker',    2),
(9,  'Director',     3), (10, 'Veterinarian', 3),
(11, 'Cleaner',      3), (12, 'Caretaker',    3);

-- ADOPTER
INSERT INTO ADOPTER (Adopter_ID, Adoption_experience) VALUES
(13, 1), (14, 1), (15, 1),
(16, 0), (17, 1),
(18, 0), (19, 0), (20, 0),
(21, 0), (22, 0),
(23, 1), (24, 1), (25, 1),
(26, 0), (27, 1);

-- PET
-- Istanbul (Shelter 1): Pet 1-7  | Adopted:1,4  Pending:3,6  Available:2,5,7
-- Ankara   (Shelter 2): Pet 8-14 | Adopted:8,11 Pending:10,14 Available:9,12,13
-- Izmir    (Shelter 3): Pet 15-21| Adopted:15,19 Pending:17  Available:16,18,20,21
INSERT INTO PET (Pet_id, Pet_name, Birth_d, Sex, Species, Adoption_status, Arrival_date, Photo, Shelter_id) VALUES
(1,  'Luna',       '2020-04-12', 'F', 'Siamese',            'Adopted',   '2023-06-01', NULL, 1),
(2,  'Garip',      '2019-08-30', 'M', 'German Shepherd',    'Available', '2023-07-15', NULL, 1),
(3,  'Kul Kedisi', '2022-02-18', 'F', 'British Shorthair',  'Pending',   '2024-11-01', NULL, 1),
(4,  'Serafettin', '2021-05-25', 'M', 'Tabby',              'Adopted',   '2023-08-10', NULL, 1),
(5,  'Hayat',      '2020-11-03', 'F', 'Turkish Angora',     'Available', '2024-02-20', NULL, 1),
(6,  'Pasa',       '2022-09-14', 'M', 'Kangal',             'Pending',   '2024-12-05', NULL, 1),
(7,  'Kleopatra',  '2023-01-07', 'F', 'Sphynx',             'Available', '2024-05-14', NULL, 1),
(8,  'Sansli',     '2020-03-22', 'M', 'Golden Retriever',   'Adopted',   '2023-07-05', NULL, 2),
(9,  'Prenses',    '2021-07-11', 'F', 'Persian',            'Available', '2023-09-18', NULL, 2),
(10, 'Ragnar',     '2022-01-29', 'M', 'Husky',              'Pending',   '2024-10-22', NULL, 2),
(11, 'Isik',       '2020-10-08', 'F', 'Scottish Fold',      'Adopted',   '2023-10-10', NULL, 2),
(12, 'Serif',      '2021-04-16', 'M', 'Labrador',           'Available', '2024-01-15', NULL, 2),
(13, 'Kibar',      '2022-06-30', 'F', 'Domestic Shorthair', 'Available', '2024-03-08', NULL, 2),
(14, 'Rifki',      '2023-02-14', 'M', 'Pug',                'Pending',   '2024-11-18', NULL, 2),
(15, 'Daisy',      '2020-07-19', 'F', 'Golden Retriever',   'Adopted',   '2023-08-20', NULL, 3),
(16, 'Hans',       '2021-11-05', 'M', 'German Shepherd',    'Available', '2023-10-05', NULL, 3),
(17, 'Kibirli',    '2022-04-23', 'F', 'Siamese',            'Pending',   '2025-01-10', NULL, 3),
(18, 'Dost',       '2021-08-17', 'M', 'Beagle',             'Available', '2024-02-14', NULL, 3),
(19, 'Emma',       '2022-12-01', 'F', 'Scottish Fold',      'Adopted',   '2024-04-01', NULL, 3),
(20, 'Dyson',      '2023-03-09', 'M', 'Poodle',             'Available', '2024-06-22', NULL, 3),
(21, 'Zara',       '2023-06-15', 'F', 'Kangal',             'Available', '2024-08-30', NULL, 3);

-- APPLICATION
INSERT INTO APPLICATION (Application_id, Application_date, Application_status, Pet_id, Staff_ID, Adopter_ID) VALUES
(1,  '2023-06-10', 'Rejected',  1,   4, 14),
(2,  '2023-06-15', 'Approved',  1,   4, 13),
(3,  '2023-08-18', 'Approved',  4,   4, 15),
(4,  '2023-09-05', 'Rejected',  2,   4, 16),
(5,  '2024-11-08', 'Pending',   3,   4, 17),
(6,  '2024-12-10', 'Pending',   6,   4, 14),
(7,  '2023-07-10', 'Rejected',  8,   8, 21),
(8,  '2023-07-18', 'Approved',  8,   8, 19),
(9,  '2023-10-18', 'Approved',  11,  8, 20),
(10, '2023-11-02', 'Rejected',  9,   8, 22),
(11, '2024-10-28', 'Pending',   10,  8, 18),
(12, '2024-11-25', 'Pending',   14,  8, 21),
(13, '2024-12-03', 'Pending',   14,  8, 22),
(14, '2023-08-28', 'Approved',  15, 12, 23),
(15, '2024-04-05', 'Rejected',  19, 12, 26),
(16, '2024-04-10', 'Approved',  19, 12, 24),
(17, '2023-11-14', 'Rejected',  16, 12, 25),
(18, '2025-01-15', 'Pending',   17, 12, 27);


-- ADOPTS
INSERT INTO ADOPTS (Pet_id, Adopter_ID, Adoption_fee, Adoption_date) VALUES
(1,  13, 500.00, '2023-06-20'),
(4,  15, 450.00, '2023-08-25'),
(8,  19, 600.00, '2023-07-25'),
(11, 20, 350.00, '2023-10-25'),
(15, 23, 400.00, '2023-09-05'),
(19, 24, 475.00, '2024-04-18');


-- MEDICAL_REPORT
INSERT INTO MEDICAL_REPORT (Pet_id, Report_id, Report_date, Treatments, Notes, Diagnosis) VALUES
(1,  1,  '2023-06-05', 'Vaccination, Deworming',                 'Healthy Siamese on arrival',              'Healthy'),
(2,  2,  '2023-07-19', 'Vaccination, Deworming',                 'Healthy adult shepherd',                  'Healthy'),
(3,  3,  '2024-11-05', 'Vaccination, Flea treatment',            'Flea infestation detected on arrival',    'Flea infestation'),
(4,  4,  '2023-08-14', 'Vaccination, Deworming',                 'Good condition, playful',                 'Healthy'),
(5,  5,  '2024-02-24', 'Vaccination, Nutritional supplements',   'Slightly underweight on arrival',         'Mild malnutrition'),
(6,  6,  '2024-12-09', 'Vaccination, Deworming',                 'Large dog, healthy',                      'Healthy'),
(7,  7,  '2024-05-18', 'Vaccination, Deworming',                 'Young sphynx, good condition',            'Healthy'),
(8,  8,  '2023-07-09', 'Vaccination, Deworming',                 'Active golden retriever, healthy',        'Healthy'),
(9,  9,  '2023-09-22', 'Vaccination, Ear cleaning, Medication',  'Ear mites detected',                      'Ear mites'),
(10, 10, '2024-10-26', 'Vaccination, Deworming',                 'Young husky, good condition',             'Healthy'),
(11, 11, '2023-10-14', 'Vaccination, Deworming',                 'Healthy Scottish Fold',                   'Healthy'),
(12, 12, '2024-01-19', 'Vaccination, Dental cleaning',           'Minor dental tartar observed',            'Dental issues'),
(13, 13, '2024-03-12', 'Vaccination, Deworming',                 'Healthy domestic shorthair',              'Healthy'),
(14, 14, '2024-11-22', 'Vaccination, Flea treatment',            'Flea infestation on arrival',             'Flea infestation'),
(15, 15, '2023-08-24', 'Vaccination, Deworming',                 'Healthy golden retriever',                'Healthy'),
(16, 16, '2023-10-09', 'Vaccination, Deworming',                 'Adult shepherd, good weight',             'Healthy'),
(17, 17, '2025-01-14', 'Vaccination, Fluid therapy',             'Slightly dehydrated on arrival',          'Dehydration'),
(18, 18, '2024-02-18', 'Vaccination, Deworming',                 'Healthy beagle',                          'Healthy'),
(19, 19, '2024-04-05', 'Vaccination, Deworming',                 'Young Scottish Fold, healthy',            'Healthy'),
(20, 20, '2024-06-26', 'Vaccination, Deworming',                 'Healthy poodle, playful',                 'Healthy'),
(21, 21, '2024-09-03', 'Vaccination, Deworming',                 'Young, healthy',                          'Healthy');


CREATE TABLE Pet_Photos (
    photo_id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT,
    photo_url VARCHAR(255),
    FOREIGN KEY (pet_id) REFERENCES PET(Pet_id) ON DELETE CASCADE
);

INSERT INTO Pet_Photos (pet_id, photo_url) VALUES
 (1,  'https://hizliresim.com/t7azort'),
 (2,  'https://hizliresim.com/sonoyw9'),
 (3,  'https://hizliresim.com/4ggf1y4'),
 (3,  'https://hizliresim.com/s561nck'),
 (4,  'https://hizliresim.com/p7kjmb9'),
 (4,  'https://hizliresim.com/4buvogf'),
 (5,  'https://hizliresim.com/17v5p1m'),
 (6,  'https://hizliresim.com/shz7hcw'),
 (7,  'https://hizliresim.com/b68p5cm'),
 (8,  'https://hizliresim.com/cwsli2m'),
 (8,  'https://hizliresim.com/9h60jm9'),
 (9,  'https://hizliresim.com/8xantf2'),
 (10, 'https://hizliresim.com/n34b7c7'),
 (11, 'https://hizliresim.com/cw5to0x'),
 (12, 'https://hizliresim.com/a2b9ui3'),
 (13, 'https://hizliresim.com/fzga7ri'),
 (14, 'https://hizliresim.com/rc1vbzj'),
 (15, 'https://hizliresim.com/h0cfdgh'),
 (16, 'https://hizliresim.com/s3rs4kz'),
 (17, 'https://hizliresim.com/53ui7zn'),
 (18, 'https://hizliresim.com/kbvi9fl'),
 (18, 'https://hizliresim.com/2cxrwp9'),
 (19, 'https://hizliresim.com/c5t1fae'),
 (20, 'https://hizliresim.com/8t0ifbl'),
 (21, 'https://hizliresim.com/p8u18uz');
