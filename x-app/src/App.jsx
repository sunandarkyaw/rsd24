import AppDrawer from "./componenets/AppDrawer";
import { useUIState } from "./providers/UIStateProvider";
import Header from "./componenets/Header";

export default function App() {
  const { openDrawer, setOpenDrawer } = useUIState();

  return <div>
    <AppDrawer />
    <Header />
  </div>
}