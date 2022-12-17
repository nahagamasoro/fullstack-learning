const Filter = ({ searchValue, onSearchvalueChange }) => {
  return (
    <div>
      filter shown with:
      <input
        value={searchValue}
        onChange={(event) => {
          onSearchvalueChange(event);
        }}
      />
    </div>
  );
};

export default Filter;
