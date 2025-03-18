import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MySong from "../pages/MySong";

function Page() {
  return (
    <div className="p-1 vh-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/MySong" element={<MySong />} />
      </Routes>
    </div>
  );
}

export default Page;
