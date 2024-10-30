import { ReactNode } from 'react'

export default function HomeSection({
  title,
  badge,
  description,
  getStarted,
  rightColumn
}: {
  title: string
  badge: ReactNode
  description: string
  getStarted: {
    href: string
    label: string
  }
  rightColumn: ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 py-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          {badge}
        </div>
        <p>{description}</p>
        <p>
          <a
            className="border border-slate-400 rounded-md px-2 py-1 text-slate-800 hover:bg-slate-300 transition-colors"
            href={getStarted.href}
          >
            {getStarted.label} ↗
          </a>
        </p>
      </div>
      {rightColumn}
    </div>
  )
}