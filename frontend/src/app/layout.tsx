import { GeistSans } from "geist/font/sans";
import "@app/styles/globals.css";
import "@app/styles/prosemirror.css";
import NavDrawer from "@components/Layout/Drawer/NavDrawer";
import ThemeProvider from "@components/Providers/ThemeProvider";
import ReactQueryProvider from "@components/Providers/ReactQueryProvider";

export const metadata = {
  title: "CRAB",
  description: "The fastest way to arrive your destination.",
  keywords: "bike, mooving, car, cheap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`light ${GeistSans.className}`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <ReactQueryProvider>
            <main className="mx-auto flex min-h-screen w-full max-w-[2200px] flex-col items-center overflow-hidden">
              {children}
              <NavDrawer />
            </main>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
