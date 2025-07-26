// src/components/product/QuickViewModal.tsx
import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { designTokens } from '../../theme/designTokens';
import * as Haptics from 'expo-haptics';

// We'll define a basic product type for props
interface Product {
  productName: string;
  brand: string;
  imageUrl: string;
  price?: number;
}

interface QuickViewModalProps {
  product: Product | null;
  visible: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, visible, onClose, onAddToCart }) => {
  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    // 1. Add item to cart (logic handled by parent)
    onAddToCart(product);
    // 2. Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // 3. Close the modal automatically
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.productName}>{product.productName}</Text>
          {product.price && <Text style={styles.price}>₪{product.price.toFixed(2)}</Text>}

          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: designTokens.borderRadius.large,
    padding: designTokens.spacing.large,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: designTokens.spacing.medium,
    right: designTokens.spacing.medium,
    backgroundColor: designTokens.colors.gray.light,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: designTokens.colors.textSecondary,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: designTokens.spacing.medium,
  },
  brand: {
    fontSize: designTokens.fontSizes.body,
    color: designTokens.colors.textSecondary,
  },
  productName: {
    fontSize: designTokens.fontSizes.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: designTokens.spacing.small,
  },
  price: {
    fontSize: designTokens.fontSizes.title,
    fontWeight: 'bold',
    color: designTokens.colors.primary,
    marginBottom: designTokens.spacing.large,
  },
  addToCartButton: {
    backgroundColor: designTokens.colors.primary,
    borderRadius: designTokens.borderRadius.medium,
    padding: designTokens.spacing.medium,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: designTokens.fontSizes.button,
  },
});

export default QuickViewModal;