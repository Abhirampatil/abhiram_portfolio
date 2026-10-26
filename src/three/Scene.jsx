import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, Html, RoundedBox, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { reduced } from '../components/util'

const C = { base: '#2a1747', violet: '#b583ff', cyan: '#2ee6c5', blue: '#ff5d73', amber: '#ffb347', hot: '#ffe27a' }
const ANG = { projects: 0, about: -80, skills: 80, contact: 180 }
const R = 3.4
const polar = (deg, y) => { const a = (deg * Math.PI) / 180; return { position: [R * Math.sin(a), y, R * Math.cos(a)], rotation: [0, a, 0] } }

// A hotspot: floats, glows on hover, opens a panel on click. Its label is a real button for keyboard users.
function Item({ deg, label, id, color, onOpen, children }) {
  const g = useRef()
  const [hot, setHot] = useState(false)
  const { position, rotation } = polar(deg, -0.35)
  useFrame((_, dt) => {
    const s = THREE.MathUtils.lerp(g.current.scale.x, hot ? 1.2 : 1, Math.min(1, dt * 8))
    g.current.scale.setScalar(s)
  })
  const over = (e) => { e.stopPropagation(); setHot(true); document.body.dataset.cursor = 'Open ' + label }
  const out = () => { setHot(false); document.body.dataset.cursor = '' }
  return (
    <group position={position} rotation={rotation}>
      <Float speed={reduced() ? 0 : 1.6} floatIntensity={0.45} rotationIntensity={0.08}>
        <group ref={g} onPointerOver={over} onPointerOut={out} onClick={(e) => { e.stopPropagation(); out(); onOpen(id) }}>
          {children(hot ? C.hot : color, hot)}
        </group>
      </Float>
      <Html center position={[0, -1.25, 0]} zIndexRange={[5, 0]}>
        <button className={'tag' + (hot ? ' hot' : '')} onClick={() => onOpen(id)} onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}>{label}</button>
      </Html>
    </group>
  )
}
const Glow = ({ color, hot, i = 0.6 }) => (
  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hot ? 1.5 : i} roughness={0.35} metalness={0.2} />
)
const Monitor = ({ color, hot }) => (
  <group scale={1.15}>
    <RoundedBox args={[1.7, 1.1, 0.12]} radius={0.06} smoothness={3}><meshStandardMaterial color="#3b2266" roughness={0.4} metalness={0.5} /></RoundedBox>
    <mesh position={[0, 0, 0.07]}><planeGeometry args={[1.5, 0.9]} /><Glow color={color} hot={hot} i={0.5} /></mesh>
    {[-0.3, 0, 0.3].map((y) => <mesh key={y} position={[-0.25, y, 0.08]}><planeGeometry args={[0.7 + (y ? 0.2 : 0), 0.06]} /><meshBasicMaterial color="#1a1033" /></mesh>)}
    <mesh position={[0, -0.75, 0]}><cylinderGeometry args={[0.07, 0.12, 0.4, 12]} /><meshStandardMaterial color="#3b2266" /></mesh>
  </group>
)
const Avatar = ({ color, hot }) => (
  <group>
    <mesh position={[0, 0.5, 0]}><sphereGeometry args={[0.38, 24, 24]} /><Glow color={color} hot={hot} /></mesh>
    <mesh position={[0, -0.2, 0]}><capsuleGeometry args={[0.38, 0.5, 8, 16]} /><meshStandardMaterial color="#3b2266" roughness={0.5} /></mesh>
  </group>
)
const Stack = ({ color, hot }) => (
  <group>
    {[0, 1, 2].map((i) => (
      <RoundedBox key={i} args={[1.2 - i * 0.2, 0.34, 1.2 - i * 0.2]} radius={0.05} position={[0, -0.4 + i * 0.4, 0]} rotation={[0, i * 0.5, 0]}>
        <Glow color={i === 1 ? color : C.violet} hot={hot} i={0.35} />
      </RoundedBox>))}
  </group>
)
function Gem({ color, hot }) {
  const r = useRef()
  useFrame((_, dt) => { if (r.current && !reduced()) r.current.rotation.y += dt * 0.9 })
  return <mesh ref={r}><octahedronGeometry args={[0.7]} /><Glow color={color} hot={hot} i={0.5} /></mesh>
}

function Platform() {
  const rings = useRef([])
  useFrame((_, dt) => { if (!reduced()) rings.current.forEach((m, i) => m && (m.rotation.z += dt * (0.12 + i * 0.1) * (i % 2 ? -1 : 1))) })
  return (
    <group>
      <group position={[0, -1.7, 0]}>
        <mesh><cylinderGeometry args={[4.6, 4.9, 0.35, 64]} /><meshStandardMaterial color={C.base} roughness={0.6} metalness={0.4} /></mesh>
        <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}><torusGeometry args={[4.2, 0.03, 8, 128]} /><meshBasicMaterial color={C.amber} /></mesh>
        <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[1.5, 1.55, 64]} /><meshBasicMaterial color={C.violet} /></mesh>
      </group>
      {/* centre piece: orbiting rings around a glowing core */}
      <group position={[0, 0.2, 0]}>
        <mesh><icosahedronGeometry args={[0.35, 1]} /><meshStandardMaterial color={C.violet} emissive={C.violet} emissiveIntensity={1.2} flatShading /></mesh>
        {[0.9, 1.25, 1.6].map((r, i) => (
          <mesh key={r} ref={(m) => (rings.current[i] = m)} rotation={[Math.PI / 2 + i * 0.5, i * 0.7, 0]}>
            <torusGeometry args={[r, 0.015, 8, 96]} /><meshBasicMaterial color={i === 1 ? C.blue : C.cyan} />
          </mesh>))}
      </group>
    </group>
  )
}
function Debris({ count }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 + i, d = 5.5 + (i % 5) * 0.9
    return { p: [Math.sin(a) * d, -1 + ((i * 37) % 70) / 20, Math.cos(a) * d], s: 0.12 + (i % 4) * 0.07 }
  }), [count])
  return items.map((it, i) => (
    <Float key={i} speed={reduced() ? 0 : 1 + (i % 3) * 0.5} floatIntensity={1.2} rotationIntensity={1.5}>
      <mesh position={it.p} scale={it.s * 3}><icosahedronGeometry args={[0.5, 0]} /><meshStandardMaterial color={i % 2 ? C.cyan : C.violet} wireframe /></mesh>
    </Float>))
}

// Camera travel: flies to the focused object, or back to the overview. Free orbit/zoom afterwards.
function Rig({ controls, focus, started, mobile }) {
  const t = useRef(0)
  const dp = useMemo(() => new THREE.Vector3(), [])
  const dt_ = useMemo(() => new THREE.Vector3(), [])
  const first = useRef(true)
  useEffect(() => { if (started) t.current = reduced() ? 0.05 : 2.4 }, [focus, started])
  useFrame((s, dt) => {
    const c = controls.current
    if (!c || !started || t.current <= 0) return
    t.current -= dt
    if (focus) {
      const a = (ANG[focus] * Math.PI) / 180, rr = mobile ? 9 : 7.4
      dp.set(rr * Math.sin(a), 0.9, rr * Math.cos(a))
      dt_.set(R * Math.sin(a), -1.45, R * Math.cos(a))
    } else {
      const az = first.current ? 0 : Math.atan2(s.camera.position.x, s.camera.position.z), rr = mobile ? 12.5 : 10.5
      dp.set(rr * Math.sin(az), 4.5, rr * Math.cos(az)); dt_.set(0, -0.2, 0)
    }
    first.current = false
    const k = reduced() ? 1 : 1 - Math.exp(-dt * 3.2)
    s.camera.position.lerp(dp, k); c.target.lerp(dt_, k)
  })
  return null
}

export default function Scene({ started, focus, onOpen, onReady }) {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 760
  const [touched, setTouched] = useState(false)
  const controls = useRef()
  return (
    <Canvas dpr={[1, mobile ? 1.5 : 2]} camera={{ position: [0, 5, 22], fov: 42 }} onCreated={onReady}
      gl={{ antialias: !mobile, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#1a1033']} />
      <fog attach="fog" args={['#1a1033', 16, 34]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#cfd8ff" />
      <pointLight position={[-5, 2, 3]} intensity={35} color={C.blue} />
      <pointLight position={[5, 1, 2]} intensity={30} color={C.cyan} />
      <Rig controls={controls} focus={focus} started={started} mobile={mobile} />
      <OrbitControls ref={controls} target={[0, -0.2, 0]} enablePan={false} enableDamping dampingFactor={0.08}
        rotateSpeed={0.55} zoomSpeed={0.7} minDistance={4} maxDistance={16} minPolarAngle={0.9} maxPolarAngle={1.65}
        autoRotate={started && !touched && !focus && !reduced()} autoRotateSpeed={0.5}
        onStart={() => setTouched(true)} />
      <Platform />
      <Item deg={0} label="Projects" id="projects" color={C.cyan} onOpen={onOpen}>{(c, h) => <Monitor color={c} hot={h} />}</Item>
      <Item deg={-80} label="About" id="about" color={C.violet} onOpen={onOpen}>{(c, h) => <Avatar color={c} hot={h} />}</Item>
      <Item deg={80} label="Skills" id="skills" color={C.cyan} onOpen={onOpen}>{(c, h) => <Stack color={c} hot={h} />}</Item>
      <Item deg={180} label="Contact" id="contact" color={C.amber} onOpen={onOpen}>{(c, h) => <Gem color={c} hot={h} />}</Item>
      <Stars radius={45} depth={25} count={mobile ? 700 : 1800} factor={3.5} fade speed={0.6} />
      <Debris count={mobile ? 8 : 16} />
      <Sparkles count={mobile ? 40 : 110} scale={[16, 7, 16]} size={2.2} speed={reduced() ? 0 : 0.3} color={C.amber} />
    </Canvas>
  )
}
