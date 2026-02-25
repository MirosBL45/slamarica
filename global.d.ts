import { Messages } from './i18n/request';

// declare global {
//     // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//   interface IntlMessages extends Messages {}
// }

declare global {
  type IntlMessages = Messages;
}