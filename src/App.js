import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

import styles from './App.module.css'

const colors = [
  '#ffbe0b',
  '#fb5607',
  '#ff006e',
  '#8338ec'
]

export function App() {
  const [values, setValues] = useState([2, 3, 4, 5])

  useEffect(() => {
    const socket = io('http://localhost:3001')
    socket.on('data', (data) => setValues(data))
  }, [])

  return (
    <div className={styles.blocks}>
      {values.map((value, index) => (
        <Block key={index} {...{ value }} />
      ))}
    </div>
  )
}

function Block({ value }) {
  const style = {
    backgroundColor: colors[value - 2], 
    border: value === 0 ? '2px dashed #000' : '2px solid #fff'
  }

  return (
    <div className={styles.block} {...{ style }}>
      {value > 1 ? value - 1 : null }
    </div>
  )
}
