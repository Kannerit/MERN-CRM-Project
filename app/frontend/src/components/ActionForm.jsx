import "./ActionForm.css";
import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function ActionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: id,
    date: "",
    time: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${formData.date}, ${formData.time}`);
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    console.log(`${selectedDateTime}`);
    if (selectedDateTime <= new Date()) {
      toast.error("Please select a future date and time.");
      return;
    }
    try {
      await axios.post(`/${id}/actions/create`, formData);
      toast.success("Action added successfully! :D ");
      navigate(`/${id}/actions/`);
    } catch (error) {
      toast.error("Failed to add action. Please try again. :( ");
      console.error("Error:", error);
    }
  };

  return (
    <div className="new-action-form-container">
      <h1 className="new-action-header">Add Action</h1>
      <form onSubmit={handleSubmit} className="new-action-form">
        <div className="datetime-container">
          <div className="new-action-form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="new-action-form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="new-action-form-group">
          <label>Type of Action</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div className="new-action-form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            cols="30"
            rows="10"
            onChange={handleChange}
          />
        </div>
        <div className="new-action-btn">
          <button className="action-add-btn" type="submit">
            Add Action
          </button>
          <button
            className="cancel-back-btn"
            onClick={() => navigate(`/${id}/actions/`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActionForm;
