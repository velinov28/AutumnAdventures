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

let autumnEventState;

// Section Last Check
const checkList = document.getElementById("check-list");
let editButton, continueButton;

// Section Upcoming
const upcomingList = document.getElementById("upcoming-list");
let moveToFinishedButton;

// Section Finished
const finishedList = document.getElementById("finished-list");
const clearButton = document.getElementById("clear");

// Global variables
let listItem = document.createElement("li");
listItem.classList.add("event-content");

function solve() {
  // Event handler functions
  function addAutumnEventHandler() {
    autumnEventState = {
      time: whenTimePicker.value,
      date: whenDatePicker.value,
      place: placeInput.value,
      event: eventInput.value,
      contacts: contactsInput.value,
    };

    if (_isEmptyString()) {
      alert("Please fulfill all the fields.");
      return;
    }

    _displayLastCheckSection();
    _resetAddAutumnEventSection();
  }

  function editLastCheckHandler() {
    _transferDataFromLastCheckToAddAutumnEvent();

    checkList.firstElementChild.remove();
    addEventButton.disabled = false;
  }

  function continueLastCheckHandler() {
    listItem.removeChild(editButton);
    listItem.removeChild(continueButton);

    _createAndAppendMoveToFinishedButton();
    checkList.removeChild(listItem);
    upcomingList.appendChild(listItem);
  }

  function moveToFinishedHandler() {
    listItem.removeChild(moveToFinishedButton);
    upcomingList.removeChild(listItem);
    finishedList.appendChild(listItem);
  }

  function clearEventHandler() {
    finishedList.firstElementChild.remove();
    addEventButton.disabled = false;
  }

  // Helpers

  function _isEmptyString() {
    const values = Object.values(autumnEventState);

    return values.some((input) => input === "");
  }

  function _displayLastCheckSection() {
    _createAndAppendListItem();
    _createAndAppendEditAndContinueButtons();
  }

  function _createAndAppendListItem() {
    // Removes the previous children if any
    listItem.replaceChildren();

    // Creates the elements in the DOM
    const article = document.createElement("article");

    const paragraph1 = document.createElement("p");
    paragraph1.textContent = `Begins: ${whenDatePicker.value} at: ${whenTimePicker.value}`;

    const paragraph2 = document.createElement("p");
    paragraph2.textContent = `In: ${placeInput.value}`;

    const paragraph3 = document.createElement("p");
    paragraph3.textContent = `Event: ${eventInput.value}`;

    const paragraph4 = document.createElement("p");
    paragraph4.textContent = `Contact: ${contactsInput.value}`;

    // Attaches the newly created elements
    article.appendChild(paragraph1);
    article.appendChild(paragraph2);
    article.appendChild(paragraph3);
    article.appendChild(paragraph4);

    listItem.appendChild(article);
    checkList.appendChild(listItem);
  }

  function _createAndAppendEditAndContinueButtons() {
    editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");

    continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    continueButton.classList.add("continue-btn");

    listItem.appendChild(editButton);
    listItem.appendChild(continueButton);

    // Add event listeners to the just displayed 'edit' and 'continue' buttons
    editButton.addEventListener("click", editLastCheckHandler);
    continueButton.addEventListener("click", continueLastCheckHandler);
  }

  function _createAndAppendMoveToFinishedButton() {
    moveToFinishedButton = document.createElement("button");
    moveToFinishedButton.textContent = "Move to Finished";
    moveToFinishedButton.classList.add("finished-btn");

    listItem.appendChild(moveToFinishedButton);

    // Add event listener to the just displayed 'move to finished' button
    moveToFinishedButton.addEventListener("click", moveToFinishedHandler);
  }

  function _resetAddAutumnEventSection() {
    whenTimePicker.value = "";
    whenDatePicker.value = "";
    placeInput.value = "";
    eventInput.value = "";
    contactsInput.value = "";

    addEventButton.disabled = true;
  }

  function _transferDataFromLastCheckToAddAutumnEvent() {
    whenTimePicker.value = autumnEventState.time;
    whenDatePicker.value = autumnEventState.date;
    placeInput.value = autumnEventState.place;
    eventInput.value = autumnEventState.event;
    contactsInput.value = autumnEventState.contacts;
  }

  // Event listeners
  addEventButton.addEventListener("click", addAutumnEventHandler);
  clearButton.addEventListener("click", clearEventHandler);
}
