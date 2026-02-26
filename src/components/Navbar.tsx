'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, Dropdown, Button, Drawer, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { SUPPORTED_LOCALES } from "@/lib/types/i18n";

const { useBreakpoint } = Grid;

// const supportedLocales = ['sr', 'en', 'es', 'de'];

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const screens = useBreakpoint();

  const [open, setOpen] = useState(false);

  const getLocalePath = (newLocale: string) => {
    return `/${newLocale}${pathname.replace(`/${locale}`, '')}`;
  };

  const menuItems = [
    {
      key: 'home',
      label: <Link href={`/${locale}`}>{t('home')}</Link>,
    },
    {
      key: 'household',
      label: <Link href={`/${locale}/household`}>{t('household')}</Link>,
    },
    {
      key: 'blog',
      label: <Link href={`/${locale}/blog`}>{t('blog')}</Link>,
    },
  ];

  const languageItems = SUPPORTED_LOCALES.map((lng) => ({
    key: lng,
    label: <Link href={getLocalePath(lng)}>{lng.toUpperCase()}</Link>,
  }));

  return (
    <div
      style={{
        padding: '0 1rem',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4rem',
      }}
    >
      <div style={{ fontWeight: 600 }}>Slamarica</div>

      {/* DESKTOP */}
      {screens.md ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Menu mode="horizontal" items={menuItems} />

          <Dropdown menu={{ items: languageItems }} placement="bottomRight">
            <Button>{locale.toUpperCase()}</Button>
          </Dropdown>
        </div>
      ) : (
        <>
          <Button icon={<MenuOutlined />} onClick={() => setOpen(true)} />

          <Drawer
            title={t('menu')}
            placement="left"
            onClose={() => setOpen(false)}
            open={open}
          >
            <Menu mode="vertical" items={menuItems} />

            <div style={{ marginTop: '1rem' }}>
              {SUPPORTED_LOCALES.map((lng) => (
                <div key={lng}>
                  <Link href={getLocalePath(lng)}>{lng.toUpperCase()}</Link>
                </div>
              ))}
            </div>
          </Drawer>
        </>
      )}
    </div>
  );
}
