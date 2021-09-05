import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  width: 400px;
`;

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <Container>
      <div style={hideWhenVisible}>
        <Button primary onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button secondary fullwidth onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </Container>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
