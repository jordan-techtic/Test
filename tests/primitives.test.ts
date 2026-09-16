import { Toast } from "@/components/ui/toast";
import { toast } from "@/components/ui/sonner";
import { SheetTrigger } from "@/components/ui/sheet";
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

describe("design-system primitives", () => {
  it("exports a Radix Toast root", () => {
    expect(Toast).toBeDefined();
  });

  it("exports a sonner toast helper", () => {
    expect(typeof toast.success).toBe("function");
    expect(typeof toast.error).toBe("function");
    expect(typeof toast.info).toBe("function");
  });

  it("exports complete sheet and drawer pieces", () => {
    expect(SheetTrigger).toBeDefined();
    expect(DrawerHeader).toBeDefined();
    expect(DrawerTitle).toBeDefined();
  });
});
