import PropTypes from "prop-types";

const LoggedIndicator = ({ user, handleLogout }) => {
  return (
    <p>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </p>
  );
};

LoggedIndicator.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default LoggedIndicator;
