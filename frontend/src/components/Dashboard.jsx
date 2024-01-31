import React, { useEffect, useState } from "react";
import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { Users } from "./Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const getBalnce = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      setBalance(response.data.balance?.toFixed(2));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBalnce();
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
