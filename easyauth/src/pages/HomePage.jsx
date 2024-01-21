import { Link, Outlet } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex w-full">
      <div className="flex flex-1 h-full p-16 max-md:px-4 max-md:py-8">
        <Outlet />
      </div>
      <div className="flex flex-1 h-full p-16 max-md:hidden items-center justify-center  text-slate-400 flex-col">
        <div className="text-4xl font-extrabold">Welcome to EasyAuth</div>
        <p className="font-semibold">by Ancode</p>
        <div className="mt-8 font-semibold">
          User Access Made Easy: Login or Sign Up in a Snap!
        </div>
        <Link to="https://github.com/AnkurNayak/EasyAuth">
          <p className="text-sky-400 font-semibold hover:underline mt-8">
            Documentation
          </p>
        </Link>
      </div>
    </div>
  );
}
export default HomePage;
