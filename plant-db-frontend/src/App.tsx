import React from 'react';
import Home from './components/Home';
import { Routes, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import DbTable from './components/DbTable';
import DbForm from './components/DbForm';
import DbItem from './components/DbItem';
import SomethingWentWrong from './components/SomethingWentWrong';
import { PlantApiInfo } from './types';
import axios from 'axios';
import Loading from './components/Loading';
import { MantineProvider } from '@mantine/core';
import Layout from './components/Layout';

export const APP_COLOR = "#4188ff"

function App() {
  const [plantApiInfo, setPlantApiInfo] = React.useState<PlantApiInfo[]>()
  const [hasInitLoadError, setHasInitLoadError] = React.useState<boolean>(false)

  React.useEffect(() => {
    axios.get<PlantApiInfo[]>("/api/app-info")
      .then(response => setPlantApiInfo(response.data))
      .catch(_err => setHasInitLoadError(true))
  }, [])

  if (hasInitLoadError) return <SomethingWentWrong />
  else if (plantApiInfo === undefined) return <Loading />

  return (
    <AppContext.Provider value={{plantApiInfo: plantApiInfo}}>
      <MantineProvider theme={{ primaryColor: "green" }}>
        <Routes>
          <Route path="/" element={<Layout component={<Home />} />} />
          <Route path="/:controller" element={<Layout component={<DbTable />} />} />
          <Route path="/:controller/new" element={<Layout component={<DbForm />} />} />
          <Route path="/:controller/:id" element={<DbItem />} />
          <Route path="/:controller/:id/:action" element={<DbItem />} />
          <Route path="*" element={<Layout component={<Layout component={<SomethingWentWrong />} />} />} />
        </Routes>
      </MantineProvider>
    </AppContext.Provider>
  );
}

interface IAppContext {
  plantApiInfo: PlantApiInfo[]
}

export const AppContext = React.createContext<IAppContext | null>(null)

export default App;
