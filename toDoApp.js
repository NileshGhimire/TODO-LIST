showTask();
let add = document.querySelector('#plusIcon');
let show = document.querySelector('.add');
add.addEventListener('click', function() {
	if (show.style.display === 'none') {
		show.style.display = 'block';
	} else {
		show.style.display = 'none';
	}
});

// let addTaskInput = document.getElementById('addTaskInput');
// let enterSubmit = (e) => {
// 	if (e.keyCode === 13) {

// };

// add elements to list using add button
let addTaskBtn = document.getElementById('btnAdd');
let addTaskInput = document.getElementById('addTaskInput');
addTaskBtn.addEventListener('click', function(e) {
	taskInputVal = addTaskInput.value;
	if (taskInputVal.trim() != 0) {
		let webTask = localStorage.getItem('localTask');
		if (webTask === null) {
			taskObj = [];
		} else {
			taskObj = JSON.parse(webTask);
		}
		taskObj.push(taskInputVal);
		localStorage.setItem('localTask', JSON.stringify(taskObj));
	}
	e.preventDefault();
	showTask();
});

// show task in list
function showTask() {
	let webTask = localStorage.getItem('localTask');
	if (webTask === null) {
		taskObj = [];
	} else {
		taskObj = JSON.parse(webTask);
	}
	let html = '';
	let addedTaskList = document.getElementById('taskList');
	taskObj.forEach((item, index) => {
		html += `<tr>  
		<th>${index + 1}</th>
		<td>${item} </td>
		<td><button type="button" onclick="editTask(${index})" id="Icon"><i class="fas fa-pen"></i>Edit</button></td>
		<td><button type="button" onclick="deleteTask(${index})" id="Icon"><i class="fas fa-trash"></i>Delete</button></td>
	</tr>`;
	});
	addedTaskList.innerHTML = html;
}

//delete item
function deleteTask(index) {
	let webTask = localStorage.getItem('localTask');
	taskObj = JSON.parse(webTask);
	taskObj.splice(index, 1);
	localStorage.setItem('localTask', JSON.stringify(taskObj));
	showTask();
}
// edit list
function editTask(index) {
	let editTaskSave = document.getElementById('btnEditSave');
	let saveindex = document.getElementById('saveIndex');
	let addTaskBtn = document.getElementById('btnAdd');
	saveindex.value = index;
	let webTask = localStorage.getItem('localTask');
	let taskObj = JSON.parse(webTask);
	addTaskInput.value = taskObj[index];
	addTaskBtn.style.display = 'none';
	editTaskSave.style.display = 'block';
}
// save edit task
let editTaskSave = document.getElementById('btnEditSave');
editTaskSave.addEventListener('click', function(e) {
	let addTaskInput = document.getElementById('addTaskInput');
	let addTaskBtn = document.getElementById('btnAdd');
	let webTask = localStorage.getItem('localTask');
	let taskObj = JSON.parse(webTask);
	let saveindex = document.getElementById('saveIndex').value;
	taskObj[saveindex] = addTaskInput.value;
	localStorage.setItem('localTask', JSON.stringify(taskObj));
	addTaskBtn.style.display = 'block';
	editTaskSave.style.display = 'none';
	addTaskInput.value = '';
	e.preventDefault();
	showTask();
});
