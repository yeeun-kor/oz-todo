# **📝 Todo List (Mini Project)**

## **📌 더보기 기능 구현**

### 1. 상태 추가

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
