import { useForm } from "react-hook-form";
import api from "../../services/api";

type ProductForm = {
  name: string;
  price: number;
  stock: number;
};

function AddProduct() {
  const { register, handleSubmit, reset } = useForm<ProductForm>();

  const onSubmit = async (data: ProductForm) => {
    try {
      const token = localStorage.getItem("token");

      await api.post("/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Added Successfully");
      reset();

    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">

      <h2 className="text-2xl font-bold mb-5">
        Add Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        <input
          {...register("name")}
          placeholder="Product Name"
          className="border p-3 w-full rounded"
        />

        <input
          type="number"
          {...register("price")}
          placeholder="Price"
          className="border p-3 w-full rounded"
        />

        <input
          type="number"
          {...register("stock")}
          placeholder="Stock"
          className="border p-3 w-full rounded"
        />

        <button className="bg-green-600 text-white px-6 py-3 rounded">
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;