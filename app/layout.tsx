import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Inventory</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vw",
          }}
        >
          <div style={{ background: "red" }}>cc</div>

          {children}
        </div>
      </body>
    </html>
  );
}
