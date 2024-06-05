import "./EditAction.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function EditAction() {
  const { id, actionId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: id,
    date: "",
    time: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    console.log("This is the useEffect");
    const fetchAction = async () => {
      try {
        const { data } = await axios.get(`/${id}/actions/${actionId}`);
        const dateTime = new Date(data.date);
        setFormData({
          customerId: id,
          date: dateTime.toISOString().split("T")[0],
          time: dateTime.toTimeString().slice(0, 5),
          type: data.type,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching action", error);
      }
    };
    fetchAction();
  }, [id, actionId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    if (selectedDateTime <= new Date()) {
      toast.error("Please select a future date and time");
      return;
    }
    try {
      await axios.put(`/${id}/actions/${actionId}/edit`, {
        ...formData,
        date: selectedDateTime.toISOString(),
      });
      toast.success("Action updated succesfully! :) ");
      navigate(`/${id}/actions`);
    } catch (error) {
      toast.error("Failed to update action. Please try again :( ");
      console.error("Error:", error);
    }
  };

  return (
    <div className="edit-action-form-container">
      <h1 className="edit-action-header">Edit Action</h1>
      <form onSubmit={handleSubmit} className="edit-action-form">
        <div className="edit-datetime-container">
          <div className="edit-action-form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="edit-action-form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="edit-action-form-group">
          <label>Type of Action</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div className="edit-action-form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="description"
            value={formData.description}
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="edit-action-btn">
          <button className="edit-add-btn" type="submit">
            Update Action
          </button>
          <button
            className="edit-cancel-back-btn"
            onClick={() => navigate(`/${id}/actions`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAction;
