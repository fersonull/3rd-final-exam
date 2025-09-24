import { Toaster } from "@/components/ui/sonner";
import { toastClasses } from "@/lib/toast-definitions";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster
        toastOptions={{
          classNames: toastClasses,
        }}
      />
    </>
  );
}
