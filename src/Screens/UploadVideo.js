import React, { Component } from 'react';
import {
    Header, Container, Title, Body, Left, Right, Form,
    Item as FormItem,
    Input,
    Textarea,
    Label,
    Button,
    Icon

} from 'native-base'
import { View, Text, Alert, ActivityIndicator, Linking } from 'react-native'
import { yelloColor } from '../Components/Helper/colors';
import { verticalScale, scale } from '../Components/scaling';
import email from 'react-native-email'
import firebase from 'react-native-firebase'
import uuid from 'uuid'
import Mystorage from './Mystorage';
import { setKey, shorten, expand } from 'react-native-google-shortener';
import qs from 'qs'
import Mailer from 'react-native-mail';

setKey('AIzaSyCXv0kCVVwgaIYW3nniyUqSr8P7GLIYMW4');
const options = {
    title: 'Select video',
    mediaType: 'video',
    path: 'video',
    quality: 1,

};
export default class UploadVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: this.props.navigation.state.params.VideoLink.data,
            email: '',
            name: '',
            description: '',
            flag: true,
            loading: false,
            dataTime: '',
            videoAddress: '',
            downloadurl: ''



        }
    }
    componentDidMount = () => {
       
        new Mystorage().getVideo().then(response => {
            let data = JSON.parse(response)
            if (data) {
                data.map((item, index) => {
                    if (item.data == this.props.navigation.state.params.VideoLink.data) {
                        this.setState({
                            dataTime: item.videoDateTime,
                            videoAddress: item.videoAddress

                        })

                    }

                })

            }
        })

    };


    handleEmail = (url) => {
        console.log('in hanle url !', url)
        // const to = 'citybeeusa@gmail.com'
        // let _url = `mailto:${to}`;
        // const query = qs.stringify({
        //     subject: "Important",
        //     body: `<Link>${this.state.downloadurl}</Link>`,
        // });
        // if (query.length) {
        //     _url += `?${query}`;
        // }

        // try {
        //     Linking.openURL(_url)
        //     alert('Your Video Uploaded Successfully!')
        //     this.props.navigation.navigate('Main')
           
        // }
        // catch (e) {
        //     alert(e)
        // }
      
        try {
        Mailer.mail({
            subject: 'Important',
            recipients: ['citybeeusa@gmail.com'],
            body: `<b>Name : </b> ${this.state.name}<br/>
                   <b>Description : </b> ${this.state.description}<br/>
                   <b>here is the video url : </b> <Link>${this.state.downloadurl}</Link><br/>`,
            isHTML: true,
            attachment: {
              path:'',  // The absolute path of the file from which to read data.
              type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
              name: '',   // Optional: Custom filename for attachment
            }
          }, (error, event) => {
            Alert.alert(
              error,
              event,
              [
                {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
                {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
              ],
              { cancelable: true }
            )
          });
          alert('Your Video Uploaded Successfully!')
          this.props.navigation.navigate('Main')
        }
        catch (e) {
            alert(e)
        }

    }

    //upload file 
    uploadImage = () => {
        this.setState({
            loading: true
        })
        let uri = this.props.navigation.state.params.VideoLink.data
        const filename = `${uuid()}.mp4`;
        console.log('asdfasdfadsfasdf', uri, filename)
        firebase
            .storage()
            .ref(`videos/${filename}`)
            .putFile(uri)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    console.log('snapshot', snapshot)
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        this.setState({ loading: false,downloadurl: snapshot.downloadURL})
                        { this.state.flag && this.upload_data_to_firebase() }

                    }
                }
            );
    };
    upload_data_to_firebase = () => {
        this.setState({
            flag: false,
        })
        let payload = {
            username: this.state.email,
            description: this.state.description,
            videoUrl: this.state.downloadurl,
            dataTime: this.state.dataTime,
            location: this.state.videoAddress,

        }

        const db = firebase.database()
        db.ref('user').push(payload).then((result) => {
            console.log('result of firebase storege is ', result)

            this.handleEmail(this.state.downloadurl)


        })



    }


    handleAlert = () => {
        if (this.state.email.length == 0 || this.state.email == '' || this.state.description == '' || this.state.description.length == 0) {
            alert('Please Fill Form')
        }
        else {
            this.uploadImage()
        }
    }

    render() {
        return (
            <Container >
                <Header style={{ backgroundColor: 'white' }}>
                    <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                        <Icon style={{ color: 'black' }} name='arrow-back' />
                    </Button>
                    <Body>
                        <Title style={{ color: 'black' }}>CONTACT US</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1, backgroundColor: yelloColor, paddingHorizontal: scale(12), paddingTop: verticalScale(12) }}>
                    <Form>
                        <FormItem floatingLabel >
                            <Label>Your Name</Label>
                            <Input style={{}} onChangeText={(name) => this.setState({ name: name })} />
                        </FormItem>
                        <FormItem floatingLabel >
                            <Label>Your Email</Label>
                            <Input style={{}} onChangeText={(email) => this.setState({ email: email })} />
                        </FormItem>
                        <Textarea style={{ marginTop: verticalScale(8), marginHorizontal: scale(8) }} rowSpan={7} bordered placeholder="Please write description..." onChangeText={(text) => this.setState({ description: text })} />
                    </Form>
                    <View style={{ marginTop: verticalScale(12) }}>
                        <Button
                            // onPress={() => this.props.navigation.navigate('FirstScreen')}
                            onPress={() => this.handleAlert()}
                            full style={{ backgroundColor: 'white', borderRadius: 10, }}>
                            {this.state.loading ?
                                <ActivityIndicator size="small" color={yelloColor} />
                                :
                                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}> Send </Text>
                            }

                        </Button>
                        {/* <Button onPress={() => }
                            title="support@example.com" /> */}

                    </View>

                </View>


            </Container>
        )
    }
}