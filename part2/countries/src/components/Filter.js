const Filter = ({ value, handleChange }) => (
  <div>
    find countries <input value={value} onChange={handleChange} />
  </div>
);

export default Filter;
