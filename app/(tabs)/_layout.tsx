// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Platform } from 'react-native'
import TabBarBackground from '../../components/ui/TabBarBackground'

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
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    height: Platform.OS === 'ios' ? 88 : 70,
                    paddingTop: 8,
                    paddingBottom: Platform.OS === 'ios' ? 34 : 10,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: -3,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 12,
                    elevation: 12,
                },
                tabBarBackground: () => <TabBarBackground />,
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
                name="profile" 
                options={{ 
                    title: 'Профиль',
                }} 
            />
        </Tabs>
    )
}