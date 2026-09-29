import { logoUrl } from '../content/assets'

// Company logo tile; a monogram until the logo file exists in src/assets/logos/.
export default function Logo({ company, file }: { company: string; file?: string }) {
  const url = logoUrl(file)
  return (
    <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-surface">
      {url ? (
        <img src={url} alt={company} className="size-full object-contain p-1.5" />
      ) : (
        <span className="font-mono text-sm font-semibold text-muted">{company.replace(/[^A-Za-z]/g, '').slice(0, 2)}</span>
      )}
    </div>
  )
}
