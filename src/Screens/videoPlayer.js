import React, { Component } from 'react';
import Video from 'react-native-video';
import ProgressBar from 'react-native-progress/Bar'
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Iconn from "react-native-vector-icons/FontAwesome";
import {
    Container,
    Header,
    Body,
    Input,
    Title,
    Button,
    Icon,
    Item as FormItem, Form,
    Label,
    Left,
}
    from 'native-base'
import { yelloColor } from '../Components/Helper/colors';


function secondsToTime(time) {
    return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
}
export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: false,
            progress: 0,
            duration: 0,
            // videoTitle: this.props.navigation.state.params.videoTitle,
            videoUrl: this.props.navigation.state.params.videoUrl
        }
    }
    componentDidMount = () => {
       console.log('here ',this.props.navigation.state.params.videoUrl)
    };


    handleMainButtonTouch = () => {

        if (this.state.progress > 1) {
            this.player.seek(0);
        }
        this.setState(state => {
            return {
                paused: !state.paused
            }
        })
    }

    handleProgressPress = (e) => {
        const position = e.nativeEvent.locationX;
        const progress = (position / 250) * this.state.duration;
        this.player.seek(progress);
    }

    handleEnd = () => {
        this.setState({
            paused: true
        })
    }

    handleLoad = (meta) => {
        this.setState({
            duration: meta.duration
        })
    }

    handleProgress = (progress) => {
        this.setState({
            progress: progress.currentTime / this.state.duration
        })
    }


    videoError = () => {

    }
    onBuffer = () => {

    }
    render() {
        const { width } = Dimensions.get('window');
        const height = width * 1.0625;
        return (
            <Container>
                <Header style={{backgroundColor:yelloColor}}>
                <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                    <Icon style={{color:'black'}} name='arrow-back' />
                </Button>
                <Body>
                    <Title style={{color:'black'}} >{'Showing Video'}</Title>

                </Body>
                </Header>
            <View style={{ flex: 1, }}>
                <View>
                    <Video
                        paused={this.state.paused}
                        style={{ width: '100%', height }}
                        resizeMode={'stretch'}
                        onLoad={this.handleLoad}
                        onProgress={this.handleProgress}
                        onEnd={this.handleEnd}
                        source={{ uri: this.state.videoUrl }}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}                                      // Store reference
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onError={this.videoError}               // Callback when video cannot be loaded
                    // style={styles.backgroundVideo}
                    />
                    <View style={styles.controls}>
                        <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
                            <Iconn style={{color:yelloColor}} name={!this.state.paused ? "pause" : "play"} size={30} color={'fff'} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.handleProgressPress}>
                            <View>
                                <ProgressBar
                                    progress={this.state.progress}
                                    color={yelloColor}
                                    unfilledColor="rgba(255, 255, 255, .5)"
                                    borderColor="#fff"
                                    width={250}
                                    height={20}

                                />

                            </View>

                        </TouchableWithoutFeedback>
                        <Text style={styles.duration}>
                            {secondsToTime(Math.floor(this.state.progress * this.state.duration))}

                        </Text>
                    </View>
                </View>
            </View>
            </Container >
        )
    }
}
var styles = StyleSheet.create({
    backgroundVideo: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        width: '100%',
        flex: 1

    },
    controls: {

        position: 'absolute',
        backgroundColor: "rgba(0,0,0,0.5)",
        height: 48,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,

    },
    mainButton: {
        marginRight: 15
    },
    duration: {
        color: yelloColor,
        marginLeft: 15
    }
});