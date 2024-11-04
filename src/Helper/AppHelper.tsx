import { View, Text, Alert } from 'react-native';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNIap from 'react-native-iap';
//import messaging from '@react-native-firebase/messaging';
export const APPID = 3; // TEST APPID=3, LIVE APPID=4
export const AWS_S3_URL = 'https://cvmakeruserimages.s3.amazonaws.com/blogs/';
export const API_KEY = '98b51cbe28734a39b7e104101241005';
export const BASE_URL = 'https://mrlapps.care20.com/api/sugar_app/'; // live server
// export const BASE_URL = 'http://192.168.10.43/MRL-Apps/MRL-Apps/public/api/sugar_app/'; // local server

const RECIPT_URL = 'https://sandbox.itunes.apple.com/verifyReceipt' // for debug mode
// const RECIPT_URL = 'https://buy.itunes.apple.com/verifyReceipt' // for live mode

// NINJA'S API
const apiKey = 'uc22NmzobKOLStlCCKCyiA==0c21y6wx3jBfgtHd'; // Replace with your API key
const APP_SHARED_SECRET = '503c8ddb49ca46198f8c4f1be8bb0ddf';
export const IMG_BASE_URL = 'https://mrlapps.care20.com/uploads/'; // live server
export const MEAL_IMG_URL = 'https://mrlapps.care20.com/uploads/'; // local server
export const ADD_USER = BASE_URL + 'add-user';
export const DASHBOARD = BASE_URL + 'dashboard';
export const GET_REPORT = BASE_URL + 'get-reports';
export const CHART_DATA = BASE_URL + 'chart-data';
export const ADD_REPORT = BASE_URL + 'add-new-report';
export const DELETE_REPORT = BASE_URL + 'delete-report';
export const GET_MEAL_PLAN = BASE_URL + 'get-meal-plan';
export const GET_BLOGS = BASE_URL + 'get-blogs';
export const FILTER_REPORT = BASE_URL + 'get-filter-report';

// AVAILABLE LANGUAGES
export const languageAssets = [
  { icon: require('../assets/icons/languages/english.png'), name: 'English', type: 'en' },
  { icon: require('../assets/icons/languages/germen.png'), name: 'Deutsch', type: 'gr' },
  { icon: require('../assets/icons/languages/spanish.png'), name: 'Española', type: 'es' },
  { icon: require('../assets/icons/languages/french.png'), name: 'Français', type: 'fr' },
  { icon: require('../assets/icons/languages/turkish.png'), name: 'Türkçe', type: 'tr' },
  { icon: require('../assets/icons/languages/itlay.png'), name: 'Italia', type: 'it' },
  { icon: require('../assets/icons/languages/russian.png'), name: 'Русский', type: 'ru' },
  { icon: require('../assets/icons/languages/japnease.png'), name: '日本語', type: 'jp' },
  { icon: require('../assets/icons/languages/korean.png'), name: '한국인', type: 'ko' },
  { icon: require('../assets/icons/languages/vietnam.png'), name: 'Tiếng Việt', type: 'vt' },
  { icon: require('../assets/icons/languages/tamil.png'), name: 'தமிழ்', type: 'tml' },
  { icon: require('../assets/icons/languages/khmer.png'), name: 'ខ្មែរ', type: 'khmr' },
  { icon: require('../assets/icons/languages/thailand.png'), name: 'แบบไทย', type: 'thi' }
];

export const duration = [
  'Before meal',
  'After meal',
  'Fasting',
  'After sleep',
  'Other',
];

export const REPORT_TYPES = {
  temperature: 'temperature',
  weight: 'weight',
  medicine: 'medicine',
  aic: 'aic',
  sugar: 'sugar',
  bp: 'bp',
  bmi: 'bmi',
  heartRate: 'heart_rate',
};

export const set_async_data = async (name: any, value: any) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const get_async_data = async (name: any) => {
  try {
    const data = await AsyncStorage.getItem(name);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    return false;
  }
};

export const generateFCM = async () => {
  // await messaging().registerDeviceForRemoteMessages();
  // const token = await messaging().getToken();
  await set_async_data('fcm_token', 'token');
  await set_async_data('on_board', 'onboard');
};
// add Data into DB

export const dashboard = async () => {
  let userID = await get_async_data('user_id');
  const resposne = await fetch(DASHBOARD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({ user_id: userID }),
  });
  let res = await resposne.json();
  return res;
};
export const get_report = async (reportType: string) => {
  let storedData: any = await AsyncStorage.getItem('report');
  storedData = JSON.parse(storedData);
  let reportData: any = [];
  if (storedData) {
    if (reportType == 'bp') {
      storedData.map((data: any, index: any) => {
        if (data.report_type == 'bp') {
          reportData.push(data);
        }
      });
      return reportData;
    }

    if (reportType == 'sugar') {
      storedData.map((data: any, index: any) => {
        if (data.report_type == 'sugar') {
          reportData.push(data);
        }
      });
      return reportData;
    }

    if (reportType == 'bmi') {
      storedData.map((data: any, index: any) => {
        if (data.report_type == 'bmi') {
          reportData.push(data);
        }
      });
      return reportData;
    }

    if (reportType == 'temperature') {
      storedData.map((data: any, index: any) => {
        if (data.report_type == 'temperature') {
          reportData.push(data);
        }
      });
      return reportData;
    }

    if (reportType == 'heart_rate') {
      storedData.map((data: any, index: any) => {
        if (data.report_type == 'heart_rate') {
          reportData.push(data);
        }
      });
      return reportData;
    }
  }
  return reportData;
};
export const filter_report = async () => {
  let filteredData: any = {
    avg_24: {},
    Average: {},
    minimum: {},
    maximum: {},
    Last_Insert_data: {},
  }
  let bpData: any = [];
  let data: any = await AsyncStorage.getItem('report');
  data = JSON.parse(data);

  data.map((data: any, index: any) => {
    if (data.report_type == 'bp') {
      bpData.push(data);
    }
  });
  // populate latest entered record
  filteredData.Last_Insert_data = bpData[bpData.length - 1];
  // populate minimum entered record
  filteredData.minimum = bpData[0];
  // populate maximum entered record
  filteredData.maximum = bpData[bpData.length - 1];
  // populate average bp record
  filteredData.Average = avg_bp_record(bpData);
  return filteredData;
};

// filter out latest BP
const avg_bp_record = (records: any) => {
  if (records.length === 0) return { averageSystolic: 0, averageDiastolic: 0 };

  let totalSystolic = 0;
  let totalDiastolic = 0;
  let totalPulse = 0;

  records.forEach((record: any) => {
    totalSystolic += parseInt(record.systolic_pressure, 10);
    totalDiastolic += parseInt(record.diastolic_pressure, 10);
    totalPulse += parseInt(record.pulse, 10);
  });

  const averageSystolic = totalSystolic / records.length;
  const averageDiastolic = totalDiastolic / records.length;
  const averagePulse = totalPulse / records.length;

  return {
    systolic_pressure: averageSystolic.toFixed(0),
    diastolic_pressure: averageDiastolic.toFixed(0),
    pulse: averagePulse.toFixed(2),
  };
}

// export const get_pdf_report = async (data: any) => {
//   const resposne = await fetch(GET_REPORT, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Requested-With': 'XMLHttpRequest',
//     },
//     body: JSON.stringify(data),
//   });
//   let res = await resposne.json();
//   return res.data;
// };
export const add_report = async (postData: any) => {
  try {
    const storedData = await AsyncStorage.getItem('report');
    let dataArray = [];

    // Check if storedData is not null and is valid JSON
    if (storedData) {
      dataArray = JSON.parse(storedData);
    }
    dataArray.push(postData);
    await AsyncStorage.setItem('report', JSON.stringify(dataArray));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const get_chart_data = async (reportType: string) => {
  let record: any = await get_async_data('report');
  if (record) {
    // record = JSON.parse(record);
    return arrange_data_for_graph(record, reportType);
  }
};

const arrange_data_for_graph = (record: any, reportType: any) => {
  let data: any = {};
  let systolic_pressure: any = [];
  let diastolic_pressure: any = [];
  let sugar: any = [];
  let label: any = [];
  let result: any = [];
  let bmi: any = [];
  let temperature: any = [];
  let heart_rate: any = [];

  if (reportType == 'bp') {
    record.forEach((entry: any) => {
      if (entry.report_type == 'bp') {
        systolic_pressure.push(entry.systolic_pressure);
        diastolic_pressure.push(entry.diastolic_pressure);
        label.push(entry.datetime)
      }
    });
    data['systolic_pressure'] = systolic_pressure;
    data['diastolic_pressure'] = diastolic_pressure;
    data['label'] = label;
    return data;
  }
  if (reportType == 'sugar') {
    record.forEach((entry: any) => {
      if (entry.report_type == 'sugar') {
        sugar.push(entry.sugar_concentration);
        label.push(entry.datetime);
      }
    });
    data['data'] = sugar;
    data['label'] = label;
    return data;
  }
  if (reportType == 'bmi') {
    record.forEach((entry: any) => {
      if (entry.report_type == 'bmi') {
        bmi.push(entry.bmi);
        label.push(entry.datetime);
        result.push(entry.status);
      }
    });
    data['data'] = bmi;
    data['label'] = label;
    data['result'] = result;
    return data;
  }
  if (reportType == 'temperature') {
    record.forEach((entry: any) => {
      if (entry.report_type == 'temperature') {
        temperature.push(entry.temperature);
        label.push(entry.datetime);
        result.push(entry.status);
      }
    });
    data['data'] = temperature;
    data['label'] = label;
    data['result'] = result;
    return data;
  }
  if (reportType == 'heartRate') {
    record.forEach((entry: any) => {
      if (entry.report_type == 'heart_rate') {
        heart_rate.push(entry.heartRate);
        label.push(entry.datetime);
      }
    });
    data['data'] = heart_rate;
    data['label'] = label;
    return data;
  }
}

// ---------------------   CALORIE MODULE FUNCTIONS  -------------------------------------------------------

export const calculate_calories = async (query: any) => {
  try {
    const request = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    const response = await request.json();
    return response;
  } catch (e) {
    console.log('error api', e);
    return e;
  }
}

// ADD DIET REPORT
export const sumNutrientValues = (arr: any) => {
  // Initialize the result object with 0 values
  let result = {
    cholesterol_mg: 0,
    fat_total_g: 0,
    potassium_mg: 0,
    carbohydrates_total_g: 0,
    sodium_mg: 0,
    sugar_g: 0,
    fiber_g: 0,
    calories: 0,
    protein_g: 0
  };

  // Iterate over each object in the array and sum the values
  arr.forEach((item: any) => {
    result.cholesterol_mg += item.cholesterol_mg;
    result.fat_total_g += item.fat_total_g;
    result.potassium_mg += item.potassium_mg;
    result.carbohydrates_total_g += item.carbohydrates_total_g;
    result.sodium_mg += item.sodium_mg;
    result.sugar_g += item.sugar_g;
    result.fiber_g += item.fiber_g;
    result.calories += item.calories;
    result.protein_g += item.protein_g;
  });

  return result;
}
export const add_diet_report_to_local_storage = async (postData: any) => {
  try {
    const storedData = await AsyncStorage.getItem('diet_report');
    let dataArray = [];

    // Check if storedData is not null and is valid JSON
    if (storedData) {
      dataArray = JSON.parse(storedData);
    }
    dataArray.push(postData);
    await AsyncStorage.setItem('diet_report', JSON.stringify(dataArray));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const sumNutrients = async (arr: any) => {
  // Initialize the result object with 0 values
  let result = await get_async_data('diet_report');

  // Iterate over each object in the array and sum the values
  arr.forEach((item: any) => {
    result.cholesterol += item.cholesterol_mg;
    result.sodium += item.sodium_mg;
    result.potassium += item.potassium_mg;
    result.fiber += item.fiber_g;
    result.fats += item.fat_total_g;
  });

  return result;
}

export const getMonthName = (dateString: any) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const parts = dateString.split('-');
  const monthNumber = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (monthNumber >= 1 && monthNumber <= 12 && day >= 1 && day <= 31) {
    const monthName = months[monthNumber - 1];
    let name = monthName + ', ' + day;
    return name.toString();
  } else {
    return 'Invalid Date';
  }
};
export const errorMessage = () => {
  return (
    <View style={{ width: '80%', alignSelf: 'center', zIndex: 1 }}>
      <Text style={{ color: '#f00', textAlign: 'center' }}>
        Fill out the form correctly
      </Text>
    </View>
  );
};

export const remarks = (systolicpressure: any, diastolicpressure: any) => {

  if (systolicpressure != '' && diastolicpressure != '') {
    return;
  }

  if (systolicpressure < 120 && diastolicpressure < 80) {
    return 'Normal';
  }
  if (
    systolicpressure >= 120 ||
    (systolicpressure <= 129 && diastolicpressure < 80)
  ) {
    return 'Elevated';
  }

  if (
    systolicpressure >= 130 ||
    (systolicpressure <= 139 && diastolicpressure >= 80) ||
    diastolicpressure <= 89
  ) {
    return 'Hypertension';
  }

  if (systolicpressure >= 140 && diastolicpressure >= 90) {
    return 'Hypertensive';
  }
};

export const systolicValues = () => {
  let arr = [];
  for (let i = 60; i <= 300; i++) {
    arr.push(i.toString());
  }
  return arr;
};
export const diastolicValues = () => {
  let arr = [];
  for (let i = 20; i <= 200; i++) {
    arr.push(i.toString());
  }
  return arr;
};
export const pulseValues = () => {
  let arr = [];
  for (let i = 60; i <= 200; i++) {
    arr.push(i.toString());
  }
  return arr;
};

export const ageList = () => {
  let arr = [];
  for (let i = 7; i <= 110; i++) {
    arr.push(i.toString());
  }
  return arr;
};

export const pulse_rate_measurement = async (start: any, end: any) => {
  let pulse_rate = await get_async_data('pulse_rate');
  // if (pulse_rate != null) {
  //     let pulse_rate_start = pulse_rate - 5;
  //     let pulse_rate_end = pulse_rate + 5;
  //     let new_pulse_rate = randomIntFromInterval(pulse_rate_start, pulse_rate_end);
  //     return new_pulse_rate;
  // }
  // else {
  let pulse = randomIntFromInterval(start, end);
  await set_async_data('pulse_rate', pulse);
  return pulse_rate;
  // }
};

const randomIntFromInterval = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const roundNearestAfterDecimal = (num: any) => {
  // Convert the number to a string
  const numStr = num.toString();

  // Split the string by the decimal point
  const parts = numStr.split('.');

  // If there is no decimal point or no digits after the decimal point, return the original number
  if (parts.length < 2 || parts[1].length === 0) {
    return num;
  }

  // Get the digit immediately after the decimal point
  const nextDigit = parseInt(parts[1][0], 10);

  // Check if the next digit is greater than or equal to 5
  if (nextDigit >= 5) {
    // If it is, round the number up
    return Math.ceil(num);
  } else {
    // If it's not, round the number down
    return Math.floor(num);
  }
};

export const weather_api_request = async (location: any) => {
  const resposne = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  let res = await resposne.json();
  return res;
};

// CUCTOM DATE PICKER HELPER FUNCTIONS
export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const globalDate = new Date();

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const addMonth = (month: any) => {
  if (month == 11) {
  }
};
export const subMonth = (month: any) => {
  if (month == 1) {
  }
};

export const generate_table_as_pdf = async () => {
  let bpData = await get_report('bp');
  let sugarData = await get_report('sugar');
  let bmiData = await get_report('bmi');

  return [bpData, sugarData, bmiData];
}

//---------------------------------------------- AVAILABLE PURCHASE ---------------------------------------------

export const fetchAvailablePurchases = async () => {
  let purchases: any = false;
  let history: any = [];
  try {
    // Initialize the IAP connection
    await RNIap.initConnection();
    // Get all available purchases
    let check = await RNIap.getAvailablePurchases({
      onlyIncludeActiveItems: true,
    });
    history = check;
    if (check && check[0].transactionDate) {
      set_async_data('subscription', check);
    }
    await RNIap.endConnection();
    purchases = true;
    return true;
  } catch (error) {
    return false;
    console.error('Error fetching available purchases:', error);
    Alert.alert('Error', 'Could not retrieve available purchases');

  } finally {
    // End the IAP connection after completing the process
    console.log('ending connection here');
    const receipt = await RNIap.getReceiptIOS({ forceRefresh: true });
    // console.log('LATEST',receipt);
    // let recipt = history[0].transactionReceipt;
    // recipt = Buffer.from(recipt, 'utf-8').toString('base64')
    // console.log('converted', recipt);
    const receiptBody = {
      'receipt-data': receipt,
      'password': APP_SHARED_SECRET
    };

    let response = await validateReceipt(receiptBody);
    console.log('purchase validation', response);
    await RNIap.endConnection();
    return response;
    // return purchases; old
  }
}

export const disableAds = async () => {
  let purchase = await get_async_data('subscription');
  let subscriptionActive = await get_async_data('subscription_active');
  if (purchase && parseInt(purchase.length) > 0) {
    if(subscriptionActive) {
      return true;
    }
    return false;
  } else {
    return false;
  }
}

const validateReceipt = async (receiptBody: any) => {
  try {
    const request = await fetch(RECIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receiptBody),
    });
    const response = await request.json();
    if (response.status === 0) {
      // now check for expiration date
      const latestReceiptInfo = response.latest_receipt_info || response.receipt.in_app;
      const currentDate = new Date();

      // Find the most recent subscription
      const latestSubscription = latestReceiptInfo.reduce((latest:any, item:any) => {
        const expiresDate = new Date(parseInt(item.expires_date_ms, 10));
        return expiresDate > (latest ? new Date(parseInt(latest.expires_date_ms, 10)) : 0) ? item : latest;
      }, null);

      if (latestSubscription) {
        const expirationDate = new Date(parseInt(latestSubscription.expires_date_ms, 10));

        if (expirationDate > currentDate) {
          console.log("Subscription is active");
          await set_async_data('subscription_active', true);
          return true; // Subscription is active
        } else {
          console.log("Subscription has expired");
          await set_async_data('subscription_active', false);
          return false; // Subscription has expired
        }
      }
      await set_async_data('subscription_active', false);
      console.warn("No valid subscription found in receipt");
      return false; // No subscription info found

    }
  } catch (error) {
    console.error('Receipt validation error:', error);
    await set_async_data('subscription_active', false);
    return false;
  }
};