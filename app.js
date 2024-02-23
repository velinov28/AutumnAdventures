window.addEventListener("load", solve);

// Selectors

// Section Add Autumn Event
const addAutumnEventForm = document.querySelector("form");
const whenTimePicker = document.getElementById("time");
const whenDatePicker = document.getElementById("date");
const placeInput = document.getElementById("place");
const eventInput = document.getElementById("event-name");
const contactsInput = document.getElementById("email");
const addEventButton = document.getElementById("add-btn");
const clearButton = document.getElementById("clear");

let inputsAddAutumnEventSection = [
  (whenTimePicker.value = `10:52`),
  (whenDatePicker.value = `2024-02-07`),
  (placeInput.value = `Palace of Culture`),
  (eventInput.value = `Best of 2024`),
  (contactsInput.value = `stiliyan_velinov@abv.bg`),
];

// Section Last Check
const checkList = document.getElementById("check-list");
let editButton, continueButton;

// Section Upcoming
const upcomingList = document.getElementById("upcoming-list");
let moveToFinishedButton;

// Section Finished
const finishedList = document.getElementById("finished-list");

// Global variables
let addAutumnEventState, addList, addButtons;

function solve() {}

// Event handler functions
function addAutumnEventHandler(e) {
  //   const uiFieldValuesForCheck = [
  //     whenTimePicker.value,
  //     whenDatePicker.value,
  //     placeInput.value,
  //     eventInput.value,
  //     contactsInput.value,
  //   ];

  if (_isEmptyString()) {
    alert("Please fulfill all the fields.");
    return;
  }

  //   addAutumnEventState = {
  //     ...inputsAddAutumnEventSection,
  //   };

  // addAutumnEventState = {
  //     time:
  // }

  console.log(`addAutumnEventState: `);
  console.log(addAutumnEventState);

  _displayLastCheckSection();
  _resetAddAutumnEventSection();
}

function editLastCheckHandler() {
  _transferDataFromLastCheckToAddAutumnEvent();
}

function continueLastCheckHandler() {
  let html;
  checkList.firstElementChild.remove();

  addButtons = `
        <button class="finished-btn">Move to Finished</button>
        `;
  html = addList.replace(`</li>`, addButtons + `</li>`);
  upcomingList.insertAdjacentHTML("afterbegin", html);

  moveToFinishedButton = document.querySelector(".finished-btn");

  // Add event listener to the just displayed 'move to finished' button
  moveToFinishedButton.addEventListener("click", moveToFinishedHandler);
}

function moveToFinishedHandler() {
  let html;
  upcomingList.firstElementChild.remove();

  html = addList;
  finishedList.insertAdjacentHTML("afterbegin", html);
}

function clearEventHandler() {
  finishedList.firstElementChild.remove();
  addEventButton.disabled = false;
}

// Helpers

function _isEmptyString() {
  console.log(inputsAddAutumnEventSection);
  return inputsAddAutumnEventSection.some((input) => input === "");
}

function _displayLastCheckSection() {
  let html;
  addList = `
        <li class="event-content">
            <article>
                <p>Begins: ${whenDatePicker.value} at ${whenTimePicker.value}</p>
                <p>In: ${placeInput.value} </p>
                <p>Event: ${eventInput.value} </p>
                <p>Contact: ${contactsInput.value} </p>
            </article>
        </li>
    `;
  addButtons = `
        <button class="edit-btn">Edit</button>
        <button class="continue-btn">Continue</button>
        `;
  html = addList.replace(`</li>`, addButtons + `</li>`);
  checkList.insertAdjacentHTML("afterbegin", html);

  editButton = document.querySelector(".edit-btn");
  continueButton = document.querySelector(".continue-btn");

  // Add evenet listeners to the just displayed 'edit' and 'continue' buttons
  editButton.addEventListener("click", editLastCheckHandler);
  continueButton.addEventListener("click", continueLastCheckHandler);
}

function _resetAddAutumnEventSection() {
  inputsAddAutumnEventSection.fill("", 0, inputsAddAutumnEventSection.length);
  whenTimePicker.value = "";
  whenDatePicker.value = "";
  placeInput.value = "";
  eventInput.value = "";
  contactsInput.value = "";

  addEventButton.disabled = true;

  console.log("_resetAddAutumnEventSection");
  console.log(inputsAddAutumnEventSection);
}

function _transferDataFromLastCheckToAddAutumnEvent() {
  console.log("within _transferDataFromLastCheckToAddAutumnEvent");
}

function _hideLastCheckSection() {}

// Event listeners
// addAutumnEventForm.addEventListener("submit", _addEventHandler);
addEventButton.addEventListener("click", addAutumnEventHandler);
clearButton.addEventListener("click", clearEventHandler);
