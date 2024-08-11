const input = document.querySelector('#task');
const addTask = document.querySelector('#add');
const list = document.querySelector('.items');

const addToDom=(todo)=>{
     list.innerText = '';
     todo.forEach((data)=>{
          li = document.createElement('li');
          li.innerHTML = `<span class="taskList">${data.name}</span><button id=${data.id} class="up">⬆️</button><button id=${data.id} class="down">⬇️</button><button id=${data.id} class="delete">❎</button>`;
          list.appendChild(li);
     })
}

axios.get('/show')
.then((res)=>{
     todo = res.data;
     addToDom(todo);
})
.catch((err)=>{
     console.log(err);
})

addTask.addEventListener('click',(e)=>{
     e.preventDefault();
     if(input.value === ''){
               return;
          }
     axios.post('/add',{name:input.value})
     .then((res)=>{
          todo = res.data;
          addToDom(todo);
          input.value='';
})
     .catch((err)=>console.log(err));
})

list.addEventListener('click',(e)=>{
     let id = e.target.getAttribute('id');
     if(e.target.className === 'delete'){

     axios.post('/delete',{id:id})
     .then((res)=>{
          todo = res.data;
          addToDom(todo);
     }).catch((err)=>{
          console.log(err);
     })
}
else if(e.target.className === 'up'){
     axios.post(`/up?id=${id}`,{id:id})
     .then((res)=>{
          todo = res.data;
          addToDom(todo);
     }).catch((err)=>{
          console.log(err);
     })
}
else if(e.target.className === 'down'){
     axios.post(`/down?id=${id}`,{id:id})
     .then((res)=>{
          todo = res.data;
          addToDom(todo);
     }).catch((err)=>{
          console.log(err);
     })
}
else{
     return;
}
     
})

