const btnSubmit = document.querySelector(".btn-submit");
const btnClose = document.querySelector(".xclose");
const mdContainer = document.querySelector(".modal-conatiner");
const btnCloseMd = document.getElementById("xmodal");
const modal = document.querySelectorAll(".modal");
const mdInner = document.querySelector(".innerTxt");
const form = document.querySelector(".form");
const inputTitle = document.getElementById("title");
const inputText = document.getElementById("input");
const inputDate = document.getElementById("date");
const message = document.querySelector(".msg");
let notes = document.querySelector(".note");
let data = [];

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

btnSubmit.addEventListener("click", formValidation);

//func creating a note
const createNote = () => {
  notes.innerHTML = "";
  data.map((element) => {
    return (notes.innerHTML += `
          <div>
          <h3>${element.title}</h3>
          <h4>Date:${element.date}</h4>
          <p>${element.text}</p>
          <button class="btn-details" onclick="openModal(this)">View Details</button> 
          <i class="fa-solid fa-circle-xmark xclose" onclick="deleteNote(this)" ></i>
          <button class="xedit" onclick="editNote(this)">Edit</button>
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
//reset form
const resetForm = () => {
  input.value = "";
  title.value = "";
  date.value = "";
};

const deleteNote = (target) => {
  let data = Array.from(JSON.parse(localStorage.getItem("notes")));

  data = data.filter(function (item) {
    let parentDiv = target.parentElement;
    let value = parentDiv.children[0].innerHTML;
    return item.title !== value;
  });
  data = localStorage.setItem("notes", JSON.stringify(data));
  target.parentElement.remove();
};

// IIFE (Immediately invoked function expression) load tasks from local storage
(() => {
  data = JSON.parse(localStorage.getItem("notes")) || [];
  data.forEach((element) => {
    createNote(element);
  });
})();

//MODAL
const openModal = () => {
  modal.forEach((container) => {
    container.classList.remove("hidden");
  });
};

const closeModal = () => {
  modal.forEach((container) => {
    container.classList.add("hidden");
  });
};

//Shows info in the modal
const btnDtt = document.querySelectorAll(".btn-details");

btnDtt.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    mdInner.innerHTML = `
      <h2 class="inner-title">${e.target.parentElement.children[0].innerHTML}</h2>
      <h3 class="inner-data">${e.target.parentElement.children[1].innerHTML}</h3>
      <p class="inner-text">${e.target.parentElement.children[2].innerHTML}</p>`;
  });
});

// //EDIT function
const editNote = (e) => {
  btnSubmit.classList.add("hidden");
  btnSave.classList.remove("hidden");
  title.value = e.parentElement.children[0].innerHTML;
  date.value = e.parentElement.children[1].innerHTML;
  input.value = e.parentElement.children[2].innerHTML;
  deleteNote(e);
};

const btnSave = document.querySelector(".btn-save");
btnSave.addEventListener("click", function (b) {
  btnSubmit.classList.remove("hidden");
  btnSave.classList.add("hidden");
  formValidation(b);
});
