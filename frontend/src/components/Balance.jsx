export const Balance = ({ value, email }) => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="font-bold text-lg">Your balance</div>
        <div className="font-semibold ml-4 text-lg">
          <span className="font-bold">₹</span> {value.toFixed(2)}
        </div>
      </div>
      <div className="font-semibold ml-4 text-lg">{email}</div>
    </div>
  );
};
