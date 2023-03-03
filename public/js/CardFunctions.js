function deleteCard(x) {
  const list = document.getElementsByClassName("record");
  for (let item of list) {
    if (item.querySelector(".delete") == x) {
      var form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", "/delete");
      form.style.display = "hidden";
      var idItem = document.createElement("input");
      idItem.setAttribute("type", "hidden");
      idItem.setAttribute("name", "id");
      idItem.setAttribute(
        "value",
        item.querySelector(".cardId").textContent.replace(/\t/g, "")
      );
      form.appendChild(idItem);
      document.body.appendChild(form);
      form.submit();
    }
  }
}

function editCard(x) {
  document.getElementById("addButton").style.display = "none";
  document.getElementById("formHeader").innerHTML = "Editing Record";
  document.getElementById("submit").value = "Edit";
  document.getElementById("addRecord").style.display = "block";
  document.getElementById("programmerHeader").style.display = "none";
  document.getElementById("programmerSettingsForm").style.display = "none";
  document.getElementById("categoryHeader").style.display = "none";
  document.getElementById("categorySettingsForm").style.display = "none";
  document.querySelector(".addRecord .divider").style.display = "none";
  var card;
  for (const c of document.getElementsByClassName("record")) {
    if (c.querySelector(".edit") == x) {
      card = c;
      break;
    }
  }
  document.getElementById("timespent").value = card
    .querySelector(".timespent")
    .textContent.replace(/\t/g, "")
    .replace(/\n/g, "");
  document.getElementById("language").value = card
    .querySelector(".language")
    .textContent.replace(/\t/g, "")
    .replace(/\n/g, "");
  document.getElementById("rating").value = card
    .querySelector(".rating")
    .textContent.replace(/\t/g, "")
    .replace(/\n/g, "");
  document.getElementById("rangeOutput").textContent =
    "Rating: " +
    card
      .querySelector(".rating")
      .textContent.replace(/\t/g, "")
      .replace(/\n/g, "");
  document.getElementById("description").value = card
    .querySelector(".description")
    .textContent.replace(/\t/g, "")
    .replace(/\n/g, "");
  document.getElementById("date").value = card
    .querySelector(".date")
    .textContent.replace(/\t/g, "")
    .replace(/\n/g, "");
  document.getElementById("programmer").value = card
    .querySelector(".programmer")
    .textContent.replace(/\t/g, "")
    .replace(/\n/g, "");
  document.getElementById("category").value = card
    .querySelector(".category")
    .textContent.replace(/\t/g, "")
    .replace(/\n/g, "");
  var form = document.getElementById("createCardForm");
  form.setAttribute("action", "/edit");
  var idItem = document.createElement("input");
  idItem.setAttribute("type", "hidden");
  idItem.setAttribute("name", "id");
  idItem.setAttribute(
    "value",
    card
      .querySelector(".cardId")
      .textContent.replace(/\t/g, "")
      .replace(/\r/g, "")
      .replace(/\n/g, "")
  );
  form.appendChild(idItem);
}
