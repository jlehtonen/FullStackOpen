const Notification = ({ message, type }) => {
  const styles = {
    color: type === "success" ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (!message) {
    return null;
  }

  return <div style={styles}>{message}</div>;
};

export default Notification;
