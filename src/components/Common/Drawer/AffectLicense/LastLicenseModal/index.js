import React, { useEffect, useRef } from 'react'
import {
  Modal,
  Button,
  ButtonVariation,
  ButtonSize,
  TypographyElement,
  neutral
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import Text from './text.json'
import style from './style'

const useStyles = createUseStyles(style)

export default ({ openModal, handleClose, handleSubmit }) => {
  const node = useRef(null)

  const { modal, header, controlStyle, licenseButtons, line } = useStyles()
  const handleClick = (e) => node && node.current && !node.current.contains(e.target) && !openModal && handleClose()
  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])
  return (
    <>
      <Modal
        handleClose={handleClose}
        isOpen={openModal}

      >
        <div data-test='remove-learner-modal' ref={node}>
          <div className={modal}>
            <div className={header}>
              <div className={controlStyle}>
                <TypographyElement
                  component='h2'
                  variant='heading2'
                  align='left'
                  fontSize='16px'
                  spacing='16px 0 0 0'
                  color={neutral[6]}
                >
                  {Text.content}
                </TypographyElement>
              </div>
            </div>
            <div className={controlStyle}>
              <hr className={line} />
              <div className={licenseButtons}>
                <Button
                  variation={ButtonVariation.secondary}
                  size={ButtonSize.big}
                  width={153} height={54}
                  label={Text.abortButton}
                  handleClick={handleClose}
                />
                <Button
                  dataTest='confirm-remove-learner'
                  variation={ButtonVariation.primary}
                  size={ButtonSize.big}
                  width={153}
                  height={54}
                  label={Text.confirmButton}
                  handleClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
