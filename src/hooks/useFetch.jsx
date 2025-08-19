import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    // url이 없을 때의 예외처리도 있으면 좋을 것 같습니다.
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        // 로딩 상태는 일반적으로 성공/실패 상관없이 종료됩니다. finally메소드도 활용해 보면 좋을 것 같습니다.
        setIsLoading(false);
      });
  }, [url]);
  return { isLoading, data };
}
