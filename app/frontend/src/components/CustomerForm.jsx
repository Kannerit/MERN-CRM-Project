import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function CustomerForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    taxId: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/customers/create", formData);
      toast.success("Customer added Succesfully!")
      navigate("/customers");
    } catch (error) {
      console.error("Error creating customer", error);
    }
  };
  return (
    <div>
      <h1>Add new Customer</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <label>Tax ID</label>
        <input
          type="text"
          name="taxId"
          placeholder="Tax ID"
          value={formData.taxId}
          onChange={handleChange}
        />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default CustomerForm;


/// I successfully added the create new customer form, and it does connect to database. Now i need to implement the "edit customer info". 