export default function InputField({
  labelFor,
  type,
  register,
  field,
  errorField,
  decorator,
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        position: `${decorator && "relative"}`,
      }}
    >
      <label className="font-semibold capitalize">{labelFor} : </label>
      <input
        type={type}
        className="rounded border border-gray-700 p-2"
        {...register(field)}
      />
      {decorator && decorator}
      {errorField && (
        <p className="mt-1 text-sm text-red-500">{errorField.message}</p>
      )}
    </div>
  );
}
