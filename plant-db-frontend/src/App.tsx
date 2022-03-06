import React from 'react';
import Home from './components/Home';
import { Routes, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import DbTable from './components/DbTable';
import DbForm from './components/DbForm';
import DbItem from './components/DbItem';
import NotFound from './components/NotFound';
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
