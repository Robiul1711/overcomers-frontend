import React from 'react';

const TableSkeleton = ({ rows = 6, columns = 5 }) => {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse min-w-[850px]">
        <thead>
          <tr className="bg-gray-50/80">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className={`py-4 px-6 ${i === 0 ? 'rounded-tl-xl' : ''} ${i === columns - 1 ? 'rounded-tr-xl' : ''}`}>
                <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="py-5 px-6">
                  <div
                    className="h-3 bg-gray-100 rounded-full animate-pulse"
                    style={{
                      width: `${50 + Math.random() * 40}%`,
                      animationDelay: `${rowIdx * 0.05 + colIdx * 0.03}s`,
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
