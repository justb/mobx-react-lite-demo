import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";

import TodoStore from "./TodoStore";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import "./styles.css";

export const App = observer(() => {
  const store = useContext(TodoStore);
  console.log(store.todos);
  return (
    <div className="App">
      <button onClick={e => store.getUser()}>123</button>
      {store.todos.map((item, index) => (
        <div
          key={item.id}
          style={{ opacity: item.completed ? 1 : 0.5 }}
          onClick={e => store.changeItem(index)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
