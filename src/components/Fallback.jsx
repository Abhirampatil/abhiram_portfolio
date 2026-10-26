import { Component } from 'react'
export const SceneFallback = () => (
  <div className="fallback" aria-hidden="true"><div className="fb-ring" /><div className="fb-core" /></div>
)
export class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError && this.props.onError() }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children }
}
