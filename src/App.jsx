import { useEffect, useReducer } from "react";
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

//reducer함수 만들기 (todo의 상태 변화를 담당)
function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      //새로운 할일을 추가하면, 기존의 데이터와 스프레드배열로 state상태값으로 함께 조인
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    }
    case "DELETE": {
      return state.filter((item) => item.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : item
      );
    }
    default: {
      return state;
    }
  }
}
function App() {
  const [todo, dispatch] = useReducer(reducer, mok);
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "INIT", data });
      });
  }, []);
  const onCreate = (content) => {
    const newTodo = {
      id: uuidv4(),
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: "CREATE", data }));
  };

  //체크 박스 선택하면 토글 해주는 메서드
  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  };

  //삭제하는 로직
  const onDelete = (targetId) => {
    dispatch({ type: "DELETE", targetId: targetId });
  };

  //수정버튼 기능
  const onEdit = (targetId, newContent) => {
    fetch(`http://localhost:3000/todos/${encodeURIComponent(targetId)}`, {
      method: "PATCH", // 기존 데이터 수정
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent }),
    })
      .then((res) => res.json())
      .then(() => dispatch({ type: "EDIT", targetId, newContent }));
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
