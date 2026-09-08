import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './Header';

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Header />
    <main className="mx-auto max-w-5xl px-4 py-6 sm:py-8">{children}</main>
    <Toaster
      position="bottom-center"
      toastOptions={{
        className:
          '!bg-white !text-gray-800 dark:!bg-gray-800 dark:!text-gray-100 dark:!shadow-black/40',
        style: { borderRadius: '10px', fontSize: '14px' },
        success: { iconTheme: { primary: '#4f46e5', secondary: '#fff' } },
      }}
    />
  </div>
);
