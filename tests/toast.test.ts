import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
  toast,
} from "@/components/ui/toast";
import { Toaster as SonnerToaster, toast as sonnerToast } from "@/components/ui/sonner";

describe("toast primitive", () => {
  it("exposes Radix compound parts including Toaster", () => {
    expect(Toast).toBeDefined();
    expect(ToastProvider).toBeDefined();
    expect(ToastViewport).toBeDefined();
    expect(ToastTitle).toBeDefined();
    expect(ToastDescription).toBeDefined();
    expect(ToastClose).toBeDefined();
    expect(ToastAction).toBeDefined();
    expect(Toaster).toBeDefined();
  });

  it("exposes variant helpers and dismiss", () => {
    expect(typeof toast.success).toBe("function");
    expect(typeof toast.error).toBe("function");
    expect(typeof toast.info).toBe("function");
    expect(typeof toast.dismiss).toBe("function");
  });

  it("exports toast and Toaster from sonner module", () => {
    expect(typeof sonnerToast).toBe("function");
    expect(typeof sonnerToast.success).toBe("function");
    expect(typeof sonnerToast.error).toBe("function");
    expect(SonnerToaster).toBeDefined();
  });
});
