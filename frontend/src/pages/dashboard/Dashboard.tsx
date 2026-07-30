import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [challanCount, setChallanCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const customers = await api.get("/customers", { headers });
      const products = await api.get("/products", { headers });
      const challans = await api.get("/challans", { headers });

      setCustomerCount(customers.data.count);
      setProductCount(products.data.count);
      setChallanCount(challans.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900">

      {/* Sidebar */}
      <div className="w-72 bg-slate-950 text-white p-8 shadow-2xl">

        <h1 className="text-4xl font-black bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-500 bg-clip-text text-transparent mb-12">
          Mini ERP
        </h1>

        <nav className="flex flex-col gap-5 text-lg">

          <Link
            to="/dashboard"
            className="hover:bg-slate-800 p-3 rounded-xl transition"
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/customers"
            className="hover:bg-slate-800 p-3 rounded-xl transition"
          >
            👥 Customers
          </Link>

          <Link
            to="/products"
            className="hover:bg-slate-800 p-3 rounded-xl transition"
          >
            📦 Products
          </Link>

          <Link
            to="/challans"
            className="hover:bg-slate-800 p-3 rounded-xl transition"
          >
            📄 Challans
          </Link>

        </nav>

      </div>

      {/* Main */}
      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-black bg-gradient-to-r from-pink-500 via-green-400 to-cyan-500 bg-clip-text text-transparent">
            Dashboard
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Logout
          </button>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-3 gap-8">

          {/* Customers */}
          <Link
            to="/customers"
            className="block bg-white rounded-3xl shadow-2xl p-8 hover:scale-105 hover:shadow-blue-500/40 transition duration-300 cursor-pointer"
          >

            <div className="text-6xl mb-4">👥</div>

            <h2 className="text-xl font-bold">
              Customers
            </h2>

            <h1 className="text-5xl font-black text-blue-600 mt-4">
              {customerCount}
            </h1>

            <p className="mt-4 text-gray-500">
              Click to manage customers →
            </p>

          </Link>

          {/* Products */}
          <Link
            to="/products"
            className="block bg-white rounded-3xl shadow-2xl p-8 hover:scale-105 hover:shadow-green-500/40 transition duration-300 cursor-pointer"
          >

            <div className="text-6xl mb-4">📦</div>

            <h2 className="text-xl font-bold">
              Products
            </h2>

            <h1 className="text-5xl font-black text-green-600 mt-4">
              {productCount}
            </h1>

            <p className="mt-4 text-gray-500">
              Click to manage products →
            </p>

          </Link>

          {/* Challans */}
          <Link
            to="/challans"
            className="block bg-white rounded-3xl shadow-2xl p-8 hover:scale-105 hover:shadow-purple-500/40 transition duration-300 cursor-pointer"
          >

            <div className="text-6xl mb-4">📄</div>

            <h2 className="text-xl font-bold">
              Challans
            </h2>

            <h1 className="text-5xl font-black text-purple-600 mt-4">
              {challanCount}
            </h1>

            <p className="mt-4 text-gray-500">
              Click to manage challans →
            </p>

          </Link>

        </div>

        {/* Quick Actions */}

        <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            ⚡ Quick Actions
          </h2>

          <div className="flex gap-6">

            <Link
              to="/customers"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold"
            >
              👥 Manage Customers
            </Link>

            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold"
            >
              📦 Manage Products
            </Link>

            <Link
              to="/challans"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-semibold"
            >
              📄 Manage Challans
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;