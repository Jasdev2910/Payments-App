import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import doneImg from "../assets/verify.png";
import { TRANSFER_URL } from "../constants";

export const SendMoney = () => {
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [serchParams] = useSearchParams();
  const id = serchParams.get("id");
  const name = serchParams.get("name");
  const navigate = useNavigate();
  console.log(amount);
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="flex flex-col border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          {response === "OK" ? (
            <div className="w-28 m-auto">
              <img src={doneImg} alt="done-img" />
              <p className="font-bold text-center text-xl">
                <span className="text-xl">₹</span> {amount} sent to {name}
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white">
                    {name[0].toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold">{name}</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    autoFocus
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter amount"
                  />
                </div>
                <button
                  onClick={async () => {
                    try {
                      const response = await axios.post(
                        TRANSFER_URL,
                        { to: id, amount },
                        {
                          headers: {
                            Authorization:
                              "Bearer " + localStorage.getItem("token"),
                          },
                        }
                      );
                      console.log(response.statusText);
                      setError("");
                      setTimeout(() => {
                        setResponse(response.statusText);
                        // alert(response.data.message);
                      }, 200);
                    } catch (error) {
                      console.log(error);
                      setError(error.response.data.message);
                    }
                  }}
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                >
                  Initiate Transfer
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
