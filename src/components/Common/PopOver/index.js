import { cloneElement, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'

const useStyle = createUseStyles(style)
const PopoverContext = createContext({
  isShow: false,
  setIsShow: null
})
export const Popover = ({ children }) => {
  const { wrapper } = useStyle()
  const [isShow, setIsShow] = useState(false)
  const contextValue = {
    isShow,
    setIsShow
  }
  return (
    <div className={wrapper}>
      <PopoverContext.Provider value={contextValue}>
        {children}
      </PopoverContext.Provider>
    </div>
  )
}

export const PopoverTrigger = ({ children }) => {
  const { setIsShow } = useContext(PopoverContext)
  const onClick = (e) => {
    setIsShow((isShow) => !isShow)
  }
  const childrenToTriggerPopover = cloneElement(children, {
    onClick: (e) => onClick(e)
  })
  return childrenToTriggerPopover
}

export const PopoverContent = ({ children, topPosition }) => {
  const { isShow } = useContext(PopoverContext)

  if (!isShow) {
    return null
  }

  return <ContentInternal topPosition={topPosition}>{children}</ContentInternal>
}
const ContentInternal = ({ children, topPosition }) => {
  const { container } = useStyle(topPosition)
  const { setIsShow } =
    useContext(PopoverContext)
  const ref = useRef(null)

  const dismiss = useCallback(() => {
    setIsShow(false)
  }, [])
  const refClickOutside = useClickOutside(dismiss)

  const mergedRef = mergeRef(ref, refClickOutside)
  return (
    <div
      data-div='modal'
      ref={mergedRef}
      className={container}
    >
      {children}
    </div>
  )
}

const useClickOutside = (callback) => {
  const ref = useRef(null)
  useEffect(() => {
    const onClick = (e) => {
      callback()
    }
    window.setTimeout(() => document.addEventListener('click', onClick), 0)
    return () => {
      window.setTimeout(
        () => document.removeEventListener('click', onClick),
        0
      )
    }
  }, [])
  return ref
}
const mergeRef = (...refs) => {
  return (el) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(el)
      } else {
        ref.current = el
      }
    })
  }
}
