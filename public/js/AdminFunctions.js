function returnToAdmin() {
  document.getElementById("overlayDiv3").style.display = "none";
  document.getElementById("overlayDiv4").style.display = "none";
}

function rawString(str) {
  return str.replace(/\t/g, "").replace(/\n/g, "");
}

function toUsers() {
  document.querySelector(".admin-content .tags").style.display = "none";
  document.querySelector(".admin-content .users").style.display = "flex";
  document.getElementById("Users").style.color = "#287FFF";
  document.getElementById("Tags").style.color = "#6F6C90";
}

function toTags() {
  document.querySelector(".admin-content .tags").style.display = "flex";
  document.querySelector(".admin-content .users").style.display = "none";
  document.getElementById("Users").style.color = "#6F6C90";
  document.getElementById("Tags").style.color = "#287FFF";
}

function handleAddButton() {
  const users = document.querySelector(".admin-content .users").style.display;
  if (users == "flex") {
    showPopUp("Create User", "Create", "/admin/addUser", this);
  } else if (users == "none") {
    showTagPopUp("Create Tag", "Create", "/admin/addTag", this);
  }
}

function showPopUp(name, actionText, action, x) {
  const popup = document.getElementById("overlayDiv3");
  popup.style.display = "flex";
  popup.querySelector(".popupTitle").textContent = name;
  popup.querySelector(".submitText").textContent = actionText;
  popup.querySelector(".addRecordForm").setAttribute("action", action);
  document.getElementById("addname").value = "";
  document.getElementById("addsurname").value = "";
  document.getElementById("addusername").value = "";
  document.getElementById("addemail").value = "";
  document.getElementById("addpassword").textContent = "";
  document.getElementById("adminYes").value = false;
  if (action != "/admin/editUser") return;
  let card;
  for (const c of document.getElementsByClassName("admin-user")) {
    if (c.querySelector(".admin-tagPencil") == x) {
      card = c;
      break;
    }
  }
  popup.querySelector(".addId .id").value = rawString(
    card.querySelector(".admin-userid").textContent.split(": ")[1]
  );
  document.getElementById("addname").value = rawString(
    card.querySelector(".admin-userfname").textContent.split(": ")[1]
  );
  document.getElementById("addsurname").value = rawString(
    card.querySelector(".admin-usersname").textContent.split(": ")[1]
  );
  document.getElementById("addusername").value = rawString(
    card.querySelector(".admin-useruname").textContent.split(": ")[1]
  );
  document.getElementById("addemail").value = rawString(
    card.querySelector(".admin-useremail").textContent.split(": ")[1]
  );
  document.getElementById("addpassword").value = rawString(
    card.querySelector(".admin-userpassword").textContent.split(": ")[1]
  );
  document.getElementById("adminYes").checked =
    card.querySelector(".admin-useradmin").textContent.split(": ")[1] == "Yes"
      ? true
      : false;
}

function showTagPopUp(name, actionText, action, x) {
  const popup = document.getElementById("overlayDiv4");
  popup.style.display = "flex";
  popup.querySelector(".popupTitle").textContent = name;
  popup.querySelector(".submitText").textContent = actionText;
  popup.querySelector(".addRecordForm").setAttribute("action", action);
  document.getElementById("addtagname").value = "";
  document.getElementById("addtagcolor").value = "#000000";
  document.getElementById("addtagdescription").value = "";
  if (action != "/admin/editTag") return;
  let card;
  for (const c of document.getElementsByClassName("admin-tag")) {
    if (c.querySelector(".admin-tagPencil") == x) {
      card = c;
      break;
    }
  }
  popup.querySelector(".addId .id").value = rawString(
    card.querySelector(".admin-tagId").textContent.split(": ")[1]
  );
  document.getElementById("addtagname").value = rawString(
    card.querySelector(".admin-tagName").textContent.split(": ")[1]
  );
  document.getElementById("addtagcolor").value = rawString(
    card.querySelector(".admin-tagColor").textContent.split(": ")[1]
  );
  document.getElementById("addtagdescription").value = rawString(
    card.querySelector(".admin-tagDescriptionText").textContent
  );
}
