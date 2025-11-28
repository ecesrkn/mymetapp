import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Navigation from './src/navigation/navigation';
import Loading from './src/components/loading';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalState } from './src/contexts/global-state';

function App() {
  const incrementLoadingCount = useGlobalState(state => state.incrementLoadingCount);
  const decrementLoadingCount = useGlobalState(state => state.decrementLoadingCount);
  const loadFavoriteDepartments = useGlobalState(state => state.loadFavoriteDepartments);

  useEffect(() => {
    launchApp();
  }, []);

  const launchApp = async () => {
    incrementLoadingCount();
    await loadFavoriteDepartments();
    decrementLoadingCount();
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Navigation />
      <Loading />
    </SafeAreaProvider>
  );
}


export default App;
