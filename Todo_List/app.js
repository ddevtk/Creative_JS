const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoContainer = document.querySelector('.todo-container');
const filterOption = document.querySelector('.filter-todo');

//Functions

const addTodo = e => {
  e.preventDefault();
  const html = `
        <div class="todo">
            <li class="todo-item">${todoInput.value}</li>
            <button class="btn btn-complete"><i class="fas fa-check"></i></button>
            <button class="btn btn-trash"><i class="fas fa-trash"></i></button>
        </div>
    `;
  saveLocalTodos(todoInput.value);
  todoList.insertAdjacentHTML('afterbegin', html);
};

const deleteCheck = e => {
  const item = e.target;
  if (
    item.classList.contains('fa-trash') ||
    item.classList.contains('btn-trash')
  ) {
    const todo = item.closest('.todo');
    removeLocalTodos(todo);
    todo.classList.add('fail');
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }
  if (
    item.classList.contains('fa-check') ||
    item.classList.contains('btn-complete')
  ) {
    item.closest('.todo').classList.toggle('completed');
  }
};

const filterTodo = e => {
  const todos = todoList.children;
  console.log(typeof todos);
  [...todos].forEach(todo => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      default:
        break;
    }
  });
};
const saveLocalTodos = inputValue => {
  let inputValues;
  if (localStorage.getItem('inputValues') === null) {
    inputValues = [];
  } else {
    inputValues = JSON.parse(localStorage.getItem('inputValues'));
  }
  console.log(inputValues);

  inputValues.push(inputValue);

  localStorage.setItem('inputValues', JSON.stringify(inputValues));
};

const renderUi = () => {
  if (localStorage.getItem('inputValues') === null) {
    inputValues = [];
  } else {
    inputValues = JSON.parse(localStorage.getItem('inputValues'));
  }

  inputValues.forEach(inputValue => {
    const html = `
        <div class="todo">
            <li class="todo-item">${inputValue}</li>
            <button class="btn btn-complete"><i class="fas fa-check"></i></button>
            <button class="btn btn-trash"><i class="fas fa-trash"></i></button>
        </div>
    `;
    todoList.insertAdjacentHTML('afterbegin', html);
  });
};

const removeLocalTodos = inputValue => {
  let inputValues = JSON.parse(localStorage.getItem('inputValues'));
  console.log(inputValue.children[0].innerHTML);
  inputValues.splice(inputValues.indexOf(inputValue), 1);
  localStorage.setItem('inputValues', JSON.stringify(inputValues));
};

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', renderUi);
