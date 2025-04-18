import { MantineProvider, Stack, createTheme } from '@mantine/core'
import CustomEditor from './CustomEditor'
import { HeaderSimple } from './HeaderSimple';
import CustomTable from './CustomTable';

import { useEffect, useState } from 'react';
import { addNote, getAllNotes, deleteNote, Note } from './db';

const theme = createTheme({
  /** Your theme override here */
});

function App() {

  const [notes, setNotes] = useState<Note[]>([]);

  const refreshItems = async () => {
    const allNotes = await getAllNotes();
    setNotes(allNotes);
  };

  useEffect(() => {
    refreshItems();
  }, [notes]);


  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>

      <HeaderSimple></HeaderSimple>
      <Stack>
        <CustomEditor></CustomEditor>
        <CustomTable notes={notes}></CustomTable>
      </Stack>

    </MantineProvider>
  )
}

export default App
