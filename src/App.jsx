import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Advice from "./components/Advice";
import Editor from "./components/Editor";
import Header from "./components/Header";
import List from "./components/List";

const mok = [
  {
    id: uuidv4(),
    isDone: false,
    content: "작은봄 연습하기",
    date: new Date().getTime(),
  },
  {
    id: uuidv4(),
    isDone: false,
    content: "샤워하기",
    date: new Date().getTime(),
  },
  {
    id: uuidv4(),
    isDone: false,
    content: "드럼 연습하기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todo, setTodo] = useState(mok);
  const onCreate = (content) => {
    const newTodo = {
      //json서버 파일을 보낼때, ID값은 자동으로 만들어줌
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    //서버로 보내주기
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((res) => setTodo([...todo, res]));
  };

  //체크 박스 선택하면 토글 해주는 메서드
  const onUpdate = (targetId) => {
    //체크박스가 선택된 아이디 값 받아와서, todo의 상태값과 동일한 Id를 갖는다?
    //그럼 todo의 상태 변화 시켜
    setTodo(
      todo.map((todos) =>
        todos.id === targetId ? { ...todos, isDone: !todos.isDone } : todos
      )
    );
  };

  //삭제하는 로직
  const onDelete = (targetId) => {
    setTodo(todo.filter((todos) => todos.id !== targetId));
  };

  //수정버튼 기능
  const onEdit = (targetId, newContent) => {
    setTodo(
      todo.map((todos) =>
        todos.id === targetId ? { ...todos, content: newContent } : todos
      )
    );
  };

  return (
    <div className="APP">
      <h1>TODO-LIST APP</h1>
      <Advice></Advice>
      <Header></Header>
      <Editor onCreate={onCreate}></Editor>
      <List
        todo={todo}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onEdit={onEdit}
      ></List>
    </div>
  );
}

export default App;
