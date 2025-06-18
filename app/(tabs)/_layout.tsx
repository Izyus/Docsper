// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#8E8E93',
                tabBarLabelStyle: { 
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 2,
                },
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E5E5EA',
                    height: Platform.OS === 'ios' ? 88 : 70,
                    paddingTop: 8,
                    paddingBottom: Platform.OS === 'ios' ? 34 : 10,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 8,
                    ...Platform.select({
                        ios: { position: 'absolute' },
                        default: {},
                    }),
                },
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName: keyof typeof Ionicons.glyphMap

                    switch (route.name) {
                        case 'index':
                            iconName = focused ? 'home' : 'home-outline'
                            break
                        case 'news':
                            iconName = focused ? 'newspaper' : 'newspaper-outline'
                            break
                        case 'search':
                            iconName = focused ? 'search' : 'search-outline'
                            break
                        case 'scanner':
                            iconName = focused ? 'qr-code' : 'qr-code-outline'
                            break
                        case 'bookmarks':
                            iconName = focused ? 'bookmark' : 'bookmark-outline'
                            break
                        case 'profile':
                            iconName = focused ? 'person-circle' : 'person-circle-outline'
                            break
                        default:
                            iconName = 'apps-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
            })}
        >
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: 'Главная',
                    tabBarBadge: undefined,
                }} 
            />
            <Tabs.Screen 
                name="news" 
                options={{ 
                    title: 'Новости',
                    tabBarBadge: undefined,
                }} 
            />
            <Tabs.Screen 
                name="search" 
                options={{ 
                    title: 'Поиск',
                    tabBarBadge: undefined,
                }} 
            />
            <Tabs.Screen 
                name="scanner" 
                options={{ 
                    title: 'Сканер',
                    tabBarBadge: undefined,
                }} 
            />
            <Tabs.Screen 
                name="bookmarks" 
                options={{ 
                    title: 'Корзина',
                    tabBarBadge: 2, // количество товаров в корзине
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{ 
                    title: 'Профиль',
                    tabBarBadge: undefined,
                }} 
            />
        </Tabs>
    )
}