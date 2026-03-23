import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts = [] } = useToast();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 px-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`w-[calc(100vw-2rem)]
              max-w-[28rem]
              sm:max-w-[32rem]
              md:max-w-[36rem]
              lg:max-w-[40rem]
              rounded-xl
              px-4
              py-3
              shadow-xl
              bg-white
              border
              text-center
              ${
                toast.variant === "destructive"
                  ? "border-red-500 text-red-600"
                  : "border-gray-200 text-gray-900"
              }
            `}
          >
            {toast.title && (
              <div className="font-bold text-sm">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-sm mt-1">{toast.description}</div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

