import { getRequestConfig } from 'next-intl/server';
import sr from './messages/sr.json';

// Definišemo tip na osnovu srpskog fajla
export type Messages = typeof sr;

export default getRequestConfig(async ({ locale }) => {
    const resolvedLocale = locale ?? 'sr';

    return {
        locale: resolvedLocale,
        messages: (await import(`./messages/${resolvedLocale}.json`)).default as Messages,
    };
});