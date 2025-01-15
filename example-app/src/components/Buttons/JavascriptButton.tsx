import { HTMLAttributes } from 'react'
import cx from 'classnames'

export default function JavascriptButton(
  props: HTMLAttributes<HTMLButtonElement> & { selected?: boolean }
) {
  return (
    <button
      className={cx(
        'space-x-2 bg-yellow-300 border border-yellow-300 hover:border-yellow-500 px-2 rounded-md inline-flex items-center transition-all',
        props.selected
          ? 'opacity-100 border-yellow-500'
          : 'opacity-50 hover:opacity-100'
      )}
      {...props}
    >
      <span className="font-bold font-sans">JS</span>
      <span className="italic text-yellow-700 text-sm">Javascript</span>
    </button>
  )
}
