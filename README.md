# **📝 Todo List (Mini Project)**

```bash
json-server --watch db.json
```

서버연결 필수!

## **📍 Reducer함수로 상태관리**

```jsx
import { useReducer } from 'react';

//1. Reducer 함수
function reducer(state, action) {
  // ... (
}

//2. useReducer를 사용하여 상태를 관리
function MyComponent() {
  const [state, dispatch] =
  useReducer(reducer, { age: 22 });
  // ...

```

- **`reducer`** 함수는 상태(**`state`**)와 액션(**`action`**)을 매개변수로 받는다.

  - 액션 **타입에** 따라 새로운 상태를 반환하는 로직을 포함합니다.
  - 주석 **`// ...`** 부분에는 상태를 어떻게 변경할지에 대한 코드가 들어갑니다.

- `MyComponent`는 React 함수형 컴포넌트
  - 이 컴포넌트 내부에서 `useReducer`를 사용하여 상태를 관리합니다.
- **`useReducer(reducer, { age: 22 })`**는 **`reducer`** 함수와 초기 상태(**`{ age: 22 }`**)를 매개변수로 받는다.
  - **`state`**: 현재 상태의 스냅샷으로, 이 예제에서는 초기값인 `{ age: 22 }`로 시작합니다.
  - **`dispatch`**: 액션을 발생시켜 상태를 업데이트하는 함수입니다. 이 함수를 호출할 때 **`reducer`** 함수에 정의된 로직에 따라 상태가 업데이트됩니다.

## **📌 더보기 기능 구현**

### 원하는 기능

    - todo의 content가 길어지면 CSS에서 overflow: hidden 으로 잘라내고 있음
    - 그런데 사용자가 특정 todo 아이템을 클릭하면 숨겨진 나머지 텍스트까지 보이게 하고 싶음
    - 느낌상 “더보기 / 접기” 토글 기능

#### 접근 방법

---

1. UI상태 관리해주기.

2. `isExpanded` 상태 변수 하나 만들어서, 각 todo 아이템 별로 추가

   - 확장되어 있는지, 펼쳐져 있는지 의미함
   - `isExpanded : false `펼쳐있지 않고 닫혀져 있음
   - `isExpanded : true` 펼쳐져 있음

3. `isExpanded : true` 이면 펼쳐지는 CSS 스타일링

---

### 실행결과

![컨텐츠더보기](https://github.com/user-attachments/assets/445f0e29-925b-45a8-82fa-bb1780e372db)

### 상태관리 (App.jsx)

1. `reducer` 추가

   ```jsx
   function reducer(state, action) {
     switch (action.type) {
       case "MORE_CONTENT": {
         return state.map((item) =>
           item.id === action.id
             ? { ...item, isExpanded: !item.isExpanded }
             : item
         );
       }
     }
   }
   ```

- `reducer` 함수 안에서 상태 추가 하기
- 상태(state - 여기에선, 사용자가 입력한 newTodo의 객체 여러개를 말함 ) 값을 순회하며, 해당 id값과 클릭한 Id값이 맞는지 확인
- 맞으면 더보기상태(`isExpanded`)를 토글 시켜줄 것.

1. 더보기 토글 기능

```jsx
const onToggleExpand = (targetId) => {
  dispatch({ type: "MORE_CONTENT", id: targetId });
};
```

- 컨텐츠 박스를 클릭하면, 클릭한 `Id`값을 받아와서 상태 변화 동작을 외부 reducer함수로 보냄
- 이때 `dispatch` 에 정보 보내주기.
- type명을 `"MORE_CONTENT"`
- 넘길 id값을 `targetId` 보낸다.

---

### 상태에 따른 조건 스타일링 ( TodoItem.jsx)

```jsx
const [isExpanded, setIsExpanded] = useState(false);
```

- 상태 관리 변수 설정
- 이로인하여, className에서 삼항연산자를 사용하여 클래스명 차등하게 줄 것이다.

```jsx
const onChageMoreContent = () => {
  onToggleExpand(id);
  setIsExpanded(!isExpanded);
};
```

- 이벤트 핸들러 생성 해주었다
- 버틀 클릭을 하면, 컨텐츠 내용들을 열고 닫을 수 있다.
- 부모 컴포넌트에게 id값 넘겨주어야 한다.
- 토글 기능을 주기 위해, 상태관리 값에 `!isExpanded` 설정하였다.

```jsx
<div
  className={`content ${isExpanded ? "expanded" : ""}`}
  onClick={onChageMoreContent}
>
  {content}
</div>
```

- 만약 `isExpanded` 상태가 true = 열려 있으면 클래스명` "expanded"`
- 닫혀있으면 아무것도 클래스 설정 안함 ( 여기선 `content랑` 같이 설정되어 있음.)
