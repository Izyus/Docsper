import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config/v3'

const config = createTamagui({
    ...defaultConfig,
    themeClassNameOnRoot: true,
})

export type Conf = typeof config

declare module 'tamagui' {
    interface TamaguiCustomConfig extends Conf {}
}

export default config