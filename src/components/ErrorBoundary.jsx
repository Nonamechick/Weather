import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-600 text-white rounded-xl shadow-xl mt-10 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
            ⚠️ Oops! Something went wrong.
          </h2>
          <p className="text-sm mb-4">Try refreshing the page or check back later.</p>

          {this.state.error && (
            <details className="bg-red-500 rounded-lg p-4 text-xs mt-4 whitespace-pre-wrap text-gray-200 cursor-pointer transition-all duration-300">
              <summary className="cursor-pointer text-white font-semibold">
                Error Details (Click to Expand)
              </summary>
              <p className="mt-2">{this.state.error.toString()}</p>
              <p className="mt-2">{this.state.errorInfo?.componentStack}</p>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
