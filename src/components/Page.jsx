import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MySong from "../pages/MySong";

function Page() {
  return (
    <div className="p-4 w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mysong" element={<MySong />} />
      </Routes>
    </div>
  );
}

export default Page;
