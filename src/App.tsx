import './App.css'
import { MantineProvider, createTheme } from '@mantine/core'
import Demo from './Demo'
import { HeaderSimple } from './HeaderSimple';

const theme = createTheme({
  /** Your theme override here */
});

function App() {

  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <HeaderSimple></HeaderSimple>
      <Demo></Demo>
    </MantineProvider>
  )
}

export default App
