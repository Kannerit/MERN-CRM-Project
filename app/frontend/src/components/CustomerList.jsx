import "./CustomerList.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await axios.get("/customers");
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="customers-list-container">
      <div className="header">
        <button className="header-btn" onClick={handleLogout}>Logout</button>
      </div>
      <h1 className="customer-list-header">Customer List</h1>
      <div className="customer-list-box">
        <ul>
          {customers.map((customer) => (
            <li className="customer-li" key={customer._id}>
              <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
            </li>
          ))}
          <button
            className="new-customer-btn"
            onClick={() => navigate("/customers/create")}
          >
            Add New Customer
          </button>
        </ul>
      </div>
    </div>
  );
}

export default CustomerList;
