import { colors } from './colors'
import { fontSize } from './spacing'

export const typography = {
  h1: {
    fontSize: fontSize.xxxxxl,
    fontWeight: '900' as const,
    color: colors.text.primary,
  },
  
  h2: {
    fontSize: fontSize.xxxl,
    fontWeight: '800' as const,
    color: colors.text.primary,
  },
  
  h3: {
    fontSize: fontSize.xxl,
    fontWeight: '700' as const,
    color: colors.text.primary,
  },
  
  h4: {
    fontSize: fontSize.xl,
    fontWeight: '700' as const,
    color: colors.text.primary,
  },
  
  body: {
    fontSize: fontSize.md,
    color: colors.text.primary,
  },
  
  bodySecondary: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  
  caption: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  
  button: {
    fontSize: fontSize.md,
    fontWeight: '600' as const,
    color: colors.text.white,
  },
  
  buttonOutline: {
    fontSize: fontSize.md,
    fontWeight: '600' as const,
    color: colors.primary,
  },
  
  price: {
    fontSize: fontSize.xxxl,
    fontWeight: '900' as const,
    color: colors.primary,
  },
  
  rating: {
    fontSize: fontSize.sm,
    fontWeight: '700' as const,
    color: colors.text.primary,
  },
  
  status: {
    fontSize: fontSize.xs,
    fontWeight: '600' as const,
  },
  
  statusInStock: {
    fontSize: fontSize.xs,
    fontWeight: '600' as const,
    color: colors.status.inStockText,
  },
  
  statusOutOfStock: {
    fontSize: fontSize.xs,
    fontWeight: '600' as const,
    color: colors.status.outOfStockText,
  },
} 