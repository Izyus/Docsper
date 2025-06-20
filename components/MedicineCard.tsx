import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Dimensions } from 'react-native'
import { Button, Card, Image, Text, XStack, YStack } from 'tamagui'
import { Medicine } from '../redux/medicinesSlice'
import { cardStyles } from '../styles/cards'
import { colors } from '../styles/colors'
import { typography } from '../styles/typography'

interface Props {
    medicine: Medicine
    proMode?: boolean
}

export default function MedicineCard({ medicine, proMode = false }: Props) {
    const router = useRouter()
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const goToDetails = () => {
        router.push({ pathname: '/medicine/[id]' as const, params: { id: medicine.id } })
    }
    return (
        <Card
            {...cardStyles.base}
            width="100%"
            padding={isMobile ? 8 : 12}
        >
            <YStack space={isMobile ? 8 : 12}>
                <YStack
                    width="100%"
                    height={isMobile ? 80 : 100}
                    backgroundColor={colors.background.gray}
                    borderRadius={8}
                    justifyContent="center"
                    alignItems="center"
                    overflow="hidden"
                    position="relative"
                >
                    <Ionicons name="image-outline" size={isMobile ? 24 : 28} color={colors.text.tertiary} />
                    {medicine.image && (
                        <Image
                            source={{ uri: medicine.image }}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    )}
                    <XStack
                        position="absolute"
                        top={4}
                        right={4}
                        backgroundColor="rgba(0, 0, 0, 0.7)"
                        borderRadius={4}
                        paddingHorizontal={4}
                        paddingVertical={2}
                        alignItems="center"
                        space={2}
                    >
                        <Ionicons name="star" size={isMobile ? 10 : 12} color="#f5c518" />
                        <Text style={typography.rating}>{medicine.rating ?? '4.5'}</Text>
                    </XStack>
                    <XStack
                        position="absolute"
                        top={4}
                        left={4}
                        space={2}
                    >
                        {medicine.prescription && (
                            <YStack
                                backgroundColor={colors.danger}
                                borderRadius={4}
                                paddingHorizontal={4}
                                paddingVertical={2}
                                alignItems="center"
                            >
                                <Ionicons name="document-text" size={isMobile ? 8 : 10} color={colors.text.white} />
                            </YStack>
                        )}
                        <YStack
                            backgroundColor={medicine.inStock ? colors.status.inStock : colors.status.outOfStock}
                            borderRadius={4}
                            paddingHorizontal={4}
                            paddingVertical={2}
                            alignItems="center"
                        >
                            <Ionicons 
                                name={medicine.inStock ? "checkmark-circle" : "time"} 
                                size={isMobile ? 8 : 10} 
                                color={colors.text.white} 
                            />
                        </YStack>
                    </XStack>
                </YStack>
                <YStack space={4}>
                    <YStack space={2}>
                        <Text style={typography.h3} numberOfLines={1} textAlign="center">{medicine.name}</Text>
                        <Text style={typography.caption} textAlign="center" numberOfLines={1}>{medicine.manufacturer || 'Производитель не указан'}</Text>
                    </YStack>
                    <XStack justifyContent="center" space={2} alignItems="center">
                        <Text style={typography.buttonOutline}>{medicine.dosage}</Text>
                        <Text style={typography.caption}>• {medicine.form}</Text>
                    </XStack>
                    {proMode && (
                        <YStack space={2} backgroundColor={colors.overlay.warning} padding={4} borderRadius={4}>
                            <Text style={{ ...typography.buttonOutline, color: colors.warning }} textAlign="center">{medicine.inn} • {medicine.atcCode}</Text>
                            <Text style={typography.caption} textAlign="center" numberOfLines={1}>{medicine.pharmacologyGroup}</Text>
                        </YStack>
                    )}
                    {medicine.indications && medicine.indications.length > 0 && (
                        <Text style={typography.caption} textAlign="center" numberOfLines={2}>
                            {medicine.indications.slice(0, 3).join(', ')}{medicine.indications.length > 3 && '...'}
                        </Text>
                    )}
                    <XStack justifyContent="space-between" alignItems="center">
                        <XStack alignItems="center" space={2}>
                            <Ionicons name="calendar-outline" size={isMobile ? 10 : 12} color={colors.text.secondary} />
                            <Text style={typography.caption}>до {medicine.expiryDate}</Text>
                        </XStack>
                        <Text style={medicine.inStock ? typography.statusInStock : typography.statusOutOfStock}>
                            {medicine.inStock ? "В наличии" : "Под заказ"}
                        </Text>
                    </XStack>
                    <XStack space={2} justifyContent="space-between">
                        <Button
                            flex={1}
                            size={isMobile ? 8 : 12}
                            backgroundColor="transparent"
                            borderWidth={1}
                            borderColor={colors.background.gray}
                            borderRadius={8}
                            height={isMobile ? 32 : 36}
                            onPress={goToDetails}
                            pressStyle={{ scale: 0.96 }}
                        >
                            <XStack alignItems="center" space={2}>
                                <Ionicons name="information-circle-outline" size={isMobile ? 14 : 16} color={colors.primary} />
                                <Text style={typography.buttonOutline}>{proMode ? "Данные" : "Подробно"}</Text>
                            </XStack>
                        </Button>
                        <Button
                            flex={1}
                            size={isMobile ? 8 : 12}
                            backgroundColor={medicine.inStock ? colors.primary : colors.text.secondary}
                            borderRadius={8}
                            height={isMobile ? 32 : 36}
                            onPress={() => alert(medicine.inStock ? 'Добавлено в корзину' : 'Товар под заказ')}
                            pressStyle={{ scale: 0.96 }}
                            disabled={!medicine.inStock}
                        >
                            <XStack alignItems="center" space={2}>
                                <Text style={typography.button}>{medicine.price ?? '199₽'}</Text>
                                <Ionicons name={medicine.inStock ? "cart-outline" : "time-outline"} size={isMobile ? 12 : 14} color={colors.text.white} />
                            </XStack>
                        </Button>
                    </XStack>
                </YStack>
            </YStack>
        </Card>
    )
}