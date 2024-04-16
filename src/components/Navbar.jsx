import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function Footer() {
  const location = useLocation();

  return (
    <div className="mt-16">
      <div className="flex flex-row items-end gap-2 items-end justify-center">
        <h1 className="text-5xl font-bold text-black ">
          System of Linear Equations Calculator
        </h1>
        <p className="text-red-500 font-bold">by kmjs</p>
      </div>
      <div className="flex justify-between bg-white border border-black px-4 py-2 mt-5   ">
        <a
          href="/how-to-use"
          className={
            location.pathname === "/how-to-use"
              ? "text-yellow-500  font-bold"
              : "text-black font-bold "
          }
        >
          How to use
        </a>
        <a
          href="/"
          className={
            location.pathname === "/"
              ? "text-green-500  font-bold"
              : "text-black font-bold "
          }
        >
          Matrix
        </a>
        <a
          href="#"
          className={
            location.pathname === "#"
              ? "text-yellow-500  font-bold"
              : "text-black font-bold "
          }
        >
          Contact
        </a>
      </div>
    </div>
  );
}

export default Footer;
