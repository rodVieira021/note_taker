const btnSubmit = document.querySelector(".btn-submit");
const btnClose = document.querySelector(".xclose");
const btnCloseMd = document.querySelector(".xclose-modal");
const btnDetails = document.querySelector(".btn-details");
const mdContainer = document.querySelector(".modal-container");
const form = document.querySelector(".form");
const inputTitle = document.getElementById("title");
const inputText = document.getElementById("input");
const inputDate = document.getElementById("date");
const message = document.querySelector(".msg");
// const notesAll = document.querySelectorAll(".note");
let notes = document.querySelector(".note");
let data = [];

const listener = form.addEventListener("submit", function (e) {
  e.preventDefault();
  formValidation();
});
// form validation
const formValidation = () => {
  if (input.value === "") {
    message.innerHTML = "Note cannot be blank!";
  } else {
    message.innerHTML = "";
    acceptData();
    createNote();
  }
};

//func creating a note
const createNote = () => {
  notes.innerHTML = "";
  data.map((element) => {
    return (notes.innerHTML += `
          <div>
          <h3>${element.title}</h3>
          <h4>Date: ${element.date}</h4>
          <p>${element.text}</p>
          <button class="btn-details">View Details</button> 
          <i class="fa-solid fa-circle-xmark xclose" onclick="deleteNote(this)" ></i>
          <button class="xedit">Edit</button>
          </div>
          `);
  });
  resetForm();
};

// func get data
const acceptData = () => {
  data.push({
    title: inputTitle.value,
    text: inputText.value,
    date: inputDate.value,
  });
  localStorage.setItem("notes", JSON.stringify(data));
};

const resetForm = () => {
  input.value = "";
  title.value = "";
  date.value = "";
};

// const deleteNote = (event) => {
//   //MINE
//   let data = Array.from(JSON.parse(localStorage.getItem("notes")));

//   data = data.filter(function (note) {
//     if (note.note !== event.value) {
//       console.log("not the same");
//     }
//   });
// };

// const deleteNote = (event) => { //Attempt 1
//   let data = Array.from(JSON.parse(localStorage.getItem("notes")));
//   data = data.filter((note) => note.note !== event.value);
//   localStorage.setItem("notes", JSON.stringify(data));
//   event.parentElement.remove();
// };

const deleteNote = (event) => {  //Attempt 2
  let data = Array.from(JSON.parse(localStorage.getItem("notes")));
  data.forEach((note, i) => {
    if (note.note === event.parentElement.children[1].value) {
      data.splice(i, 1);
    }
  });
  localStorage.setItem("notes", JSON.stringify(data));
  event.parentElement.remove();
};

// IIFE (Immediately invoked function expression) load tasks from local storage
(() => {
  data = JSON.parse(localStorage.getItem("notes")) || [];
  data.forEach((element) => {
    createNote();
  });
})();

// MODAL DETAILS

// notesAll.forEach((detail) => {
//   detail.addEventListener("click", function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     mdContainer.classList.remove("hidden");
//   });
// });

// btnDetails.addEventListener("click", function (e) {
//   e.preventDefault();
//   mdContainer.classList.remove("hidden");
// });

// //btn add all and target
// btnCloseMd.addEventListener("click", function (e) {
//   e.preventDefault();
//   mdContainer.classList.add("hidden");
// });

//FIX THE DELETE FUNCTION, LOCALSTORAGE IS NOT UPDATING
