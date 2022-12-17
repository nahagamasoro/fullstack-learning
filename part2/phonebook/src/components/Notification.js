export default function Notification({ msg, isError }) {
  if (!msg) {
    return null;
  }

  return (
    <div
      style={{
        color: isError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        border: `2px solid ${isError ? 'red' : 'green'} `,
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
      }}
    >
      {msg}
    </div>
  );
}
