import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Button, XStack, YStack } from 'tamagui'
import { colors } from '../styles/colors'
import { tabBarStyles } from '../styles/tabBar'

interface Props {
    activeTab?: string
}

export default function BottomTabBar({ activeTab }: Props) {
    const router = useRouter()
    const tabs = [
        { id: 'home', icon: 'home-outline', activeIcon: 'home', route: '/(tabs)' as const },
        { id: 'news', icon: 'newspaper-outline', activeIcon: 'newspaper', route: '/(tabs)/news' as const },
        { id: 'search', icon: 'search-outline', activeIcon: 'search', route: '/(tabs)/search' as const },
        { id: 'scanner', icon: 'scan-outline', activeIcon: 'scan', route: '/(tabs)/scanner' as const },
        { id: 'appointments', icon: 'calendar-outline', activeIcon: 'calendar', route: '/(tabs)/appointments' as const },
        { id: 'profile', icon: 'person-outline', activeIcon: 'person', route: '/(tabs)/profile' as const }
    ]
    return (
        <YStack {...tabBarStyles.tabBar}>
            <XStack justifyContent="space-around" alignItems="center">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    const iconName = isActive ? tab.activeIcon : tab.icon
                    const size = 24
                    return (
                        <Button
                            key={tab.id}
                            flex={1}
                            backgroundColor="transparent"
                            borderWidth={0}
                            onPress={() => router.push(tab.route)}
                            paddingVertical={tabBarStyles.tabBarItem.paddingVertical}
                            pressStyle={{ scale: 0.95 }}
                        >
                            <YStack alignItems="center">
                                <Ionicons 
                                    name={iconName as any} 
                                    size={isActive ? size + 2 : size} 
                                    color={isActive ? colors.tabBar.active : colors.tabBar.inactive}
                                    style={isActive ? tabBarStyles.tabBarIconFocused : tabBarStyles.tabBarIcon}
                                />
                            </YStack>
                        </Button>
                    )
                })}
            </XStack>
        </YStack>
    )
} 