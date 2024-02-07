import { Link, useNavigate } from "react-router-dom";

export function Component() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-full mt-5 h-screen w-52 ">
      <div className="mx-auto">
        <Link to="/body/dashboard">
          <ul className="my-2 shadow-lg py-3 px-10 font-semibold active:bg-slate-100 hover:bg-slate-100">
            Dashboard
          </ul>
        </Link>
        <Link to="/body/update">
          <ul className="my-2 shadow-lg py-3 px-10 font-semibold active:bg-slate-100 hover:bg-slate-100">
            Update
          </ul>
        </Link>
        <Link to="/body/history">
          <ul className="my-2 shadow-lg py-3 px-10 font-semibold active:bg-slate-100 hover:bg-slate-100">
            History
          </ul>
        </Link>
        <Link>
          <ul
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            className="my-2 shadow-lg py-3 px-10 font-semibold active:bg-slate-100 hover:bg-slate-100"
          >
            Logout
          </ul>
        </Link>
      </div>
    </div>
  );
}
