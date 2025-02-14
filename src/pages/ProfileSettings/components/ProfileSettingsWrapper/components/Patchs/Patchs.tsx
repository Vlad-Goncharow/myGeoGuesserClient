import axios from '@/axios'
import React from 'react'
import Patch from './components/Patch/Patch'
import s from './Patchs.module.scss'

function Patchs() {
  const [patchs, setPatchs] = React.useState<string[]>([])
  React.useEffect(() => {
    ;(async () => {
      const { data } = await axios.get('/files/patchs')
      setPatchs(data)
    })()
  }, [])

  return (
    <div className={s.list}>
      {patchs.map((el) => (
        <Patch patchUrl={el} key={el} />
      ))}
    </div>
  )
}

export default Patchs
