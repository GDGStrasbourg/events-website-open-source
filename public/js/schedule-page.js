var firestore = firebase.firestore();
var speakers = new Map();
var sessions = [];
var pause_count = 0;
const default_image = "images/unknown.png";
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function Session(id, title, description, begin, end, complexity, stage, language, speakers = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.begin = new Date(begin);
    this.end = new Date(end);
    this.complexity = complexity;
    this.stage = stage;
    this.language = language;
    this.speakers = speakers;
    this.duration = new Date(this.end - this.begin);
    this.getHours = function() { return String("0" + this.begin.getHours()).slice(-2) };
    this.getMinutes = function() { return String("0" + this.begin.getMinutes()).slice(-2) };
    this.getDuration = function() { return (this.duration.getHours() > 1 ? (this.duration.getHours() - 1) + "h " : "") + String("0" + this.duration.getMinutes()).slice(-2) };
    this.getFormatTime = function() { return "Le " + this.begin.getDate() + " " + months[this.begin.getMonth()] + ", de " + String("0" + this.begin.getHours()).slice(-2) + ":" + String("0" + this.begin.getMinutes()).slice(-2) + " à " + String("0" + this.end.getHours()).slice(-2) + ":" + String("0" + this.end.getMinutes()).slice(-2)};
    this.getSpeakersDOM = function () {
        let speakersDOM = "";
        this.speakers.forEach((speaker) => {
            speakersDOM += speaker.getCardDOM();
        });
        return speakersDOM;
    };
    this.getCardDOM = function () {
        return `
            <div class="row">
                <div class="col s11">
                    <span class="schedule-title"> ${this.title} </span>
                    <p style="text-align: left; margin-bottom: 0px;"> ${this.description.slice(0, 132)}${this.description.length > 132 ? "..." : ""} </p>
                </div>
                <div class="col s1"> ${this.title !== "Break" ? this.language : ""} </div>
            </div>
            <div class="row" style="margin-top: -10px;">
                <div class="col s10">
                    <span class="schedule-level"> 
                    ${this.complexity !== "Break" ? this.complexity : ""}
                    <br>
                    ${this.complexity !== "Break" ? "Stage " + this.stage : ""}
                    </span>
                </div>
                <div class="col s2 right-align">
                    
                </div>
            </div>
            <div class="row" style="margin-top: 50px;">
                <div class="col s12">
                    <span class="schedule-level"> ${this.getDuration()}  mins</span>
                    ${this.speakers.length !== 0 ? "<h6>Speakers</h6>" : ""}
                    ${this.getSpeakersDOM()}
                </div>
            </div>
        `;
    }
}

function Speaker(id, name, bio, country, company, title, socials, photoUrl) {
    this.id = id;
    this.name = name;
    this.bio = bio;
    this.country = country;
    this.company = company;
    this.title = title;
    this.socials = socials;
    this.photoUrl = photoUrl;
    this.getCardDOM = function() {
        return `
            <a class="modal-trigger" href="#${this.id}" style="color: black;">
                <div class="row" style="margin-top: 10px; margin-bottom: 0;">
                    <div class="col s12">
                        <img align="left" class="circle" src=" ${this.photoUrl} " style="height: 32px; margin-right: 10px;">
                        <span>${this.name}</span>
                        <br>
                        <span style="font-size: 12px;">${this.company} / ${this.country}</span>
                    </div>
                </div>
            </a>
        `;
    }
}

function addCard(session, full_size = false) {
    custom_size = (session.complexity === "Break") ? `md:col-span-${session.stage}` : undefined;
    session.description = session.description.replace(/\n/g, "<br>");
    $('#cards').append(`
        <div id="prog-${session.id}" class="program-card ${session.complexity !== "Break" ? "clickable-program-card" : ""} ${full_size === true ? "col-span-full" : session.stage == 1 ? "col-start-1 first-in-line" : ""}${!full_size && custom_size ? custom_size : ""}">
            <${session.complexity === "Break" ? "span" : "a"} ${session.complexity !== "Break" ? "class=\"modal-trigger\"" : ""} style="color: black;" ${session.complexity !== "Break" ? "href=\"#" + session.id + "\"" : ""}>
                ${session.stage == 1 || custom_size ? `
                    <div class="prog-time">
                        <span class="prog-hour">${session.getHours()}</span>
                        <span class="prog-minutes">${session.getMinutes()}</span>
                    </div>
                ` : ""}
                ${session.getCardDOM()}
            </${session.complexity === "Break" ? "span" : "a"}>
        </div>
    `);
    if (session.title !== "Break") {
        $('#modals').append(`
            <div id="${session.id}" class="modal">
                <div style="height: 200px; background-color:#eeecec; padding: 23.5px;">
                    <div class="container row">
                        <div class="col s12">
                            <h1 class="container-title" style="margin-top: 40px;">${session.title}</h1>
                            <span>${session.language}</span>
                        </div>
                    </div>
                    <a href="#!" class="modal-close" style="position: absolute; top: 10px; right: 10px; fill: black; width: 20px;">
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g>
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                        </g></svg>
                    </a>
                </div>
                <div class="modal-content container">
                    <h6>${session.getFormatTime()}</h6>
                    <h6>Stage ${session.stage}</h6>
                    <p style="text-align: justify;">${session.description}</p>
                </div>
                <div class="modal-content container">
                    ${session.speakers.length !== 0 ? "<h6>Speakers</h6>" : ""}
                    ${session.getSpeakersDOM()}
                </div>
                <div class="modal-footer">
                </div>
            </div>
        `); $('.modal').modal({});
    }
}

function speakerModal(speaker) {
    $('#modals').append(`
        <div id="${speaker.id}" class="modal">
            <div style="height: 175px; background-color:#eeecec; padding: 23.5px;">
                <div class="container row">
                    <div class="col s3">
                        <img src="${speaker.photoUrl}" class="circle auto-fit">
                    </div>
                    <div class="col s9">
                        <h1 class="container-title" style="margin-top: 40px; line-height: 0px;">${speaker.name}</h1>
                        <span>${speaker.country}</span>
                    </div>
                </div>
            </div>
            <a href="#!" class="modal-close" style="position: absolute; top: 10px; right: 10px; fill: black; width: 20px;">
                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g>
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                </g></svg>
            </a>
            <div class="modal-content container">
                <h5>${speaker.title} · ${speaker.company}</h5>
                <p style="text-align: justify;">${speaker.bio}</p>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    `); $('.modal').modal({});
}

firestore.collection("speakers").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let speaker = new Speaker(doc.id, doc.data().name, doc.data().bio, doc.data().country, doc.data().company, doc.data().title, doc.data().socials, doc.data().photoUrl);
        speakers.set(doc.id, speaker);
        speakerModal(speaker);
    });
    firestore.collection("sessions").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let session = new Session(doc.id, doc.data().title, doc.data().description, doc.data().begin.seconds * 1000, doc.data().end.seconds * 1000, doc.data().complexity, doc.data().stage, doc.data().language);
            doc.data().speakers.forEach((speaker_id) => {
                session.speakers.push(speakers.get(speaker_id));
            });
            sessions.push(session);
        });
        sessions.sort((a, b) => {
            if (a.begin.getTime() !== b.begin.getTime()) {
                return a.begin.getTime() - b.begin.getTime();
            } else if (a.end.getTime() !== b.end.getTime()) {
                return a.end.getTime() - b.end.getTime();
            } else {
                return a.stage - b.stage;
            }
        });
        let line = {
            begin: sessions[0].begin,
            end: sessions[0].end,
            count: 1
        };
        let multi_line = [];
        sessions.forEach((session, index) => {
            if (session.begin.getTime() > line.begin.getTime()) {
                multi_line.forEach((element, index, object) => {
                    if (element.session.end.getTime() <= line.end.getTime()) {
                        $(`#prog-${element.session.id}`).addClass("row-span-" + (line.count - element.line + 1));
                        object.splice(index, 1);
                    }
                });
                line.begin = session.begin;
                line.end = session.end;
                line.count += 1;
            }
            addCard(session, session.stage === "all" || (index + 1 < sessions.length ? sessions[index + 1].begin.getTime() !== session.begin.getTime() && session.stage == 1 : session.stage == 1));
            if (session.end.getTime() > line.end.getTime()) {
                multi_line.push({
                    session: session,
                    line: line.count
                });
            }
        });
        multi_line.forEach((element, index, object) => {
            $("prog-" + element.session.id).addClass("row-span-" + (line.count - element.line));
            object.splice(index, 1);
        }); 
    });
});