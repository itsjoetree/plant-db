import React from 'react';
import Home from './components/Home';
import { Routes, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import DbTable from './components/DbTable';
import DbForm from './components/DbForm';
import DbItem from './components/DbItem';
import SomethingWentWrong from './components/SomethingWentWrong';
import Layout from './components/Layout';
import { PlantApiInfo } from './types';
import axios from 'axios';
import Loading from './components/Loading';

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
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:controller" element={<DbTable />} />
          <Route path="/:controller/new" element={<DbForm />} />
          <Route path="/:controller/:id" element={<DbItem />} />
          <Route path="/:controller/:id/edit" element={<DbForm />} />
          <Route path="/:controller/:id/:action" element={<DbItem />} />
          <Route path="*" element={<SomethingWentWrong />} />
        </Routes>
      </Layout>
    </AppContext.Provider>
  );
}

interface IAppContext {
  plantApiInfo: PlantApiInfo[]
}

export const AppContext = React.createContext<IAppContext | null>(null)

export default App;
