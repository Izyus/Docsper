import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import {
    Card,
    Text,
    XStack,
    YStack,
} from 'tamagui'

interface TabHeaderProps {
    icon: keyof typeof Ionicons.glyphMap
    title: string
    subtitle: string
    stats?: Array<{
        value: string
        label: string
        color: string
    }>
    accentColor?: string
}

export default function TabHeader({
    icon,
    title,
    subtitle,
    stats,
    accentColor = '#007AFF'
}: TabHeaderProps) {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <Card
            backgroundColor="#fff"
            borderRadius="$6"
            padding={isMobile ? "$4" : "$5"}
            bordered
            borderColor={`rgba(${accentColor.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.3)`}
            shadowColor="$shadowColor"
            shadowRadius={12}
            shadowOpacity={0.15}
        >
            <YStack space="$4">
                {/* Заголовок с иконкой */}
                <XStack alignItems="center" space="$3">
                    <YStack
                        width={isMobile ? 60 : 80}
                        height={isMobile ? 60 : 80}
                        backgroundColor={`${accentColor}15`}
                        borderRadius="$6"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Ionicons name={icon} size={isMobile ? 28 : 36} color={accentColor} />
                    </YStack>
                    <YStack flex={1}>
                        <Text 
                            fontSize={isMobile ? "$6" : "$7"} 
                            fontWeight="900" 
                            color="#1C1C1E"
                        >
                            {title}
                        </Text>
                        <Text 
                            fontSize={isMobile ? "$3" : "$4"} 
                            color="#6B7280"
                            mt="$1"
                        >
                            {subtitle}
                        </Text>
                    </YStack>
                </XStack>

                {/* Статистика (если есть) */}
                {stats && (
                    <XStack space={isMobile ? "$3" : "$4"} justifyContent="space-around">
                        {stats.map((stat, index) => (
                            <YStack key={index} alignItems="center">
                                <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="900" color={stat.color}>
                                    {stat.value}
                                </Text>
                                <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280" textAlign="center">
                                    {stat.label}
                                </Text>
                            </YStack>
                        ))}
                    </XStack>
                )}
            </YStack>
        </Card>
    )
} 