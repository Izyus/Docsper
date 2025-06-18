import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Medicine = {
    id: string
    name: string
    description: string
    image: string
    price?: string
    rating?: string
    country?: string
    
    // Основная информация
    dosage?: string
    form?: string // таблетки, капсулы, сироп и т.д.
    manufacturer?: string
    expiryDate?: string
    inStock?: boolean
    prescription?: boolean // требует рецепта
    
    // Медицинская информация для обычных пользователей
    activeIngredient?: string
    indications?: string[]
    contraindications?: string[]
    sideEffects?: string[]
    
    // Профессиональная информация для врачей
    inn?: string // международное непатентованное наименование
    atcCode?: string
    pharmacologyGroup?: string
    mechanismOfAction?: string
    drugInteractions?: string[]
    detailedContraindications?: string[]
    detailedSideEffects?: string[]
    dosageInstructions?: string
    clinicalData?: string
}

interface MedicinesState {
    query: string
    country: string
    items: Medicine[]
}

const initialState: MedicinesState = {
    query: '',
    country: 'RU', // По умолчанию Россия 🇷🇺
    items: [
        {
            id: '1',
            name: 'Парацетамол',
            description: 'Обезболивающее и жаропонижающее средство',
            image: 'https://source.unsplash.com/400x300/?paracetamol',
            price: '99₽',
            rating: '4.6',
            country: 'RU',
            dosage: '500 мг',
            form: 'Таблетки',
            manufacturer: 'Фармстандарт',
            expiryDate: '12.2025',
            inStock: true,
            prescription: false,
            activeIngredient: 'Парацетамол',
            indications: ['Головная боль', 'Зубная боль', 'Высокая температура', 'Мышечная боль'],
            contraindications: ['Аллергия на парацетамол', 'Тяжелые заболевания печени'],
            sideEffects: ['Редко: тошнота', 'Аллергические реакции'],
            inn: 'Paracetamol',
            atcCode: 'N02BE01',
            pharmacologyGroup: 'Анальгетики и антипиретики',
            mechanismOfAction: 'Блокирует циклооксигеназу в ЦНС',
            drugInteractions: ['Варфарин (усиление эффекта)', 'Этанол (гепатотоксичность)'],
            detailedContraindications: ['Гиперчувствительность', 'Тяжелая печеночная недостаточность', 'Дефицит глюкозо-6-фосфатдегидрогеназы'],
            detailedSideEffects: ['ЖКТ: тошнота, боль в животе', 'Печень: гепатотоксичность при передозировке', 'Кровь: тромбоцитопения (редко)'],
            dosageInstructions: 'Взрослые: 500-1000 мг каждые 4-6 часов, макс 4000 мг/сутки',
            clinicalData: 'Эффективность доказана в РКИ, профиль безопасности хорошо изучен'
        },
        {
            id: '2',
            name: 'Ибупрофен',
            description: 'Противовоспалительное средство широкого спектра',
            image: 'https://source.unsplash.com/400x300/?ibuprofen',
            price: '129₽',
            rating: '4.4',
            country: 'RU',
            dosage: '400 мг',
            form: 'Капсулы',
            manufacturer: 'Медисорб',
            expiryDate: '08.2025',
            inStock: true,
            prescription: false,
            activeIngredient: 'Ибупрофен',
            indications: ['Воспаление', 'Боль', 'Лихорадка', 'Артрит'],
            contraindications: ['Язва желудка', 'Аллергия на НПВП', 'Беременность (3 триместр)'],
            sideEffects: ['Боль в желудке', 'Головокружение', 'Сыпь'],
            inn: 'Ibuprofen',
            atcCode: 'M01AE01',
            pharmacologyGroup: 'НПВП - производные пропионовой кислоты',
            mechanismOfAction: 'Неселективное ингибирование ЦОГ-1 и ЦОГ-2',
            drugInteractions: ['Варфарин', 'Дигоксин', 'Лития карбонат'],
            detailedContraindications: ['Активная пептическая язва', 'Тяжелая сердечная недостаточность', 'Тяжелая почечная недостаточность'],
            detailedSideEffects: ['ЖКТ: диспепсия, язвы', 'ССС: повышение АД', 'ЦНС: головная боль, головокружение'],
            dosageInstructions: 'Взрослые: 200-400 мг каждые 6-8 часов, макс 1200 мг/сутки',
            clinicalData: 'Широко применяется в клинической практике, хорошо изученный профиль эффективности и безопасности'
        },
        {
            id: '3',
            name: 'Амоксициллин',
            description: 'Антибиотик пенициллиновой группы',
            image: 'https://source.unsplash.com/400x300/?amoxicillin',
            price: '149₽',
            rating: '4.8',
            country: 'RU',
            dosage: '500 мг',
            form: 'Капсулы',
            manufacturer: 'Синтез',
            expiryDate: '06.2025',
            inStock: false,
            prescription: true,
            activeIngredient: 'Амоксициллин',
            indications: ['Бактериальные инфекции', 'Ангина', 'Бронхит', 'Пневмония'],
            contraindications: ['Аллергия на пенициллин', 'Мононуклеоз'],
            sideEffects: ['Диарея', 'Тошнота', 'Аллергические реакции'],
            inn: 'Amoxicillin',
            atcCode: 'J01CA04',
            pharmacologyGroup: 'Бета-лактамные антибиотики - пенициллины',
            mechanismOfAction: 'Ингибирование синтеза клеточной стенки бактерий',
            drugInteractions: ['Метотрексат', 'Варфарин', 'Аллопуринол'],
            detailedContraindications: ['Гиперчувствительность к бета-лактамам', 'Инфекционный мононуклеоз', 'Лимфолейкоз'],
            detailedSideEffects: ['ЖКТ: псевдомембранозный колит', 'Аллергия: анафилаксия', 'Печень: гепатит (редко)'],
            dosageInstructions: 'Взрослые: 250-500 мг каждые 8 часов, курс 5-14 дней',
            clinicalData: 'Препарат первой линии для многих инфекций, резистентность растет'
        },
        {
            id: '4',
            name: 'Цитрамон',
            description: 'Снимает головную боль и нормализует давление',
            image: 'https://source.unsplash.com/400x300/?citramon',
            price: '89₽',
            rating: '4.3',
            country: 'RU',
            dosage: '240/180/30 мг',
            form: 'Таблетки',
            manufacturer: 'Татхимфармпрепараты',
            expiryDate: '03.2025',
            inStock: true,
            prescription: false,
            activeIngredient: 'Ацетилсалициловая кислота + Парацетамол + Кофеин',
            indications: ['Головная боль', 'Мигрень', 'Зубная боль', 'Невралгия'],
            contraindications: ['Язва желудка', 'Детский возраст до 15 лет', 'Беременность'],
            sideEffects: ['Боль в желудке', 'Шум в ушах', 'Бессонница'],
            inn: 'Acetylsalicylic acid + Paracetamol + Caffeine',
            atcCode: 'N02BA71',
            pharmacologyGroup: 'Комбинированные анальгетики',
            mechanismOfAction: 'Комбинированное действие: анальгезия, антипиреза, психостимуляция',
            drugInteractions: ['Варфарин', 'Метотрексат', 'Этанол'],
            detailedContraindications: ['Эрозивно-язвенные поражения ЖКТ', 'Геморрагический диатез', 'Почечная/печеночная недостаточность'],
            detailedSideEffects: ['ЖКТ: диспепсия, ульцерогенность', 'ЦНС: возбуждение, тремор', 'Аллергия: бронхоспазм'],
            dosageInstructions: 'Взрослые: 1-2 таблетки до 3 раз в день, не более 6 таблеток в сутки',
            clinicalData: 'Эффективная комбинация для купирования головной боли'
        },
        {
            id: '5',
            name: 'Acetaminophen',
            description: 'Pain reliever and fever reducer',
            image: 'https://source.unsplash.com/400x300/?acetaminophen',
            price: '$12.99',
            rating: '4.7',
            country: 'US',
            dosage: '500 mg',
            form: 'Tablets',
            manufacturer: 'Johnson & Johnson',
            expiryDate: '11.2025',
            inStock: true,
            prescription: false,
            activeIngredient: 'Acetaminophen',
            indications: ['Headache', 'Fever', 'Minor aches', 'Muscle pain'],
            contraindications: ['Liver disease', 'Allergy to acetaminophen'],
            sideEffects: ['Rare: nausea', 'Allergic reactions'],
            inn: 'Paracetamol',
            atcCode: 'N02BE01',
            pharmacologyGroup: 'Analgesics and antipyretics',
            mechanismOfAction: 'Inhibits cyclooxygenase in CNS',
            drugInteractions: ['Warfarin', 'Isoniazid', 'Phenytoin'],
            detailedContraindications: ['Hypersensitivity', 'Severe hepatic impairment'],
            detailedSideEffects: ['Hepatotoxicity with overdose', 'Rare: thrombocytopenia'],
            dosageInstructions: 'Adults: 325-650 mg every 4-6 hours, max 3000 mg/day',
            clinicalData: 'Well-established safety profile, widely used OTC analgesic'
        },
        {
            id: '6',
            name: 'Ibuprofen',
            description: 'Anti-inflammatory pain reliever',
            image: 'https://source.unsplash.com/400x300/?ibuprofen',
            price: '$15.99',
            rating: '4.5',
            country: 'US',
            dosage: '200 mg',
            form: 'Tablets',
            manufacturer: 'Pfizer',
            expiryDate: '09.2025',
            inStock: true,
            prescription: false,
            activeIngredient: 'Ibuprofen',
            indications: ['Pain', 'Inflammation', 'Fever', 'Arthritis'],
            contraindications: ['Stomach ulcers', 'NSAID allergy', 'Late pregnancy'],
            sideEffects: ['Stomach upset', 'Dizziness', 'Rash'],
            inn: 'Ibuprofen',
            atcCode: 'M01AE01',
            pharmacologyGroup: 'NSAIDs - propionic acid derivatives',
            mechanismOfAction: 'Non-selective COX-1 and COX-2 inhibition',
            drugInteractions: ['Warfarin', 'Digoxin', 'Lithium'],
            detailedContraindications: ['Active peptic ulceration', 'Severe heart failure'],
            detailedSideEffects: ['GI: dyspepsia, ulceration', 'CV: hypertension'],
            dosageInstructions: 'Adults: 200-400 mg every 6-8 hours, max 1200 mg/day',
            clinicalData: 'Effective NSAID with well-documented efficacy and safety profile'
        },
        {
            id: '7',
            name: 'אקמול',
            description: 'משכך כאבים ומפחית חום',
            image: 'https://source.unsplash.com/400x300/?acamol',
            price: '₪25.90',
            rating: '4.8',
            country: 'IL',
            dosage: '500 מ"ג',
            form: 'טבליות',
            manufacturer: 'טבע',
            expiryDate: '07.2025',
            inStock: true,
            prescription: false,
            activeIngredient: 'פרצטמול',
            indications: ['כאב ראש', 'חום', 'כאבי שרירים', 'כאב שיניים'],
            contraindications: ['אלרגיה לפרצטמול', 'מחלת כבד קשה'],
            sideEffects: ['נדיר: בחילה', 'תגובות אלרגיות'],
            inn: 'Paracetamol',
            atcCode: 'N02BE01',
            pharmacologyGroup: 'משככי כאבים ומפחיתי חום',
            mechanismOfAction: 'עיכוב ציקלואוקסיגנאז במערכת העצבים המרכזית',
            drugInteractions: ['וורפרין', 'איזוניאזיד'],
            detailedContraindications: ['רגישות יתר', 'אי ספיקת כבד חמורה'],
            detailedSideEffects: ['רעילות כבד במינון יתר', 'נדיר: ירידה בטסיות'],
            dosageInstructions: 'מבוגרים: 500-1000 מ"ג כל 4-6 שעות, מקסימום 4000 מ"ג ביום',
            clinicalData: 'פרופיל בטיחות מבוסס, נמצא בשימוש נרחב'
        },
        {
            id: '8',
            name: 'נורופן',
            description: 'נוגד דלקות משכך כאבים',
            image: 'https://source.unsplash.com/400x300/?nurofen',
            price: '₪32.50',
            rating: '4.6',
            country: 'IL',
            dosage: '400 מ"ג',
            form: 'קפסולות',
            manufacturer: 'רקיט בנקיזר',
            expiryDate: '04.2025',
            inStock: true,
            prescription: false,
            activeIngredient: 'איבופרופן',
            indications: ['דלקת', 'כאב', 'חום', 'דלקת פרקים'],
            contraindications: ['כיב קיבה', 'אלרגיה ל-NSAID', 'הריון מאוחר'],
            sideEffects: ['כאב בטן', 'סחרחורת', 'פריחה'],
            inn: 'Ibuprofen',
            atcCode: 'M01AE01',
            pharmacologyGroup: 'NSAID - נגזרות חומצה פרופיונית',
            mechanismOfAction: 'עיכוב לא סלקטיבי של COX-1 ו-COX-2',
            drugInteractions: ['וורפרין', 'דיגוקסין', 'ליתיום'],
            detailedContraindications: ['כיב פפטי פעיל', 'אי ספיקת לב חמורה'],
            detailedSideEffects: ['מערכת עיכול: דיספפסיה, כיבים', 'לב וכלי דם: עלייה בלחץ דם'],
            dosageInstructions: 'מבוגרים: 200-400 מ"ג כל 6-8 שעות, מקסימום 1200 מ"ג ביום',
            clinicalData: 'NSAID יעיל עם פרופיל יעילות ובטיחות מתועד'
        },
    ],
}

export const medicinesSlice = createSlice({
    name: 'medicines',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload
        },
        setCountry(state, action: PayloadAction<string>) {
            state.country = action.payload
        },
    },
})

export const { setQuery, setCountry } = medicinesSlice.actions
export default medicinesSlice.reducer