import React from 'react';
import ErrorPage from '../pages/Error';

interface Props {
  children: React.ReactNode;
}

export class GlobalErrorBoundary extends React.Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? <ErrorPage /> : this.props.children;
  }
}
