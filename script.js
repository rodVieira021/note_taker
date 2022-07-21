// window.onload = loadTasks;

const btnSubmit = document.querySelector(".btn-submit");
const btnClose = document.querySelector(".xclose");
const form = document.querySelector(".form");
const inputTitle = document.getElementById("title");
const inputText = document.getElementById("input");
const inputDate = document.getElementById("date");
const message = document.querySelector(".msg");
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
          <i onClick="deleteNote(this)" class="fa-solid fa-circle-xmark xclose"></i>
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

// function loadTasks() {
//   if (localStorage.getItem("notes") === null) return;

//   let note = Array.from(JSON.parse(localStorage.getItem("notes")));

//   note.forEach((nn) => {
//     notes.innerHTML += `
//         <div>
//         <h3>${nn.title}</h3>
//         <h4>Date: ${nn.date}</h4>
//         <p>${nn.text}</p>
//         <button class="btn-details">View Details</button>
//         <i onClick="deleteNote(this)" class="fa-solid fa-circle-xmark xclose"></i>
//         <button class="xedit">Edit</button>
//         </div>
//         `;
//   });
// }

const deleteNote = (e) => {
  e.parentElement.remove();
};

// to fix,  it is deleting the previous saved date in the local storage instead of save all new notes
