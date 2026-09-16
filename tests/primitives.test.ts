import { Toast, Toaster as RadixToaster } from "@/components/ui/toast";
import { toast, Toaster } from "@/components/ui/sonner";
import { Command, CommandDialog } from "@/components/ui/command";
import { SheetTrigger } from "@/components/ui/sheet";
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

describe("design-system primitives", () => {
  it("exports a complete Radix toast module", () => {
    expect(Toast).toBeDefined();
    expect(RadixToaster).toBeDefined();
  });

  it("exports a complete sonner module", () => {
    expect(Toaster).toBeDefined();
    expect(typeof toast).toBe("function");
    expect(typeof toast.success).toBe("function");
    expect(typeof toast.error).toBe("function");
    expect(typeof toast.info).toBe("function");
    expect(typeof toast.dismiss).toBe("function");
  });

  it("exports a Radix-backed command dialog", () => {
    expect(Command).toBeDefined();
    expect(CommandDialog).toBeDefined();
  });

  it("exports complete sheet and drawer pieces", () => {
    expect(SheetTrigger).toBeDefined();
    expect(DrawerHeader).toBeDefined();
    expect(DrawerTitle).toBeDefined();
  });
});
