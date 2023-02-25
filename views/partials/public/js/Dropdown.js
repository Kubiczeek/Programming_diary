const button = document.getElementById("addCategoryButton");
let s = true;

function showDropdown() {
  if (s) {
    document.querySelector(".dropdownCategory").style.display = "flex";
    s = false;
  } else {
    document.querySelector(".dropdownCategory").style.display = "none";
    s = true;
  }
}

function spanDropdownClick(x) {
  const y = x.textContent;
  if (x.dataset.selected == 0) {
    x.style.backgroundColor = "#ECECEC";
    console.log(select);
    x.dataset.selected = 1;
  } else {
    x.style.backgroundColor = "#FFFFFF";
    x.dataset.selected = 0;
  }
}
