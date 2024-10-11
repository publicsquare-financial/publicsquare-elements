import Loader from './Loader'

export default function SubmitButton({
  loading,
  elementType
}: {
  loading?: boolean
  elementType?: 'card' | 'ach'
}) {
  return (
    <button
      type="submit"
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {loading ? (
        <Loader />
      ) : elementType === 'ach' ? (
        'Capture ACH'
      ) : (
        'Capture card'
      )}
    </button>
  )
}
