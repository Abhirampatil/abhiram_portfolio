import { useEffect, useState } from 'react'
import Star from './Star'
// A cup that fills while the scene boots. Waits at 90% until the scene is truly ready.
export default function Loader({ ready, onStart, gone }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    let raf, last = performance.now()
    const tick = (t) => {
      const dt = (t - last) / 1000; last = t
      setPct((p) => Math.min(ready ? 100 : 90, p + dt * (ready ? 110 : 40)))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready])
  const done = pct >= 100
  return (
    <div className={'loader' + (gone ? ' gone' : '')} role="dialog" aria-label="Loading portfolio" aria-hidden={gone}>
      <i className="blob b1" /><i className="blob b2" />
      <div className="loader-box">
        <div className="mug" aria-hidden="true">
          <div className="steam"><i /><i /><i /></div>
          <div className="cup"><div className="coffee" style={{ height: 8 + pct * 0.82 + '%' }} /></div>
          <div className="handle" />
        </div>
        <p className="loader-title">{done ? 'Your seat is ready.' : 'Pouring a fresh cup\u2026'}</p>
        <p className="loader-pct" aria-live="polite">{Math.floor(pct)}%</p>
        <Star className="pill primary" color="#ffe27a" disabled={!done} onClick={onStart}>Come on in</Star>
      </div>
    </div>
  )
}
