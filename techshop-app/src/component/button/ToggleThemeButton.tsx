'use client'
import { useUIContext } from '@/shared/context/UIContext'

export default function ToggleThemeButton() {
  const { state, dispatch } = useUIContext()
  return (
    <>
      <div
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        className={'relative flex h-5 w-9 items-center rounded-2xl bg-gray-700/80'}
      >
        <div
          className={`absolute ${state.theme === 'light' ? 'translate-x-0 bg-gray-500' : 'translate-x-4 bg-blue-700'} left-0.5 top-0.5 size-4 translate-x-0 transform rounded-full backdrop-blur-lg duration-500`}
        ></div>
      </div>
    </>
  )
}
