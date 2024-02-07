import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetchHistory = () => {
  const [loading, setLoading] = useState(true);
  const [historyDetails, setHistoryDetails] = useState(null);

  const getHistory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/history", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setHistoryDetails(response.data.userData.history);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return {
    loading,
    historyDetails,
  };
};

export default useFetchHistory;
