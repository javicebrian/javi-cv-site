export default function Tags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
          {t}
        </li>
      ))}
    </ul>
  )
}
