import Image from 'next/image'
import ReactLogo from '../../../public/react.svg'
import { HTMLAttributes } from 'react'
import cx from 'classnames'

export default function ReactButton(
  props: HTMLAttributes<HTMLButtonElement> & { selected?: boolean }
) {
  return (
    <button
      className={cx(
        'space-x-2 bg-cyan-300 border border-cyan-300 hover:border-cyan-500 px-2 rounded-md inline-flex items-center transition-all',
        props.selected
          ? 'opacity-100 border-cyan-500'
          : 'opacity-50 hover:opacity-100'
      )}
      {...props}
    >
      <span
        className="font-bold font-sans inline-flex items-center"
        style={{ height: 24 }}
      >
        <Image src={ReactLogo} alt="React Logo" width={20} height={20} />
      </span>
      <span className="italic text-cyan-700 text-sm">React</span>
    </button>
  )
}
