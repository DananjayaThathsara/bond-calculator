import React from "react";
import type { CashFlowRow } from "../types/bond.types";

// props interface for the CashFlowTable component
interface CashFlowTableProps {
  // array of payment schedule rows to display in table
  schedule: CashFlowRow[];
}

// React component displaying bond cash flow schedule in table format
const CashFlowTable: React.FC<CashFlowTableProps> = ({ schedule }) => {
  return (
    <div className="mt-8">
      {/* section title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cash Flow Schedule</h2>

      {/* table container with overflow handling */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          {/* table header with column names */}
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4 text-center font-semibold text-sm">Period</th>
              <th className="p-4 text-center font-semibold text-sm">Payment Date</th>
              <th className="p-4 text-center font-semibold text-sm">Coupon Payment</th>
              <th className="p-4 text-center font-semibold text-sm">Cumulative Interest</th>
              <th className="p-4 text-center font-semibold text-sm">Remaining Principal</th>
            </tr>
          </thead>

          {/* table body with cash flow data */}
          <tbody>
            {/* map schedule array to table rows */}
            {schedule.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${index === schedule.length - 1 ? "bg-yellow-50 font-bold" : index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                {/* period number */}
                <td className="p-4 text-center text-sm">{row.period}</td>
                {/* payment date in YYYY-MM-DD format */}
                <td className="p-4 text-center text-sm">{row.paymentDate}</td>
                {/* coupon payment formatted as currency */}
                <td className="p-4 text-center text-sm">${row.couponPayment.toFixed(2)}</td>
                {/* cumulative interest formatted as currency */}
                <td className="p-4 text-center text-sm">${row.cumulativeInterest.toFixed(2)}</td>
                {/* remaining principal formatted as currency */}
                <td className="p-4 text-center text-sm">${row.remainingPrincipal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashFlowTable;
