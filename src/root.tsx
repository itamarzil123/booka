import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './router/main-router';
import StoreProvider from './store/store';
import './index.css';

const queryClient = new QueryClient();

function Root() {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default Root;
