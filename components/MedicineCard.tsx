import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Dimensions } from 'react-native'
import { Button, Card, Image, Text, XStack, YStack } from 'tamagui'
import { Medicine } from '../redux/medicinesSlice'

interface Props {
    medicine: Medicine
    proMode?: boolean
}

export default function MedicineCard({ medicine, proMode = false }: Props) {
    const router = useRouter()
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    const goToDetails = () => {
        router.push({
            pathname: '/medicine/[id]' as const,
            params: { id: medicine.id },
        })
    }

    return (
        <Card
            bordered
            backgroundColor="#fff"
            borderRadius="$4"
            pressStyle={{ scale: 0.98 }}
            width="100%"
            padding={isMobile ? "$2" : "$3"}
            borderColor="$gray4"
            shadowColor="$shadowColor"
            shadowRadius={4}
            shadowOpacity={0.05}
        >
            <YStack space={isMobile ? "$2" : "$3"}>
                {/* 📸 Верхняя секция — картинка с индикаторами */}
                <YStack
                    width="100%"
                    height={isMobile ? 80 : 100}
                    backgroundColor="$gray2"
                    borderRadius="$3"
                    justifyContent="center"
                    alignItems="center"
                    overflow="hidden"
                    position="relative"
                >
                    <Ionicons name="image-outline" size={isMobile ? 24 : 28} color="#999" />
                    {medicine.image && (
                        <Image
                            source={{ uri: medicine.image }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMode="cover"
                        />
                    )}
                    
                    {/* Рейтинг как оверлей */}
                    <XStack
                        position="absolute"
                        top="$1"
                        right="$1"
                        backgroundColor="rgba(0, 0, 0, 0.7)"
                        borderRadius="$2"
                        paddingHorizontal="$1"
                        paddingVertical="$0.5"
                        alignItems="center"
                        space="$0.5"
                    >
                        <Ionicons name="star" size={isMobile ? 10 : 12} color="#f5c518" />
                        <Text fontSize={isMobile ? "$1" : "$2"} color="#fff" fontWeight="600">
                            {medicine.rating ?? '4.5'}
                        </Text>
                    </XStack>

                    {/* Индикаторы статуса */}
                    <XStack
                        position="absolute"
                        top="$1"
                        left="$1"
                        space="$0.5"
                    >
                        {/* Рецептурный */}
                        {medicine.prescription && (
                            <YStack
                                backgroundColor="rgba(255, 59, 48, 0.9)"
                                borderRadius="$2"
                                paddingHorizontal="$1"
                                paddingVertical="$0.5"
                                alignItems="center"
                            >
                                <Ionicons name="document-text" size={isMobile ? 8 : 10} color="#fff" />
                            </YStack>
                        )}
                        
                        {/* Наличие */}
                        <YStack
                            backgroundColor={medicine.inStock ? "rgba(52, 199, 89, 0.9)" : "rgba(255, 149, 0, 0.9)"}
                            borderRadius="$2"
                            paddingHorizontal="$1"
                            paddingVertical="$0.5"
                            alignItems="center"
                        >
                            <Ionicons 
                                name={medicine.inStock ? "checkmark-circle" : "time"} 
                                size={isMobile ? 8 : 10} 
                                color="#fff" 
                            />
                        </YStack>
                    </XStack>
                </YStack>

                {/* 📄 Основная информация */}
                <YStack space="$1">
                    {/* Название и производитель */}
                    <YStack space="$0.5">
                        <Text 
                            fontSize={isMobile ? "$3" : "$4"} 
                            fontWeight="700" 
                            numberOfLines={1} 
                            color="#1C1C1E"
                            textAlign="center"
                        >
                            {medicine.name}
                        </Text>
                        <Text
                            fontSize={isMobile ? "$1" : "$2"}
                            color="#6B7280"
                            textAlign="center"
                            numberOfLines={1}
                        >
                            {medicine.manufacturer || 'Производитель не указан'}
                        </Text>
                    </YStack>

                    {/* Дозировка и форма */}
                    <XStack justifyContent="center" space="$1" alignItems="center">
                        <Text
                            fontSize={isMobile ? "$2" : "$3"}
                            color="#007AFF"
                            fontWeight="600"
                        >
                            {medicine.dosage}
                        </Text>
                        <Text
                            fontSize={isMobile ? "$1" : "$2"}
                            color="#6B7280"
                        >
                            • {medicine.form}
                        </Text>
                    </XStack>

                    {/* Профессиональная информация для врачей */}
                    {proMode && (
                        <YStack space="$0.5" backgroundColor="rgba(255, 149, 0, 0.05)" padding="$1" borderRadius="$2">
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#FF9500" fontWeight="600" textAlign="center">
                                {medicine.inn} • {medicine.atcCode}
                            </Text>
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280" textAlign="center" numberOfLines={1}>
                                {medicine.pharmacologyGroup}
                            </Text>
                        </YStack>
                    )}

                    {/* Показания (ключевые) */}
                    {medicine.indications && medicine.indications.length > 0 && (
                        <Text
                            fontSize={isMobile ? "$1" : "$2"}
                            color="#6B7280"
                            textAlign="center"
                            numberOfLines={2}
                        >
                            {medicine.indications.slice(0, 3).join(', ')}
                            {medicine.indications.length > 3 && '...'}
                        </Text>
                    )}

                    {/* Срок годности и статус наличия */}
                    <XStack justifyContent="space-between" alignItems="center">
                        <XStack alignItems="center" space="$1">
                            <Ionicons name="calendar-outline" size={isMobile ? 10 : 12} color="#6B7280" />
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280">
                                до {medicine.expiryDate}
                            </Text>
                        </XStack>
                        
                        <Text 
                            fontSize={isMobile ? "$1" : "$2"} 
                            color={medicine.inStock ? "#34C759" : "#FF9500"}
                            fontWeight="600"
                        >
                            {medicine.inStock ? "В наличии" : "Под заказ"}
                        </Text>
                    </XStack>

                    {/* Кнопки действий */}
                    <XStack space="$1" justifyContent="space-between">
                        <Button
                            flex={1}
                            size={isMobile ? "$2" : "$3"}
                            backgroundColor="transparent"
                            borderWidth={1}
                            borderColor="$gray6"
                            borderRadius="$3"
                            height={isMobile ? 32 : 36}
                            onPress={goToDetails}
                            pressStyle={{ scale: 0.96 }}
                        >
                            <XStack alignItems="center" space="$1">
                                <Ionicons name="information-circle-outline" size={isMobile ? 14 : 16} color="#007AFF" />
                                <Text fontSize={isMobile ? "$1" : "$2"} color="#007AFF" fontWeight="600">
                                    {proMode ? "Данные" : "Подробно"}
                                </Text>
                            </XStack>
                        </Button>

                        <Button
                            flex={1}
                            size={isMobile ? "$2" : "$3"}
                            backgroundColor={medicine.inStock ? "#007AFF" : "#6B7280"}
                            borderRadius="$3"
                            height={isMobile ? 32 : 36}
                            onPress={() => alert(medicine.inStock ? 'Добавлено в корзину' : 'Товар под заказ')}
                            pressStyle={{ scale: 0.96 }}
                            disabled={!medicine.inStock}
                        >
                            <XStack alignItems="center" space="$1">
                                <Text 
                                    fontSize={isMobile ? "$1" : "$2"} 
                                    color="#fff" 
                                    fontWeight="600"
                                >
                                    {medicine.price ?? '199₽'}
                                </Text>
                                <Ionicons 
                                    name={medicine.inStock ? "cart-outline" : "time-outline"} 
                                    size={isMobile ? 12 : 14} 
                                    color="#fff" 
                                />
                            </XStack>
                        </Button>
                    </XStack>
                </YStack>
            </YStack>
        </Card>
    )
}