import HomeScreen from "./(tabs)/HomeScreen"
import {stack } from "expo-router"

const Stacklayout = () =>{
    return(<Stack>
        <Stack.Screen name="Home" component={HomeScreen} />
    </Stack>
    
    )
}