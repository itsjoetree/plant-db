import React from 'react';
import Home from './components/Home';
import { Routes, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import DbTable from './components/DbTable';
import DbForm from './components/DbForm';
import DbItem from './components/DbItem';
import SomethingWentWrong from './components/SomethingWentWrong';
import Layout from './components/Layout';

function App() {
  return (
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
  );
}

export default App;
