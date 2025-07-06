import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

interface IngredientTagProps {
  name: string;
  type?: 'danger' | 'warning' | 'safe';
}

const IngredientTag: React.FC<IngredientTagProps> = ({ name, type = 'safe' }) => {
  const getTagStyle = () => {
    switch (type) {
      case 'danger':
        return {
          backgroundColor: theme.colors.danger,
          color: theme.colors.white,
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.warning,
          color: theme.colors.white,
        };
      default:
        return {
          backgroundColor: theme.colors.gray.light,
          color: theme.colors.text,
        };
    }
  };

  const tagStyle = getTagStyle();

  return (
    <View style={[styles.tag, { backgroundColor: tagStyle.backgroundColor }]}>
      <Text style={[styles.tagText, { color: tagStyle.color }]}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  tagText: {
    fontSize: theme.fonts.size.sm,
    fontWeight: theme.fonts.weight.medium,
  },
});

export default IngredientTag;