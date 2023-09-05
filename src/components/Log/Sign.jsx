import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Sign({ isRegister }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(isRegister ? "/sign-up" : "/log-in")}
      className="flex-box flex-row cursor-pointer uppercase text-center"
    >
      <div
        className={`px-1 py-3.5 text-white bg-opacity-25 rounded justify-start items-start inline-flex ${
          isRegister ? "" : ""
        }`}
      >
        <div className="flex-box text-base menu-item">
          {isRegister ? "Register" : "Log In"} {/* <LogIn /> */}
        </div>
      </div>
    </div>
  );
}

export default Sign;
