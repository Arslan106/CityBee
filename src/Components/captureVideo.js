import React, { PureComponent } from 'react';
import VideoRecorder from 'react-native-beautiful-video-recorder';
import { View, TouchableOpacity } from 'react-native'

export default class CaptureVideo extends PureComponent {

    start = () => {
        // 30 seconds
        this.videoRecorder.open({ maxLength: 30 }, (data) => {
            console.log('captured data', data);
        });
    }

    render() {
        console.log('here i am')
        return (
            <View>
                <TouchableOpacity onPress={this.start}>
                    <Text>Start</Text>
                </TouchableOpacity>
                <VideoRecorder ref={(ref) => { this.videoRecorder = ref; }} />
            </View>

        )
    }

}