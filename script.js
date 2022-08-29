const btnSubmit = document.querySelector(".btn-submit");
const btnClose = document.querySelector(".xclose");
const btnCloseMd = document.getElementById("xmodal");
const modal = document.querySelectorAll(".modal");
const mdInner = document.querySelector(".innerTxt");
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
  window.location.reload();
};
btnSubmit.addEventListener("click", formValidation);

//func creating a note
const createNote = () => {
  notes.innerHTML = "";
  data.map((element) => {
    return (notes.innerHTML += `
          <div>
          <h3>${element.title}</h3>
          <h4>${element.date}</h4>
          <p>${element.text}</p>
          <button class="btn-details" onclick="openModal(this)">View Details</button> 
          <i class="fa-solid fa-circle-xmark xclose" onclick="deleteNote(this)" ></i>
          <button class="xedit" onclick="editNote(this)">Edit</button>
          <button class="btn-save hidden" onclick="saveNote(this)">Save</button>
          </div>
          `);
  });
  input.value = "";
  title.value = "";
  date.value = "";
  localStorage.setItem("notes", JSON.stringify(data));
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

const deleteNote = (target) => {
  data = Array.from(JSON.parse(localStorage.getItem("notes")));

  data = data.filter(function (item) {
    let parentDiv = target.parentElement;
    let value = parentDiv.children[0].innerHTML;
    return item.title !== value;
  });
  localStorage.setItem("notes", JSON.stringify(data));
  target.parentElement.remove();
};

// IIFE load tasks from local storage
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

const btnEdit = document.querySelector(".xedit");
const btnSave = document.querySelector(".btn-save");
const noteColor = document.querySelector(".note > div");

const editNote = (e) => {
  const parentDiv = e.parentElement;
  e.classList.add("hidden");
  parentDiv.children[6].classList.remove("hidden"); //Is there a better way to target this button?

  parentDiv.style.border = "1px solid red";
  title.value = e.parentElement.children[0].innerHTML;
  date.value = e.parentElement.children[1].innerHTML;
  input.value = e.parentElement.children[2].innerHTML;
};

//Save and store saved notes
const saveNote = (e) => {
  data = Array.from(JSON.parse(localStorage.getItem("notes")));
  const parentDiv = e.parentElement;
  e.classList.add("hidden");
  parentDiv.children[5].classList.remove("hidden");
  btnEdit.classList.remove("hidden");
  parentDiv.style.border = "1px solid gray";

  if (title.value != e.parentElement.children[0].innerHTML) {
    e.parentElement.children[0].innerHTML = title.value;

    data.forEach((objOne) => {
      objOne.title = e.parentElement.children[0].innerHTML;
    });
  }

  if (date.value != e.parentElement.children[1].innerHTML) {
    e.parentElement.children[1].innerHTML = date.value;

    data.forEach((objTwo) => {
      objTwo.date = e.parentElement.children[1].innerHTML;
    });
  }

  if (input.value != e.parentElement.children[2].innerHTML) {
    e.parentElement.children[2].innerHTML = input.value;

    data.forEach((objThree) => {
      objThree.text = e.parentElement.children[2].innerHTML;
    });
  }
  localStorage.setItem("notes", JSON.stringify(data));

  title.value = "";
  date.value = "";
  input.value = "";
};
