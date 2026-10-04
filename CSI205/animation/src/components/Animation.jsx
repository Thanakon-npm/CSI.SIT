import { useState, useEffect, useRef } from "react";
import "../App.css";

import meneImage from "../assets/mene.jpg";
import basketball from "../assets/basketball.jpg";
import football from "../assets/football.jpg";
import volleyball from "../assets/volleyball.jpeg";
import human from "../assets/me.jpeg";

const Animation = ({
  fieldwidth,
  fieldheight,
  ballRdius,
  velocity,
  keyevent,
}) => {
  // default values
  const _keyevent = keyevent || null;
  const _fieldWidth = fieldwidth || 736;
  const _fieldHeight = fieldheight || 414;
  const _ballRadius = ballRdius || 50;
  const _velocity = velocity || 50; // pixels per second

  // ความเร็วพื้นฐาน: velocity คูณ √2 เพื่อเคลื่อนทแยง 45° (ใช้เป็นค่าอ้างอิงตอนสุ่มใหม่)
  const baseXVelocity = Math.round(_velocity * Math.sqrt(2));
  const baseYVelocity = Math.round(_velocity * Math.sqrt(2)); // คิดเอง

  // ใช้ useRef แทน const เพื่อให้แก้ค่าได้ตอนชนขอบโดยไม่ re-render
  const xVelRef = useRef(baseXVelocity);
  const yVelRef = useRef(baseYVelocity);

  const frameRate = 30; // frames per second
  const frameTime = 1 / frameRate; // seconds per frame
  const _ballDiameter = 2 * _ballRadius;
  const maxX = _fieldWidth - _ballDiameter - 2 * 2;
  const maxY = _fieldHeight - _ballDiameter - 2 * 2; // คิดเอง

  // refs
  const ballRef = useRef();
  const timer = useRef(null);
  // state
  const [ballType, setBallType] = useState("none");
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [moveLeft, setMoveLeft] = useState(true);
  const [moveDown, setMoveDown] = useState(true);
  const [rotation, setRotation] = useState(0); // มุมหมุนสะสม (องศา)

  const DEG_PER_RAD = 180 / Math.PI;

  const Timer = useRef(null);
  useEffect(() => {
    if (running) {
      if (Timer.current === null) {
        Timer.current = setTimeout(() => {
          calculateNextFrame();
        }, frameTime * 1000);
      }
    }
    return () => {
      clearTimeout(Timer.current);
      Timer.current = null;
    };
  });

  const calculateNextFrame = () => {
    const curXVel = xVelRef.current; // ความเร็ว x ปัจจุบัน (อาจเปลี่ยนทุกครั้งที่ชนขอบ)
    const curYVel = yVelRef.current; // ความเร็ว y ปัจจุบัน

    // deg/frame = (v / r) × frameTime × (180/π)  ← ω = v/r [rad/s] แปลงเป็นองศาต่อ frame
    const degPerFrame = (curXVel / _ballRadius) * frameTime * DEG_PER_RAD;

    // แกน X: เคลื่อนขวา → หมุนขวา (+) | เคลื่อนซ้าย → หมุนซ้าย (-)
    if (moveLeft) {
      setX((x) => x + curXVel / frameRate);
      setRotation((r) => r + degPerFrame); // หมุนตามเข็มนาฬิกา
      if (x >= maxX) {
        // ❌ ตรงนี้ x เป็นค่าเก่าจาก render ก่อนหน้า
        setX((x) => maxX - (x - maxX)); // สะท้อนกลับจากขอบขวา
        setMoveLeft(() => false);
        // สุ่มความเร็วใหม่ 50–150% ของค่าเริ่มต้น (การหมุนจะเปลี่ยนตามอัตโนมัติ)
        xVelRef.current = Math.round(baseXVelocity * (Math.random() * 1.0 + 0.5));
      }
    } else {
      // <==
      setX((x) => x - curXVel / frameRate);
      setRotation((r) => r - degPerFrame); // หมุนทวนเข็มนาฬิกา
      if (x < 0) {
        setX((x) => -x); // สะท้อนกลับจากขอบซ้าย
        setMoveLeft(() => true);
        xVelRef.current = Math.round(baseXVelocity * (Math.random() * 1.0 + 0.5));
      }
    }
    // แกน y  คิดเอง
    if (moveDown) {
      // =>
      setY((y) => y + curYVel / frameRate);
      if (y >= maxY) {
        setY((y) => maxY - (y - maxY));
        setMoveDown(() => false);
        // สุ่มความเร็ว y ใหม่เมื่อชนขอบบน/ล่าง (50%–150% ของความเร็วเริ่มต้น)
        yVelRef.current = Math.round(baseYVelocity * (Math.random() * 1.0 + 0.5));
      }
    } else {
      // <==
      setY((y) => y - curYVel / frameRate);
      if (y < 0) {
        setY((y) => -y);
        setMoveDown(() => true);
        // สุ่มความเร็ว y ใหม่เมื่อชนขอบบน/ล่าง
        yVelRef.current = Math.round(baseYVelocity * (Math.random() * 1.0 + 0.5));
      }
    }
  };

  useEffect(() => {
    if (keyevent !== null) {
      if (keyevent.key === "") setRunning(running);
      else if (keyevent.key === "0") setBallType("none");
      else if (keyevent.key === "1") setBallType("basketball");
      else if (keyevent.key === "2") setBallType("football");
      else if (keyevent.key === "3") setBallType("volleyball");
      else if (keyevent.key === "4") setBallType("human");
    }
  }, [keyevent]);

  useEffect(() => {
    // console.log(ballType)
    if (ballType === "none") ballRef.current.style.backgroundImage = "";
    else if (ballType === "basketball")
      ballRef.current.style.backgroundImage = `url(${basketball})`;
    else if (ballType === "football")
      ballRef.current.style.backgroundImage = `url(${football})`;
    else if (ballType === "volleyball")
      ballRef.current.style.backgroundImage = `url(${volleyball})`;
    else if (ballType === "human")
      ballRef.current.style.backgroundImage = `url(${human})`;
  }, [ballType]);

  return (
    <>
      {/* animation */}
      <div className="mx-auto mt-3" style={{ width: "fit-content" }}>
        {/* field */}
        <div
          className="border border-black border-2 rounded-3 position-relative"
          style={{
            width: `${_fieldWidth}px`,
            height: `${_fieldHeight}px`,
            backgroundImage: `url(${meneImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* ball */}
          <div
            ref={ballRef}
            className="border border-1 border-black rounded-circle position-absolute ballspin"
            style={{
              width: `${_ballDiameter}px`,
              height: `${_ballDiameter}px`,
              backgroundColor: "white",
              backgroundImage: "",
              backgroundSize: "cover",
              backgroundPosition: "center",
              left: `${x}px`,
              top: `${y}px`,
              // หมุนตามฟิสิกส์: transform ใช้มุมสะสม rotation (องศา)
              transform: `rotate(${rotation}deg)`,
            }}
          ></div>
        </div>

        {/* button row */}
        <div className="d-flex justify-content-between mt-2 gap-4">
          <button
            className={`btn ${running ? "btn-danger" : "btn-success"}`}
            onClick={() => setRunning(!running)}
          >
            {running ? (
              <span>
                <i className="bi bi-pause-fill"></i> PAUSE
              </span>
            ) : (
              <span>
                <i className="bi bi-play-fill"></i> PLAY
              </span>
            )}
          </button>

          {/* ball type */}
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-lg btn-outline-secondary"
              onClick={() => setBallType("none")}
            >
              None
            </button>
            <button
              className="btn btn-lg btn-outline-primary"
              onClick={() => setBallType("basketball")}
            >
              Backetball
            </button>
            <button
              className="btn btn-lg btn-outline-primary"
              onClick={() => setBallType("football")}
            >
              Football
            </button>
            <button
              className="btn btn-lg btn-outline-primary"
              onClick={() => setBallType("volleyball")}
            >
              Volleyball
            </button>
            <button
              className="btn btn-lg btn-outline-primary"
              onClick={() => setBallType("human")}
            >
              Human
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Animation;
