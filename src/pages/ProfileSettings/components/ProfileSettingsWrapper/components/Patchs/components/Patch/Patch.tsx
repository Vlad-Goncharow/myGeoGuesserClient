import classNames from 'classnames'
import React from 'react'
import Preview from '../Preview/Preview'
import s from './Patch.module.scss'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'

interface PatchProps {
  patchUrl: string
}

const Patch: React.FC<PatchProps> = ({ patchUrl }) => {
  const { user } = useAppSelector(getAuth)
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={s.patch}>
      <div
        onClick={() => setIsOpen(true)}
        className={classNames(s.patch__wrapper, {
          [s.patch__wrapper_active]: user?.patch === patchUrl,
        })}
      >
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/uploads${patchUrl}`}
          alt=''
        />
      </div>

      <Preview patch={patchUrl} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Patch
