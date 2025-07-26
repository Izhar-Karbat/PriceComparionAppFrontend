// src/screens/ScannerScreen.tsx
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    ProductDetails: { masterproductid: string };
    // ... other screens
};
type ScannerScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const viewfinderSize = width * 0.7;

export default function ScannerScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation<ScannerScreenNavigationProp>();

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        if (scanned) return; // Prevent multiple scans
        
        setScanned(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        
        // In a real app, you'd use the 'data' to fetch a product.
        // For now, we navigate to our mock product details page.
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        navigation.navigate('ProductDetails', { masterproductid: '456' });
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.permissionText}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => Camera.requestCameraPermissionsAsync()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
                }}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.overlay}>
                <Text style={styles.title}>Scan a Product Barcode</Text>
                <View style={styles.viewfinder} />
                <Button title={'Cancel'} onPress={() => navigation.goBack()} color="white" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    permissionText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 100,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
    },
    viewfinder: {
        width: viewfinderSize,
        height: viewfinderSize / 2,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
    },
});