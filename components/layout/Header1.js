import Link from "next/link"
import ThemeSwitch from "../elements/ThemeSwitch"
import Menu from "./Menu"
import { useEffect, useState } from "react";
import { useTheme } from 'next-themes';

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSidebar, handleSidebar, isSearch, handleSearch }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/session").then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    });
  }, []);

  const { theme } = useTheme();

  const handleLogout = () => {
    window.location.href = '/logout';
  };
  return (
    <>
      <header className="main-header transparent">
        <div className="top-bar">
          <div className="container">
            <div className="top-bar-wrap">
              <div className="top-bar-left">
                <h4 className="link-title"><span>Quick Links:</span></h4>
                <ul>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/contact">Contact us</Link></li>
                  <li><Link href="/single-post-1">Latest News</Link></li>
                </ul>
              </div>
              <div className="top-bar-right">
                <span className="date"><i className="las la-calendar" />Saturday , 20 May 2024</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mid-header">
          <div className="container">
            <div className="mid-header-wrap">
              <div className="mid-header-left">
                <ul className="header-social">
                  <li>
                    <Link href="/#" className="facebook"><i className="lab la-facebook-f" /></Link>
                  </li>
                  <li>
                    <Link href="/#" className="twitter"><i className="lab la-twitter" /></Link>
                  </li>
                  <li>
                    <Link href="/#" className="instagram"><i className="lab la-instagram" /></Link>
                  </li>
                  <li>
                    <Link href="/#" className="linkedin"><i className="lab la-linkedin-in" /></Link>
                  </li>
                  <li>
                    <Link href="/#" className="pinterest"><i className="lab la-pinterest-p" /></Link>
                  </li>
                </ul>
              </div>
              <div className="site-logo">
                <Link href="/">
                  <img className="logo-dark" src="/assets/img/logo/logo-dark-2.png" alt="logo" />
                  <img className="logo-light" src="/assets/img/logo/logo-dark.png" alt="logo" />
                </Link>
              </div>
              <div className="mid-header-right" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Link href="/register" className="default-btn header-btn">Join us</Link>
                {!user ? (
                  <Link href="/login" className="default-btn header-btn" style={{ background: '#eee', color: '#222' }}>Login</Link>
                ) : (
                  <>
                    <span style={{ marginLeft: 8, color: theme === 'dark' ? '#fff' : '#222', fontWeight: 500 }}>Welcome, {user.name || user.email}</span>
                    <Link href="/author-details" className="user" style={{ marginLeft: 4 }}><i className="las la-user" /></Link>
                    <button
                      onClick={handleLogout}
                      title="Log out"
                      style={{
                        background: 'none',
                        border: 'none',
                        marginLeft: 4,
                        cursor: 'pointer',
                        color: theme === 'dark' ? '#fff' : '#222',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 20
                      }}
                    >
                      <i className="las la-power-off" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`${scroll ? "sticky-header sticky-fixed-top" : ""} `}>
          <div className="bottom-header">
            <div className="container">
              <div className="navigation-wrapper">
                <div className="navigation-inner">
                  <div className="sidebar-icon">
                    <button className="sidebar-trigger open" onClick={handleSidebar}>
                      <span />
                      <span />
                      <span />
                    </button>
                  </div>
                  <div className="site-logo">
                    <Link className="light" href="/"><img src="/assets/img/logo/logo-dark.png" alt="logo " /></Link>
                    <Link className="dark" href="/"><img src="/assets/img/logo/logo-light.png" alt="logo " /></Link>
                  </div>
                  <nav className="navigation-menu">
                    <Menu />
                  </nav>
                  <div className="header-right">
                    <ThemeSwitch />
                    <div className="search-icon dl-search-icon" onClick={handleSearch}>
                      <i className="las la-search" />
                    </div>
                    <div className="mobile-menu-icon" onClick={handleMobileMenu}>
                      <div className="burger-menu">
                        <div className="line-menu line-half first-line" />
                        <div className="line-menu" />
                        <div className="line-menu line-half last-line" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <HeaderAuthBtn /> */}
    </>
  )
}
