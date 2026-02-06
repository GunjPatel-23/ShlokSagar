import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-muted p-4">
                    <div className="max-w-md text-center">
                        <div className="mb-6">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Something went wrong
                            </h1>
                            <p className="text-muted-foreground mb-4">
                                We apologize for the inconvenience. Please try refreshing the page.
                            </p>
                            {this.state.error && (
                                <details className="text-left bg-secondary p-4 rounded-lg mb-4">
                                    <summary className="cursor-pointer font-semibold mb-2">
                                        Error details
                                    </summary>
                                    <pre className="text-xs overflow-auto">
                                        {this.state.error.toString()}
                                    </pre>
                                </details>
                            )}
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Refresh Page
                            </button>
                            <a
                                href="/"
                                className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                            >
                                Go to Home
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
