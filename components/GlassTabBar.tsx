import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import React from 'react'
import { Platform, View } from 'react-native'
import {
    Button,
    XStack,
    YStack
} from 'tamagui'

interface Props {
    activeTab?: string
}

export default function GlassTabBar({ activeTab }: Props) {
    const router = useRouter()

    const tabs = [
        {
            id: 'home',
            icon: 'home-outline',
            activeIcon: 'home',
            route: '/(tabs)' as const
        },
        {
            id: 'news',
            icon: 'newspaper-outline',
            activeIcon: 'newspaper',
            route: '/(tabs)/news' as const
        },
        {
            id: 'search',
            icon: 'search-outline',
            activeIcon: 'search',
            route: '/(tabs)/search' as const
        },
        {
            id: 'scanner',
            icon: 'scan-outline',
            activeIcon: 'scan',
            route: '/(tabs)/scanner' as const
        },
        {
            id: 'appointments',
            icon: 'calendar-outline',
            activeIcon: 'calendar',
            route: '/(tabs)/appointments' as const
        },
        {
            id: 'profile',
            icon: 'person-outline',
            activeIcon: 'person',
            route: '/(tabs)/profile' as const
        }
    ]

    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: Platform.OS === 'ios' ? 88 : 70,
                borderTopWidth: 1,
                borderTopColor: 'rgba(229, 229, 234, 0.3)',
            }}
        >
            <BlurView
                intensity={20}
                tint="light"
                style={{
                    flex: 1,
                    paddingTop: 8,
                    paddingBottom: Platform.OS === 'ios' ? 34 : 10,
                }}
            >
                <XStack justifyContent="space-around" alignItems="center" flex={1}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id
                        const iconName = isActive ? tab.activeIcon : tab.icon
                        const iconColor = isActive ? '#007AFF' : '#8E8E93'
                        const size = 24
                        
                        return (
                            <Button
                                key={tab.id}
                                flex={1}
                                backgroundColor="transparent"
                                borderWidth={0}
                                onPress={() => router.push(tab.route)}
                                paddingVertical={4}
                                pressStyle={{ scale: 0.95 }}
                            >
                                <YStack alignItems="center">
                                    <Ionicons 
                                        name={iconName as any} 
                                        size={isActive ? size + 2 : size} 
                                        color={iconColor}
                                        style={{
                                            marginTop: isActive ? -2 : 0,
                                            transform: isActive ? [{ scale: 1.1 }] : [{ scale: 1 }],
                                        }}
                                    />
                                </YStack>
                            </Button>
                        )
                    })}
                </XStack>
            </BlurView>
        </View>
    )
} 