import React from "react";
import {
  ArrowLeft,
  Bell,
  ExternalLink,
  Calendar,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Authorizations = () => {
  const navigate = useNavigate();

  const authDetails = [
    { label: "Authorization Number", value: "C8812945" },
    { label: "Insurance Provider", value: "Aetna" },
    { label: "Member ID", value: "M-2024-4421" },
    { label: "Plan / Policy Number", value: "AET-78902-NJ" },
    { label: "Authorization Start Date", value: "March 1, 2026" },
    { label: "Authorization End Date", value: "August 31, 2026" },
  ];

  const authorizedUnits = [
    { label: "Total Approved", value: "240", color: "text-[#B91C1C]" },
    { label: "Units Used", value: "68", color: "text-[#B91C1C]" },
    { label: "Remaining", value: "172", color: "text-[#B91C1C]" },
  ];

  const cptCodes = [
    {
      code: "97153",
      name: "ABA Therapy - Technician",
      description:
        "Adaptive behavior treatment by protocol - direct contact, each 15 min",
      units: "160 units auth",
      status: "Active",
    },
    {
      code: "97155",
      name: "ABA Therapy - Supervision",
      description:
        "Adaptive behavior treatment with protocol modification - each 15 min",
      units: "80 units auth",
      status: "Active",
    },
  ];

  const authHistory = [
    {
      authNumber: "C8812945",
      startDate: "March 1, 2026",
      endDate: "Aug 31, 2026",
      cptCodes: "97153, 97155",
      units: "240 units",
      status: "Active",
    },
    {
      authNumber: "C7701234",
      startDate: "Sep 1, 2025",
      endDate: "Feb 28, 2026",
      cptCodes: "97153, 97155",
      units: "200 units",
      status: "Expired",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Insurance Banner Section */}
      <div className="sm:bg-white sm:p-8  sm:rounded-3xl sm:shadow-sm sm:border sm:border-[#F3F4F6]">
        <div className="mb-8 relative w-fit">
          <h3 className="text-2xl font-bold text-[#2D2D2D]">
            Insurance{" "}
            <span className="text-sm font-medium text-[#6B7280]">
              (only visible to admin)
            </span>
          </h3>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="bg-[#76121F] rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-8 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-white/10 transition-colors"></div>
          <div className="relative z-10 w-full md:w-auto">
            <p className="text-[#FFBB03] font-bold text-sm mb-1">
              Insurance Provider
            </p>
            <h2 className="text-4xl font-bold mb-2">Aetna</h2>
            <p className="text-white/80 font-medium">
              Member ID: M-2024-4421 · Auth: #C8812945
            </p>
          </div>
          <div className="relative z-10 text-center md:text-right w-full md:w-auto">
            <p className="text-[#FFBB03] font-bold text-sm mb-1 uppercase tracking-wider">
              Expires
            </p>
            <h2 className="text-3xl font-bold mb-1">August 31</h2>
            <p className="text-white/80 font-medium whitespace-nowrap">
              177 days remaining
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {authDetails.map((item, i) => (
            <div
              key={i}
              className="bg-[#FFFBEE] p-5 rounded-2xl border border-[#FFF3D6] flex flex-col justify-center"
            >
              <p className="text-[10px] text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70 leading-tight">
                {item.label}
              </p>
              <p className="text-sm font-bold text-[#3A331E] truncate">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Units and CPT Codes Grid */}
      <div className="space-y-8">
        {/* Authorized Units */}
        <div className="sm:bg-white sm:p-8 rounded-3xl sm:shadow-sm sm:border sm:border-[#F3F4F6]">
          <div className="mb-8 relative w-fit">
            <h3 className="text-2xl font-bold text-[#2D2D2D]">
              Authorized Units
            </h3>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {authorizedUnits.map((u, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-[#F3F4F6] text-center hover:shadow-md transition-shadow"
              >
                <h4 className={`text-3xl font-bold ${u.color}`}>{u.value}</h4>
                <p className="text-[#6B7280] font-medium text-sm mt-1">
                  {u.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CPT Codes */}
        <div className="sm:bg-white sm:p-8 rounded-3xl sm:shadow-sm sm:border sm:border-[#F3F4F6]">
          <div className="mb-8 relative w-fit">
            <h3 className="text-2xl font-bold text-[#2D2D2D]">
              Authorized CPT Codes
            </h3>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cptCodes.map((c, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-[#F3F4F6] relative group hover:border-[#76121F]/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#FEF2F2] rounded-xl text-[#76121F] group-hover:bg-[#76121F] group-hover:text-white transition-colors">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl sm:text-4xl font-bold text-[#76121F] mb-1">
                      {c.code}
                    </h4>
                    <p className="font-bold text-[#76121F] mb-2">{c.name}</p>
                    <p className="text-[#6B7280] text-sm leading-tight mb-4 max-w-sm">
                      {c.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#FAF6F7] text-[#800000] px-4 py-1 rounded-full text-xs font-bold border border-[#FEE2E2]">
                        {c.units}
                      </span>
                      <span className="bg-[#ECFDF5] text-[#059669] px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#059669] rounded-full"></span>{" "}
                        {c.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning box */}
        <div className="bg-[#FFFBEB] sm:p-6 p-4 rounded-2xl border border-[#FEF3C7] flex items-start gap-4">
          <AlertCircle className="text-[#B45309] shrink-0" size={24} />
          <p className="text-[#B45309] text-sm font-medium leading-relaxed">
            Authorization details are managed by administration. Contact your
            supervisor or billing team if you notice any discrepancies or if the
            authorization is approaching its expiration date.
          </p>
        </div>
      </div>

      {/* Authorization History Section */}
      <div className="sm:bg-white sm:p-8 p-4 rounded-3xl shadow-sm border border-[#F3F4F6]">
        <div className="mb-8 relative w-fit">
          <h3 className="text-2xl font-bold text-[#2D2D2D]">
            Authorization History
          </h3>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FAF6F7]">
                <th className="p-4 rounded-tl-2xl text-sm font-bold text-[#2D2D2D]">
                  Auth Number
                </th>
                <th className="p-4 text-sm font-bold text-[#2D2D2D]">
                  Start Date
                </th>
                <th className="p-4 text-sm font-bold text-[#2D2D2D]">
                  End Date
                </th>
                <th className="p-4 text-sm font-bold text-[#2D2D2D]">
                  CPT Codes
                </th>
                <th className="p-4 text-sm font-bold text-[#2D2D2D]">Units</th>
                <th className="p-4 rounded-tr-2xl text-sm font-bold text-[#2D2D2D]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {authHistory.map((h, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-bold text-[#3A331E]">
                    {h.authNumber}
                  </td>
                  <td className="p-4 text-sm text-[#6B7280] font-medium">
                    {h.startDate}
                  </td>
                  <td className="p-4 text-sm text-[#6B7280] font-medium">
                    {h.endDate}
                  </td>
                  <td className="p-4 text-sm text-[#6B7280] font-medium">
                    {h.cptCodes}
                  </td>
                  <td className="p-4 text-sm text-[#6B7280] font-medium">
                    {h.units}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-bold ${
                        h.status === "Active"
                          ? "bg-[#ECFDF5] text-[#059669]"
                          : "bg-[#FEF2F2] text-[#B91C1C]"
                      }`}
                    >
                      {h.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Authorizations;
