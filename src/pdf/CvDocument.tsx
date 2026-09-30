import { Circle, Document, Image, Link, Page, Path, StyleSheet, Svg, Text, View } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import { achievementUrl, logoUrl } from '../content/assets'
import { interestIcons } from '../content/icons'
import type { CV } from '../content/types'
import type { ResolveAsset } from './fonts'

// One-page A4 CV that reproduces docs/JaviCebrianCV.pdf, filled from cv.ts.
// Every size, offset and colour below was measured on the original (pdftotext
// -bbox for text boxes, a 600 dpi render for colours), in points. Font sizes are
// box height / 1.362 (Open Sans ascent + descent). The original is set with
// Illustrator tracking, so each style carries the letterSpacing measured by
// comparing word widths. Text boxes are narrower than the columns, as in the
// original (STATEMENT_W, ROLE_W). Only this file knows the print layout;
// content comes exclusively from the `cv` prop.

const C = {
  ink: '#231f20', // headings, role titles
  name: '#393536',
  dark: '#4f4c4d', // dates, dots, rings, icons
  mid: '#656263', // summaries, tags
  body: '#7b7979',
  soft: '#918f8f',
  faint: '#bdbcbc',
  track: '#d3d2d2', // empty dots / ring track
}

const COL = 263.7 // both columns
const GAP = 551.28 - 2 * COL // 23.9: page width minus 22 pt margins
const STATEMENT_W = 240
const ROLE_W = 171

// The Latin subset of Open Sans has no "→"; the original prints "->" too.
const t = (s: string) => s.replace(/→/g, '->')

const s = StyleSheet.create({
  page: { paddingTop: 28, paddingHorizontal: 22, fontFamily: 'Open Sans', fontWeight: 300, color: C.body },
  header: { position: 'relative', height: 68.4 },
  name: { fontSize: 12.2, color: C.name, lineHeight: 1, letterSpacing: 0.29 },
  tagline: { fontSize: 5, color: C.soft, marginTop: 1.6, marginLeft: 2.9, letterSpacing: 0.2 },
  meta: { position: 'absolute', top: 2.5, flexDirection: 'row' },
  metaLabel: { fontSize: 5.8, fontStyle: 'italic', color: C.faint, width: 23.6, textAlign: 'right' },
  metaBar: { borderLeftWidth: 0.5, borderLeftColor: C.faint, height: 22, marginHorizontal: 4.8 },
  metaLine: { fontSize: 5.8, color: C.faint, lineHeight: 1.24, textDecoration: 'none', letterSpacing: 0.1 },
  columns: { flexDirection: 'row', gap: GAP },
  col: { width: COL },
  h: { fontSize: 6.75, fontWeight: 400, color: C.ink, textTransform: 'uppercase', lineHeight: 1, letterSpacing: 0.15 },
  rule: { borderBottomWidth: 0.6, borderBottomColor: C.ink, borderBottomStyle: 'dotted', marginTop: 5.4 },
  p: { fontSize: 5.8, lineHeight: 1.55, letterSpacing: 0.1 },
  sub: { fontSize: 5.8, fontStyle: 'italic', color: C.soft, letterSpacing: 0.1 },
  row: { flexDirection: 'row', alignItems: 'center', height: 9.3 },
  dot: { width: 4.7, height: 4.7, borderRadius: 2.35, marginRight: 3.5 },
  role: { flexDirection: 'row', minHeight: 67.3 },
  logo: { width: 36.5, height: 36.5, marginRight: 9.9 },
  roleTitle: { fontSize: 5.8, fontWeight: 400, color: C.ink, lineHeight: 1.55, letterSpacing: 0.12 },
  roleDate: { fontSize: 5.8, fontWeight: 400, color: C.dark, lineHeight: 1.55, letterSpacing: 0.12 },
  roleSummary: { fontSize: 4.85, color: C.mid, lineHeight: 1.86, marginTop: 1, letterSpacing: 0.17 },
  roleTags: { fontSize: 3.9, color: C.mid, marginTop: 1.6, letterSpacing: 0.14 },
  footer: { position: 'absolute', bottom: 22, left: 0, right: 0, alignItems: 'center' },
})

// `mt` (space above the heading) and `pad` (rule to content) are per section:
// the original's spacing is hand-placed, not uniform. Values were fitted so every
// heading lands within ~1 pt of the original's.
function Section({ title, mt = 0, pad, children }: { title: string; mt?: number; pad: number; children: ReactNode }) {
  return (
    <View style={{ marginTop: mt }}>
      <Text style={s.h}>{title}</Text>
      <View style={s.rule} />
      <View style={{ paddingTop: pad }}>{children}</View>
    </View>
  )
}

// Header block: right-aligned italic label, thin bar, lines. `left` puts the
// label's right edge where the original's ends (177.4 / 443.3 pt on the page).
function Meta({ left, label, lines }: { left: number; label: string; lines: ReactNode[] }) {
  return (
    <View style={[s.meta, { left }]}>
      <Text style={s.metaLabel}>{label}</Text>
      <View style={s.metaBar} />
      <View>{lines}</View>
    </View>
  )
}

/** Ring track plus an arc from 12 o'clock, clockwise, for `value` of the turn. */
function Ring({ value }: { value: number }) {
  const size = 73
  const w = 7.5
  const r = (size - w) / 2
  const c = size / 2
  const a = 2 * Math.PI * Math.min(value, 0.9999)
  const x = c + r * Math.sin(a)
  const y = c - r * Math.cos(a)
  return (
    <Svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Circle cx={c} cy={c} r={r} stroke={C.track} strokeWidth={w} fill="none" />
      <Path
        d={`M ${c} ${c - r} A ${r} ${r} 0 ${value > 0.5 ? 1 : 0} 1 ${x} ${y}`}
        stroke={C.dark}
        strokeWidth={w}
        fill="none"
      />
    </Svg>
  )
}

export default function CvDocument({ cv, year, resolveAsset }: { cv: CV; year: number; resolveAsset: ResolveAsset }) {
  const asset = (url?: string) => (url ? resolveAsset(url) : undefined)
  const website = `https://${cv.website}`
  const linkedin = cv.links.find((l) => l.label === 'LinkedIn')

  return (
    <Document title={`${cv.name} — CV`} author={cv.name} subject={cv.headline} creator={cv.website}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{cv.name}</Text>
          <Text style={s.tagline}>{cv.tagline}</Text>
          <Meta left={131.8} label="Location" lines={[<Text key="l" style={s.metaLine}>{cv.location}.</Text>]} />
          <Meta
            left={397.7}
            label="Contact"
            lines={[
              <Link key="e" src={`mailto:${cv.contact.email}`} style={s.metaLine}>
                {cv.contact.email}
              </Link>,
              <Link key="w" src={website} style={s.metaLine}>
                {website}
              </Link>,
              linkedin && (
                <Link key="in" src={linkedin.href} style={s.metaLine}>
                  {linkedin.href.replace(/^https?:\/\/(www\.)?/, '')}
                </Link>
              ),
            ]}
          />
        </View>

        <View style={s.columns}>
          {/* ---- Left column ---- */}
          <View style={s.col}>
            <Section title="Personal statement" pad={2}>
              {cv.statement.map((p, i) => (
                <Text key={i} style={[s.p, { width: STATEMENT_W, marginTop: i ? 9 : 0 }]}>
                  {t(p)}
                </Text>
              ))}
            </Section>

            <Section title="Skills" mt={26.8} pad={18.5}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 164.7 }}>
                  <Text style={[s.sub, { marginBottom: 10 }]}>01 Technologies</Text>
                  {cv.technologies.map((sk) => (
                    <View key={sk.name} style={s.row}>
                      <Text style={[s.p, { width: 75.5 }]}>{sk.name}</Text>
                      {Array.from({ length: 10 }, (_, i) => (
                        <View key={i} style={[s.dot, { backgroundColor: i < sk.level ? C.dark : C.track }]} />
                      ))}
                    </View>
                  ))}
                </View>
                <View>
                  <Text style={[s.sub, { marginBottom: 10 }]}>02 Knowledge</Text>
                  {cv.knowledge.map((k) => (
                    <View key={k} style={s.row}>
                      <Text style={s.p}>{t(k)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Section>

            <Section title="Education" mt={9.9} pad={12}>
              {cv.education.map((e) => (
                <View key={e.school + e.degree} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <View style={{ width: 5.6, height: 5.6, borderRadius: 2.8, backgroundColor: C.ink, marginLeft: 1.2, marginRight: 4.2 }} />
                  <View>
                    {e.start && (
                      <Text style={[s.p, { color: C.ink }]}>
                        From {e.start} to {e.end ?? 'date'}.
                      </Text>
                    )}
                    <Text style={[s.p, { color: C.mid }]}>
                      {e.degree}.{e.note && ` (${e.note.toLowerCase()})`}
                    </Text>
                    <Text style={[s.p, { color: C.ink }]}>{e.school}.</Text>
                  </View>
                </View>
              ))}
            </Section>

            <Section title="Language skills" mt={5.6} pad={17.1}>
              <View style={{ flexDirection: 'row', gap: 22, marginLeft: 18 }}>
                {cv.languages.map((l) => (
                  <View key={l.name} style={{ width: 73, height: 73, justifyContent: 'center', alignItems: 'center' }}>
                    <Ring value={l.proficiency} />
                    <Text style={[s.p, { color: C.dark, textTransform: 'uppercase', lineHeight: 1.24 }]}>{l.name}</Text>
                    <Text style={[s.p, { lineHeight: 1.24 }]}>{l.label}</Text>
                  </View>
                ))}
              </View>
            </Section>

            <Section title="Achievements" mt={17.2} pad={15}>
              {cv.achievements.map((a) => {
                const img = asset(achievementUrl(a.image))
                return (
                  <View key={a.title} style={{ flexDirection: 'row', height: 47.2 }}>
                    <View style={{ width: 38, marginLeft: 2, marginRight: 9, alignItems: 'center' }}>
                      {img && <Image src={img} style={{ width: 38, maxHeight: 38, objectFit: 'contain', opacity: 0.8 }} />}
                    </View>
                    <View>
                      <Text style={[s.p, { color: C.ink }]}>{a.title}.</Text>
                      <Text style={[s.p, { color: C.mid }]}>{a.date}.</Text>
                      <Text style={[s.p, { color: C.ink }]}>{a.detail}.</Text>
                    </View>
                  </View>
                )
              })}
            </Section>

            <Section title="Hobbies & interests" mt={0.6} pad={8}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {cv.interests.map((h) => (
                  <View
                    key={h.name}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 19,
                      borderWidth: 0.6,
                      borderColor: C.faint,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Svg viewBox="0 0 24 24" width={16} height={16}>
                      {interestIcons[h.icon].map((sh, i) =>
                        'd' in sh ? (
                          <Path key={i} d={sh.d} stroke={C.dark} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        ) : (
                          <Circle key={i} {...sh} stroke={C.dark} strokeWidth={1.75} fill="none" />
                        ),
                      )}
                    </Svg>
                    <Text style={{ fontSize: 3.8, color: C.dark, marginTop: 2, textAlign: 'center', maxWidth: 30, letterSpacing: 0.18 }}>{h.name}</Text>
                  </View>
                ))}
              </View>
            </Section>
          </View>

          {/* ---- Right column ---- */}
          <View style={s.col}>
            <Section title="Work experience" pad={12}>
              {cv.experience.map((r) => {
                const logo = asset(logoUrl(r.logo))
                return (
                  <View key={r.company + r.start} style={s.role} wrap={false}>
                    {logo ? <Image src={logo} style={s.logo} /> : <View style={s.logo} />}
                    <View style={{ width: ROLE_W }}>
                      <Text style={s.roleTitle}>
                        {r.title} @ {r.company}
                      </Text>
                      <Text style={s.roleDate}>
                        From {r.start} to {r.end ?? 'date'}
                      </Text>
                      <Text style={s.roleSummary}>{t(r.summary)}</Text>
                      {r.tags && <Text style={s.roleTags}>{r.tags.join(', ')}</Text>}
                    </View>
                  </View>
                )
              })}
            </Section>
          </View>
        </View>

        <View style={s.footer} fixed>
          <View style={{ width: 23, borderTopWidth: 0.5, borderTopColor: C.dark, marginBottom: 5 }} />
          <Text style={{ fontSize: 5.8, color: C.dark }}>
            {cv.name} © {year}.
          </Text>
        </View>
      </Page>
    </Document>
  )
}
