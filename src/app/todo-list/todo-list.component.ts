import { Component } from '@angular/core';




interface Itask{
  id: number;
  title:string;
  description:string;
  status:boolean;
  date: string;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})



export class TodoListComponent {
  title: string = ''; // Declare title property
  description: string ='';
  date :string=new Date().toLocaleDateString();
  id: number = new Date().getTime();

  todos: Itask[] = [];

  getCurrentDate() {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month since it's zero-based index
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear();

  return `${month}-${day}-${year}`;
}

  validateId = (id: number) => {
    const isExist = this.todos.findIndex((todo) => {
      return todo.id === id
    })    
    console.log("isExist: ",isExist);
    return isExist;
  }

  addTodo() {

    // check if the todo is exist
    const todoIndex = this.validateId(this.id);

    // if the todo is exist => UPDATE
    if(todoIndex != -1){
      this.todos[todoIndex].title = this.title;
      this.todos[todoIndex].description = this.description;
      this.todos[todoIndex].date = this.date;
    }
    else {
      if (this.title.trim() !== '' && this.description.trim() !== '' && this.date.trim() !== '') {
        this.todos.push({
          id: new Date().getTime(), title: this.title, description: this.description,
          status: false,
          date: this.date
        });
      }  
    }
     
    // clear input fields
    this.title = ''; 
    this.description = ''; 
    this.date = ''
    this.id = -2
  }

  editTodo(index: number){
    const editedTodo = this.todos[index]
    this.title = editedTodo.title
    this.description = editedTodo.description
    this.date = editedTodo.date
    this.id = editedTodo.id

    console.log(this.getCurrentDate())
  
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
