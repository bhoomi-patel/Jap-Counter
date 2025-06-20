import React from "react";

const FloatingWords = ({ floatingWords }) => {
  return (
    <>
      {floatingWords.map((word) => (
        <div
          key={word.id}
          className="absolute animate-float font-semibold opacity-50 pointer-events-none"
          style={{
            top: `${word.top}%`,
            left: `${word.left}%`,
            fontSize: `${word.size}rem`,
            color: word.color,
          }}
        >
          {word.text}
        </div>
      ))}

      {/* Floating animation CSS */}
      <style jsx>{`
        @keyframes float {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          50% {
            opacity: 0.6;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.8);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out forwards;
        }
      `}</style>
    </>
  );
};

export default FloatingWords;
