import Theme from 'config/Theme'

export const topBarStyle = {
  mobile:
    `box-shadow: ${Theme.colors.grey.extraLight} 0px 1px 8px;` +
    `border-bottom: ${Theme.colors.grey.light} solid 1px`,
  default:
    `box-shadow: ${Theme.colors.grey.extraLight} 0px 4px 8px;` +
    `border-bottom: ${Theme.colors.grey.light} solid 1px`
}
