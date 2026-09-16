import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
          <h1 className="text-[28px] font-semibold">Something went wrong.</h1>
          <p className="text-sm text-muted-foreground">Please try again or return to the calendar.</p>
          <Button type="button" onClick={() => window.location.replace("/calendar")}>
            Recover
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
