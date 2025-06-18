// components/AnalogCountrySelector.tsx
import { useDispatch, useSelector } from 'react-redux'
import { Button, XStack } from 'tamagui'
import { setCountry } from '../redux/medicinesSlice'
import { RootState } from '../redux/store'

const countries = [
    { code: 'RU', label: '🇷🇺 Россия' },
    { code: 'US', label: '🇺🇸 США' },
    { code: 'IL', label: '🇮🇱 Израиль' },
]

export default function AnalogCountrySelector() {
    const current = useSelector((state: RootState) => state.medicines.country)
    const dispatch = useDispatch()

    return (
        <XStack space="$2" justifyContent="center" mt="$2">
            {countries.map((c) => (
                <Button
                    key={c.code}
                    size="$2"
                    theme={current === c.code ? 'active' : 'gray'}
                    chromeless={current !== c.code}
                    onPress={() => dispatch(setCountry(c.code))}
                >
                    {c.label}
                </Button>
            ))}
        </XStack>
    )
}