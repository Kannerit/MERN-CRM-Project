import "./CustomerAction.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function CustomerActions() {
  const { id } = useParams();
  const [actions, setActions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const { data } = await axios.get(`/${id}/actions/`);

        setActions(data);
      } catch (error) {
        console.error("Error fetching actions", error);
      }
    };
    fetchActions();
  }, [id]);

  const handleEdit = (actionId) => {
    navigate(`/${id}/actions/${actionId}/edit`);
  };

  const handleDelete = async (actionId) => {
    if (window.confirm("Are you sure you want to delete this action? :o"))
      try {
        await axios.delete(`/${id}/actions/${actionId}/delete`);
        toast.success("Action deleted successfully! :D");
        const { data } = await axios.get(`/${id}/actions`);
        setActions(data);
        navigate(`/${id}/actions`);
      } catch (error) {
        toast.error("Failed to delete action. Pleasy try again later :(");
        console.error("Error deleting action:", error);
      }
  };
  return (
    <div className="customer-action-container">
      <h1 className="customer-action-header">Customer Actions</h1>

      <ul className="action-list">
        {actions.map((action) => {
          const actionDate = new Date(action.date);
          const formattedDate = actionDate.toDateString();
          const formattedTime = actionDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <li className="action-item" key={action._id}>
              {formattedDate} {formattedTime} - {action.type} -
              {action.description}
              <div className="action-buttons">
                <button
                  className="action-edit-btn"
                  onClick={() => handleEdit(action._id)}
                >
                  Edit Action
                </button>
                <button
                  className="action-delete-btn"
                  onClick={() => handleDelete(action._id)}
                >
                  Delete Action
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <button
        className="action-new-btn"
        onClick={() => navigate(`/${id}/actions/create`)}
      >
        Add New Action
      </button>
      <button
        className="back-btn"
        onClick={() => navigate(`/customers/${id}/`)}
      >
        Back to Customer
      </button>
    </div>
  );
}

export default CustomerActions;
