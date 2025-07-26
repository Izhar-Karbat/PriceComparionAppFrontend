// src/components/ui/Skeleton.tsx
import React from 'react';
import { MotiView } from 'moti';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { designTokens } from '../../theme/designTokens';

interface SkeletonProps {
  width: number | string;
  height: number;
  style?: ViewStyle;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, style }) => {
  return (
    <View style={[{ width, height, backgroundColor: designTokens.colors.gray.light, overflow: 'hidden', borderRadius: designTokens.borderRadius.small }, style]}>
      <MotiView
        from={{ translateX: -width }}
        animate={{ translateX: width }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
          delay: 200,
        }}
        style={[StyleSheet.absoluteFillObject, { backgroundColor: designTokens.colors.gray.medium, opacity: 0.5 }]}
      />
    </View>
  );
};

export default Skeleton;