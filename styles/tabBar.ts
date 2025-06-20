import { colors } from './colors'
import { fontSize, spacing, tabBarHeight, tabBarPaddingBottom } from './spacing'

export const tabBarStyles = {
  tabBar: {
    backgroundColor: colors.tabBar.background,
    borderTopWidth: 1,
    borderTopColor: colors.tabBar.border,
    height: tabBarHeight,
    paddingTop: spacing.sm,
    paddingBottom: tabBarPaddingBottom,
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  
  tabBarLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600' as const,
    marginTop: 2,
    marginBottom: 2,
  },
  
  tabBarItem: {
    paddingVertical: spacing.xs,
  },
  
  tabBarIcon: {
    marginTop: 0,
  },
  
  tabBarIconFocused: {
    marginTop: -2,
  },
  
  webTabBar: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: colors.tabBar.background,
    borderTop: `1px solid ${colors.tabBar.border}`,
    paddingTop: `${spacing.sm}px`,
    paddingBottom: `${tabBarPaddingBottom}px`,
    height: `${tabBarHeight}px`,
  },
} 