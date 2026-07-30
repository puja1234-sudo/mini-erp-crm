import { useEffect, useState } from "react";
import api from "../../services/api";

function Challans() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [challans, setChallans] = useState<any[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchChallans();
  }, []);

  const fetchCustomers = async () => {
    const res = await api.get("/customers", config);
    setCustomers(res.data.data);
  };

  const fetchProducts = async () => {
    const res = await api.get("/products", config);
    setProducts(res.data.data);
  };

  const fetchChallans = async () => {
    const res = await api.get("/challans", config);
    setChallans(res.data.data);
  };

  const createChallan = async () => {
    try {
      await api.post(
        "/challans",
        {
          customerId: Number(customerId),
          items: [
            {
              productId: Number(productId),
              quantity: Number(quantity),
            },
          ],
        },
        config
      );

      alert("Challan Generated Successfully");

      setCustomerId("");
      setProductId("");
      setQuantity("");

      fetchProducts();
      fetchChallans();

    } catch (err) {
      console.log(err);
      alert("Unable to generate challan");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-10">

      <h1 className="text-5xl font-black text-white mb-8">
        📄 Challan Management
      </h1>

      <div className="bg-white rounded-xl p-6 shadow mb-10">

        <div className="grid grid-cols-4 gap-5">

          <select
            value={customerId}
            onChange={(e)=>setCustomerId(e.target.value)}
            className="border p-3 rounded"
          >
            <option>Select Customer</option>

            {customers.map((c:any)=>(
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}

          </select>

          <select
            value={productId}
            onChange={(e)=>setProductId(e.target.value)}
            className="border p-3 rounded"
          >

            <option>Select Product</option>

            {products.map((p:any)=>(
              <option key={p.id} value={p.id}>
                {p.name} ({p.stock})
              </option>
            ))}

          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e)=>setQuantity(e.target.value)}
            className="border p-3 rounded"
          />

          <button
            onClick={createChallan}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded"
          >
            Generate
          </button>

        </div>

      </div>

      <table className="w-full bg-white rounded-xl overflow-hidden">

        <thead className="bg-purple-600 text-white">

          <tr>

            <th className="p-3">Customer</th>

            <th>Product</th>

            <th>Qty</th>

            <th>Total</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {challans.map((c:any)=>(

            <tr key={c.id} className="text-center border-b">

              <td className="p-3">
                {c.customer.name}
              </td>

              <td>
                {c.items[0]?.product.name}
              </td>

              <td>
                {c.items[0]?.quantity}
              </td>

              <td>
                ₹ {c.totalAmount}
              </td>

              <td>
                {c.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Challans;