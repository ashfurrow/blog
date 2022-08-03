import { theme } from 'config/theme'

export const topBarStyle = {
  mobile:
    `box-shadow: ${theme.colors.grey.extraLight} 0px 1px 8px;` +
    `border-bottom: ${theme.colors.grey.light} solid 1px`,
  default:
    `box-shadow: ${theme.colors.grey.extraLight} 0px 4px 8px;` +
    `border-bottom: ${theme.colors.grey.light} solid 1px`
}
