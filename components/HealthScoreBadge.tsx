import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

interface HealthScoreBadgeProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
}

const HealthScoreBadge: React.FC<HealthScoreBadgeProps> = ({ score, size = 'medium' }) => {
  const getScoreColor = () => {
    if (score >= 80) return theme.colors.success;
    if (score >= 50) return theme.colors.warning;
    return theme.colors.danger;
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          fontSize: theme.fonts.size.sm,
        };
      case 'large':
        return {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          fontSize: theme.fonts.size.lg,
        };
      default:
        return {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          fontSize: theme.fonts.size.base,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View 
      style={[
        styles.badge, 
        { backgroundColor: getScoreColor() },
        { paddingHorizontal: sizeStyles.paddingHorizontal, paddingVertical: sizeStyles.paddingVertical }
      ]}
    >
      <Text style={[styles.scoreText, { fontSize: sizeStyles.fontSize }]}>
        {score}/100
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: theme.borderRadius.round,
    alignSelf: 'flex-start',
  },
  scoreText: {
    color: theme.colors.white,
    fontWeight: theme.fonts.weight.bold,
  },
});

export default HealthScoreBadge;