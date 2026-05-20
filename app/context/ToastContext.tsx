import { createContext, useContext, useState, type ReactNode } from 'react';

type Toast = { id: number; message: string };

const ToastContext = createContext<{
  toasts: Toast[];
  push: (message: string) => void;
} | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = (message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ toasts, push }}>
      {children}
      <div style={{ position: 'fixed', top: 12, right: 12, zIndex: 1060 }}>
        {toasts.map((t) => (
          <div key={t.id} className="toast show bg-dark text-white mb-2" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
