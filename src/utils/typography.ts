import Typography from 'typography'
import config from '../../config/SiteConfig'

const typography = new Typography({
  baseFontSize: config.baseFontSize,
  baseLineHeight: 1.66,
  scaleRatio: 2.5,
  headerFontFamily: [config.headerFontFamily, 'sans-serif'],
  bodyFontFamily: [config.bodyFontFamily, 'serif'],
  headerWeight: 700,
  googleFonts: [
    {
      name: config.headerFontFamily,
      styles: ['700']
    },
    {
      name: config.bodyFontFamily,
      styles: ['400']
    }
  ]
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
