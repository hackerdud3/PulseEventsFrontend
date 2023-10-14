import './globals.css';
import { Inter } from 'next/font/google';

import { Metadata } from 'next';
import AuthProvider from '../Contexts/Auth';
import NavBar from '../Components/nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pulse Events'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-50 h-full">
      <body
        className={`${inter.className} flex h-full w-full justify-start items-start flex-col`}
      >
        <AuthProvider>
          <NavBar />
          <div className="w-full h-full flex flex-col items-center">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
