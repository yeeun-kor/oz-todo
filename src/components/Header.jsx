import Clock from "./Clock";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <h3>Today's</h3>
      <Clock></Clock>
    </div>
  );
}
