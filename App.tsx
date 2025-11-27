import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Navigation from './src/navigation/navigation';

function App() {
  return (
    <SafeAreaProvider style={{flex:1}}>
      <Navigation />
    </SafeAreaProvider>
  );
}


export default App;
