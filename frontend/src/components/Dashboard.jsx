import React, { useEffect, useState } from "react";
import { Balance } from "./Balance";
import { Users } from "./Users";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BALANCE_URL } from "../constants";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  // const [userDetails, setUserDetails] = useState("");

  const getBalnce = async () => {
    try {
      const response = await axios.get(BALANCE_URL, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBalnce();
  }, []);

  return (
    <div className="w-full m-4 border-l-2 pl-4">
      <Balance value={balance} />
      <Users />
    </div>
  );
};

export default Dashboard;
