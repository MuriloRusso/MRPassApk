// import { GlobalContext } from '@/contexts/GlobalContext';
// import React, { useContext, useEffect } from 'react';
// import { ActivityIndicator, StyleSheet, View } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// type LoadingProps = {

// }

// const { loading } = useContext(GlobalContext);

// useEffect(()=>{
//     console.log('loading***');
//     console.log(loading);
    
// }, [])

// const Loading = (/**{visible}: {visible:boolean}*/) => (
//     loading &&
//     <View style={{backgroundColor: "#fff", width: "100%", height: "100%", position: 'fixed', left: 0, top: 0, zIndex: 9}}>
//         <SafeAreaProvider>
//             <SafeAreaView style={[styles.container, styles.horizontal]}>
//                 <ActivityIndicator size="large" color="#FE715B" />
//             </SafeAreaView>
//         </SafeAreaProvider>
//     </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   horizontal: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
// });

// export default Loading;