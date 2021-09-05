import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification);

  const styles = {
    color: notification.type === "success" ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (!notification.message) {
    return null;
  }

  return <div style={styles}>{notification.message}</div>;
};

export default Notification;
