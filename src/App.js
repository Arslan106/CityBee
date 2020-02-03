import React, { Component } from 'react';
import AppNavigator from '../src/Routes/MyRoutes'
import SplashScreen from 'react-native-splash-screen'

export default class App extends React.Component{
    constructor(props) {
        super(props);
        console.disableYellowBox = true
     }
    componentDidMount = () => {
        SplashScreen.hide()
      };
   
      
    render(){
        return(
            <AppNavigator />

        )
    }
}