import { createAnimations } from '@tamagui/animations-react-native'
import { config as defaultConfig } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

const animations = createAnimations({
    bouncy: {
        type: 'spring',
        damping: 10,
        mass: 0.9,
        stiffness: 100,
    },
    lazy: {
        type: 'spring',
        damping: 20,
        stiffness: 60,
    },
    quick: {
        type: 'spring',
        damping: 20,
        mass: 1.2,
        stiffness: 250,
    },
})

const config = createTamagui({
    ...defaultConfig,
    animations,
    themeClassNameOnRoot: true,
})

export type Conf = typeof config

declare module 'tamagui' {
    interface TamaguiCustomConfig extends Conf {}
}

export default config