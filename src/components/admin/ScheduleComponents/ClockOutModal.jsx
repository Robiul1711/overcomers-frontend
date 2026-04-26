import React from "react";
import { X, Clock, CheckCircle2 } from "lucide-react";
import SignaturePad from "./SignaturePad";

const ClockOutModal = ({ 
  isOpen, 
  onClose, 
  selectedSession, 
  actualStartTime, 
  actualEndTime, 
  setActualEndTime, 
  sessionNotes, 
  setSessionNotes, 
  confirmClockOut 
}) => {
  if (!isOpen || !selectedSession) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-[32px] w-full max-w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-8 duration-300 custom-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-Secondary rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-Third leading-tight">
             Clock Out
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-[#FAF6F7] border border-Secondary/10 rounded-2xl p-5 mb-8 shadow-inner shadow-black/[0.01]">
          <p className="text-Secondary font-extrabold text-[18px] md:text-[20px] leading-tight">
            {selectedSession.client}{" "}
            <span className="opacity-20 px-2">|</span>{" "}
            {selectedSession.type}
          </p>
          <div className="flex items-center gap-2 mt-3 text-Secondary/50 font-bold text-[13px]">
            <CheckCircle2 size={14} className="text-green-500" />
            <span>
              Started at:{" "}
              <span className="text-Secondary/80 font-extrabold">
                {actualStartTime}
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-extrabold text-Third uppercase tracking-wider ml-1">
              Ending Time
            </label>
            <div className="relative">
              <Clock
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="time"
                value={actualEndTime}
                onChange={(e) => setActualEndTime(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-gray-100 px-12 py-5 rounded-2xl text-Third font-extrabold text-[16px] focus:outline-none focus:border-Secondary transition-all shadow-sm"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-extrabold text-Third uppercase tracking-wider ml-1">
             Add session notes *
            </label>
            <textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Detail key behaviors, objectives met, and any critical notes..."
              className="w-full bg-[#FAF9F6] border border-gray-100 px-5 py-5 rounded-2xl text-Third font-medium text-[14px] min-h-[120px] focus:outline-none focus:border-Secondary transition-all shadow-sm resize-none"
            />
          </div>

          {/* Signature Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
            <SignaturePad label="Parent Signature *" id="parent-signature" />
            <SignaturePad label="Employee Signature *" id="employee-signature" />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-4">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 py-4.5 bg-Primary text-white shadow-xl shadow-Primary/20 font-bold rounded-2xl border border-gray-100 hover:bg-Primary/80 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={confirmClockOut}
            disabled={!sessionNotes.trim()}
            className={`w-full sm:flex-1 py-4.5 bg-Secondary text-white font-extrabold rounded-2xl shadow-xl shadow-Secondary/20 hover:scale-[1.02] active:scale-95 transition-all text-[15px] uppercase tracking-wider ${!sessionNotes.trim() ? "opacity-40 cursor-not-allowed grayscale-[0.5]" : ""}`}
          >
          Submit & Clock Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClockOutModal;
