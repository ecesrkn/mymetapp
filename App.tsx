import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Navigation from './src/navigation/navigation';
import Loading from './src/components/loading';

function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Navigation />
      <Loading />
    </SafeAreaProvider>
  );
}


export default App;
