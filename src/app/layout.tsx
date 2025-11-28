import Header from "@/components/header";
import QueryProvider from "@/lib/query-provider";
import ThemeRegistry from "@/theme/theme-registry";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <ThemeRegistry>
            <Header />
            <main>{children}</main>
          </ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
