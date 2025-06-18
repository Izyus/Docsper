import { Slot, usePathname } from 'expo-router'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { TamaguiProvider, View, YStack } from 'tamagui'
import SearchBar from '../components/SearchBar'
import { store } from '../redux/store'
import config from '../tamagui.config'

export default function RootLayout() {
    const [isSearchActive, setIsSearchActive] = useState(false)
    const pathname = usePathname()
    
    // Показывать кнопки Лайк и Шаринг только на страницах лекарств и новостей
    const showActionButtons = pathname.includes('/medicine/') || pathname.includes('/blog/')

    return (
        <Provider store={store}>
            <TamaguiProvider config={config}>
                <YStack f={1} bg="$background">
                    {/* Поисковая строка */}
                    <YStack zIndex={10} px="$4" py="$2" bg="$background">
                        <SearchBar
                            onFocus={() => setIsSearchActive(true)}
                            onBlur={() => setIsSearchActive(false)}
                            showActionButtons={showActionButtons}
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