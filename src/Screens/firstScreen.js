import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, Alert } from 'react-native';
import { yelloColor, blackColor } from '../Components/Helper/colors';
import { scale, verticalScale } from '../Components/scaling';
import { Button } from 'native-base'
import VideoRecorder from 'react-native-beautiful-video-recorder';
import CheckBox from 'react-native-check-box'
import citiBeee from '../../assests/citibeee.png'
import moment from 'moment';
import Mystorage from './Mystorage';
import { ScrollView } from 'react-native-gesture-handler';
let string1 = ''
export default class FirstScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            nextButton:false,
            myArray: [],
            videoDateTime: '',
            videoAddress: '',
            isScreenRecording:false

        }
    }
    start = () => {
        if(this.state.nextButton == false){
            // this.props.navigation.navigate('Record')

            alert('Please agree to our term & conditions!')

        }
        else{
            let newVideo = []
            this.videoRecorder.open({ maxLength: 30 }, (data) => {
            if (string1 != '' || string1 != undefined) {
                let tempObj = {
                    data: string1,
                    videoDateTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
                    videoAddress: this.state.videoAddress

                }
                new Mystorage().getVideo().then((res) => {
                    let response = JSON.parse(res)
                    return Promise.resolve(response)
                }).then((response) => {
                    console.log('here i ammmmmmmm', response)
                    if (response != null || response != undefined) {
                        response.map((item, index) => {
                            newVideo.push(item)
                        })
                        var joined = newVideo.concat(tempObj);
                        console.log('joinded', joined)
                        new Mystorage().AddVideo(JSON.stringify(joined))
                        this.props.navigation.navigate('Main', { data: string1, videoDateTime: this.state.videoDateTime, videoAddress: this.state.videoAddress })

                    }
                    else {

                        new Mystorage().AddVideo(JSON.stringify([tempObj]))
                        this.props.navigation.navigate('Main', { data: string1, videoDateTime: this.state.videoDateTime, videoAddress: this.state.videoAddress })

                    }

                }).catch(err => {
                    console.log(err)
                })

            }
            else {
                alert('Your Video Was Intrupted')
            }
        })

            // 30 seconds
            // this.videoRecorder.open({ maxLength: 30 }, (data) => {
            //     console.log('captured data', data);
                // if (!data.isRecordingInterrupted && data) {
                //     let tempObj = {
                //         data: data.uri,
                //         videoDateTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
                //         videoAddress: this.state.videoAddress
    
                //     }
                //     new Mystorage().getVideo().then((res) => {
                //         let response = JSON.parse(res)
                //         return Promise.resolve(response)
                //     }).then((response) => {
                //         console.log('here i ammmmmmmm', response)
                //         if (response != null || response != undefined) {
                //             response.map((item, index) => {
                //                 newVideo.push(item)
                //             })
                //             var joined = newVideo.concat(tempObj);
                //             console.log('joinded', joined)
                //             new Mystorage().AddVideo(JSON.stringify(joined))
                //             this.props.navigation.navigate('Main', { data: data, videoDateTime: this.state.videoDateTime, videoAddress: this.state.videoAddress })
    
                //         }
                //         else {
    
                //             new Mystorage().AddVideo(JSON.stringify([tempObj]))
                //             this.props.navigation.navigate('Main', { data: data, videoDateTime: this.state.videoDateTime, videoAddress: this.state.videoAddress })
    
                //         }
    
                //     }).catch(err => {
                //         console.log(err)
                //     })
    
                // }
                // else {
                //     alert('Your Video Was Intrupted')
                // }
            // });

        }
       
    }
    handlerLongClick = () => {

        this.props.navigation.navigate('Login')
    };

    firstInstructions = () => {

        return (
            <View style={{ flex: 1, paddingHorizontal: scale(12) }}>
                <StatusBar backgroundColor={yelloColor} hidden={this.state.isScreenRecording} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity onLongPress={this.handlerLongClick} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>

                        <Image style={{ height: verticalScale(180), width: scale(180), }}
                            source={citiBeee}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1, }}>

                        <Text style={{ fontStyle: 'normal', fontSize: 16,}}>
                            {'We encourage best safe practices and good judgement when making videos for submission.'}
                        </Text>
                        <Text style={{ fontStyle: 'bold', marginTop: verticalScale(5),fontSize: 16,  }}>
                            {'Citybee is not liable for any damages physical or material through the use of this application.'}
                        </Text>
                        <Text style={{ fontStyle: 'normal', marginTop: verticalScale(5),fontSize: 16,  }}>
                            {'The use of this application is completely voluntary and of your own volition.'}
                        </Text>
                        <Text style={{ fontStyle: 'normal',marginTop: verticalScale(5), fontSize: 16, }}>
                            {'You are not a representative or employee of Citybee LLC.'}
                        </Text>
                        <Text style={{ fontStyle: 'normal', marginTop: verticalScale(5),fontSize: 16, }}>
                            {'All videos are voluntarily submitted and thereafter become property of Citybee LLC.'}
                        </Text>
                        <Text style={{ fontStyle: 'normal', marginTop: verticalScale(5),fontSize: 16, }}>
                            {'By accepting the terms of use you agree to release Citybee and all associated parties from any and all liability incurred during use of this application.'}
                        </Text>
                        <CheckBox
                            style={{ marginTop: verticalScale(20) }}
                            onClick={() => {
                                this.setState({
                                    IsChecked: !this.state.IsChecked,
                                    nextButton:!this.state.IsChecked
                                })
                            }}
                            isChecked={this.state.IsChecked}
                            rightText={"I Agree to Terms & Conditions"}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

    gettingPath = (result) =>{
        // console.log('here is the path of vide',result,result.pop().path)
         string1 = 'file:///' + result.pop().path
        console.log('here is the full addres', string1)

    }

    isScreenRecording = (isRecord) =>{
        this.setState({
            isScreenRecording:isRecord
        })
    }


    gettingDataFromIndex = (location, time) => {
        console.log('gettingDataFromIndex : ', location, time)
        let now = moment().format('MMMM Do YYYY, h:mm:ss a');
        this.setState({
            videoDateTime: now,
            videoAddress: location
        })

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: yelloColor, }}>
                <View style={{ flex: 4, }}>
                    {this.firstInstructions()}

                </View>
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(12), }}>
                    <View style={{ flex: 0.5 }}>
                        <VideoRecorder ref={(ref) => { this.videoRecorder = ref; }}
                         gettingPath ={this.gettingPath}
                         isScreenRecording={this.isScreenRecording}
                          gettingDataFromIndex={this.gettingDataFromIndex} />

                    </View>
                    <Button full onPress={this.start}
                        style={{ backgroundColor: 'white', borderRadius: 10, }}>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}> NEXT </Text>
                    </Button>

                </View>
            </View>
        )
    }
}