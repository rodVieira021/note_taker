const btnSubmit = document.querySelector(".btn-submit");
const btnClose = document.querySelector(".xclose");
const form = document.querySelector(".form");
const inputText = document.getElementById("input");
const inputDate = document.getElementById("date");
const message = document.querySelector(".msg");
const notes = document.querySelector(".note");
let data = [];

// func get data
const acceptData = () => {
  data.push({
    text: inputText.value,
    date: inputDate.value,
  });
  console.log(data);

  //   data["date"] = date.value;
  //   data["input"] = input.value;
  createNote();
};

// form validation
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

//func creating a note
const createNote = () => {
  notes.innerHTML = "";
  data.map((element, index) => {
    notes.innerHTML += `
              <div>
                <h4>${element.date}</h4>
                <p>${element.text}</p>
                <button class="btn-details">View Details</button> 
                <i onClick="deleteNote(this)" class="fa-solid fa-circle-xmark xclose"></i>
                <button class="xedit">Edit</button>
              </div>
              `;
  });
  input.value = "";
};

const deleteNote = (e) => {
  e.parentElement.remove();
};
