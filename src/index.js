/* eslint-disable no-restricted-globals */
import './styles.css';
import UI from './ui';
import validateDescription from './validateDescription';

// When content loads
document.addEventListener('DOMContentLoaded', UI.addApp());

// Event: when form is submitted
document.querySelector('#addTaskForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const taskDescription = document.querySelector('#taskDesc').value.trim();
  if (!validateDescription(taskDescription)) {
    // empty input
  } else {
    // Add task
    UI.addTaskStore(taskDescription);
    // reloads page
    location.reload();
  }
});

// Event: when icon is clicked to add task
document.querySelector('#clickEnterIcon').addEventListener('click', () => {
  // Get form values
  const taskDescription = document.querySelector('#taskDesc').value.trim();
  if (!validateDescription(taskDescription)) {
    // empty input
  } else {
    // Add task
    UI.addTaskStore(taskDescription);

    // reloads page
    location.reload();
  }
});

// Event: when checkboxes are clicked
document.querySelector('#task-list').addEventListener('change', (e) => {
  // checks if this is trigerring for the correct element
  if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
    // Gets the state of the checked checkbox
    const checkboxState = e.target.checked;

    const ulList = document.querySelector('#task-list');
    const itemChecked = e.target.parentElement.parentElement;
    const nodes = Array.from(ulList.children);
    const index = nodes.indexOf(itemChecked);

    UI.taskCompleted(index, checkboxState);

    // Reload page
    location.reload();
  }
});

// Event: editing and removing
document.querySelector('#task-list').addEventListener('click', (e) => {
  const classesIcn = e.target.className;
  const classesArr = classesIcn.split(' ');

  const li = e.target.parentElement.parentElement;
  const ulList = document.querySelector('#task-list');
  const nodes = Array.from(ulList.children);
  const index = nodes.indexOf(li);

  // when the three dots icon gets clicked
  if (classesArr.indexOf('edtIcn') !== -1) {
    UI.changeLiToEditMode(li);
  }

  // when the check icon gets clicked to UPDATE
  if (classesArr.indexOf('removeIcn') !== -1) {
    UI.removeTask(index);

    // Reload page
    location.reload();
  }

  // when the the trash icon gets clicked to REMOVE
  if (classesArr.indexOf('acceptIcn') !== -1) {
    const newDesc = document.querySelector('#inputEdit').value;
    UI.updateTask(index, newDesc);

    // Reload page
    location.reload();
  }
});

document.querySelector('#pBtm').addEventListener('click', () => {
  UI.clearCompleted();

  // Reload page
  location.reload();
});