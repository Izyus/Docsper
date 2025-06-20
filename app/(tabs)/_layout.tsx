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
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                    marginBottom: 2,
                },
                tabBarItemStyle: {
                    paddingVertical: 4,
                },
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E5E5EA',
                    height: Platform.OS === 'ios' ? 88 : 70,
                    paddingTop: 8,
                    paddingBottom: Platform.OS === 'ios' ? 34 : 10,
                    position: 'fixed' as any,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    visibility: 'visible',
                    opacity: 1,
                    transform: 'translateY(0)',
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
                            iconName = focused ? 'scan' : 'scan-outline'
                            break
                        case 'appointments':
                            iconName = focused ? 'calendar' : 'calendar-outline'
                            break
                        case 'profile':
                            iconName = focused ? 'person' : 'person-outline'
                            break
                        default:
                            iconName = 'apps-outline'
                    }

                    return (
                        <Ionicons 
                            name={iconName} 
                            size={focused ? size + 2 : size} 
                            color={color}
                            style={{
                                marginTop: focused ? -2 : 0,
                                transform: focused ? [{ scale: 1.1 }] : [{ scale: 1 }],
                            }}
                        />
                    )
                },
            })}
        >
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: 'Главная',
                }} 
            />
            <Tabs.Screen 
                name="news" 
                options={{ 
                    title: 'Новости',
                }} 
            />
            <Tabs.Screen 
                name="search" 
                options={{ 
                    title: 'Поиск',
                }} 
            />
            <Tabs.Screen 
                name="scanner" 
                options={{ 
                    title: 'Сканер',
                }} 
            />
            <Tabs.Screen 
                name="appointments" 
                options={{ 
                    title: 'Запись',
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{ 
                    title: 'Профиль',
                }} 
            />
        </Tabs>
    )
}