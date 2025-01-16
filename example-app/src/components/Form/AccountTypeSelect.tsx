export default function AccountTypeSelect({
  required = false
}: {
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor="name" className="block">
        Account type {required ? '' : '(Optional)'}
      </label>
      <div className="mt-2">
        <select
          name="account_type"
          id="account_type"
          className="block w-full px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none"
          required={required}
        >
          <option value="">Select account type</option>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>
      </div>
    </div>
  )
}
