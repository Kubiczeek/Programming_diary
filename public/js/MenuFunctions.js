function rawString(str) {
  return str.replace(/\t/g, "").replace(/\n/g, "");
}

function showFilter() {
  const x = document.querySelector(".filterShow");
  if (x.style.display == "none") {
    x.style.display = "flex";
  } else if (x.style.display == "flex") {
    x.style.display = "none";
  }
}

function showPopUp(name, actionText, action, x) {
  const popup = document.getElementById("overlayDiv");
  popup.style.display = "block";
  popup.querySelector(".popupTitle").textContent = name;
  popup.querySelector(".submitText").textContent = actionText;
  popup.querySelector(".addRecordForm").setAttribute("action", action);
  document.getElementById("addDate").value = "";
  document.getElementById("addTimespent").value = "";
  document.getElementById("addLanguage").value = "";
  document.getElementById("addRating").value = "3";
  document.getElementById("ratingOutput").textContent = "3";
  document.getElementById("addDescription").value = "";
  if (action != "/editRecord") return;
  let card;
  for (const c of document.getElementsByClassName("record")) {
    if (c.querySelector(".editRecord") == x) {
      card = c;
      break;
    }
  }
  popup.querySelector(".addId .id").value = rawString(
    card.querySelector(".recordId").textContent
  );
  document.getElementById("addDate").value = rawString(
    card
      .querySelector(".date .dateText")
      .textContent.split(".")
      .reverse()
      .join("-")
  );
  document.getElementById("addTimespent").value = rawString(
    card.querySelector(".timespent .timespentText").textContent.split(" ")[0]
  );
  document.getElementById("addLanguage").value = rawString(
    card.querySelector(".language .languageText").textContent
  );
  document.getElementById("addRating").value = rawString(
    card.querySelector(".rating .ratingText").textContent.split("/")[0]
  );
  document.getElementById("ratingOutput").textContent = rawString(
    card.querySelector(".rating .ratingText").textContent.split("/")[0]
  );
  document.getElementById("addDescription").value = rawString(
    card.querySelector(".descriptionText").textContent
  );
}
function returnToMainMenu() {
  document.getElementById("overlayDiv").style.display = "none";
}

function importRecord() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.name = "file";
  fileInput.accept = ".csv";
  fileInput.onchange = handleFileInputChange;
  fileInput.click();
}

function handleFileInputChange(event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file, file.name);
  fetch("/upload-json", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      response.json();
      window.location.reload();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}
