import "../styles/globals.css";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-icon">🌉</span>
            <span className="nav-logo-text">Avalanche Bridge</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">方案展示</Link>
            <Link href="/admin" className="nav-link">管理后台</Link>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
