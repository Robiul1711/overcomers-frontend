import React, { useState } from "react";
import { PenTool, RotateCcw } from "lucide-react";

const SignaturePad = ({ label, id }) => {
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setIsEmpty(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#3A331E";
    }
  }, []);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex justify-between items-center px-1">
        <label className="text-[13px] font-extrabold text-Third uppercase tracking-wider">
          {label}
        </label>
        {!isEmpty && (
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors"
          >
            <RotateCcw size={12} /> Clear
          </button>
        )}
      </div>
      <div className="relative group">
        <div className="absolute inset-0 bg-Secondary/5 rounded-2xl -z-10 group-hover:bg-Secondary/10 transition-colors"></div>
        <canvas
          ref={canvasRef}
          id={id}
          width={600}
          height={200}
          className="w-full h-[120px] bg-white/50 border border-gray-100 rounded-2xl cursor-crosshair touch-none shadow-sm"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 flex-col gap-2">
            <PenTool size={24} className="text-Third" />
            <span className="text-[12px] font-bold text-Third">Sign here</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignaturePad;
