import { useForm } from "react-hook-form";
import api from "../../services/api";

type CustomerForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

function AddCustomer() {
  const { register, handleSubmit, reset } = useForm<CustomerForm>();


  const onSubmit = async (data: CustomerForm) => {
    try {
      const token = localStorage.getItem("token");

      await api.post("/customers", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Customer Added Successfully");

      reset();

    } catch (err) {
      alert("Failed to Add Customer");
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-5">
        Add Customer
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <input
          {...register("name")}
          placeholder="Customer Name"
          className="border p-3 w-full rounded"
        />

        <input
          {...register("phone")}
          placeholder="Phone"
          className="border p-3 w-full rounded"
        />

        <input
          {...register("email")}
          placeholder="Email"
          className="border p-3 w-full rounded"
        />

        <input
          {...register("address")}
          placeholder="Address"
          className="border p-3 w-full rounded"
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;