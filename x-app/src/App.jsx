import AppDrawer from "./componenets/AppDrawer";
import { useUIState } from "./providers/UIStateProvider";

export default function App() {
  const { openDrawer, setOpenDrawer } = useUIState();

  return <div>
    <AppDrawer />
    <button onClick={() => {
      setOpenDrawer(!openDrawer);
    }}>Toggle</button>
  </div>
}