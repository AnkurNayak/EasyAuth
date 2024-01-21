// eslint-disable-next-line react/prop-types
export const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-300">{label}*</label>
      <input
        type={type}
        className="mt-1 p-2 w-full rounded-md bg-gray-700 text-white focus:outline-none"
        value={value}
        onChange={onChange}
        // required
      />
    </div>
  );
};
