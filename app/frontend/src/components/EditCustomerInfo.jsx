import "./EditCustomerInfo.css"
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

function EditCustomerInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { customer } = location.state;

  const [formData, setFormData] = useState({
    name: customer.name,
    address: customer.address,
    email: customer.email,
    phone: customer.phone,
    taxId: customer.taxId,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("formData being sent", formData);
      const { data } = await axios.put(`/customers/edit/${id}`, formData);
      navigate(`/customers/${id}`);
    } catch (error) {
      console.error("Error updating customer's data", error.response.data);
    }
  };

  return (
    <div className="edit-customer-form-container">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h1 className="edit-header">Edit Customer's Information</h1>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tax ID:</label>
          <input
            type="text"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
          />
        </div>
        <div className="btn-group">
        <button type="submit" className="info-btn">Update Info</button>
        <button type="button"  className="info-btn" onClick={() => navigate(`/customers/${id}`)}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}

export default EditCustomerInfo;
