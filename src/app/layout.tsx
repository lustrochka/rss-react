import React from 'react';
import '../index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Star Trek Astronomical Objects Search</title>
        <meta
          name="description"
          content="Explore and search for astronomical objects from the Star Trek universe."
        />
        <meta
          property="og:title"
          content="Star Trek Astronomical Objects Search"
        />
        <meta
          property="og:description"
          content="Explore and search for astronomical objects from the Star Trek universe."
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
