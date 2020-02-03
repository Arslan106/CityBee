import { AsyncStorage } from 'react-native'

export default class Mystorage {
    videos = "videos"

    setItem(key, value){
        AsyncStorage.setItem(key, "".concat(value));
    }
    getItem(key){
        return AsyncStorage.getItem(key)
    }
    removeItem(key){
        return AsyncStorage.removeItem(key)
    }

    AddVideo (video) {
        console.log('heree in', video)
        this.setItem(this.videos, video)
    }
    getVideo (){
        return this.getItem(this.videos)
    }
    removeVideo (){
        return this.removeItem(this.videos)

    }

}