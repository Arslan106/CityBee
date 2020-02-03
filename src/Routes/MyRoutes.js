import FirstScreen from '../Screens/firstScreen'
import Login from '../Screens/login'
import Main from '../Screens/main'
import VideoPlayer from '../Screens/videoPlayer'
import SendEmail from '../Screens/SendEmail'
import UploadVideo from '../Screens/UploadVideo'
import WelcomAdmin from '../Screens/WelcomAdmin'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const AppNavigator = createStackNavigator({
  
    FirstScreen:{
          screen:FirstScreen
    },
    Main:{
        screen:Main
    },
    Login:{
        screen:Login
    },
    VideoPlayer:{
        screen:VideoPlayer
    },
    SendEmail:{
        screen:SendEmail
    },
    UploadVideo:{
        screen:UploadVideo
    },
    WelcomAdmin:{
        screen:WelcomAdmin
    }

},{
    headerMode:'none'
})

const routes = createAppContainer(AppNavigator)

export default routes