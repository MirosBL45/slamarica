import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['sr', 'en'];
const DEFAULT_LOCALE = 'sr';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    const hasLocale = SUPPORTED_LOCALES.some(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    );

    if (!hasLocale) {
        const url = request.nextUrl.clone();
        url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};
