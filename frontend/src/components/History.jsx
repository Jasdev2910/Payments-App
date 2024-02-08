import React from "react";
import useFetchHistory from "../hooks/useFetchHistory";
import dayjs from "dayjs";

const History = () => {
  const details = useFetchHistory();
  console.log(details);

  if (details.historyDetails === null) {
    return "Loading....";
  }

  return (
    <div className="w-full flex flex-col items-center px-5">
      <h1 className="text-xl py-5  font-bold">History</h1>
      {details.historyDetails.map((detail) => (
        <div
          key={detail._id}
          className="w-full flex items-center justify-between shadow-md py-5 border px-3 mb-2"
        >
          <div className="flex flex-col justify-between ">
            <div className="font-bold ">
              <h3>{detail.name}</h3>
            </div>
            <div>{dayjs(detail.timestamp).format("MMM, ddd D h:mm A")}</div>
          </div>

          <div className={`${detail.sent ? "text-red-500" : "text-green-500"}`}>
            Amount : <span className="font-bold">₹</span>
            {detail.amount}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
