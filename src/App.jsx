import { useState } from 'react'
import './App.css'
import TabBar from './components/TabBar'
import ScrollTransformHeader from './components/ScrollTransformHeader.jsx'

function App() {
  return (
    <>
      <TabBar />
      <div style={{ paddingTop: '60px' }}>
        <ScrollTransformHeader />
      </div>
    </>
  );
}

export default App;