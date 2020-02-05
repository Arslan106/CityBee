import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import {
    Header, Container, Title, Body, Left, Right, Button,
    Icon,
} from 'native-base'
import { yelloColor, blackColor } from '../Components/Helper/colors';
import { FlatList } from 'react-native-gesture-handler';
import Mystorage from './Mystorage';
import PureRow from '../Components/verticalVideos';
import { verticalScale } from '../Components/scaling'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            videoAddress: '',
            videoDateTime: '',
            isloading: false
        }
    }
    componentDidMount = () => {
        this.setState({
            isloading: true
        })
        let video = []
        console.log('this.props', this.props.navigation.state.params.data)
        setTimeout(() => {
            new Mystorage().getVideo().then((resp) => {
                // console.log('response', JSON.parse(resp))
                let data = JSON.parse(resp)
                // console.log('in elfds', data)
                video.push(data)
                return Promise.resolve(data)

            }).then((data) => {
                // console.log('asdasdsadasd', data)
                let joined = this.state.videos.concat(data);
                this.setState({ videos: joined, isloading: false })

            })
        }, 3000);


    };


    handleStateDelete = (_item, _index) => {
        // console.log('in main handleDelete', _item, _index)
        this.setState({
            video: this.state.videos.splice(_index, 1)
        })
        // console.log('this.state.videos',this.state.videos)
        new Mystorage().getVideo().then((resp) => {
            let data = JSON.parse(resp);
            data.splice(_index, 1)
            // console.log('sdfasdfasdfasdf', data)
            new Mystorage().AddVideo(JSON.stringify(data))

        })

    }



    _renderItem = ({ item, index }) => {
        console.log('here i am', this.state.videos.length, this.props.navigation)
        return (
            <PureRow item={item} index={index} nav={this.props.navigation} lastItem={this.props.navigation.state.params.data} handleStateDelete={this.handleStateDelete} />
        )
    }

    render() {
        console.log('hsdfsad', this.state.videos)
        return (
            <Container >
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon style={{ color: 'black' }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black' }}>Welcome</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1, backgroundColor: yelloColor, paddingTop: verticalScale(12) }}>
                    {this.state.isloading ?
                        <ActivityIndicator size={30} color={blackColor} />
                        :
                        <FlatList
                            ref={ref => { this.flatList = ref; }}
                            disableVirtualization={false}
                            data={this.state.videos}
                            renderItem={this._renderItem}
                        />
                    }

                </View>
            </Container>
        )
    }
}