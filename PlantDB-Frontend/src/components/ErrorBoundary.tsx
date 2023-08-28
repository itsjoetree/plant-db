import  { Component, type ComponentProps, type ReactNode } from "react";

type ErrorBoundaryProps = ComponentProps<"div"> & {
  fallback?: ReactNode;
}

/**
 * A component that catches errors in its children and renders a fallback UI.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;