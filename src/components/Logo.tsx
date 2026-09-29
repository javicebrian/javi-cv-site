import { logoUrl } from '../content/assets'

// Company logo tile; a monogram until the logo file exists in src/assets/logos/.
// Logo files are full-bleed square tiles with their own background (see AGENTS.md).
export default function Logo({ company, file }: { company: string; file?: string }) {
  const url = logoUrl(file)
  return (
    <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-surface">
      {url ? (
        <img src={url} alt={company} className="size-full object-cover" loading="lazy" />
      ) : (
        <span className="font-mono text-sm font-semibold text-muted">{company.replace(/[^A-Za-z]/g, '').slice(0, 2)}</span>
      )}
    </div>
  )
}
