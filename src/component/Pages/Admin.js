import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import $ from "jquery";
import { useEffect } from "react";
import Dashboard from "../tables/dashboard/Dashboard";
import User from "../tables/user/User";
import Setting from "../tables/setting/Setting";
import Banner from "../tables/banner/Banner";
import Category from "../tables/category/Category";
import Attributes from "../tables/attributes/Attributes";
import Product from "../tables/product/Product";
import ProductAdd from "../tables/product/ProductAdd";
import ProductShow from "../tables/product/ProductShow";
// import PrivateRoute from "../util/PrivateRoute";
// import "../../assets/js/custom";
// import CoinPlan from "../Table/coinPlan/CoinPlan";
// import PurchaseHistory from "../Table/coinPlan/PurchaseHistory";

const Admin = ({ isAuthenticated }) => {

  const location = useLocation();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (["/", "/admin", "/admin/", ""].includes(location.pathname)) {
  //     navigate("/admin/dashboard");
  //   }
  // }, []);
  useEffect(() => {
    if (
      location.pathname == "/" ||
      location.pathname == "/admin" ||
      location.pathname == "/admin/" ||
      location.pathname == ""
    ) {
      // window.location.reload(true);
      debugger;
      navigate("/admin/dashboard");
    }
  }, []);
  var webSize = $(window).width();

  return (
    <div className={`mainAdminGrid  ${webSize < 991 && "webAdminGrid"}`}>
      <Sidebar />

      <div className={`mainAdmin`}>
        <Navbar />
        <div className="adminStart">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/category" element={<Category />} />
            <Route path="/attibute" element={<Attributes />} />
            <Route path="/product/*" element={<Product />} />
            <Route path="/product/addProduct" element={<ProductAdd />} />
            <Route path="/product/productShow" element={<ProductShow />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
          {/* javascript:(function%20()%20%7B%20var%20script%20=%20document.createElement('script');%20script.src=%22//cdn.jsdelivr.net/npm/eruda%22;%20document.body.appendChild(script);%20script.onload%20=%20function%20()%20%7B%20eruda.init()%20%7D%20%7D)(); */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
