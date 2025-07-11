const boards = {
  "Platform Launch": {
    todo: ["Create wireframes", "Setup hosting"],
    doing: ["Develop features"],
    done: ["Initial Design"]
  },
  "Marketing Plan": {
    todo: ["Social media strategy"],
    doing: ["Blog content creation"],
    done: ["Competitor analysis"]
  },
  "Roadmap": {
    todo: ["Identify milestones"],
    doing: ["Feature prioritization"],
    done: ["Vision board"]
  }
};

let currentBoard = "Platform Launch";

function loadBoard(boardName) {
  currentBoard = boardName;
  document.getElementById("boardTitle").textContent = boardName;

  ["todo", "doing", "done"].forEach(status => {
    const list = document.getElementById(status);
    list.innerHTML = "";
    boards[boardName][status].forEach(task => {
      const div = document.createElement("div");
      div.className = "task";
      div.innerText = task;
      list.appendChild(div);
    });
  });

  document.querySelectorAll(".sidebar ul li").forEach(li => {
    li.classList.remove("active");
    if (li.textContent === boardName) li.classList.add("active");
  });
}

function addTask(status) {
  const task = prompt("Enter task name:");
  if (task) {
    boards[currentBoard][status].push(task);
    loadBoard(currentBoard);
  }
}

document.querySelectorAll(".sidebar ul li").forEach(li => {
  li.addEventListener("click", () => {
    loadBoard(li.textContent);
  });
});

document.getElementById("addBoardBtn").addEventListener("click", () => {
  const boardName = prompt("Enter new board name:");
  if (boardName && !boards[boardName]) {
    boards[boardName] = { todo: [], doing: [], done: [] };
    const li = document.createElement("li");
    li.textContent = boardName;
    li.addEventListener("click", () => loadBoard(boardName));
    document.getElementById("boardList").appendChild(li);
    loadBoard(boardName);
  } else {
    alert("Board already exists or invalid name.");
  }
});

window.onload = () => {
  loadBoard(currentBoard);
};