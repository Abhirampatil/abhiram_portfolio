import { profile, sections } from '../data/content'
import Star from './Star'
export default function HUD({ open, onOpen }) {
  return (
    <>
      <header className="hud-top">
        <div className="id"><h1>{profile.name}</h1><p>{profile.headline}</p></div>
        <div className="top-links">
          <Star as="a" className="pill hide-sm" color="#2ee6c5" href={profile.github} target="_blank" rel="noreferrer">GitHub</Star>
          <Star as="a" className="pill hide-sm" color="#b583ff" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</Star>
          <Star as="a" className="pill primary" color="#ffe27a" href={profile.resume} download>Resume</Star>
        </div>
      </header>
      <nav className="dock star pill" aria-label="Portfolio sections" style={{ '--c': '#ff5d73' }}>
        <u /><u />
        <span className="si dock-in">
          {sections.map((s) => (
            <button key={s.id} className={open === s.id ? 'active' : ''} aria-pressed={open === s.id} onClick={() => onOpen(open === s.id ? null : s.id)}>{s.label}</button>
          ))}
        </span>
      </nav>
      {!open && <p className="hint">drag to look around &middot; scroll or pinch to zoom &middot; click an object</p>}
    </>
  )
}
