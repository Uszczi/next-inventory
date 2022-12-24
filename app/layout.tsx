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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh",
            backgroundColor: "#282f44",
          }}
        >
          <div className="h-[4vh] border-b-2"></div>
          {children}
          <div className="h-[4vh] border-t-2"></div>
        </div>
      </body>
    </html>
  );
}
