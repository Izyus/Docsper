import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import {
    Button,
    Card,
    Paragraph,
    ScrollView,
    Text,
    XStack,
    YStack
} from 'tamagui'

const scanOptions = [
    {
        id: 1,
        icon: 'qr-code-outline',
        title: 'QR-код лекарства',
        subtitle: 'Отсканируйте QR на упаковке',
        description: 'Получите информацию о препарате, аналогах и ценах',
        color: '#007AFF',
        available: true,
    },
    {
        id: 2,
        icon: 'document-text-outline',
        title: 'Рецепт врача',
        subtitle: 'Загрузите фото рецепта',
        description: 'Система распознает препараты и найдет их в аптеках',
        color: '#34C759',
        available: true,
    },
    {
        id: 3,
        icon: 'camera-outline',
        title: 'Упаковка препарата',
        subtitle: 'Сфотографируйте упаковку',
        description: 'ИИ определит название и найдет аналоги',
        color: '#FF9500',
        available: false,
    },
    {
        id: 4,
        icon: 'medical-outline',
        title: 'Состав лекарства',
        subtitle: 'Найти по активному веществу',
        description: 'Введите или отсканируйте состав препарата',
        color: '#5856D6',
        available: true,
    },
]

const recentScans = [
    {
        id: 1,
        name: 'Парацетамол',
        type: 'QR-код',
        date: '15 мин назад',
        result: 'Найдено 3 аналога',
    },
    {
        id: 2,
        name: 'Рецепт №12345',
        type: 'Документ',
        date: '2 часа назад',
        result: '5 препаратов распознано',
    },
]

export default function ScannerScreen() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <ScrollView backgroundColor="#fff">
            <YStack px={isMobile ? "$3" : "$4"} py={isMobile ? "$3" : "$4"} space="$4" pb="$24">
                
                {/* 🎯 Заголовок */}
                <Card
                    backgroundColor="#fff"
                    borderRadius="$6"
                    padding={isMobile ? "$4" : "$5"}
                    bordered
                    borderColor="$gray4"
                    shadowColor="$shadowColor"
                    shadowRadius={8}
                    shadowOpacity={0.1}
                >
                    <YStack space="$2" alignItems="center">
                        <YStack
                            width={isMobile ? 60 : 80}
                            height={isMobile ? 60 : 80}
                            backgroundColor="rgba(0, 122, 255, 0.1)"
                            borderRadius="$6"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Ionicons name="scan-outline" size={isMobile ? 32 : 40} color="#007AFF" />
                        </YStack>
                        <Text 
                            fontSize={isMobile ? "$6" : "$7"} 
                            fontWeight="900" 
                            color="#1C1C1E"
                            textAlign="center"
                        >
                            Умный сканер
                        </Text>
                        <Paragraph 
                            fontSize={isMobile ? "$3" : "$4"} 
                            color="#6B7280"
                            textAlign="center"
                            numberOfLines={isMobile ? 3 : undefined}
                        >
                            Сканируйте QR-коды, рецепты и упаковки лекарств для получения информации об аналогах и ценах
                        </Paragraph>
                    </YStack>
                </Card>

                {/* 📋 Способы сканирования */}
                <YStack space="$3">
                    <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                        Способы сканирования
                    </Text>
                    
                    <YStack space={isMobile ? "$2" : "$3"}>
                        {scanOptions.map((option) => (
                            <Card
                                key={option.id}
                                backgroundColor="#fff"
                                borderRadius="$6"
                                padding={isMobile ? "$3" : "$4"}
                                bordered
                                borderColor="$gray4"
                                pressStyle={{ scale: 0.98 }}
                                opacity={option.available ? 1 : 0.6}
                            >
                                <Button
                                    chromeless
                                    padding="$0"
                                    disabled={!option.available}
                                >
                                    <XStack alignItems="center" space={isMobile ? "$3" : "$4"} width="100%">
                                        <YStack
                                            width={isMobile ? 50 : 60}
                                            height={isMobile ? 50 : 60}
                                            backgroundColor={option.color + '15'}
                                            borderRadius="$5"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Ionicons 
                                                name={option.icon as any} 
                                                size={isMobile ? 24 : 28} 
                                                color={option.color} 
                                            />
                                        </YStack>

                                        <YStack flex={1} space="$1">
                                            <XStack alignItems="center" space="$2">
                                                <Text 
                                                    fontSize={isMobile ? "$4" : "$5"} 
                                                    fontWeight="700" 
                                                    color="#1C1C1E"
                                                >
                                                    {option.title}
                                                </Text>
                                                {!option.available && (
                                                    <Text 
                                                        fontSize={isMobile ? "$1" : "$2"} 
                                                        color="#FF9500"
                                                        backgroundColor="rgba(255, 149, 0, 0.1)"
                                                        px="$2"
                                                        py="$1"
                                                        borderRadius="$2"
                                                    >
                                                        Скоро
                                                    </Text>
                                                )}
                                            </XStack>
                                            <Text 
                                                fontSize={isMobile ? "$2" : "$3"} 
                                                color="#6B7280"
                                            >
                                                {option.subtitle}
                                            </Text>
                                            <Text 
                                                fontSize={isMobile ? "$2" : "$3"} 
                                                color="#8E8E93"
                                                numberOfLines={2}
                                            >
                                                {option.description}
                                            </Text>
                                        </YStack>

                                        <Ionicons 
                                            name="chevron-forward" 
                                            size={isMobile ? 16 : 20} 
                                            color="#C7C7CC" 
                                        />
                                    </XStack>
                                </Button>
                            </Card>
                        ))}
                    </YStack>
                </YStack>

                {/* 📖 Недавние сканирования */}
                {recentScans.length > 0 && (
                    <YStack space="$3">
                        <XStack justifyContent="space-between" alignItems="center">
                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                                Недавние сканирования
                            </Text>
                            <Button
                                size={isMobile ? "$2" : "$3"}
                                chromeless
                                pressStyle={{ scale: 0.96 }}
                            >
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#007AFF" fontWeight="600">
                                    Все
                                </Text>
                            </Button>
                        </XStack>

                        <Card
                            backgroundColor="#fff"
                            borderRadius="$6"
                            padding={isMobile ? "$3" : "$4"}
                            bordered
                            borderColor="$gray4"
                            shadowColor="$shadowColor"
                            shadowRadius={6}
                            shadowOpacity={0.1}
                        >
                            <YStack space="$3">
                                {recentScans.map((scan, index) => (
                                    <YStack key={scan.id}>
                                        <Button
                                            chromeless
                                            padding="$0"
                                            pressStyle={{ backgroundColor: '$gray2' }}
                                            borderRadius="$3"
                                        >
                                            <XStack alignItems="center" space={isMobile ? "$3" : "$4"} width="100%" p="$2">
                                                <YStack
                                                    width={isMobile ? 40 : 48}
                                                    height={isMobile ? 40 : 48}
                                                    backgroundColor="rgba(52, 199, 89, 0.1)"
                                                    borderRadius="$4"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Ionicons 
                                                        name="checkmark-circle-outline" 
                                                        size={isMobile ? 20 : 24} 
                                                        color="#34C759" 
                                                    />
                                                </YStack>

                                                <YStack flex={1}>
                                                    <Text 
                                                        fontSize={isMobile ? "$3" : "$4"} 
                                                        fontWeight="600" 
                                                        color="#1C1C1E"
                                                    >
                                                        {scan.name}
                                                    </Text>
                                                    <XStack alignItems="center" space="$2">
                                                        <Text 
                                                            fontSize={isMobile ? "$2" : "$3"} 
                                                            color="#6B7280"
                                                        >
                                                            {scan.type} • {scan.date}
                                                        </Text>
                                                    </XStack>
                                                    <Text 
                                                        fontSize={isMobile ? "$2" : "$3"} 
                                                        color="#34C759"
                                                    >
                                                        {scan.result}
                                                    </Text>
                                                </YStack>

                                                <Ionicons 
                                                    name="chevron-forward" 
                                                    size={isMobile ? 16 : 20} 
                                                    color="#C7C7CC" 
                                                />
                                            </XStack>
                                        </Button>
                                        {index < recentScans.length - 1 && (
                                            <YStack height={1} backgroundColor="$gray4" mx="$3" />
                                        )}
                                    </YStack>
                                ))}
                            </YStack>
                        </Card>
                    </YStack>
                )}

                {/* 💡 Быстрые действия */}
                <Card
                    backgroundColor="rgba(0, 122, 255, 0.05)"
                    borderRadius="$6"
                    padding={isMobile ? "$4" : "$5"}
                    borderWidth={1}
                    borderColor="rgba(0, 122, 255, 0.2)"
                >
                    <YStack space="$3" alignItems="center">
                        <Ionicons name="bulb-outline" size={isMobile ? 24 : 32} color="#007AFF" />
                        <Text 
                            fontSize={isMobile ? "$4" : "$5"} 
                            fontWeight="700" 
                            color="#007AFF"
                            textAlign="center"
                        >
                            Совет
                        </Text>
                        <Paragraph 
                            fontSize={isMobile ? "$2" : "$3"} 
                            color="#1C1C1E"
                            textAlign="center"
                        >
                            Для лучшего результата убедитесь, что QR-код или текст хорошо освещены и находятся в фокусе камеры
                        </Paragraph>
                    </YStack>
                </Card>
            </YStack>
        </ScrollView>
    )
}