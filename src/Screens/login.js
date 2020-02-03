import React, { Component } from 'react';
import { Image, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import {
    Container,
    Header,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Input,
    Label,
    Title,
    Spinner,
    View,
} from 'native-base';
import { verticalScale, scale } from '../Components/scaling'
import firebase from 'react-native-firebase'
import { yelloColor } from '../Components/Helper/colors';
import citiBee from '../../assests/citibeee.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            loading: false,
            userType: ''
        }
    }


    handleLogin = () => {
        if (this.state.email == 'Admin' || this.state.email == 'admin') {
            if (this.state.password == 'admin@123' || this.state.password == 'Admin@123') {
                this.props.navigation.navigate('WelcomAdmin')
            }
            else {
                alert('Email or Password Incorrect')
            }
        }
        else {
            alert('Email or Password Incorrect')
        }
    }


    render() {

        return (
            <KeyboardAwareScrollView>
                <Container style={{ backgroundColor: yelloColor, }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Image style={{ height: verticalScale(150), width: scale(150), }}
                            source={citiBee}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={{ flex: 1.5, }}>
                        <View style={{ flex: 1, paddingHorizontal: scale(12), paddingBottom: verticalScale(12), }}>

                            <Form>
                                <FormItem floatingLabel last>
                                    <Label>Email</Label>
                                    <Input onChangeText={(email) => this.setState({ email: email })} />
                                </FormItem>
                                <FormItem floatingLabel last>
                                    <Label>Password</Label>
                                    <Input onChangeText={(password) => this.setState({ password: password })} secureTextEntry={true} />
                                </FormItem>

                            </Form>
                        </View>
                        <View style={{ flex: 1.5, paddingHorizontal: scale(12), paddingVertical: verticalScale(12) }}>
                            <View>
                                <Button
                                    onPress={() => this.handleLogin()}
                                    full style={{ backgroundColor: 'white', borderRadius: 10, }}>
                                    {this.state.loading ? <ActivityIndicator color='white' /> :
                                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}> Login </Text>
                                    }

                                </Button>

                            </View>
                        </View>
                    </View>
                </Container>
            </KeyboardAwareScrollView>

        );
    }
}