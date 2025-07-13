import React, { Component, ErrorInfo, ReactNode } from 'react'

// @see - https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/

interface Props {
  fallback?: ReactNode
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('error: ', error, errorInfo)
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <h1 className="text-center font-semibold flex flex-col justify-center">
            Something went wrong..
          </h1>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
