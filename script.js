/* =========================================================
   PERSONAL PROFILE PROGRAM
   Stores personal info in an object, displays it multiple
   ways (console.log, console.table, alert/confirm, DOM),
   and performs a few date/time calculations.
   ========================================================= */

// ---------- 1. THE STUDENT PROFILE OBJECT ----------
const studentProfile = {
  fullName: "Michelle Wangari Kinuthia",
  age: 22,
  country: "Kenya",
  course: "BSc. Information Technology",
  hobbies: ["Reading novel", "Playing solitaire", "Hiking", "Coding side-projects"],
  favoriteLanguage: "JavaScript",

  // birth date used later for the "age in days" calculation
  birthDate: "2003-09-24",

  // year the course started / total course length, used for
  // the "years of study left" calculation
  courseStartYear: 2024,
  courseLengthYears: 4,

  // ---------- METHOD: text summary of the profile ----------
  displaySummary() {
    return (
      `Name: ${this.fullName}\n` +
      `Age: ${this.age}\n` +
      `Country: ${this.country}\n` +
      `Course: ${this.course}\n` +
      `Hobbies: ${this.hobbies.join(", ")}\n` +
      `Favorite Language: ${this.favoriteLanguage}`
    );
  },

  // ---------- METHOD: a flat object, handy for console.table ----------
  toTableRow() {
    return {
      "Full Name": this.fullName,
      "Age": this.age,
      "Country": this.country,
      "Course": this.course,
      "Hobbies": this.hobbies.join(", "),
      "Favorite Language": this.favoriteLanguage
    };
  }
};

// ---------- 2. CALCULATIONS ----------
function calculateAgeInDays(birthDateString) {
  const birth = new Date(birthDateString);
  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((today - birth) / msPerDay);
}

function calculateYearsOfStudyLeft(startYear, lengthYears) {
  const currentYear = new Date().getFullYear();
  const yearsCompleted = currentYear - startYear;
  const yearsLeft = lengthYears - yearsCompleted;
  return Math.max(yearsLeft, 0);
}

function calculateGraduationYear(startYear, lengthYears) {
  return startYear + lengthYears;
}

function calculateDaysUntilNextBirthday(birthDateString) {
  const birth = new Date(birthDateString);
  const today = new Date();
  let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((nextBirthday - today) / msPerDay);
}

const ageInDays = calculateAgeInDays(studentProfile.birthDate);
const yearsLeft = calculateYearsOfStudyLeft(studentProfile.courseStartYear, studentProfile.courseLengthYears);
const gradYear = calculateGraduationYear(studentProfile.courseStartYear, studentProfile.courseLengthYears);
const daysToBirthday = calculateDaysUntilNextBirthday(studentProfile.birthDate);

// ---------- 3. console.log() DISPLAY ----------
console.log("========== STUDENT PROFILE (console.log) ==========");
console.log(studentProfile.displaySummary());
console.log("-----------------------------------------------------");
console.log(`Age in days: ${ageInDays.toLocaleString()}`);
console.log(`Years of study left: ${yearsLeft}`);
console.log(`Expected graduation year: ${gradYear}`);
console.log(`Days until next birthday: ${daysToBirthday}`);
console.log("=====================================================");

// ---------- 4. console.table() DISPLAY ----------
function logProfileTable() {
  console.table(studentProfile.toTableRow());
  console.table(
    studentProfile.hobbies.map((hobby, i) => ({ "#": i + 1, Hobby: hobby }))
  );
}
logProfileTable(); // run once on load

// ---------- 5. DOM DISPLAY ----------
function renderProfileCard() {
  const card = document.getElementById("profileCard");
  card.innerHTML = `
    <div class="field-row"><span class="field-label">Full Name</span><span class="field-value">${studentProfile.fullName}</span></div>
    <div class="field-row"><span class="field-label">Age</span><span class="field-value">${studentProfile.age}</span></div>
    <div class="field-row"><span class="field-label">Country</span><span class="field-value">${studentProfile.country}</span></div>
    <div class="field-row"><span class="field-label">Course</span><span class="field-value">${studentProfile.course}</span></div>
    <div class="field-row"><span class="field-label">Hobbies</span><span class="field-value">
      ${studentProfile.hobbies.map(h => `<span class="hobby-chip">${h}</span>`).join("")}
    </span></div>
    <div class="field-row"><span class="field-label">Favorite Language</span><span class="field-value">${studentProfile.favoriteLanguage}</span></div>
  `;
}

function renderCalcCard() {
  const grid = document.getElementById("calcGrid");
  const items = [
    { num: ageInDays.toLocaleString(), lbl: "Age in days" },
    { num: yearsLeft, lbl: "Years of study left" },
    { num: gradYear, lbl: "Expected graduation year" },
    { num: daysToBirthday, lbl: "Days to next birthday" }
  ];
  grid.innerHTML = items
    .map(i => `<div class="calc-item"><span class="num">${i.num}</span><span class="lbl">${i.lbl}</span></div>`)
    .join("");
}

document.getElementById("stampDate").textContent = new Date().toLocaleDateString();

renderProfileCard();
renderCalcCard();

// ---------- 6. ALERT / CONFIRM DIALOGS ----------
document.getElementById("btnSummary").addEventListener("click", () => {
  alert(studentProfile.displaySummary());
});

document.getElementById("btnConfirm").addEventListener("click", () => {
  const ok = confirm(
    `Confirm enrollment details?\n\n` +
    `${studentProfile.fullName} is enrolled in ${studentProfile.course} ` +
    `and expected to graduate in ${gradYear}.`
  );
  console.log(ok ? "Enrollment confirmed by user." : "Enrollment confirmation cancelled.");
  alert(ok ? "Enrollment confirmed. ✔" : "Enrollment not confirmed.");
});

document.getElementById("btnTable").addEventListener("click", () => {
  logProfileTable();
  alert("Table logged to the console — press F12 to view it.");
});
