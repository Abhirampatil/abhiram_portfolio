import { useEffect, useRef, useState } from 'react'
import { isTouch } from './util'
// Idle: a ring with a small star orbiting it. Over clickable things: a pill with star-border streaks and a label.
export default function Cursor() {
  const dot = useRef(), ring = useRef(), trail = useRef()
  const [ui, setUi] = useState({ label: '', hot: false, down: false })
  useEffect(() => {
    if (isTouch()) return
    document.documentElement.classList.add('has-cursor')
    const m = { x: -100, y: -100 }, r = { ...m }, t = { ...m }
    let raf, shown = false
    const move = (e) => {
      m.x = e.clientX; m.y = e.clientY
      if (!shown) { shown = true; [dot, ring, trail].forEach((x) => (x.current.style.opacity = 1)); Object.assign(r, m); Object.assign(t, m) }
      const el = e.target
      const label = document.body.dataset.cursor || el.closest?.('[data-cursor]')?.dataset.cursor || ''
      const hot = !!(label || el.closest?.('a,button,[role=button]'))
      setUi((u) => (u.label === label && u.hot === hot ? u : { ...u, label, hot }))
    }
    const down = () => setUi((u) => ({ ...u, down: true })), up = () => setUi((u) => ({ ...u, down: false }))
    const tick = () => {
      r.x += (m.x - r.x) * 0.22; r.y += (m.y - r.y) * 0.22
      t.x += (m.x - t.x) * 0.08; t.y += (m.y - t.y) * 0.08
      dot.current.style.transform = `translate(${m.x}px,${m.y}px)`
      ring.current.style.transform = `translate(${r.x}px,${r.y}px)`
      trail.current.style.transform = `translate(${t.x}px,${t.y}px)`
      raf = requestAnimationFrame(tick)
    }
    addEventListener('pointermove', move); addEventListener('pointerdown', down); addEventListener('pointerup', up)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf); document.documentElement.classList.remove('has-cursor')
      removeEventListener('pointermove', move); removeEventListener('pointerdown', down); removeEventListener('pointerup', up)
    }
  }, [])
  return (
    <div className="cursor" aria-hidden="true">
      <div ref={trail} className="cur-trail"><i /></div>
      <div ref={ring} className={'cur-ring' + (ui.down ? ' down' : '')}>
        {ui.hot && ui.label ? (
          <i className="cur-pill star"><u /><u /><span className="si">{ui.label}</span></i>
        ) : <i className={'cur-orb' + (ui.hot ? ' big' : '')}><b /></i>}
      </div>
      <div ref={dot} className="cur-dot"><i /></div>
    </div>
  )
}
