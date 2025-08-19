import { useRef, useState } from "react";
import "./editor.css";
export default function Editor({ onCreate }) {
  //사용자가 입력한 할일 상태 관리
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const onChageContent = (e) => {
    setContent(e.target.value);
  };
//   form 태그를 활용해 보시면 좋을 것 같습니다. keydown 이벤트가 없어도 됩니다.
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  //추가 버튼을 클릭하면, 구조분해할당으로 받은 메서드와 연결하기
  //추가 버튼을 다 클릭하고 나서 편의기능 추가
  const onSubmit = () => {
    //공백방지
    if (content === "") {
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    //검색창 초기화
    setContent("");
  };
  return (
    <div className="Editor">
      <input
        onKeyDown={onKeyDown}
        ref={inputRef}
        type="text"
        placeholder="할일 적기..."
        value={content}
        onChange={onChageContent}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
}
