import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import {
    Card,
    ScrollView,
    Text,
    XStack,
    YStack
} from 'tamagui'
import TabHeader from '../../components/ui/TabHeader'

const scanOptions = [
    {
        id: 1,
        icon: 'qr-code-outline',
        title: 'QR-код',
        subtitle: 'Сканировать QR-код',
        description: 'Отсканируйте QR-код на упаковке или рецепте',
        color: '#007AFF',
        available: true,
        onPress: () => {}
    },
    {
        id: 2,
        icon: 'camera-outline',
        title: 'Камера',
        subtitle: 'Сканировать текст',
        description: 'Распознавание текста с помощью камеры',
        color: '#34C759',
        available: true,
        onPress: () => {}
    },
    {
        id: 3,
        icon: 'image-outline',
        title: 'Галерея',
        subtitle: 'Загрузить фото',
        description: 'Выберите фото из галереи',
        color: '#FF9500',
        available: true,
        onPress: () => {}
    }
]

export default function ScannerScreen() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <ScrollView backgroundColor="#f8f9fa">
            <YStack px={isMobile ? "$3" : "$4"} py="$4" space="$4">
                <TabHeader 
                    icon="qr-code"
                    title="Сканер лекарств"
                    subtitle="Быстрый поиск информации по штрих-коду"
                    accentColor="#34C759"
                    stats={[
                        {
                            value: "1,234",
                            label: "Сканирований",
                            color: "#34C759"
                        },
                        {
                            value: "98%",
                            label: "Точность",
                            color: "#007AFF"
                        },
                        {
                            value: "24/7",
                            label: "Доступность",
                            color: "#FF9500"
                        }
                    ]}
                />

                {/* Опции сканирования */}
                <YStack space="$3">
                    {scanOptions.map((option) => (
                        <Card
                            key={option.id}
                            backgroundColor="#fff"
                            borderRadius="$5"
                            padding={isMobile ? "$3" : "$4"}
                            bordered
                            borderColor="$gray4"
                            pressStyle={{ scale: 0.98 }}
                            onPress={option.onPress}
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

                                <YStack flex={1}>
                                    <Text 
                                        fontSize={isMobile ? "$4" : "$5"} 
                                        fontWeight="700" 
                                        color="#1C1C1E"
                                    >
                                        {option.title}
                                    </Text>
                                    <Text 
                                        fontSize={isMobile ? "$2" : "$3"} 
                                        color="#6B7280"
                                    >
                                        {option.description}
                                    </Text>
                                </YStack>

                                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                            </XStack>
                        </Card>
                    ))}
                </YStack>
            </YStack>
        </ScrollView>
    )
}