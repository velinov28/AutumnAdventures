window.addEventListener("load", solve);

function solve() {
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
  let addList, addButtons;

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
    const values = Object.values(autumnEventState);

    return values.some((input) => input === "");
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
