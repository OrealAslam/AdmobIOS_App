import React, { useState, useEffect } from 'react';
import * as RNIap from 'react-native-iap';
import { Alert } from 'react-native';

const itemSkus = ['pulse_weekly_trial', 'pulse_yearly_subscription'];

export default function useRniap() {
    const [products, setProducts] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from the App Store
    const fetchProducts = async () => {
        try {
            const products = await RNIap.getProducts({skus: itemSkus});
            setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchAvailablePurchases = async () => {
        try {
            // Initialize the IAP connection
            await RNIap.initConnection();
            console.log('IAP connection initialized');

            // Get all available purchases
            const availablePurchases = await RNIap.getAvailablePurchases();
            return availablePurchases;
            // Set the retrieved purchases to the state
            // setPurchases(availablePurchases);
        } catch (error) {
            console.error('Error fetching available purchases:', error);
            Alert.alert('Error', 'Could not retrieve available purchases');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        // Fetch products and purchases on component mount
        fetchProducts();
        fetchAvailablePurchases();

        // Cleanup function to end connection on component unmount
        return () => {
            RNIap.endConnection();
        };
    }, []);

    // Make the purchase
    const purchaseSubscription = async (productId) => {
        try {
            const purchase = await RNIap.requestSubscription(productId);
            console.log('Subscription successful: ', purchase);
            Alert.alert('Purchase Successful', `You have subscribed to ${productId}`);
        } catch (err) {
            console.warn('Error while purchasing subscription', err);
            Alert.alert('Purchase Failed', 'Something went wrong');
        }
    };

    // Return the state and functions that will be used in the component
    return [
        products,
        loading,
        fetchAvailablePurchases,
        purchaseSubscription
    ];
}
