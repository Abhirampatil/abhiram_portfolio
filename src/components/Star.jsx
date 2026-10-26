// Star-border effect (inspired by reactbits.dev/animations/star-border): glowing streaks travel along the edges.
export default function Star({ as: T = 'button', color, speed, className = '', children, ...p }) {
  return (
    <T className={'star ' + className} style={{ '--c': color, '--sp': speed }} {...p}>
      <u /><u /><span className="si">{children}</span>
    </T>
  )
}
