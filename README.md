# events-website-open-source

A Small Boilerplate for conferences websites made by Capitale Dev
It is open-source and free to use, only require attribution to Capitale Dev

## Licences
This website uses following tools :
- MaterializeCSS https://github.com/Dogfalo/materialize
- GrilladeCSS https://github.com/alsacreations/KNACSS
- Design based on Hoverboard : https://github.com/gdg-x/hoverboard

## How to use it
This template is made to work Firebase
- Change credentials in app.js with your own Firebase Credentials (Firebase Settingd > General Settings > New web app
- `Firebase init` > Select your project
- `Firebase emulators:start` to start navigating
- `Firebase deploy`

## Structure

Each page is a .html file in /public folder
Custom CSS is stored in style.css

Top menu, Mobile bottom menu and Footer are located in `elements` folder
Dynmic elements (Speakers display, Agenda) are located in `js`

## Firestore structure
### Speakers Collection

| |   |   | Description  |
|--|--|--|--|
| `speakers`  | speaker_uid  | `bio` string  |  Speaker Bio |
|   |   | `company` string   | Company of the speaker  |
|   |   |  `country` string | Speaker's country  |
|   |   |  `featured` boolean| Display speaker on homepage  |
|   |   |  `name` string | Speaker's name   |
|   |   |  `photoUrl` string | url to speaker's profil picture, ex /images/speakers/name.jpg   |
|   |   |  `title` string | Speaker's Role in the company  |

### Sessions Collection

| |   |   | Description  |
|---|---|---|---|
| `sessions`  | session_uid  | `begin` timestamp|  Start date & time of the session |
|   |   | `complexity` string   | Conference level (typically begginer, intermediate, expert)  |
|   |   |  `description` string | Conference Abstract  |
|   |   |  `end` timestamp| End date & time of the session  |
|   |   |  `lanage` string | Conference Langage   |
|   |   |  `speakers` array| Array with one string entry per speaker. Each entry should correspond to a speaker_uid from speakers collection   |
|   |   |  `stage` string| Stage  |
|   |   |  `title` string| Conference Title  |
