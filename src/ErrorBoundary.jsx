import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // you can log to an external service here
    this.setState({ error, info });
    // also output to console for developer visibility
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    const { hasError, error, info } = this.state;
    if (hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Roboto, Arial' }}>
          <h1 style={{ color: '#b91c1c' }}>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#111827', color: '#f8fafc', padding: 12, borderRadius: 6 }}>
            {error && error.toString()}
            {info && info.componentStack}
          </pre>
          <p style={{ marginTop: 12 }}>
            Check the browser console for a full stack trace. If you'd like, paste the error here and I can help fix it.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
