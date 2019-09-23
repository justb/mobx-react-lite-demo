import { createContext } from "react";
import Axios from "axios";
import { decorate, observable, computed, flow } from "mobx";

export class Todos {
  todos = [
    { id: 1, text: "Buy eggs", completed: true },
    { id: 2, text: "Write a post", completed: false }
  ];
  constructor() {
    this.getUser();
  }
  get remainingTodos() {
    return this.todos.filter(t => !t.completed).length;
  }

  changeItem(index) {
    console.log(index);
    this.todos[index].completed = !this.todos[index].completed;
  }
  toggleTodo = index => {
    this.todos[index].completed = !this.todos[index].completed;
  };
  getUser = flow(function*() {
    try {
      let a = yield Axios.get(
        "https://www.fastmock.site/mock/871b3e736e653b99374b7713e4011f9f/boss/user/list"
      );
      console.log(a.data.data.userList);
      this.todos = this.todos.concat(a.data.data.userList);
    } catch (error) {
      this.todos = [];
    }
  });
}

decorate(Todos, {
  todos: observable,
  remainingTodos: computed
});

export default createContext(new Todos());
