import React, { createContext, useContext, useState, useEffect } from 'react'
import { Icons, Icon, blue } from '@pro_boa/ui'
import { style } from './drawerStyle'
import drawerEnum, { defaultWidth } from './drawerEnum'
import { help } from 'assets'

const DrawerContext = createContext()

export const useDrawer = () => {
  return useContext(DrawerContext)
}

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [drawerContent, setDrawerContent] = useState(null)
  const [width, setWidth] = useState(defaultWidth)
  const [helpLink, setHelpLink] = useState(null)
  const [isPageBackgroundVisible, setIsPageBackgroundVisible] = useState(false)
  const { drawer, drawerOpen, closeIcon, pageBackground, header, linkClass, messageContainer } = style({ width, helpLink })

  const openDrawer = ({ componentName, props }) => {
    const selectedComponent = drawerEnum[componentName]
    if (selectedComponent) {
      setDrawerContent(selectedComponent.component(props))
      setWidth(selectedComponent.width)
      setHelpLink(selectedComponent.helpLink)
      setIsOpen(true)
      setIsPageBackgroundVisible(true)
    }
  }

  const closeDrawer = () => {
    setDrawerContent(null)
    setIsOpen(false)
    setIsPageBackgroundVisible(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest('#drawer')) {
        closeDrawer()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, drawer])
  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, drawerContent }}>
      {children}
      <div id='drawer' className={`${drawer} ${isOpen ? drawerOpen : ''}`}>
        <div className={header}>
          {helpLink
            ? (
              <a href={helpLink} rel='noopener noreferrer' target='_blank' className={linkClass}>
                <div className={messageContainer}>
                  <img src={help} alt='helpIcon' />
                </div>
              </a>)
            : null}
          <Icon handleIconClick={closeDrawer} color={blue[0]} iconName={Icons.close} style={closeIcon} />
        </div>
        {drawerContent}
      </div>
      {isPageBackgroundVisible && <div className={pageBackground} style={{ backgroundColor: isPageBackgroundVisible ? 'rgba(0, 0, 0, 0.7)' : 'transparent' }} />}
    </DrawerContext.Provider>
  )
}
