import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/home";
import HomeHeader from "../components/headers/home";

export enum Urls {
    Home = 'Home',
}
export type RootStackParamList = {
    'Home': undefined;
};
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return <NavigationContainer ref={navigationRef} >
        <Stack.Navigator initialRouteName={Urls.Home} >
            <Stack.Screen name={Urls.Home} component={HomeScreen} options={{
            header: () => <HomeHeader />,
        }} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Navigation;