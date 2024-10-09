import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
const { width } = Dimensions.get('screen');

const CalorieButton = ({ data, navigate }) => {
    
    const _renderButton = () => {
        if (data.length > 0) {
            let jsx = data.map((item, index) => {
                return (
                    <View style={styles.button} key={index}>
                        <View style={styles.column}>
                            <Text>{item.type}</Text>
                        </View>

                        <View style={[styles.column, styles.column2]}>
                            <Text>{item.calorie} kcal</Text>
                            <TouchableOpacity onPress={()=>navigate(item.type)}>
                                <Image style={{ width: 28, height: 28 }} source={require('../assets/icons/add_calorie.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
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
        backgroundColor: '#F3F3F3',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
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