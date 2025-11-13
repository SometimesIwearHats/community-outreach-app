import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Community Outreach Meals",
  description: "Pay-it-forward meal service for neighbors in need.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body>
        {/* Shared header / navigation */}
        <header className="site-header">
          <div className="container nav">
            <div className="brand">
              <div className="logo" aria-hidden="true">
                🍽️
              </div>
              <strong>Community Outreach Meals</strong>
            </div>

            <nav className="nav-links" aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/service">Meal Service</Link>
            </nav>
          </div>
        </header>

        {/* Page-specific content */}
        {children}

        {/* Shared footer */}
        <footer className="site-footer">
          <div className="container foot">
            <div>© {year} Community Outreach Meals</div>
            <div className="foot-links">
              <Link href="/">Home</Link> · <Link href="/about">About</Link> ·{" "}
              <Link href="/contact">Contact</Link> ·{" "}
              <Link href="/service">Meal Service</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
