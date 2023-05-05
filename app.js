let inputData = document.querySelector(".your-mind");
let addTask = document.querySelector(".sub-btn");
let tasks = document.querySelector(".tasks");
let completed = document.querySelector(".completed");
let allTasks = document.querySelector(".all-tasks");
let tasksArr = [];
let mood = "add task";
let tmp;
let checkBox;

if (localStorage.tasks != null) {
  tasksArr = JSON.parse(localStorage.tasks);
  showData();
} else {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}
let localLength = JSON.parse(localStorage.tasks).length;

addTask.addEventListener("click", () => {
  if (inputData.value != "") {
    if (mood === "add task") {
      createTask();
      // completedtasks();
      localLength++;
      taskCounter();
    } else {
      tasksArr[tmp].inputval = inputData.value;
      localStorage.tasks = JSON.stringify(tasksArr);
      showData();
      mood = "add task";
      addTask.innerHTML = mood;
    }
  }
});

function taskCounter() {
  allTasks.innerHTML = localLength;
}

inputData.addEventListener("keypress", (e) => {
  if (inputData.value != "" && e.key == "Enter") {
    addTask.click();
  }
});

allTasks.innerHTML = localLength;

function createTask() {
  let dataObj = {
    id: localLength,
    inputval: inputData.value,
    status: false,
  };
  tasksArr.push(dataObj);

  addTask.innerHTML = mood;
  localStorage.setItem("tasks", JSON.stringify(tasksArr));

  showData();
}

function showData() {
  let con = "";
  for (let i = 0; i < tasksArr.length; i++) {
    con += `<div class="task">
    <input type="checkbox" id="${tasksArr[i].id}"  />
    <div class="label">
      <label for="${tasksArr[i].id}"> ${tasksArr[i].inputval} </label>
      <div>
        <span class="edit" onclick = "editTask(${i})">edit</span>
        <span class="delete" onclick = "Delete(${i})">delete</span>
      </div>
    </div>
  </div>`;
  }
  tasks.innerHTML = con;
  inputData.value = "";
  checkBox = document.querySelectorAll(".task input");
  chk();
}

function editTask(i) {
  inputData.value = tasksArr[i].inputval;
  mood = "edit";
  addTask.innerHTML = mood;
  inputData.focus();
  tmp = i;
}

function Delete(i) {
  tasksArr.splice(i, 1);
  localLength--;
  localStorage.tasks = JSON.stringify(tasksArr);
  showData();
  taskCounter();
}

function chk() {
  checkBox.forEach((check, index) => {
    check.addEventListener("change", () => {
      if (tasksArr[index].status == false) {
        tasksArr[index].status = true;
        localStorage.tasks = JSON.stringify(tasksArr);
      } else {
        if (tasksArr[index].status == true) {
          tasksArr[index].status = false;
          localStorage.tasks = JSON.stringify(tasksArr);
        }
      }
    });
    if (tasksArr[index].status == true) {
      check.checked = true;
    } else {
      check.checked = false;
    }
  });
}
