export default function NameInput() {
  return (
    <div>
      <label htmlFor="name" className="block">
        Full Name
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="cardholder_name"
          id="name"
          className="block w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none"
          placeholder="Jane Doe"
        />
      </div>
    </div>
  )
}
