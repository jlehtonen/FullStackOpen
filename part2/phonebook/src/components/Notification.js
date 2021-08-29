const Notification = ({ notification, type }) => {
  if (!notification) {
    return null;
  }

  const styles = {
    color: type === "success" ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={styles}>{notification}</div>;
};

export default Notification;
