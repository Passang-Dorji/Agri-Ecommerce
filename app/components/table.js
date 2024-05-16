import React from "react";
function Table({ data, headers, renderRow }) {
  return (
    <table className="w-full border-separate border-spacing-y-2">
      <thead>
        <tr className="bg-[#0886FB]/30 h-12 border-2 border-black">
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            className={`${index % 2 === 0 ? "bg-[#D9D9D9]/50" : "bg-[#FFFFFF]/50"} h-10`}
            key={index}
          >
            {renderRow(item)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;

