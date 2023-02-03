function rawString(str) {
  return str.replace(/\t/g, "").replace(/\n/g, "");
}

function showPopUp(name, action, x) {
  const popup = document.getElementById("overlayDiv");
  popup.style.display = "block";
  popup.querySelector(".popupTitle").textContent = name;
  popup.querySelector(".addRecordForm").setAttribute("action", action);
  document.getElementById("addDate").value = "";
  document.getElementById("addTimespent").value = "";
  document.getElementById("addLanguage").value = "";
  document.getElementById("addRating").value = "3";
  document.getElementById("ratingOutput").textContent = "3";
  document.getElementById("addProgrammer").value = "";
  document.getElementById("addDescription").value = "";
  if (action != "/editRecord") return;
  let card;
  for (const c of document.getElementsByClassName("record")) {
    if (c.querySelector(".editRec") == x) {
      card = c;
      break;
    }
  }
  popup.querySelector(".addId .id").value = rawString(
    card.querySelector(".recordId").textContent
  );
  document.getElementById("addDate").value = rawString(
    card
      .querySelector(".date .input")
      .textContent.split("-")
      .reverse()
      .join("-")
  );
  document.getElementById("addTimespent").value = rawString(
    card.querySelector(".timespent .input").textContent
  );
  document.getElementById("addLanguage").value = rawString(
    card.querySelector(".language .input").textContent
  );
  document.getElementById("addRating").value = rawString(
    card.querySelector(".rating .input").textContent.split("/")[0]
  );
  document.getElementById("ratingOutput").textContent = rawString(
    card.querySelector(".rating .input").textContent.split("/")[0]
  );
  document.getElementById("addProgrammer").value = rawString(
    card.querySelector(".programmer .input").textContent
  );
  document.getElementById("addDescription").value = rawString(
    card.querySelector(".description").textContent
  );
}
function returnToMainMenu() {
  document.getElementById("overlayDiv").style.display = "none";
  document.getElementById("settings").style.display = "none";
}

function openSettings() {
  document.getElementById("settings").style.display = "block";
  const programmerForm = document.querySelector(".programmerSettingsForm");
  programmerForm.querySelector(".settings").value = "n";
  programmerForm.querySelector(".settings").style.display = "inline";
  programmerForm.querySelector(".programmerButton").style.display = "none";
  const categoryForm = document.querySelector(".categoriesSettingsForm");
  categoryForm.querySelector(".settings").value = "n";
  categoryForm.querySelector(".settings").style.display = "inline";
  categoryForm.querySelector(".categoryButton").style.display = "none";
  const all = [...programmerForm.querySelectorAll(".addProgrammer")].concat(
    [...programmerForm.querySelectorAll(".editProgrammer")].concat([
      ...programmerForm.querySelectorAll(".deleteProgrammer"),
    ])
  );
  for (const x of all) {
    x.style.display = "none";
    x.removeAttribute("required");
  }
  const all2 = [...categoryForm.querySelectorAll(".addCategory")].concat(
    [...categoryForm.querySelectorAll(".editCategory")].concat([
      ...categoryForm.querySelectorAll(".deleteCategory"),
    ])
  );
  for (const x of all2) {
    x.style.display = "none";
    x.removeAttribute("required");
  }
}
