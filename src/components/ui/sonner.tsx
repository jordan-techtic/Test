import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast border border-border bg-card text-foreground",
          description: "text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}
