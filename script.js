var loggedIn = false;

var grades = [
  {
    name: "Luke Jones",
    grade: 100
  },
  {
    name: "Ilija Loncarevic",
    grade: 90
  },
  {
    name: "Rob Elliott",
    grade: 91
  },
  {
    name: "Vicky Smith",
    grade: 48
  },
  {
    name: "Kelly Keelen",
    grade: 60
  },
  {
    name: "Jay Gladden",
    grade: 88
  }
];

function app() {
  if (loggedIn == true) {
    var pages = ["home", "add Grade", "grade View", "log Out"];
    nav(pages);
  } else {
    initElements();
    renderPage("login");
  }
}

function initElements() {
  var nav = document.createElement("nav");
  nav.classList.add("nav");
  var wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  document.body.appendChild(nav);
  document.body.appendChild(wrapper);
}

function nav(pageList) {
  for (var i = 0; i < pageList.length; i++) {
    const button = document.createElement("button");
    const val = pageList[i];
    button.innerHTML = pageList[i];
    button.addEventListener("click", function () {
      renderPage(val);
    });
    document.body.querySelector(".nav").appendChild(button);
  }
}

function renderPage(page) {
  if (page === "login") {
    login();
  } else if (page === "home") {
    home();
  } else if (page === "add Grade") {
    addGrade();
  } else if (page === "grade View") {
    gradeView();
  } else if (page === "log Out") {
    window.location.reload(false);
  }
}

function login() {
  var wrapper = document.querySelector(".wrapper");

  var username = document.createElement("input");
  username.id = "inputUser";
  username.placeholder = "Username";

  var password = document.createElement("input");
  password.setAttribute("type", "password");
  password.id = "inputPass";
  password.placeholder = "Password";

  var submitButton = document.createElement("button");
  submitButton.innerHTML = "Login";
  submitButton.className = "loginButton";

  var loginInstructions = document.createElement("h4");
  loginInstructions.innerHTML =
    "Please insert your Username and Password.";
  loginInstructions.id = "loginInstructions";

  wrapper.innerHTML = "";
  wrapper.appendChild(loginInstructions);
  wrapper.appendChild(username);
  wrapper.appendChild(password);
  wrapper.appendChild(submitButton);

  var inputUser = document.getElementById("inputUser");
  var inputPass = document.getElementById("inputPass");

  document.body
    .querySelector(".loginButton")
    .addEventListener("click", function () {
      if (usernameValid(inputUser) && passwordValid(inputPass)) {
        loggedIn = true;
        app();
        home();
      } else {
        if (!usernameValid(inputUser) && passwordValid(inputPass)) {
          window.alert("Your username is incorrect.");
        } else if (usernameValid(inputUser) && !passwordValid(inputPass)) {
          window.alert("Your password is incorrect.");
        } else {
          window.alert(
            "You didn't type anything at all. You must have inputted the wrong Username and Password. You need to type the correct information."
          );
        }
      }
    });

  function usernameValid(ele) {
    if (ele.value == "teacherCool101") {
      return true;
    } else {
      return false;
    }
  }

  function passwordValid(ele) {
    if (ele.value == "StupidPassword345") {
      return true;
    } else {
      return false;
    }
  }
}

function home() {
  var wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = "";

  var homeInstructions = document.createElement("h4");
  homeInstructions.innerHTML =
    "What would you like to do? Would you like to View Grades or Add More Grades?";
  homeInstructions.id = "homeInstructions";

  var gradeButton1 = document.createElement("h2");
  var addButton1 = document.createElement("h2");
  gradeButton1.classList.add("fix");

  gradeButton1.innerHTML = "Grade View";
  gradeButton1.addEventListener("click", function () {
    gradeView();
  });

  addButton1.innerHTML = "Add Grades";
  addButton1.addEventListener("click", function () {
    renderPage("add Grade");
  });

  wrapper.appendChild(homeInstructions);
  document.body.querySelector(".wrapper").appendChild(gradeButton1);
  document.body.querySelector(".wrapper").appendChild(addButton1);
}

function addGrade() {
  var wrapper = document.querySelector(".wrapper");

  var nameInputText = document.createElement("input");
  nameInputText.id = "nameInput";
  nameInputText.placeholder = "Student Name";

  var grade = document.createElement("input");
  grade.setAttribute("type", "number");
  grade.setAttribute("min", "0");
  grade.setAttribute("max", "100");
  grade.id = "gradeInput";
  grade.placeholder = "Grade";

  var submitButton = document.createElement("button");
  submitButton.innerHTML = "Submit";
  submitButton.className = "submitButton";

  var gradeInputInstructions = document.createElement("h4");
  gradeInputInstructions.innerHTML =
    "Input the student's name and grade below.";
  gradeInputInstructions.id = "gradeInputInstructions";

  wrapper.innerHTML = "";
  wrapper.appendChild(gradeInputInstructions);
  wrapper.appendChild(nameInputText);
  wrapper.appendChild(grade);
  wrapper.appendChild(submitButton);

  var nameInput = document.getElementById("nameInput");
  var gradeInput = document.getElementById("gradeInput");

  var gradeButton2 = document.createElement("h2");
  gradeButton2.classList.add("goToGrades");
  gradeButton2.innerHTML = "Grade View";
  gradeButton2.addEventListener("click", function () {
    gradeView();
  });
  document.body.querySelector(".wrapper").appendChild(gradeButton2);

  document.body
    .querySelector(".submitButton")
    .addEventListener("click", function () {
      if (inputValid(nameInput) && gradeValid(gradeInput)) {
        submission();
        window.alert("Grade Submitted.");
        gradeView();
      } else {
        if (!inputValid(nameInput) && gradeValid(gradeInput)) {
          window.alert("You forgot to put in the student's name.");
        } else if (inputValid(nameInput) && !gradeValid(gradeInput)) {
          window.alert(
            "You didn't input correctly the student's grade. \n\n Warning: Percentage doesn't need to be included!"
          );
        } else {
          window.alert(
            "You didn't even input: \n- Student's Name \n- Student's Grade\n or \n- You must have inputted the wrong information entirely. \n\nThis application is very easy to use."
          );
        }
      }
    });

  function submission() {
    var arrObject = {
      name: nameInput.value,
      grade: Number(gradeInput.value)
    };
    grades.push(arrObject);
  }

  function inputValid(ele) {
    if (ele.value !== "") {
      return true;
    } else {
      return false;
    }
  }

  function gradeValid(ele) {
    if (Number(ele.value) && ele.value >= 0 && ele.value < 101) {
      return true;
    } else {
      return false;
    }
  }
}

function gradeView() {
  var wrapper = document.querySelector(".wrapper");

  wrapper.innerHTML = "";

  for (var i = 0; i < grades.length; i++) {
    var ele = document.createElement("div");
    ele.classList.add("borderBottom");

    grades[i].name =
      '<span class="gradeNameStyle">' + grades[i].name + "</span>";
    grades[i].grade =
      '<span class="gradeGradeStyle">' + grades[i].grade + "</span>";

    ele.innerHTML = grades[i].name + "'s grade is: " + grades[i].grade + "%";
    wrapper.appendChild(ele);
  }

  var addButton2 = document.createElement("h2");
  addButton2.classList.add("goToAddGrades");
  addButton2.innerHTML = "Add Another Grade";
  addButton2.addEventListener("click", function () {
    addGrade();
  });

  document.body.querySelector(".wrapper").appendChild(addButton2);
}

app();