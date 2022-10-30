"use client";

import { useState } from "react";

export default function MyButton({ text }: { text: string }) {
  const [value, setValue] = useState(0);

  return (
    <div>
      <p>{text}</p>

      <h1>{window.screen.availHeight}</h1>
      <h1>{window.screen.availWidth}</h1>
      <button onClick={() => setValue(value + 1)}>{value}</button>
    </div>
  );
}
