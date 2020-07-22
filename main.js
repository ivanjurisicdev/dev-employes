"use strict";

const xmlhttp = new XMLHttpRequest();
const url = "https://5efa12d2bc5f8f0016c675c7.mockapi.io/employes/items";

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let myArr = JSON.parse(this.responseText);
    pushItem(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function pushItem(arr) {
  let item = "";
  let i;
  for (i = 0; i < arr.length; i++) {
    item +=
      "<li>" +
      "<input disabled class='table-input' type='text' value=" +
      arr[i].name +
      ">" +
      "<button class='remove-button'>Delete</button>" +
      "<button class='up-button'>Up</button>" +
      "<button class='down-button'>Down</button>" +
      "<button class='edit-button'>Edit</button>" +
      "</li>";
  }
  document.getElementById("items").innerHTML = item;
}

// activat button on enter
const ctaInput = document.querySelector(".cta-input");

ctaInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13 && ctaInput.value != "") {
    document.querySelector(".cta-button").click();
  }
});

// adds a new item
const addItemInput = document.querySelector("input.cta-input");
const addItemButton = document.querySelector("button.cta-button");

addItemButton.addEventListener("click", () => {
  let ul = document.querySelector(".items-body");
  let li = document.createElement("li");
  li.innerHTML =
    "<input disabled class='table-input' type='text' value=" +
    addItemInput.value +
    ">" +
    "<button class='remove-button'>Delete</button>" +
    "<button class='up-button'>Up</button>" +
    "<button class='down-button'>Down</button>" +
    "<button class='edit-button'>Edit</button>";

  ul.appendChild(li);
  addItemInput.value = "";
});

// multiple button actions
const listDiv = document.querySelector(".container");
const listUl = listDiv.querySelector(".items-body");
const listLi = listDiv.querySelector("li");
// remove item
listUl.addEventListener("click", (event) => {
  if (event.target.tagName == "BUTTON") {
    if (event.target.className == "remove-button") {
      let li = event.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);
    }
  }
  // move item up
  if (event.target.className == "up-button") {
    let li = event.target.parentNode;
    let prevLi = li.previousElementSibling;
    let ul = li.parentNode;
    if (prevLi) {
      ul.insertBefore(li, prevLi);
    }
  }
  // move item down
  if (event.target.className == "down-button") {
    let li = event.target.parentNode;
    let nextLi = li.nextElementSibling;
    let ul = li.parentNode;
    if (nextLi) {
      ul.insertBefore(nextLi, li);
    }
  }
  // edit item down
  if (event.target.className == "edit-button") {
    let li = event.target.parentNode;
    li.classList.toggle("active");

    let input = event.target.parentNode.getElementsByTagName("input")[0];
    input.disabled = false;
  }
});
