import React, { Component } from 'react';
import { Header, Container, Title, Body, Left, Right } from 'native-base'
import { View, FlatList, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase';
import { yelloColor, blackColor } from '../Components/Helper/colors';
import PureRowAdmin from '../Components/adminVerticleVideo';
import { verticalScale, scale } from '../Components/scaling'


const db = firebase.database()
let tempData = []
export default class WelcomAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allVideos: [],
            isloading: false

        }
    }

    componentDidMount = () => {
        this.setState({
            isloading: true
        })
        const ref = firebase.database().ref("user")
        console.log('db ', ref)
        let that = this

        ref.once('value', function (snapshot) {
            let key = Object.keys(snapshot.val())
            let data = snapshot.val()
            key.map((item, index) => {
                console.log('item', data[item])
                tempData.push(data[item])

            })
            that.setState({
                allVideos: tempData,
                isloading:false
            })

        })
    };
    _renderItem = ({ item, index }) => {
        console.log('here i am', item, this.props.navigation)
        return (
            <PureRowAdmin item={item} index={index} nav={this.props.navigation} handleStateDelete={this.handleStateDelete} />
        )
    }

    render() {
        return (
            <Container >
                <Header style={{ backgroundColor: 'white' }}>
                    <Left />
                    <Body>
                        <Title style={{ color: 'black' }}>Welcome</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1, backgroundColor: yelloColor, paddingTop: verticalScale(12) }}>
                    {this.state.isloading ?
                        <ActivityIndicator  size={30} color={blackColor} />
                        :
                        <FlatList
                            ref={ref => { this.flatList = ref; }}
                            disableVirtualization={false}
                            data={this.state.allVideos}
                            renderItem={this._renderItem}
                        />

                    }

                </View>
            </Container>

        )
    }

}