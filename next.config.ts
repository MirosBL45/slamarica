import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: `
      @use "@/styles/variables" as *;
      @use "@/styles/breakpoints" as *;
      @use "@/styles/mixins" as *;
    `,
  },
};

export default createNextIntlPlugin()(nextConfig);
