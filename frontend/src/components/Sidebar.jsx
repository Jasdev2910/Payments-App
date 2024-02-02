import { Link, useNavigate } from "react-router-dom";

export function Component() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-full mt-5 h-screen w-52 ">
      <div className="mx-auto">
        <Link to="/body/dashboard">
          <ul className="my-2 shadow-lg py-3 px-10 font-semibold ">
            Dashboard
          </ul>
        </Link>
        <Link to="/body/update">
          <ul className="my-2 shadow-lg py-3 px-10 font-semibold ">Update</ul>
        </Link>
        <Link>
          <ul
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            className="my-2 shadow-lg py-3 px-10 font-semibold "
          >
            Logout
          </ul>
        </Link>
      </div>
    </div>
  );
}
