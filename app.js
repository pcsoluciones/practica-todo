
const alert = document.querySelector('.alert')
const formulario = document.querySelector("#formulario")
const pintarTodo = document.querySelector("#pintarTodo")
const templateTodo = document.querySelector("#templateTodo").content 

let todos = []

const agregarTodo = (todo) => {
    const objetoTodo = {
        nombre: todo,
        id: `${Date.now()}`         // ``${}   para convertir a string
    }
    todos.push(objetoTodo)
}

// Muestra los Todos creados
const pintarTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))

    pintarTodo.textContent = ""
    const fragment =document.createDocumentFragment()

    todos.forEach(item => {
        const clone = templateTodo.cloneNode(true)
        clone.querySelector(".lead").textContent = item.nombre
        clone.querySelector(".btn").dataset.id = item.id
        fragment.appendChild(clone)
    })
    pintarTodo.appendChild(fragment)
}


// Formulario
formulario.addEventListener('submit', e => {
    e.preventDefault()

    alert.classList.add("d-none")

    const data = new FormData(formulario)   // capturar los datos del formulario con FormData
    const [ todo ] = [...data.values()]     //destructuración que captura los input del formulario
    
    //console.log(!todo.trim())   // !trim devuelve false si existen caracteres o true si esta vacio

    if (!todo.trim()) {
        alert.classList.remove("d-none")
        return
    }
    agregarTodo(todo)
    pintarTodos()
})


// Para borrar un Todo
document.addEventListener('click', e => {
    console.log(e.target.dataset)                   // muestra el valor del dataset si existe
    console.log(e.target.matches(".btn-danger"))    // true si coincide con esa clase

    if (e.target.matches(".btn-danger")){
        console.log ("diste click en borrar")

        // recorrer todos los Todo para filtrar los que no coincidan con el dataset.id y haci eliminarlo
        todos = todos.filter(item => item.id !== e.target.dataset.id)
        pintarTodos()
    }

})


// Se ejecuta una vez cargado el DOM y carga los datos de LocalStorage
document.addEventListener('DOMContentLoaded', (e) => {
    // Si existe localStorage carga su contenido
    if (localStorage.getItem('todos')){
        todos = JSON.parse(localStorage.getItem('todos'))
        pintarTodos()
    }
})