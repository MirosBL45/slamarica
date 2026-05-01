"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

import { GlobalOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Grid } from "antd";

import { ActionLink } from "@/components/ui";
import { route } from "@/utils/route";
import { Locale, SUPPORTED_LOCALES } from "@/lib/types/i18n";

import styles from "./Navbar.module.scss";

const { useBreakpoint } = Grid;

const FLAGS: Record<string, string> = {
  sr: "🇷🇸",
  en: "🇬🇧",
  es: "🇪🇸",
  de: "🇩🇪",
};

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  const t = useTranslations("navbarLayout");
  const r = route(locale);

  const screens = useBreakpoint();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 NOVA FUNKCIJA (bez reload-a)
  const changeLanguage = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    const pathWithoutLocale = pathname.replace(/^\/(sr|en|de|es)/, "");

    const newPath = `/${nextLocale}${pathWithoutLocale || ""}`;

    router.replace(newPath, { scroll: false });
  };

  const navLinks = [
    {
      label: t("home"),
      href: `/${locale}`,
    },
    {
      label: t("household"),
      href: r.household.index,
    },
    {
      label: t("articles"),
      href: r.articles,
    },
  ];

  // 🔥 DROPDOWN BEZ LINKOVA
  const languageItems = SUPPORTED_LOCALES.map((lng) => ({
    key: lng,
    label: `${FLAGS[lng]} ${lng.toUpperCase()}`,
  }));

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}`;
    }
    return pathname.startsWith(href);
  };

  function handleLogout() {
    signOut({
      callbackUrl: `/${locale}/login`,
    });
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.container}>
        {/* LOGO */}
        <Link href={`/${locale}`} className={styles.logo}>
          <div className={styles.icon}>✦</div>
          Slamarica
        </Link>

        {/* DESKTOP */}
        {screens.lg ? (
          <div className={styles.desktopNav}>
            <nav className={styles.links}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.link} ${isActive(link.href) ? styles.active : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className={styles.actions}>
              <Dropdown
                menu={{
                  items: languageItems,
                  onClick: ({ key }) => changeLanguage(key as Locale),
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button className={styles.langBtn}>
                  <GlobalOutlined />
                  {FLAGS[locale]} {locale.toUpperCase()}
                </Button>
              </Dropdown>

              {status === "authenticated" ? (
                <Button className={styles.loginBtn} onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <ActionLink variant="outline" href={r.login} className={styles.loginBtn}>
                  {t("login")}
                </ActionLink>
              )}
            </div>
          </div>
        ) : (
          <>
            <Button icon={<MenuOutlined />} onClick={() => setOpen(true)} />

            <Drawer
              placement="left"
              open={open}
              onClose={() => setOpen(false)}
              size={280}
              rootClassName={styles.drawer}
              classNames={{
                header: styles.drawerHeader,
                body: styles.drawerBody,
              }}
              title={
                <div className={styles.drawerTitle}>
                  <div className={styles.icon}>✦</div>
                  Slamarica
                </div>
              }
            >
              <div className={styles.mobileNav}>
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeDrawer}
                    className={`${styles.mobileLink} ${
                      isActive(link.href) ? styles.mobileActive : ""
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* 🔥 MOBILE LANGUAGE (BEZ LINK) */}
                <div className={styles.mobileLanguages}>
                  {SUPPORTED_LOCALES.map((lng, index) => (
                    <button
                      key={lng}
                      style={{
                        cursor: "pointer",
                        animationDelay: `${(navLinks.length + index) * 0.05}s`,
                      }}
                      onClick={() => {
                        changeLanguage(lng as Locale);
                        closeDrawer();
                      }}
                    >
                      {FLAGS[lng]} {lng.toUpperCase()}
                    </button>
                  ))}
                </div>

                {status === "authenticated" ? (
                  <Button
                    className={styles.mobileLogin}
                    onClick={() => {
                      closeDrawer();
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <ActionLink
                    variant="outline"
                    href={r.login}
                    onClick={closeDrawer}
                    className={styles.mobileLogin}
                  >
                    {t("login")}
                  </ActionLink>
                )}
              </div>
            </Drawer>
          </>
        )}
      </div>
    </header>
  );
}
