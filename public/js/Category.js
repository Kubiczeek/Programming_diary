function onChangeCategory(x) {
  const header = document.getElementById("categoryHeader");
  const form = document.getElementById("categorySettingsForm");
  switch (x.value) {
    case "add":
      x.style.display = "none";
      for (let item of document.getElementsByClassName("addCategory")) {
        item.style.display = "block";
      }
      for (let item of document.querySelectorAll(".editCategory")) {
        form.removeChild(item);
      }
      for (let item of document.querySelectorAll(".deleteCategory")) {
        form.removeChild(item);
      }
      header.innerHTML = "Category Settings: Add category";
      break;
    case "edit":
      x.style.display = "none";
      for (let item of document.getElementsByClassName("editCategory")) {
        item.style.display = "block";
      }
      for (let item of document.querySelectorAll(".addCategory")) {
        form.removeChild(item);
      }
      for (let item of document.querySelectorAll(".deleteCategory")) {
        form.removeChild(item);
      }
      header.innerHTML = "Category Settings: Edit category";
      break;
    case "delete":
      x.style.display = "none";
      for (let item of document.getElementsByClassName("deleteCategory")) {
        item.style.display = "block";
      }
      for (let item of document.querySelectorAll(".editCategory")) {
        form.removeChild(item);
      }
      for (let item of document.querySelectorAll(".addCategory")) {
        form.removeChild(item);
      }
      header.innerHTML = "Category Settings: Delete category";
      break;
  }
}
