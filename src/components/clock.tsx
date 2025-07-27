import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const t = () => setTime(new Date().toLocaleTimeString());
    let r = setInterval(t, 1000);
    return () => clearInterval(r);
  }, []);

  return (
    <div className="absolute top-0 mt-12">
      <h1 className="scroll-m-20 text-center text-7xl font-extrabold tracking-tight text-balance">
        {time}
      </h1>
    </div>
  );
}
