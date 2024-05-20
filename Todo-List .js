const mainTodoElem = document.querySelector(".todo-list-elem");
const inputValue = document.getElementById("inputValue");

// getting data
const getTodolistFromLocal = () => {
  return JSON.parse(localStorage.getItem("studentName"));
};
const addTodoListLocalStorag = (localTodoLists) => {
  return localStorage.setItem("studentName", JSON.stringify(localTodoLists));
};

localTodoLists = getTodolistFromLocal() || [];

//adding add to list dynamcally

const addTodoDynamicElemant = (curElm) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main-todo-div");
  divElement.innerHTML = `<li>${curElm}</li>
  <button class="deletebtn">Delete</button>`;
  mainTodoElem.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();
  const todoListValue = inputValue.value.trim();

  inputValue.value = " ";

  if (todoListValue != "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    console.log(localTodoLists);

    localStorage.setItem("studentName", JSON.stringify(localTodoLists));

    addTodoDynamicElemant(todoListValue);
  }
};

//showData
const showTodoList = () => {
  console.log(localTodoLists);

  localTodoLists.forEach((curElm) => {
    addTodoDynamicElemant(curElm);
  });
};
showTodoList();

// Remove Data
const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  let prarentElem = todoToRemove.prarentElement;
  console.log(todoListContent);

  localTodoLists = localTodoLists.filter((curTodo) => {
    return curTodo !== todoListContent.toLowerCase();
  });

  addTodoListLocalStorag(localTodoLists);

  // prarentElem.remove();
  console.log(localTodoLists);
};

//Button click fuction
mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deletebtn")) removeTodoElem(e);
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});
