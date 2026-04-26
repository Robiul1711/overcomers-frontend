import React from "react";
import { X, Clock, LayoutGrid, ShieldCheck } from "lucide-react";

const ClockInModal = ({ 
  isOpen, 
  onClose, 
  selectedSession, 
  actualStartTime, 
  setActualStartTime, 
  confirmClockIn 
}) => {
  if (!isOpen || !selectedSession) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-[32px] w-full max-w-[95vw] sm:max-w-lg relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] p-6 sm:p-10 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-Primary rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-Third leading-tight">
              Session Ready
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-Secondary/[0.03] border border-Secondary/10 rounded-2xl p-5 mb-8 shadow-inner shadow-black/[0.01]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-lg text-Secondary shadow-sm">
              <LayoutGrid size={16} />
            </div>
            <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
              Protocol Check
            </span>
          </div>
          <p className="text-Secondary font-extrabold text-[18px] md:text-[20px] leading-tight">
            {selectedSession.client}{" "}
            <span className="opacity-40 px-2">|</span>{" "}
            {selectedSession.type}
          </p>
          <div className="flex items-center gap-2 mt-3 text-Secondary/60 font-bold text-[13px]">
            <Clock size={14} className="opacity-50" />
            <span>Scheduled Window: {selectedSession.time}</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-extrabold text-Third uppercase tracking-wider ml-1">
              Confirmation Time
            </label>
            <div className="relative">
              <Clock
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={actualStartTime}
                onChange={(e) => setActualStartTime(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-gray-100 px-12 py-5 rounded-2xl text-Third font-extrabold text-[16px] focus:outline-none focus:border-Primary transition-all shadow-sm"
              />
            </div>
            <p className="text-[11px] text-gray-400 font-bold italic mt-1 px-1 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-green-500" /> Logged
              timestamp for billing accuracy
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-4">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 py-4.5 bg-gray-50 text-gray-500 font-bold rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all active:scale-95"
          >
            Hold On
          </button>
          <button
            onClick={confirmClockIn}
            className="w-full sm:flex-1 py-4.5 bg-Secondary text-white font-extrabold rounded-2xl shadow-xl shadow-Secondary/20 hover:scale-[1.02] active:scale-95 transition-all text-[15px] uppercase tracking-wider"
          >
            Confirm Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClockInModal;
