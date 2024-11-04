import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, SafeAreaView, StyleSheet, Text, View, NativeModules } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { get_async_data } from '../../Helper/AppHelper';

const { width, height } = Dimensions.get('window');

export default function CheckSubscription({ navigation }: { navigation: any }) {
    const [loader, setloader] = useState(true);
    const [text, settext] = useState('Loading...');

    const [date, setDate] = useState(new Date())


    useEffect(() => {
        setloader(false);
        (async () => {
           let purchase = await get_async_data('subscription_active');
           if(purchase) {
            setloader(false);
            settext('Subscription is active');
           } else{
            setloader(false);
            settext('Subscription not available or may be expired');
           }
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', textDecorationLine: 'underline', marginBottom: 50 }}>Available Purchase</Text>
            <View style={{ paddingHorizontal: 15 }}>
                {
                    loader == true ? (<ActivityIndicator size={'large'} />) : (<Text style={{color:'red',fontSize: 24}}>{text}</Text>)
                }
            </View>

            <DatePicker date={date} onDateChange={setDate} />

            <Button title='Reload the Application' onPress={()=>NativeModules.DevSettings.reload()}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#F8FFF8',
    }
});