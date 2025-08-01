
import "./globals.css";
import Header from "./Trolico/Header";


export const metadata = {
  title: "Trellio",
  description: "Full-Service DEF And Diesel Fuel Solutions",
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
