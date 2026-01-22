'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, Dropdown, Button, Drawer, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const screens = useBreakpoint();

  const [open, setOpen] = useState(false);

  const otherLocale = locale === 'sr' ? 'en' : 'sr';

  // menja samo prvi segment (locale)
  const switchLocalePath = `/${otherLocale}${pathname.replace(
    `/${locale}`,
    '',
  )}`;

  const menuItems = [
    {
      key: 'home',
      label: <Link href={`/${locale}`}>Home</Link>,
    },
    {
      key: 'household',
      label: <Link href={`/${locale}/household`}>Household</Link>,
    },
    {
      key: 'blog',
      label: <Link href={`/${locale}/blog`}>Blog</Link>,
    },
  ];

  const languageMenu = (
    <Menu
      items={[
        {
          key: 'switch',
          label: (
            <Link href={switchLocalePath}>{otherLocale.toUpperCase()}</Link>
          ),
        },
      ]}
    />
  );

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

          <Dropdown
            menu={{
              items: [
                {
                  key: 'switch',
                  label: (
                    <Link href={switchLocalePath}>
                      {otherLocale.toUpperCase()}
                    </Link>
                  ),
                },
              ],
            }}
            placement="bottomRight"
          >
            <Button>{locale.toUpperCase()}</Button>
          </Dropdown>
        </div>
      ) : (
        <>
          {/* MOBILE */}
          <Button icon={<MenuOutlined />} onClick={() => setOpen(true)} />

          <Drawer
            title="Menu"
            placement="left"
            onClose={() => setOpen(false)}
            open={open}
          >
            <Menu mode="vertical" items={menuItems} />

            <div style={{ marginTop: '1rem' }}>
              <Link href={switchLocalePath}>
                Promeni jezik ({otherLocale.toUpperCase()})
              </Link>
            </div>
          </Drawer>
        </>
      )}
    </div>
  );
}
