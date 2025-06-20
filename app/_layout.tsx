import { Slot, usePathname } from 'expo-router'
import { useEffect, useState } from 'react'
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

    // Принудительное отображение нижнего меню в веб-версии
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const forceShowTabBar = () => {
                const tabBar = document.querySelector('[data-testid="tab-bar"]') || 
                              document.querySelector('[role="tablist"]') ||
                              document.querySelector('.expo-tab-bar');
                
                if (tabBar) {
                    (tabBar as HTMLElement).style.position = 'fixed';
                    (tabBar as HTMLElement).style.bottom = '0';
                    (tabBar as HTMLElement).style.left = '0';
                    (tabBar as HTMLElement).style.right = '0';
                    (tabBar as HTMLElement).style.zIndex = '1000';
                    (tabBar as HTMLElement).style.display = 'flex';
                    (tabBar as HTMLElement).style.visibility = 'visible';
                    (tabBar as HTMLElement).style.opacity = '1';
                    (tabBar as HTMLElement).style.transform = 'translateY(0)';
                }
            };

            // Выполняем сразу и через небольшую задержку
            forceShowTabBar();
            setTimeout(forceShowTabBar, 100);
            setTimeout(forceShowTabBar, 500);
            setTimeout(forceShowTabBar, 1000);

            // Наблюдаем за изменениями в DOM
            const observer = new MutationObserver(forceShowTabBar);
            observer.observe(document.body, { childList: true, subtree: true });

            return () => observer.disconnect();
        }
    }, [pathname]);

    return (
        <Provider store={store}>
            <TamaguiProvider config={config}>
                <YStack f={1} bg="$background">
                    {/* CSS стили для веб-версии */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                            /* Принудительное отображение нижнего меню */
                            [data-testid="tab-bar"],
                            [role="tablist"],
                            .expo-tab-bar,
                            nav[role="tablist"],
                            div[role="tablist"],
                            .tabs,
                            .tab-bar {
                                position: fixed !important;
                                bottom: 0 !important;
                                left: 0 !important;
                                right: 0 !important;
                                z-index: 9999 !important;
                                display: flex !important;
                                visibility: visible !important;
                                opacity: 1 !important;
                                transform: translateY(0) !important;
                                background-color: #FFFFFF !important;
                                border-top: 1px solid #E5E5EA !important;
                                height: 88px !important;
                                padding-top: 8px !important;
                                padding-bottom: 34px !important;
                            }
                            
                            /* Скрываем стандартное меню если оно дублируется */
                            .expo-tab-bar + .expo-tab-bar {
                                display: none !important;
                            }
                            
                            /* Отступ для контента */
                            body {
                                padding-bottom: 120px !important;
                            }
                            
                            /* Медиа-запрос для мобильных устройств */
                            @media (max-width: 768px) {
                                [data-testid="tab-bar"],
                                [role="tablist"],
                                .expo-tab-bar,
                                nav[role="tablist"],
                                div[role="tablist"],
                                .tabs,
                                .tab-bar {
                                    height: 70px !important;
                                    padding-bottom: 10px !important;
                                }
                                
                                body {
                                    padding-bottom: 100px !important;
                                }
                            }
                        `
                    }} />
                    
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