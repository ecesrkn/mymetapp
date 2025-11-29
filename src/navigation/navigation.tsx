import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/home";
import HomeHeader from "../components/headers/home";
import { Department } from "../types/departments";
import DefaultHeader from "../components/headers/default";
import DepartmentScreen from "../screens/department";
import { MetObject } from "../types/objects";
import ObjectScreen from "../screens/object";
import { palette } from "../styles/color-palette";

export enum Urls {
    Home = 'Home',
    DepartmentDetail = 'DepartmentDetail',
    ObjectDetail = 'ObjectDetail'
}
export type RootStackParamList = {
    'Home': undefined;
    'DepartmentDetail': Department;
    'ObjectDetail': {object: MetObject};
};
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return <NavigationContainer ref={navigationRef}  >
        <Stack.Navigator initialRouteName={Urls.Home} >
            <Stack.Screen name={Urls.Home} component={HomeScreen} options={{
                header: () => <HomeHeader />,
            }} />
            <Stack.Screen name={Urls.DepartmentDetail} component={DepartmentScreen} options={{
                header: () => <DefaultHeader title="" backgroundColor={palette.softYellow} />,
            }} />
            <Stack.Screen name={Urls.ObjectDetail} component={ObjectScreen} options={{
                header: () => <DefaultHeader title="" backgroundColor={palette.cream} />,
            }} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Navigation;