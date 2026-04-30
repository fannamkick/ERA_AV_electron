import { gameRuntime } from './runtime';
import { AppLayout } from './ui/AppLayout';

export function App() {
  return <AppLayout runtime={gameRuntime} />;
}
