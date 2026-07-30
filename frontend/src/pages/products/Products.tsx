import { useEffect, useState } from "react";
import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);


  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
  });
  const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(res.data.data);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchProducts();
}, []);

  const addProduct = async () => {
    try {
      const token = localStorage.getItem("token");

     await api.post(
  "/products",
  {
    name: newProduct.name,
    sku: "SKU" + Date.now(),
    price: Number(newProduct.price),
    stock: Number(newProduct.stock),
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

fetchProducts();
      setNewProduct({
        name: "",
        sku: "",
        price: "",
        stock: "",
      });

      alert("✅ Product Added Successfully!");
    } catch (err) {
      console.log(err);
      alert("❌ Failed to add product");
    }
  };
  const updateProduct = async () => {
  try {
    const token = localStorage.getItem("token");

    await api.put(
      `/products/${editingId}`,
      {
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProducts();

    setEditingId(null);

    setNewProduct({
      name: "",
      sku: "",
      price: "",
      stock: "",
    });

    alert("✅ Product Updated Successfully!");

  } catch (err) {
    console.log(err);
    alert("Update Failed");
  }
};
  const deleteProduct = async (id: number) => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();

    alert("🗑 Product Deleted Successfully!");

  } catch (err) {
    console.log(err);
    alert("Failed to delete product");
  }
};
const editProduct = (product: any) => {
  setEditingId(product.id);

  setNewProduct({
    name: product.name,
    sku: product.sku,
    price: product.price.toString(),
    stock: product.stock.toString(),
  });
};
  return (
    <div className="min-h-screen bg-slate-900 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-black bg-gradient-to-r
        from-pink-500 via-yellow-400 via-green-400 to-cyan-500
        bg-clip-text text-transparent">
          📦 Products
        </h1>

        <div className="bg-white/10 backdrop-blur-md border border-white/20
        text-white px-6 py-4 rounded-2xl shadow-xl">

          <p className="text-sm text-gray-300">Total Products</p>

          <h2 className="text-3xl font-bold">
            {products.length}
          </h2>

        </div>

      </div>

      {/* Card */}
      <div className="mb-8">
  <input
    type="text"
    placeholder="🔍 Search Products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl border border-slate-300 px-5 py-3 shadow-lg outline-none focus:ring-2 focus:ring-pink-500"
  />
</div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white">

            <tr>

              <th className="p-5 text-lg">Name</th>

              <th className="p-5 text-lg">SKU</th>

              <th className="p-5 text-lg">Price</th>

              <th className="p-5 text-lg">Stock</th>

             <th className="p-5 text-lg">Status</th>
             <th className="p-5 text-lg">Action</th>

            </tr>

          </thead>

          <tbody>

          {products
  .filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((p: any) => (

              <tr
                key={p.id}
                className="hover:bg-slate-100 transition duration-300"
              >

                <td className="border-b p-4 font-semibold">
                  {p.name}
                </td>

                <td className="border-b p-4 text-gray-500">
                  {p.sku}
                </td>

                <td className="border-b p-4 font-bold text-green-700">
                  ₹ {p.price}
                </td>

                <td className="border-b p-4">
                  {p.stock}
                </td>

                <td className="border-b p-4 text-center">

                  {p.stock <= 5 ? (
  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
    🔴 Low Stock
  </span>
) : (
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
    🟢 In Stock
  </span>
)}

                </td>
                <td className="border-b p-4 text-center">

  <div className="flex justify-center gap-2">

  <button
    onClick={() => editProduct(p)}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    ✏ Edit
  </button>

  <button
    onClick={() => {
      if (window.confirm("Delete this product?")) {
        deleteProduct(p.id);
      }
    }}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    🗑 Delete
  </button>

</div>
</td>

              </tr>

            ))}

            {/* Add Product Row */}

            <tr className="bg-slate-50">

              <td className="p-4">

                <input
                  className="w-full rounded-xl border border-slate-300
                  px-4 py-3 focus:ring-2 focus:ring-pink-500
                  outline-none"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                />

              </td>

              <td className="text-center text-gray-500 font-semibold">
                Auto
              </td>

              <td className="p-4">

                <input
                  type="number"
                  className="w-full rounded-xl border border-slate-300
                  px-4 py-3 focus:ring-2 focus:ring-pink-500
                  outline-none"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value,
                    })
                  }
                />

              </td>

              <td className="p-4">

                <input
                  type="number"
                  className="w-full rounded-xl border border-slate-300
                  px-4 py-3 focus:ring-2 focus:ring-pink-500
                  outline-none"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stock: e.target.value,
                    })
                  }
                />

              </td>

              <td className="p-4">

                <button
                 onClick={editingId ? updateProduct : addProduct}
                  className="w-full rounded-xl bg-gradient-to-r
                  from-pink-500 to-purple-600
                  text-white font-bold py-3
                  hover:scale-105 transition duration-300 shadow-lg"
                >
                  {editingId ? "💾 Update" : "💾 Save"}
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Products;