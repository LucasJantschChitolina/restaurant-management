import { createTamagui } from 'tamagui'
import { config } from '@tamagui/config/v3'

const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      background: '#F3F4F6',
      color: '#212427'
    },
    dark: {
      ...config.themes.dark,
      background: '#000000',
      color: '#ffffff'
    }
  },
  defaultTheme: 'light'
})

export type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

export default tamaguiConfig 