import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import HUD from './components/HUD'
import Note from './components/Note'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import { SceneBoundary, SceneFallback } from './components/Fallback'
import { hasWebGL } from './components/util'
const Scene = lazy(() => import('./three/Scene.jsx'))

export default function App() {
  const [gl] = useState(hasWebGL)
  const [ready, setReady] = useState(!gl)
  const [started, setStarted] = useState(false)
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const onReady = useCallback(() => setTimeout(() => setReady(true), 400), [])
  useEffect(() => { document.body.dataset.cursor = '' }, [open])
  return (
    <>
      <Cursor />
      <div className="stage" data-cursor="">
        {gl ? (
          <SceneBoundary onError={() => setReady(true)}>
            <Suspense fallback={null}><Scene started={started} focus={open} onOpen={setOpen} onReady={onReady} /></Suspense>
          </SceneBoundary>
        ) : <SceneFallback />}
      </div>
      <HUD open={open} onOpen={setOpen} />
      <Note id={open} onClose={close} />
      <Loader ready={ready} gone={started} onStart={() => setStarted(true)} />
    </>
  )
}
