function onChange(x) {
  const header = document.getElementById("programmerHeader");
  const form = document.getElementById("programmerSettingsForm");
  switch (x.value) {
    case "add":
      x.style.display = "none";
      for (let item of document.getElementsByClassName("addProgrammer")) {
        item.style.display = "block";
      }
      for (let item of document.querySelectorAll(".editProgrammer")) {
        form.removeChild(item);
      }
      for (let item of document.querySelectorAll(".deleteProgrammer")) {
        form.removeChild(item);
      }
      header.innerHTML = "Programmer Settings: Add programmer";
      break;
    case "edit":
      x.style.display = "none";
      for (let item of document.getElementsByClassName("editProgrammer")) {
        item.style.display = "block";
      }
      for (let item of document.querySelectorAll(".addProgrammer")) {
        form.removeChild(item);
      }
      for (let item of document.querySelectorAll(".deleteProgrammer")) {
        form.removeChild(item);
      }
      header.innerHTML = "Programmer Settings: Edit programmer";
      break;
    case "delete":
      x.style.display = "none";
      for (let item of document.getElementsByClassName("deleteProgrammer")) {
        item.style.display = "block";
      }
      for (let item of document.querySelectorAll(".editProgrammer")) {
        form.removeChild(item);
      }
      for (let item of document.querySelectorAll(".addProgrammer")) {
        form.removeChild(item);
      }
      header.innerHTML = "Programmer Settings: Delete programmer";
      break;
  }
}
