import { createTamagui } from 'tamagui'
import { config } from '@tamagui/config/v3'

const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      background: '#ffffff',
      color: '#000000'
    },
    dark: {
      ...config.themes.dark,
      background: '#000000',
      color: '#ffffff'
    }
  },
  defaultTheme: 'dark'
})

export type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig 