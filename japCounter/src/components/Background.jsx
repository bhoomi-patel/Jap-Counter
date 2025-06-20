import React, { useRef, useEffect } from "react";

const StarField = ({ isDark }) => {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = isDark
      ? ["rgba(25,25,112,0.3)", "rgba(72,61,139,0.2)", "rgba(0,0,0,0.8)"]
      : ["rgba(135,206,250,0.3)", "rgba(186,85,211,0.2)", "rgba(255,255,255,0.8)"];

    const draw = () => {
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
      colors.forEach((color, index) => gradient.addColorStop(index / 2, color));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDark]);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: isDark
          ? "radial-gradient(circle, #1a1a2e, #16213e, #0f0f23)"
          : "radial-gradient(circle, #e6f3ff, #b8e6ff, #87ceeb)",
      }}
    />
  );
};

export default StarField;
