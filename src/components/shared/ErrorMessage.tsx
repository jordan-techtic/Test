interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}
