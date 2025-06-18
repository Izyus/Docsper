import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import {
    Button,
    Card,
    Image,
    ScrollView,
    Text,
    XStack,
    YStack
} from 'tamagui'

const savedMedicines = [
    {
        id: '1',
        name: 'Парацетамол',
        description: 'Обезболивающее и жаропонижающее средство',
        image: 'https://source.unsplash.com/400x300/?paracetamol',
        price: '99₽',
        rating: '4.6',
        country: 'RU',
        savedDate: '15 июн',
        inStock: true,
    },
    {
        id: '2',
        name: 'Ибупрофен',
        description: 'Противовоспалительное средство широкого спектра',
        image: 'https://source.unsplash.com/400x300/?ibuprofen',
        price: '129₽',
        rating: '4.4',
        country: 'RU',
        savedDate: '12 июн',
        inStock: true,
    },
    {
        id: '3',
        name: 'Амоксициллин',
        description: 'Антибиотик пенициллиновой группы',
        image: 'https://source.unsplash.com/400x300/?amoxicillin',
        price: '149₽',
        rating: '4.8',
        country: 'RU',
        savedDate: '10 июн',
        inStock: false,
    },
]

const cartItems = [
    {
        id: '1',
        name: 'Парацетамол',
        description: 'Обезболивающее и жаропонижающее средство',
        image: 'https://source.unsplash.com/400x300/?paracetamol',
        price: 99,
        quantity: 2,
        inStock: true,
    },
    {
        id: '4',
        name: 'Цитрамон',
        description: 'Снимает головную боль и нормализует давление',
        image: 'https://source.unsplash.com/400x300/?citramon',
        price: 89,
        quantity: 1,
        inStock: true,
    },
]

export default function BookmarksScreen() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const [activeTab, setActiveTab] = useState<'bookmarks' | 'cart'>('bookmarks')

    const totalCartPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    const renderMedicineCard = (medicine: any, isCart = false) => (
        <Card
            key={medicine.id}
            backgroundColor="#fff"
            borderRadius="$6"
            padding={isMobile ? "$3" : "$4"}
            bordered
            borderColor="$gray4"
            shadowColor="$shadowColor"
            shadowRadius={6}
            shadowOpacity={0.1}
            mb="$3"
        >
            <XStack space={isMobile ? "$3" : "$4"} alignItems="center">
                {/* Изображение */}
                <YStack
                    width={isMobile ? 60 : 80}
                    height={isMobile ? 60 : 80}
                    backgroundColor="$gray2"
                    borderRadius={isMobile ? 12 : 16}
                    justifyContent="center"
                    alignItems="center"
                    overflow="hidden"
                    position="relative"
                >
                    <Ionicons name="medical-outline" size={isMobile ? 20 : 24} color="#999" />
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
                </YStack>

                {/* Информация */}
                <YStack flex={1} space="$1">
                    <Text 
                        fontSize={isMobile ? "$4" : "$5"} 
                        fontWeight="700" 
                        color="#1C1C1E"
                        numberOfLines={1}
                    >
                        {medicine.name}
                    </Text>
                    <Text 
                        fontSize={isMobile ? "$2" : "$3"} 
                        color="#6B7280"
                        numberOfLines={2}
                    >
                        {medicine.description}
                    </Text>
                    
                    <XStack alignItems="center" space="$2" mt="$1">
                        <Text 
                            fontSize={isMobile ? "$3" : "$4"} 
                            fontWeight="700" 
                            color="#1C1C1E"
                        >
                            {typeof medicine.price === 'number' ? `${medicine.price}₽` : medicine.price}
                        </Text>
                        
                        {isCart && (
                            <>
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                    × {medicine.quantity}
                                </Text>
                                <Text 
                                    fontSize={isMobile ? "$3" : "$4"} 
                                    fontWeight="700" 
                                    color="#007AFF"
                                >
                                    = {medicine.price * medicine.quantity}₽
                                </Text>
                            </>
                        )}

                        {!isCart && medicine.rating && (
                            <XStack alignItems="center" space="$1">
                                <Ionicons name="star" size={isMobile ? 12 : 14} color="#f5c518" />
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                    {medicine.rating}
                                </Text>
                            </XStack>
                        )}

                        {!medicine.inStock && (
                            <Text fontSize={isMobile ? "$2" : "$3"} color="#FF3B30">
                                Нет в наличии
                            </Text>
                        )}
                    </XStack>
                </YStack>

                {/* Действия */}
                <YStack space="$2" alignItems="flex-end">
                    {isCart ? (
                        <>
                            <Button
                                size={isMobile ? "$2" : "$3"}
                                backgroundColor="transparent"
                                pressStyle={{ scale: 0.96 }}
                            >
                                <Ionicons name="remove-circle-outline" size={isMobile ? 18 : 20} color="#FF3B30" />
                            </Button>
                            <Button
                                size={isMobile ? "$2" : "$3"}
                                backgroundColor="transparent"
                                pressStyle={{ scale: 0.96 }}
                            >
                                <Ionicons name="add-circle-outline" size={isMobile ? 18 : 20} color="#007AFF" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                size={isMobile ? "$2" : "$3"}
                                backgroundColor="transparent"
                                pressStyle={{ scale: 0.96 }}
                            >
                                <Ionicons name="heart" size={isMobile ? 18 : 20} color="#FF3B30" />
                            </Button>
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280">
                                {medicine.savedDate}
                            </Text>
                        </>
                    )}
                </YStack>
            </XStack>
        </Card>
    )

    return (
        <ScrollView backgroundColor="#fff">
            <YStack px={isMobile ? "$3" : "$4"} py={isMobile ? "$3" : "$4"} space="$4">
                
                {/* 📋 Переключатель вкладок */}
                <XStack space="$2" backgroundColor="$gray2" borderRadius="$4" padding="$1">
                    <Button
                        flex={1}
                        size={isMobile ? "$3" : "$4"}
                        backgroundColor={activeTab === 'bookmarks' ? '#007AFF' : 'transparent'}
                        borderRadius="$3"
                        onPress={() => setActiveTab('bookmarks')}
                        pressStyle={{ scale: 0.98 }}
                    >
                        <XStack alignItems="center" space="$2">
                            <Ionicons 
                                name="bookmark-outline" 
                                size={isMobile ? 16 : 20} 
                                color={activeTab === 'bookmarks' ? '#fff' : '#6B7280'} 
                            />
                            <Text 
                                fontSize={isMobile ? "$3" : "$4"} 
                                color={activeTab === 'bookmarks' ? '#fff' : '#6B7280'}
                                fontWeight="600"
                            >
                                Закладки ({savedMedicines.length})
                            </Text>
                        </XStack>
                    </Button>

                    <Button
                        flex={1}
                        size={isMobile ? "$3" : "$4"}
                        backgroundColor={activeTab === 'cart' ? '#007AFF' : 'transparent'}
                        borderRadius="$3"
                        onPress={() => setActiveTab('cart')}
                        pressStyle={{ scale: 0.98 }}
                    >
                        <XStack alignItems="center" space="$2">
                            <Ionicons 
                                name="cart-outline" 
                                size={isMobile ? 16 : 20} 
                                color={activeTab === 'cart' ? '#fff' : '#6B7280'} 
                            />
                            <Text 
                                fontSize={isMobile ? "$3" : "$4"} 
                                color={activeTab === 'cart' ? '#fff' : '#6B7280'}
                                fontWeight="600"
                            >
                                Корзина ({cartItems.length})
                            </Text>
                        </XStack>
                    </Button>
                </XStack>

                {/* 📄 Контент в зависимости от вкладки */}
                {activeTab === 'bookmarks' ? (
                    <YStack space="$3">
                        <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                            Избранные лекарства
                        </Text>
                        
                        {savedMedicines.length === 0 ? (
                            <Card
                                backgroundColor="#fff"
                                borderRadius="$6"
                                padding={isMobile ? "$4" : "$5"}
                                bordered
                                borderColor="$gray4"
                                alignItems="center"
                            >
                                <Ionicons name="bookmark-outline" size={48} color="#C7C7CC" />
                                <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="600" color="#6B7280" mt="$2">
                                    Пока нет закладок
                                </Text>
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" textAlign="center" mt="$1">
                                    Добавляйте лекарства в избранное для быстрого доступа
                                </Text>
                            </Card>
                        ) : (
                            savedMedicines.map(medicine => renderMedicineCard(medicine, false))
                        )}
                    </YStack>
                ) : (
                    <YStack space="$3">
                        <XStack justifyContent="space-between" alignItems="center">
                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                                Корзина
                            </Text>
                            <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#007AFF">
                                {totalCartPrice}₽
                            </Text>
                        </XStack>
                        
                        {cartItems.length === 0 ? (
                            <Card
                                backgroundColor="#fff"
                                borderRadius="$6"
                                padding={isMobile ? "$4" : "$5"}
                                bordered
                                borderColor="$gray4"
                                alignItems="center"
                            >
                                <Ionicons name="cart-outline" size={48} color="#C7C7CC" />
                                <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="600" color="#6B7280" mt="$2">
                                    Корзина пуста
                                </Text>
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" textAlign="center" mt="$1">
                                    Добавьте лекарства в корзину для покупки
                                </Text>
                            </Card>
                        ) : (
                            <>
                                {cartItems.map(item => renderMedicineCard(item, true))}
                                
                                {/* Итого и оформление заказа */}
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
                                    <YStack space="$3">
                                        <XStack justifyContent="space-between" alignItems="center">
                                            <Text fontSize={isMobile ? "$4" : "$5"} color="#6B7280">
                                                Товаров: {cartItems.length}
                                            </Text>
                                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                                                Итого: {totalCartPrice}₽
                                            </Text>
                                        </XStack>
                                        
                                        <Button
                                            size={isMobile ? "$4" : "$5"}
                                            backgroundColor="#007AFF"
                                            borderRadius="$5"
                                            pressStyle={{ scale: 0.98 }}
                                        >
                                            <XStack alignItems="center" space="$2">
                                                <Ionicons name="card-outline" size={isMobile ? 18 : 20} color="#fff" />
                                                <Text fontSize={isMobile ? "$4" : "$5"} color="#fff" fontWeight="600">
                                                    Оформить заказ
                                                </Text>
                                            </XStack>
                                        </Button>
                                    </YStack>
                                </Card>
                            </>
                        )}
                    </YStack>
                )}
            </YStack>
        </ScrollView>
    )
}