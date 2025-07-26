import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import theme from '../theme';

const ProductSkeletonLoader: React.FC = () => {
  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, index) => (
        <MotiView
          key={index}
          style={styles.card}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 1000,
            loop: true,
          }}
        >
          <View style={styles.imageSkeleton} />
          <View style={styles.content}>
            <View style={styles.titleSkeleton} />
            <View style={styles.priceSkeleton} />
          </View>
        </MotiView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.gray.light,
    borderRadius: theme.borderRadius.lg,
    width: '47%',
    marginRight: '3%',
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  imageSkeleton: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.gray.medium,
    opacity: 0.3,
  },
  content: {
    padding: theme.spacing.md,
  },
  titleSkeleton: {
    height: 16,
    backgroundColor: theme.colors.gray.medium,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
    opacity: 0.3,
  },
  priceSkeleton: {
    height: 20,
    width: '40%',
    backgroundColor: theme.colors.gray.medium,
    borderRadius: theme.borderRadius.sm,
    opacity: 0.3,
  },
});

export default ProductSkeletonLoader;