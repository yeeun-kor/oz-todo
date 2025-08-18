import { useState } from "react";
import "./list.css";
import TodoItem from "./TodoItem";
export default function List({ todo, onUpdate, onDelete, onEdit }) {
  const [search, setSearch] = useState("");
  const onChageSearch = (e) => {
    setSearch(e.target.value);
  };
  //검색결과의 데이터 메서드
  const filteredData = () => {
    if (search === "") {
      return todo;
    }
    return todo.filter((todos) =>
      todos.content.toLowerCase().includes(search.toLowerCase())
    );
  };
  //메서드를 변수에 담아준다.
  const filteredTodos = filteredData();
  return (
    <div className="List">
      <h3>Tasks</h3>
      <input
        placeholder="할 일 검색하기"
        value={search}
        onChange={onChageSearch}
      ></input>
      <div className="todos_wrapper">
        {filteredTodos.map((todos) => {
          return (
            <TodoItem
              {...todos}
              key={todos.id}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onEdit={onEdit}
            ></TodoItem>
          );
        })}
      </div>
    </div>
  );
}
