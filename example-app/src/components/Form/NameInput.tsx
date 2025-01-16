export default function NameInput({
  required = false
}: {
  required?: boolean
}) {
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
          className="block w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none"
          placeholder="Jane Doe"
          required={required}
        />
      </div>
    </div>
  )
}
