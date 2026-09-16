import { Toaster as ToastToaster, toast as notify } from "@/components/ui/toast";

export const toast = notify;

export function Toaster() {
  return <ToastToaster />;
}
