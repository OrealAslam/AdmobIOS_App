import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import PageHeader from './components/PageHeader';
import { Banner } from '../../../Helper/AdManager';
import { add_diet_report_to_local_storage, calculate_calories, sumNutrientValues } from '../../../Helper/AppHelper';
import { useRoute } from '@react-navigation/native';
import CalorieResult from './components/CalorieResult';
import moment from 'moment';
import { lang } from '../../../../global';
const { width, height } = Dimensions.get('window');

const btnWidth = width - 45;
const btnRatio = btnWidth / 1256;

const CalorieDescriptionScreen = ({ navigation }: { navigation: any }, { params }: { params: any }) => {
    const route = useRoute();
    const [click, setclick] = useState(false);
    const [resultview, setresultview] = useState(false);
    const [description, setdescription] = useState('');
    const [data, setdata] = useState({});
    const [apires, setapires] = useState({});
    const [language, setlanguage] = useState({
        calDesc: {
            title: '',
            subTitle: '',
            submit: '',
            placeholder: ''
        }
    });

    useEffect(() => {
        (async () => {
            let lan = await lang();
            setlanguage(lan);
        })();
    }, [language]);

    const getCalorie = async () => {
        if (description.length > 3) {
            setclick(true);
            let res = await calculate_calories(description.replace(/(\r\n|\n|\r)/gm, " "));
            console.log('set this RES ', res, typeof(res));
            setapires(res);
            if(res.length < 1) {
                setclick(false);
                Alert.alert('Enter correct description');
            } else {
                let obj = sumNutrientValues(res);
                setdata(obj);
                let newObj = { ...obj, datetime: moment().format('YYYY-MM-D HH:mm:s'), intake: route.params?.type };
                await add_diet_report_to_local_storage(newObj);
                setclick(false);
                setresultview(true);
            }
        } else {
            Alert.alert('Enter correct description');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                resultview ? (<CalorieResult title={route.params?.type} setresultview={setresultview} dataset={data} apires={apires} />) : (
                    <>
                        <PageHeader screenTitle={language.calDesc.title} navigation={navigation} />
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={styles.keyboardAvoidingView}
                            keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.mainContainer}>
                                    <Text style={styles.title}>{language.calDesc.title}</Text>

                                    <TextInput style={styles.inputContainer} placeholder={language.calDesc.placeholder} placeholderTextColor={'#989898'} textAlignVertical='top' multiline onChangeText={setdescription} />
                                </View>
                                {
                                    click ? (<ActivityIndicator size={'large'} color={'#C6C6C6'} />) : (<TouchableOpacity
                                        onPress={getCalorie}
                                        style={styles.button}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{ color: '#fff', fontSize: 16, fontFamily: 'Raleway-ExtraBold' }}>
                                            {language.calDesc.submit}
                                        </Text>
                                    </TouchableOpacity>)
                                }

                            </ScrollView>
                        </KeyboardAvoidingView>

                    </>
                )
            }

            {/* BANNER AD */}
            <View
                style={{
                    height: 'auto',
                    width: width,
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: '#F4F4FE'
                }}>

                <Banner />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height
    },
    mainContainer: {
        width: width * 0.95,
        alignSelf: 'center',
        marginBottom: 35
    },
    title: {
        color: '#2E2E2E',
        fontSize: 20,
        fontFamily: 'Roboto',
        marginLeft: 10,
        marginVertical: 15,
    },
    inputContainer: {
        width: '93%',
        paddingHorizontal: 15,
        borderColor: '#069C8B',
        borderWidth: 2,
        alignSelf: 'center',
        borderRadius: 15,
        height: height * 0.32,
    },
    button: {
        alignSelf: 'center',
        width: btnWidth,
        height: 176 * btnRatio,
        backgroundColor: '#009f8b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
});
export default CalorieDescriptionScreen;