const btnSubmit = document.querySelector(".btn-submit");
const btnClose = document.querySelector(".xclose");
const form = document.querySelector(".form");
const input = document.getElementById("input");
const message = document.querySelector(".msg");
const notes = document.querySelector(".note");
let data = {};
let calendar = {};

const acceptData = () => {
  calendar["date"] = date.value;
  data["text"] = input.value;
  createNote();
};

const formValidation = () => {
  if (input.value === "") {
    message.innerHTML = "Note cannot be blank!";
  } else {
    message.innerHTML = "";
    acceptData();
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  formValidation();
});

let createNote = () => {
  notes.innerHTML += `
        <div>
          <h4>${calendar.date}</h4>
          <p>${data.text}</p>
          <button class="btn-details">View Details</button> 
          <i onClick="deleteNote(this)" class="fa-solid fa-circle-xmark xclose"></i>
        </div>`;
  input.value = "";
};

let deleteNote = (e) => {
  e.parentElement.remove();
};
