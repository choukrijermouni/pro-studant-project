import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Icons, Icon } from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import { help } from 'assets'

const useStyles = createUseStyles(style)

export default ({
  isOpen,
  title,
  children,
  handleClose,
  justify,
  align,
  margin,
  className,
  helplink
}) => {
  const node = useRef(null)
  const [modalAnimation, setModalAnimation] = useState(true)
  const { modalWrapper, modalInner, overlay, titleStyle, cross, linkClass, messageContainer, topStyle } = useStyles({ justify, align, margin, helplink, modalAnimation })

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const handleCloseDelay = () => {
    setModalAnimation(false)
    setTimeout(() => {
      handleClose()
      setModalAnimation(true)
    }, 200)
  }

  const handleClick = (e) => node && node.current && !node.current.contains(e.target) && !isOpen && handleCloseDelay()

  return (
    isOpen && (
      <div className={overlay} onClick={(e) => e.stopPropagation()}>
        <div className={modalWrapper} data-div='modal'>
          <div className={classNames(modalInner, className)} ref={node}>
            <div className={topStyle}>
              {helplink
                ? (
                  <a href={helplink} rel='noopener noreferrer' target='_blank' className={linkClass}>
                    <div className={messageContainer}>
                      <img src={help} alt='helpIcon' />
                    </div>
                  </a>)
                : null}
              <Icon handleIconClick={handleCloseDelay} style={cross} iconName={Icons.close} />
            </div>
            {title && <h2 className={titleStyle}>{title}</h2>}
            {children}
          </div>
        </div>
      </div>
    )
  )
}
