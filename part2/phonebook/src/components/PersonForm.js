const PersonForm = ({
  onSubmit,
  nameInputValue,
  onNameChange,
  numberInputValue,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input value={nameInputValue} onChange={onNameChange} />
      </div>

      <div>
        number:
        <input value={numberInputValue} onChange={onNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
