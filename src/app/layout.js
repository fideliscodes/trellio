
import "./globals.css";
import Header from "./Trolico/Header";


export const metadata = {
  title: "Trellio",
  description: "a DEF and Disel fuel solution company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Header/>
        {children}
      </body>
    </html>
  );
}
