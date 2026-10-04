'use client'

import { useState, useEffect, useRef } from "react";

const Animation = ({
  fieldwidth,
  fieldheight,
  ballRdius,
  velocity,
  keyevent,
}: {
  fieldwidth?: number;
  fieldheight?: number;
  ballRdius?: number;
  velocity?: number;
  keyevent?: KeyboardEvent | null;
}) => {
  const _keyevent = keyevent || null;
  const _fieldWidth = fieldwidth || 736;
  const _fieldHeight = fieldheight || 414;
  const _ballRadius = ballRdius || 50;
  const _velocity = velocity || 50;

  const baseXVelocity = Math.round(_velocity * Math.sqrt(2));
  const baseYVelocity = Math.round(_velocity * Math.sqrt(2));

  const xVelRef = useRef(baseXVelocity);
  const yVelRef = useRef(baseYVelocity);

  const frameRate = 30;
  const frameTime = 1 / frameRate;
  const _ballDiameter = 2 * _ballRadius;
  const maxX = _fieldWidth - _ballDiameter - 2 * 2;
  const maxY = _fieldHeight - _ballDiameter - 2 * 2;

  const ballRef = useRef<HTMLDivElement>(null);
  const Timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [ballType, setBallType] = useState("none");
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [moveLeft, setMoveLeft] = useState(true);
  const [moveDown, setMoveDown] = useState(true);
  const [rotation, setRotation] = useState(0);

  const DEG_PER_RAD = 180 / Math.PI;

  useEffect(() => {
    if (running) {
      if (Timer.current === null) {
        Timer.current = setTimeout(() => {
          calculateNextFrame();
        }, frameTime * 1000);
      }
    }
    return () => {
      clearTimeout(Timer.current!);
      Timer.current = null;
    };
  });

  const calculateNextFrame = () => {
    const curXVel = xVelRef.current;
    const curYVel = yVelRef.current;
    const degPerFrame = (curXVel / _ballRadius) * frameTime * DEG_PER_RAD;

    if (moveLeft) {
      setX((x) => x + curXVel / frameRate);
      setRotation((r) => r + degPerFrame);
      if (x >= maxX) {
        setX((x) => maxX - (x - maxX));
        setMoveLeft(() => false);
        xVelRef.current = Math.round(baseXVelocity * (Math.random() * 1.0 + 0.5));
      }
    } else {
      setX((x) => x - curXVel / frameRate);
      setRotation((r) => r - degPerFrame);
      if (x < 0) {
        setX((x) => -x);
        setMoveLeft(() => true);
        xVelRef.current = Math.round(baseXVelocity * (Math.random() * 1.0 + 0.5));
      }
    }

    if (moveDown) {
      setY((y) => y + curYVel / frameRate);
      if (y >= maxY) {
        setY((y) => maxY - (y - maxY));
        setMoveDown(() => false);
        yVelRef.current = Math.round(baseYVelocity * (Math.random() * 1.0 + 0.5));
      }
    } else {
      setY((y) => y - curYVel / frameRate);
      if (y < 0) {
        setY((y) => -y);
        setMoveDown(() => true);
        yVelRef.current = Math.round(baseYVelocity * (Math.random() * 1.0 + 0.5));
      }
    }
  };

  useEffect(() => {
    if (_keyevent !== null) {
      if (_keyevent?.key === " ") setRunning((r) => !r);
      else if (_keyevent?.key === "0") setBallType("none");
      else if (_keyevent?.key === "1") setBallType("basketball");
      else if (_keyevent?.key === "2") setBallType("football");
      else if (_keyevent?.key === "3") setBallType("volleyball");
      else if (_keyevent?.key === "4") setBallType("human");
    }
  }, [_keyevent]);

  useEffect(() => {
    if (!ballRef.current) return;
    const imageMap: Record<string, string> = {
      none: "",
      basketball: "/animation-assets/basketball.jpg",
      football: "/animation-assets/football.jpg",
      volleyball: "/animation-assets/volleyball.jpeg",
      human: "/animation-assets/me.jpeg",
    };
    const url = imageMap[ballType];
    ballRef.current.style.backgroundImage = url ? `url(${url})` : "";
  }, [ballType]);

  return (
    <>
      <div className="mx-auto mt-3" style={{ width: "fit-content" }}>
        {/* field */}
        <div
          className="border-2 border-black rounded-lg relative overflow-hidden"
          style={{
            width: `${_fieldWidth}px`,
            height: `${_fieldHeight}px`,
            backgroundImage: `url(/animation-assets/mene.jpg)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* ball */}
          <div
            ref={ballRef}
            className="border border-black rounded-full absolute ballspin"
            style={{
              width: `${_ballDiameter}px`,
              height: `${_ballDiameter}px`,
              backgroundColor: "white",
              backgroundSize: "cover",
              backgroundPosition: "center",
              left: `${x}px`,
              top: `${y}px`,
              transform: `rotate(${rotation}deg)`,
            }}
          />
        </div>

        {/* controls */}
        <div className="flex justify-between items-center mt-2 gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
              running ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={() => setRunning(!running)}
          >
            {running ? "⏸ PAUSE" : "▶ PLAY"}
          </button>

          <div className="flex gap-2">
            {[
              { label: "None", value: "none" },
              { label: "🏀 Basketball", value: "basketball" },
              { label: "⚽ Football", value: "football" },
              { label: "🏐 Volleyball", value: "volleyball" },
              { label: "🙂 Human", value: "human" },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setBallType(value)}
                className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition ${
                  ballType === value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Animation;
