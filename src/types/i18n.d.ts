/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Messages } from "@/i18n/request";

declare module "next-intl" {
  interface IntlMessages extends Messages {}
}
