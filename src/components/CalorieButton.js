import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
const { width } = Dimensions.get('screen');

const CalorieButton = ({ data, navigate }) => {

    const _renderButton = () => {
        if (data.length > 0) {
            let jsx = data.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => navigate(item.type)} style={styles.button} key={index}>
                        <View style={styles.column}>
                            <Text style={{ color: '#5E9368', fontSize: 14, fontWeight: '700' }}>{item.type}</Text>
                        </View>

                        <View style={[styles.column, styles.column2]}>
                            <Text>{item.calorie} kcal</Text>
                            <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/add_calorie.png')} />
                        </View>
                    </TouchableOpacity>
                )
            });
            return jsx;
        } else {
            return (<></>);
        }
    }

    return (
        <>
            {_renderButton()}
        </>
    )
}
const styles = StyleSheet.create({
    button: {
        width: width * 0.87,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#C9E9BC'
    },
    column: {
        width: '60%',
    },
    column2: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
export default CalorieButton;