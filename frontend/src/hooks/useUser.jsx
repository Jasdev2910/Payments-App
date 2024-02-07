import axios from "axios";
import React, { useEffect, useState } from "react";
import { AUTH_URL } from "../constants";

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const getDetails = async () => {
    try {
      const res = await axios.get(AUTH_URL, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      setUserDetails(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return {
    loading,
    userDetails,
  };
};

export default useUser;
