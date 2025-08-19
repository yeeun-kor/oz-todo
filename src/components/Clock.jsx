import { useEffect, useState } from "react";
import "./clock.css";

export default function Clock() {
  //실시간 시간 타이머 기능
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    //1초마다 시간 총 업데이트
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    //언마운트
    return () => {
      clearInterval(timer);
    };
  }, []);
  //시,분,초,년,월,일 반환
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const year = String(time.getFullYear());
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const date = String(time.getDate()).padStart(2, "0");
  const days = time.getDay();
  //요일도 배열로 접근하여 반환
  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const today = day[days];
  return (
    <div>
      <div className="header-calender">
        {year.split("").map((digit, index) => (
          <div key={index} className="header-calender-box">
            {digit}
          </div>
        ))}
        <div>년</div>
        {month.split("").map((digit, index) => (
          <div key={index} className="header-calender-box">
            {digit}
          </div>
        ))}
        <div>월</div>
        {date.split("").map((digit, index) => (
          <div key={index} className="header-calender-box">
            {digit}
          </div>
        ))}
        <div>일</div>

        {today.split("").map((digit, index) => (
          <div key={index} className="header-calender-box">
            {digit}
          </div>
        ))}
      </div>
      <div className="header-timer">
        {/* 시간 쪼개서 스타일링하기 */}
        {hours.split("").map((digit, index) => (
          <div key={index} className="header-timer-box">
            {digit}
          </div>
        ))}

        <div className="colon">:</div>
        {minutes.split("").map((digit, index) => (
          <div key={index} className="header-timer-box">
            {digit}
          </div>
        ))}
        <div className="colon">:</div>
        {seconds.split("").map((digit, index) => (
          <div key={index} className="header-timer-box">
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}
