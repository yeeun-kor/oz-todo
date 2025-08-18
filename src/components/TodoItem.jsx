import { useState } from "react";
import "./todoItem.css";
export default function TodoItem({
  id,
  isDone,
  content,
  date,
  onUpdate,
  onDelete,
  onEdit,
}) {
  //체크박스 토글 기능
  const onChageCheckBox = () => {
    onUpdate(id);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const onChageContent = () => {
    setEditContent(content); // 기존 내용 불러오기
    setIsEditing(true);
  };
  const handleComplete = () => {
    onEdit(id, editContent);
    setIsEditing(false);
  };
  return (
    <div className={`TodoItem ${isDone === false ? "isNotDone" : "isDone"}`}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={onChageCheckBox}
        className="TodoItem-checkBox"
      />

      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button
        onClick={() => {
          onDelete(id);
        }}
      >
        삭제
      </button>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editContent}
            className="content"
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={handleComplete}>완료</button>
        </>
      ) : (
        <>
          <div className="content">{content}</div>
          <button className="TodoItem-update" onClick={onChageContent}>
            수정
          </button>
        </>
      )}
    </div>
  );
}
