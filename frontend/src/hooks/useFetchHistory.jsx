import axios from "axios";
import React, { useEffect, useState } from "react";
import { GEt_HISTORY_URL } from "../constants";

const useFetchHistory = () => {
  const [loading, setLoading] = useState(true);
  const [historyDetails, setHistoryDetails] = useState(null);

  const getHistory = async () => {
    try {
      const response = await axios.get(GEt_HISTORY_URL, {
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
