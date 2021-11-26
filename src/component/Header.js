import React, { useState , useEffect} from 'react';
import './todo.css'


export const Header = () => {
// input k liye 
    const [Todo, setTodo] = useState('');
    // for map todolist
    const [TodoList, setTodoList] = useState([]);
    // editing click
    const [editTodo, seteditTodo] = useState();

    // edit text
    const [editingText, setEditingText] = useState('');

    // for loading 
    useEffect(() => {
        const json = localStorage.getItem("TodoList");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            console.log(loadedTodos);
          setTodoList(loadedTodos);
        }
      }, []);
    
    //   refresh and have data still
    useEffect(() => {
        const json = JSON.stringify(TodoList);
        localStorage.setItem("TodoList", json);
        console.log(TodoList);
      }, [TodoList]);
    
    function handleTodo(e){
        e.preventDefault();
        // for array data in id, text 
        const newTodo = {
            id: new Date().getTime(),
            text:Todo,
            complete: false,
        }
        console.log(newTodo);

        // to make array of list 
        setTodoList([...TodoList].concat(newTodo));
        setTodo("");
    }


    // delete todo
    function deleteTodo(id) {
        let deletes = [...TodoList].filter((Todo)=> Todo.id !== id);
        console.log(deletes);
        setTodoList(deletes);
    }
    
    // edit
    function submitEdits(id) {
        const updatedTodos = [...TodoList].map((Todo) => {
          if (Todo.id === id) {
            Todo.text = editingText;
          }
          return Todo;
        });
        setTodoList(updatedTodos);
        seteditTodo(null);
      }
  
    return (
        <React.Fragment>
            <header>
         <h1>What's your Plan Today ? </h1>
		<form id="new-task-form" onSubmit={handleTodo}>
			<input 
				type="text" 
				value={Todo}
				id="new-task-input" 
				placeholder="What do you have planned?" onChange={(e)=>{setTodo(e.target.value)}}/>
			<input 
				type="submit"
				id="new-task-submit" 
				value="Add Plan" />
		</form>

         

           <main>
		<section class="task-list">
			<h2>My Plan's are : </h2>

			<div id="tasks">
            {TodoList.map((Todo)=>
			 <div class="task" key={Todo.id}>
            
        <div class="content">
        {Todo.id === editTodo ? (
              <input
                type="text"
                id="new-task-input"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
        <p class="text" >{Todo.text}</p>
        
            )}
        </div>
    <div class="actions">
    {Todo.id === editTodo ? (
        <button onClick={() => submitEdits(Todo.id)} style={{backgroundColor : "#ff004c" , padding : "10px"}}>Update</button>
        ) : (
            <button class="edit" onClick={() => seteditTodo(Todo.id)}><i class="fas fa-edit" /></button>
            )}
       
        <button class="delete" onClick={()=>deleteTodo(Todo.id)}><i class="fas fa-times"></i></button>
    </div>
   
				</div> 

 )}
			</div>
		</section>
	</main>
        </header>
        </React.Fragment>
    )
}
