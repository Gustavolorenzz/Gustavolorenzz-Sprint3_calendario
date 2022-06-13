const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];



// Váriavel principal
let date = new Date();

// Função que retorna a data atual do calendário 
function getCurrentDate(element, asString) {
  if (element) {
    if (asString) {
      return element.textContent = weekdays[date.getDay()] + ', ' + date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear();
    }
    return element.value = date.toISOString().substr(0, 10);
  }
  return date;
}


// Função principal que gera o calendário
function generateCalendar() {

  // Pega um calendário e se já existir o remove
  const calendar = document.getElementById('calendar');
  if (calendar) {
    calendar.remove();
  }

  // Cria a tabela que será armazenada as datas
  const table = document.createElement("table");
  table.id = "calendar";

  // Cria os headers referentes aos dias da semana
  const trHeader = document.createElement('tr');
  trHeader.className = 'weekends';
  weekdays.map(week => {
    const th = document.createElement('th');
    const w = document.createTextNode(week.substring(0, 3));
    th.appendChild(w);
    trHeader.appendChild(th);
  });

  // Adiciona os headers na tabela
  table.appendChild(trHeader);

  //Pega o dia da semana do primeiro dia do mês
  const weekDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  //Pega o ultimo dia do mês
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  let tr = document.createElement("tr");
  let td = '';
  let empty = '';
  let btn = document.createElement('button');
  let week = 0;

  // Se o dia da semana do primeiro dia do mês for maior que 0(primeiro dia da semana);
  while (week < weekDay) {
    td = document.createElement("td");
    empty = document.createTextNode(' ');
    td.appendChild(empty);
    tr.appendChild(td);
    week++;
  }

  // Vai percorrer do 1º até o ultimo dia do mês
  for (let i = 1; i <= lastDay;) {
    // Enquanto o dia da semana for < 7, ele vai adicionar colunas na linha da semana
    while (week < 7) {
      td = document.createElement('td');
      let text = document.createTextNode(i);
      btn = document.createElement('button');
      btn.className = "btn-day";
      btn.addEventListener('click', function () { changeDate(this) });
      week++;



      // Controle para ele parar exatamente no ultimo dia
      if (i <= lastDay) {
        i++;
        btn.appendChild(text);
        td.appendChild(btn)
      } else {
        text = document.createTextNode(' ');
        td.appendChild(text);
      }
      tr.appendChild(td);
    }
    // Adiciona a linha na tabela
    table.appendChild(tr);

    // Cria uma nova linha para ser usada
    tr = document.createElement("tr");

    // Reseta o contador de dias da semana
    week = 0;
  }
  // Adiciona a tabela a div que ela deve pertencer
  const content = document.getElementById('table');
  content.appendChild(table);
  changeActive();
  changeHeader(date);
  document.getElementById('date').textContent = date;
  getCurrentDate(document.getElementById("currentDate"), true);
  getCurrentDate(document.getElementById("date"), false);
}

// Altera a data atráves do formulário
function setDate(form) {
  let newDate = new Date(form.date.value);
  date = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
  generateCalendar();
  return false;
}

// Método Muda o mês e o ano do topo do calendário
function changeHeader(dateHeader) {
  const month = document.getElementById("month-header");
  if (month.childNodes[0]) {
    month.removeChild(month.childNodes[0]);
  }
  const headerMonth = document.createElement("h1");
  const textMonth = document.createTextNode(months[dateHeader.getMonth()].substring(0, 3) + " " + dateHeader.getFullYear());
  headerMonth.appendChild(textMonth);
  month.appendChild(headerMonth);
}

// Função para mudar a cor do botão do dia que está ativo
function changeActive() {
  let btnList = document.querySelectorAll('button.active');
  btnList.forEach(btn => {
    btn.classList.remove('active');
  });
  btnList = document.getElementsByClassName('btn-day');
  for (let i = 0; i < btnList.length; i++) {
    const btn = btnList[i];
    if (btn.textContent === (date.getDate()).toString()) {
      btn.classList.add('active');
    }
  }
}

// Função que pega a data atual
function resetDate() {
  date = new Date();
  generateCalendar();
}

// Muda a data pelo numero do botão clicado
function changeDate(button) {
  let newDay = parseInt(button.textContent);
  date = new Date(date.getFullYear(), date.getMonth(), newDay);
  generateCalendar();
}

// Funções de avançar e retroceder mês e dia
function nextMonth() {
  date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  generateCalendar(date);
}

function prevMonth() {
  date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  generateCalendar(date);
}


function prevDay() {
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  generateCalendar();
}

function nextDay() {
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  generateCalendar();
}

document.onload = generateCalendar(date);

//
const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();

  console.log(inputIsValid);

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }
  //cria a div
  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");//cria um paragrafo
  taskContent.innerText = `Data: ${date.toLocaleDateString()} -  ${inputElement.value} `;//parra a data e o texto

  taskContent.addEventListener("click", () => handleClick(taskContent));//torna o botao funcional

  const deleteItem = document.createElement("i");//<i><\i>
  deleteItem.classList.add("far");//texto
  deleteItem.classList.add("fa-trash-alt");//lixeira
  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)//passa
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updateLocalStorage();//localStorage
};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());