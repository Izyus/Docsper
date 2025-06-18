import { Slot } from 'expo-router'
import { TamaguiProvider, YStack, View } from 'tamagui'
import config from '../tamagui.config'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { useState } from 'react'
import SearchBar from '../components/SearchBar'

export default function RootLayout() {
    const [isSearchActive, setIsSearchActive] = useState(false)

    return (
        <Provider store={store}>
            <TamaguiProvider config={config}>
                <YStack f={1} bg="$background">
                    {/* Поисковая строка */}
                    <YStack zIndex={10} px="$4" py="$2" bg="$background">
                        <SearchBar
                            onFocus={() => setIsSearchActive(true)}
                            onBlur={() => setIsSearchActive(false)}
                        />
                    </YStack>

                    {/* Затемнение контента */}
                    {isSearchActive && (
                        <View
                            position="absolute"
                            top={60}
                            left={0}
                            right={0}
                            bottom={0}
                            bg="rgba(0,0,0,0.3)"
                            zIndex={5}
                            onPress={() => setIsSearchActive(false)}
                            pointerEvents="auto"
                        />
                    )}

                    {/* Основной контент приложения */}
                    <YStack f={1} zIndex={0}>
                        <Slot />
                    </YStack>
                </YStack>
            </TamaguiProvider>
        </Provider>
    )
}