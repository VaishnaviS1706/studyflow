const taskInput = document.getElementById("taskInput");
const subjectInput = document.getElementById("subjectInput");
const priorityInput = document.getElementById("priorityInput");
const dateInput = document.getElementById("dateInput");

const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");
let tasks = [];
let currentFilter = "all";
addTaskBtn.addEventListener("click", function () {

    const task = taskInput.value;
    const subject = subjectInput.value;
    const priority = priorityInput.value;
    const date = dateInput.value;

    if (task === "" || subject === "" || date === "") {
        alert("Please fill all the fields!");
        return;
    }

    const newTask = {
        id: Date.now(),
        task: task,
        subject: subject,
        priority: priority,
        date: date,
        completed: false
    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    taskInput.value = "";
    subjectInput.value = "";
    dateInput.value = "";
});
function displayTasks() {

    taskList.innerHTML = "";
    totalTasks.textContent = tasks.length;

    completedTasks.textContent = tasks.filter(function (task) {
        return task.completed === true;
    }).length;

    activeTasks.textContent = tasks.filter(function (task) {
        return task.completed === false;
    }).length;
    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function (task) {
            return task.completed === false;
        });

    }

    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function (task) {
            return task.completed === true;
        });

    }


    filteredTasks.forEach(function (task) {

        const taskDiv = document.createElement("div");

        taskDiv.classList.add("task");

        if (task.completed) {
            taskDiv.classList.add("completed");
        }

        taskDiv.innerHTML = `
            <div class="task-info">

                <h3>${task.task}</h3>

                <p>Subject: ${task.subject}</p>

                <p>Priority: ${task.priority}</p>

                <p>Due Date: ${task.date}</p>

            </div>

            <div class="task-actions">

                <button class="complete-btn" data-id="${task.id}">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="delete-btn" data-id="${task.id}">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(taskDiv);

    });
}
// Complete and Delete buttons

taskList.addEventListener("click", function (event) {

    const id = Number(event.target.dataset.id);

    // Complete task
    if (event.target.classList.contains("complete-btn")) {

        tasks = tasks.map(function (task) {

            if (task.id === id) {
                task.completed = !task.completed;
            }

            return task;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
    }


    // Delete task
    if (event.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(function (task) {
            return task.id !== id;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
    }

});
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter = button.dataset.filter;

        displayTasks();

    });

});
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
}