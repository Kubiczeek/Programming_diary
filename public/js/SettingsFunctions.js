function onChangeProgrammer(input) {
  const form = document.querySelector(".programmerSettingsForm");
  switch (input) {
    case "Add":
      form.querySelector(".settings").style.display = "none";
      form.querySelector(".programmerButton").style.display = "inline";
      const allAdd = [...form.querySelectorAll(".addProgrammer")];
      for (const x of allAdd) {
        x.style.display = "inline";
        x.setAttribute("required", "");
      }
      break;
    case "Edit":
      form.querySelector(".settings").style.display = "none";
      form.querySelector(".programmerButton").style.display = "inline";
      const allEdit = [...form.querySelectorAll(".editProgrammer")];
      for (const x of allEdit) {
        x.style.display = "inline";
        x.setAttribute("required", "");
      }
      break;
    case "Delete":
      form.querySelector(".settings").style.display = "none";
      form.querySelector(".programmerButton").style.display = "inline";
      const allDelete = [...form.querySelectorAll(".deleteProgrammer")];
      for (const x of allDelete) {
        x.style.display = "inline";
        x.setAttribute("required", "");
      }
      break;
  }
}

function onChangeCategory(input) {
  console.log("Hello World!");
  const form = document.querySelector(".categoriesSettingsForm");
  switch (input) {
    case "Add":
      form.querySelector(".settings").style.display = "none";
      form.querySelector(".categoryButton").style.display = "inline";
      const allAdd = [...form.querySelectorAll(".addCategory")];
      for (const x of allAdd) {
        x.style.display = "inline";
        x.setAttribute("required", "");
      }
      break;
    case "Edit":
      form.querySelector(".settings").style.display = "none";
      form.querySelector(".categoryButton").style.display = "inline";
      const allEdit = [...form.querySelectorAll(".editCategory")];
      for (const x of allEdit) {
        x.style.display = "inline";
        x.setAttribute("required", "");
      }
      break;
    case "Delete":
      form.querySelector(".settings").style.display = "none";
      form.querySelector(".categoryButton").style.display = "inline";
      const allDelete = [...form.querySelectorAll(".deleteCategory")];
      for (const x of allDelete) {
        x.style.display = "inline";
        x.setAttribute("required", "");
      }
      break;
  }
}
