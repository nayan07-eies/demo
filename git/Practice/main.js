class Info{
    constructor(name,dob,city){
        this.Name=name,
        this.DOB = dob
        this.City=city
    }
}

const person1= new Info('nayan','17/9/2020','surat')
person1.city='ahamdabad'

console.log(person1)

function ex(n1,n2,n3){
    return n1+n2*n3-n2
}
console.log(ex(2,3,4))

let i = 70
if(i>=55){
    console.log('student pass')
}else{
    console.log('Better luck next time')
}

let j =55;
switch (true){
    case(j >55): console.log('better luck next time');break
    case(j >= 55 && j < 66):console.log('just passed');break
    default:console.log('---------')

}

for(let k=1;k<=9;k++){
    console.log(k)
}
let n = 16;
try{
    if(n<18){
        throw new Error('age is minor')  
    }
    console.log('explore the new things')
}
catch(Error){
    console.log(Error.message)
}
finally{
   console.log('welcome') 
}

document.addEventListener('DOMContentLoaded', () => {
    const modeBtn = document.getElementById('mode');
    if (!modeBtn) return;
    modeBtn.addEventListener('click', () => {
        if (document.body.style.backgroundColor === 'black') {
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black';
        } else {
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
        }
    });

    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const todoError = document.getElementById("todo-error");

    todoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const todoText = todoInput.value.trim();

    if (todoText === "") {
        todoError.textContent = "Please enter a todo!";
        return;
    }

    todoError.textContent = "";
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = todoText;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", function () {
        li.remove();
    });
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    todoInput.value = "";
    });
})

document
.getElementById("user")
.addEventListener("click", loadUsers);

async function loadUsers() {

    const response =
        await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

    const users =
        await response.json();

    const list =
        document.getElementById("users");

    users.forEach(user => {

        const li =
            document.createElement("li");

        li.textContent =
            user.name;

        list.appendChild(li);

    });

}
