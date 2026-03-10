"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { Drawer, Dropdown, Button, Grid } from "antd";
import { MenuOutlined, GlobalOutlined } from "@ant-design/icons";

import styles from "./Navbar.module.scss";

import { ActionLink } from "@/components/ui";
import { SUPPORTED_LOCALES } from "@/lib/types/i18n";

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
  const t = useTranslations("navbar");

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

  const getLocalePath = (lng: string) => {
    return `/${lng}${pathname.replace(`/${locale}`, "")}`;
  };

  const navLinks = [
    {
      label: t("home"),
      href: `/${locale}`,
    },
    {
      label: t("household"),
      href: `/${locale}/household`,
    },
    {
      label: t("blog"),
      href: `/${locale}/blog`,
    },
  ];

  const languageItems = SUPPORTED_LOCALES.map((lng) => ({
    key: lng,
    label: (
      <Link href={getLocalePath(lng)} onClick={closeDrawer}>
        {FLAGS[lng]} {lng.toUpperCase()}
      </Link>
    ),
  }));

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
    >
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
                  className={`${styles.link} ${
                    isActive(link.href) ? styles.active : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className={styles.actions}>
              <Dropdown
                menu={{ items: languageItems }}
                trigger={["hover"]}
                placement="bottomRight"
              >
                <Button className={styles.langBtn}>
                  <GlobalOutlined />
                  {FLAGS[locale]} {locale.toUpperCase()}
                </Button>
              </Dropdown>

              <ActionLink
                variant="outline"
                href={`/${locale}/login`}
                className={styles.loginBtn}
              >
                {t("login")}
              </ActionLink>
            </div>
          </div>
        ) : (
          <>
            <Button icon={<MenuOutlined />} onClick={() => setOpen(true)} />

            <Drawer
              placement="left"
              open={open}
              onClose={() => setOpen(false)}
              title="Menu"
            >
              <div className={styles.mobileNav}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeDrawer}
                    className={`${styles.mobileLink} ${
                      isActive(link.href) ? styles.mobileActive : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className={styles.mobileLanguages}>
                  {SUPPORTED_LOCALES.map((lng) => (
                    <Link
                      key={lng}
                      href={getLocalePath(lng)}
                      onClick={closeDrawer}
                    >
                      {FLAGS[lng]} {lng.toUpperCase()}
                    </Link>
                  ))}
                </div>

                <ActionLink
                  variant="outline"
                  href={`/${locale}/login`}
                  onClick={closeDrawer}
                  className={styles.mobileLogin}
                >
                  {t("login")}
                </ActionLink>
              </div>
            </Drawer>
          </>
        )}
      </div>
    </header>
  );
}
