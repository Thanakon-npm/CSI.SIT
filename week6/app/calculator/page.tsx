'use client'

import { useState, useEffect } from "react";

export default function Page() {
  return (
    <>
      <h1 className="mt-3 text-center text-xl font-bold">THANAKORN KHAMWISET 68045661</h1>
      <Calculator />
    </>
  );
}

// ─────────────────────────────────────────────
// Calculator Component
// ─────────────────────────────────────────────

type ButtonConfig = {
  label: string;
  type: "memory" | "function" | "operator" | "number" | "action";
  disabled?: boolean;
};

// ปุ่มที่ใช้งานได้: 0-9, C, =, +, -
const ENABLED = new Set(["0","1","2","3","4","5","6","7","8","9","C","=","+","-"]);

const BUTTONS: ButtonConfig[][] = [
  [
    { label: "MC",  type: "memory",   disabled: true },
    { label: "MR",  type: "memory",   disabled: true },
    { label: "M-",  type: "memory",   disabled: true },
    { label: "M+",  type: "memory",   disabled: true },
    { label: "MS",  type: "memory",   disabled: true },
  ],
  [
    { label: "%",   type: "function", disabled: true },
    { label: "CE",  type: "function", disabled: true },
    { label: "C",   type: "function" },
    { label: "⌫",   type: "function", disabled: true },
    { label: "÷",   type: "operator", disabled: true },
  ],
  [
    { label: "7",   type: "number" },
    { label: "8",   type: "number" },
    { label: "9",   type: "number" },
    { label: "√",   type: "function", disabled: true },
    { label: "×",   type: "operator", disabled: true },
  ],
  [
    { label: "4",   type: "number" },
    { label: "5",   type: "number" },
    { label: "6",   type: "number" },
    { label: "1/x", type: "function", disabled: true },
    { label: "-",   type: "operator" },
  ],
  [
    { label: "1",   type: "number" },
    { label: "2",   type: "number" },
    { label: "3",   type: "number" },
    { label: "x²",  type: "function", disabled: true },
    { label: "+",   type: "operator" },
  ],
  [
    { label: "+/-", type: "function", disabled: true },
    { label: "0",   type: "number" },
    { label: ".",   type: "number",   disabled: true },
    { label: "=",   type: "action" },
  ],
];

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [memory, setMemory] = useState(0);
  // เก็บ operand และ operator สุดท้าย สำหรับกด = ซ้ำ
  const [lastOperand, setLastOperand] = useState<number | null>(null);
  const [lastOperator, setLastOperator] = useState<string | null>(null);

  // format เลขให้มีช่องว่างทุก 3 หลัก เช่น 1000 → 1 000
  const formatDisplay = (val: string) => {
    if (val === "Error") return val;
    const [intPart, decPart] = val.split(".");
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return decPart !== undefined ? `${formatted}.${decPart}` : formatted;
  };

  const handleButton = (label: string) => {
    // Numbers & decimal
    if (/^[0-9]$/.test(label)) {
      if (waitingForNext) {
        setDisplay(label);
        setWaitingForNext(false);
        setLastOperand(null); // เริ่มพิมพ์ใหม่ → ล้างค่า repeat
      } else {
        // จำกัดจำนวนตัวเลขไม่เกิน 12 หลัก เพื่อไม่ให้ล้นหน้าจอ
        const rawDigits = display.replace(/[^0-9]/g, "");
        if (rawDigits.length >= 12) return;
        setDisplay(display === "0" ? label : display + label);
      }
      return;
    }

    if (label === ".") {
      if (waitingForNext) { setDisplay("0."); setWaitingForNext(false); return; }
      if (!display.includes(".")) setDisplay(display + ".");
      return;
    }

    const current = parseFloat(display);

    // Operators
    if (["+", "-", "×", "÷"].includes(label)) {
      setPrev(display);
      setOperator(label);
      setWaitingForNext(true);
      return;
    }

    // Equals
    if (label === "=") {
      if (prev !== null && operator !== null) {
        // กด = ครั้งแรก: คำนวณปกติ แล้วบันทึกไว้สำหรับ repeat
        const p = parseFloat(prev);
        const compute = (a: number, b: number, op: string) => {
          if (op === "+") return a + b;
          if (op === "-") return a - b;
          if (op === "×") return a * b;
          if (op === "÷") return b !== 0 ? a / b : NaN;
          return a;
        };
        const result = compute(p, current, operator);
        const str = isNaN(result) ? "Error" : parseFloat(result.toPrecision(10)).toString();
        setDisplay(str);
        setLastOperand(current);   // บันทึก operand ตัวที่ 2
        setLastOperator(operator); // บันทึก operator
        setPrev(null);
        setOperator(null);
        setWaitingForNext(true);
      } else if (lastOperand !== null && lastOperator !== null) {
        // กด = ซ้ำ: เอาผลลัพธ์ปัจจุบัน + lastOperand + lastOperator
        const cur = parseFloat(display);
        const compute = (a: number, b: number, op: string) => {
          if (op === "+") return a + b;
          if (op === "-") return a - b;
          if (op === "×") return a * b;
          if (op === "÷") return b !== 0 ? a / b : NaN;
          return a;
        };
        const result = compute(cur, lastOperand, lastOperator);
        const str = isNaN(result) ? "Error" : parseFloat(result.toPrecision(10)).toString();
        setDisplay(str);
        setWaitingForNext(true);
      }
      return;
    }

    // Functions
    if (label === "C")   { setDisplay("0"); setPrev(null); setOperator(null); setWaitingForNext(false); return; }
    if (label === "CE")  { setDisplay("0"); return; }
    if (label === "⌫")  { setDisplay(display.length > 1 ? display.slice(0, -1) : "0"); return; }
    if (label === "%")   { setDisplay((current / 100).toString()); return; }
    if (label === "+/-") { setDisplay((current * -1).toString()); return; }
    if (label === "√")   { setDisplay(Math.sqrt(current).toString()); return; }
    if (label === "x²")  { setDisplay((current ** 2).toString()); return; }
    if (label === "1/x") { setDisplay(current !== 0 ? (1 / current).toString() : "Error"); return; }

    // Memory
    if (label === "MC")  { setMemory(0); return; }
    if (label === "MR")  { setDisplay(memory.toString()); return; }
    if (label === "MS")  { setMemory(current); return; }
    if (label === "M+")  { setMemory(memory + current); return; }
    if (label === "M-")  { setMemory(memory - current); return; }
  };

  // Keyboard support (ตามสเปค)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleButton(e.key);
      } else if (e.key === "Escape") {
        handleButton("C");
      } else if (e.key === "Enter") {
        e.preventDefault(); // ป้องกันไม่ให้ trigger click ปุ่มที่กำลัง focus อยู่ซ้ำ
        handleButton("=");
      } else if (e.key === "+" || e.key === "=") {
        handleButton("+");
      } else if (e.key === "-") {
        handleButton("-");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });

  const buttonStyle = (type: ButtonConfig["type"], disabled?: boolean) => {
    const base = "h-[45px] rounded-lg border font-bold text-lg transition flex items-center justify-center ";
    if (disabled) return base + "border-gray-300 bg-gray-100 text-gray-300 cursor-not-allowed opacity-40 " + (type === "action" ? "w-[95px]" : "w-[45px]");
    const active = "active:scale-95 ";
    if (type === "memory")   return base + active + "border-gray-400 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm w-[45px]";
    if (type === "operator") return base + active + "border-gray-400 bg-orange-400 hover:bg-orange-500 text-white w-[45px]";
    if (type === "function") return base + active + "border-gray-400 bg-gray-200 hover:bg-gray-300 text-gray-800 w-[45px]";
    if (type === "action")   return base + active + "border-gray-400 bg-orange-500 hover:bg-orange-600 text-white w-[95px]";
    return base + active + "border-gray-400 bg-white hover:bg-gray-100 text-gray-900 w-[45px]";
  };

  const formattedDisplay = formatDisplay(display);
  const getFontSize = (str: string) => {
    if (str.length > 13) return "text-xl";
    if (str.length > 9)  return "text-2xl";
    return "text-3xl";
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[281px] border-[3px] border-black rounded-[18px_18px_0_0] bg-gray-500 shadow-xl select-none">
        <div className="w-full border-[5px] border-gray-100 p-[10px] rounded-[15px] bg-gray-300 box-border">
          {/* Screen */}
          <div className="w-full bg-[rgb(195,247,255)] h-[60px] rounded-[10px] border border-gray-400 flex items-center justify-end px-3 mb-2 overflow-hidden">
            <span className={`${getFontSize(formattedDisplay)} font-mono font-medium truncate max-w-full leading-none`}>
              {formattedDisplay}
            </span>
          </div>

          {/* Buttons */}
          {BUTTONS.map((row, ri) => (
            <div key={ri} className="flex gap-[5px] my-[5px]">
              {row.map(({ label, type, disabled }) => (
                <button
                  key={label}
                  type="button"
                  className={buttonStyle(type, disabled)}
                  disabled={disabled}
                  onClick={() => !disabled && handleButton(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Student info */}
        <div className="text-gray-100 font-mono text-center pb-2 text-sm">
          68045661 ธนากร คำวิเศษ
        </div>
      </div>
    </div>
  );
}
