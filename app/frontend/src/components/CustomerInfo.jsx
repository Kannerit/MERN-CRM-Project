import "./CustomerInfo.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function CustomerInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const { data } = await axios.get(`/customers/${id}`);
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer data");
      }
    };
    fetchCustomerInfo();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this action? :o"))
      try {
        await axios.delete(`/customers/delete/${id}`);
        toast.success("Customer deleted successfully");
        navigate("/customers");
      } catch (error) {
        console.error("Error deleting customer:", error);
        toast.error("Failed to delete customer. Please try again.");
      }
  };

  if (!customer) {
    return <div>We had a problem loading Customer's information</div>;
  }

  return (
    <div className="customer-info-container">
      
      <h1 className="container-header">Name: {customer.name}</h1>
      <h4 className="container-data">Address: {customer.address}</h4>
      <h4 className="container-data">Email: {customer.email}</h4>
      <h4 className="container-data">Phone Number: {customer.phone}</h4>
      <h4 className="container-data">Tax ID Number: {customer.taxId}</h4>

      <div className="btn-container">
        <button
          className="info-btn"
          onClick={() =>
            navigate(`/customers/edit/${id}`, { state: { customer } })
          }
        >
          Edit Info
        </button>
        <button className="info-btn" onClick={handleDelete}>
          Delete Customer
        </button>
        <button
          className="info-btn"
          onClick={() => navigate(`/${id}/actions/`, { state: { customer } })}
        >
          Show Actions
        </button>
        <button
          className="info-btn"
          onClick={() => navigate(`/customers/`, { state: { customer } })}
        >
          Back to Customer List
        </button>
      </div>
    </div>
  );
}

export default CustomerInfo;
