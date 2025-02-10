export default function AccountHolderTypeSelect({
  required = false
}: {
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor="name" className="block">
        Account holder type {required ? '' : '(Optional)'}
      </label>
      <div className="mt-2">
        <select
          name="account_holder_type"
          id="account_holder_type"
          className="block w-full px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none"
          required={required}
        >
          <option value="">Select account holder type</option>
          <option value="individual">Individual</option>
          <option value="company">Company</option>
        </select>
      </div>
    </div>
  )
}
