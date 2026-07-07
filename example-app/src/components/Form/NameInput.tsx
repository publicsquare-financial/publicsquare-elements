export default function NameInput({ required = false }: { required?: boolean }) {
  return (
    <div>
      <label htmlFor="name" className="block">
        Full Name {required ? '' : '(Optional)'}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="cardholder_name"
          id="name"
          className="block w-full rounded-lg border-0 bg-white px-4 py-3 shadow placeholder:text-gray-400 focus:outline-none"
          placeholder="Jane Doe"
          required={required}
        />
      </div>
    </div>
  );
}
