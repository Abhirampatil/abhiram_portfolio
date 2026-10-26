import { useEffect, useRef } from 'react'
import { profile, about, skills, projects, sections } from '../data/content'
import Star from './Star'

const L = ({ href, children, primary, color = '#2ee6c5' }) => (
  <Star as="a" className={'small pill' + (primary ? ' primary' : '')} color={color} href={href} target="_blank" rel="noreferrer">{children}</Star>
)
const Projects = () => (<>
  <p className="lead">Four things I've built. Code is on GitHub, and every demo video lives in one folder.</p>
  <div className="row"><L href={profile.demos} primary color="#ffe27a">Watch the demos</L></div>
  {projects.map((p) => (
    <article className="card" key={p.title}>
      <h3>{p.title}</h3>
      <p>{p.summary}</p>
      <p><strong>Why it exists: </strong>{p.problem}</p>
      <ul className="bul">{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
      <ul className="chips">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
      <div className="row"><L href={p.repo}>See the code</L></div>
    </article>
  ))}
</>)
const About = () => (<>
  {about.text.map((t, i) => <p className="lead" key={i}>{t}</p>)}
  <div className="card"><h3>Education</h3><p>{about.education.degree}<br />{about.education.school}<br />{about.education.years}, {about.education.cgpa}</p></div>
  <div className="card"><h3>What I'm into</h3><ul className="chips">{about.focus.map((f) => <li key={f}>{f}</li>)}</ul></div>
  <div className="card"><h3>Hackathons and certificates</h3><ul className="bul">{about.achievements.map((a) => <li key={a}>{a}</li>)}</ul></div>
</>)
const Skills = () => (<>{skills.map((s) => (
  <div className="card" key={s.group}><h3>{s.group}</h3><ul className="chips">{s.items.map((i) => <li key={i}>{i}</li>)}</ul></div>
))}</>)
const Contact = () => (<>
  <p className="lead">Looking for internships and backend roles, and happy to talk about AI systems. Email is the fastest way to reach me.</p>
  <div className="row"><Star as="a" className="pill primary" color="#ffe27a" href={`mailto:${profile.email}`}>{profile.email}</Star></div>
  <div className="row">
    <L href={profile.linkedin} color="#b583ff">LinkedIn</L><L href={profile.github}>GitHub</L><L href={profile.demos} color="#ff5d73">Demo videos</L>
    <Star as="a" className="small pill" color="#ffb347" href={profile.resume} download>Download resume</Star>
  </div>
  <p className="muted">Based in {profile.location}.</p>
</>)
const views = { projects: Projects, about: About, skills: Skills, contact: Contact }

export default function Note({ id, onClose }) {
  const closeRef = useRef()
  useEffect(() => {
    if (!id) return
    const prev = document.activeElement
    const t = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 900)
    const esc = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', esc)
    return () => { clearTimeout(t); removeEventListener('keydown', esc); prev?.focus?.() }
  }, [id, onClose])
  if (!id) return null
  const View = views[id]
  const title = sections.find((s) => s.id === id).label
  return (
    <div className="note star" key={id} role="dialog" aria-label={title} style={{ '--c': '#ff5d73', '--sp': '9s' }}>
      <u /><u />
      <div className="si note-in">
        <div className="note-head">
          <h2>{title}</h2>
          <button ref={closeRef} className="x" onClick={onClose} aria-label="Close and look around">Close</button>
        </div>
        <div className="note-body"><View /></div>
      </div>
    </div>
  )
}
