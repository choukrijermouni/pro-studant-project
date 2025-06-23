import {
  Modal,
  Button,
  ButtonVariation,
  ButtonSize
} from '@pro_boa/ui'
import { useState } from 'react'
import Text from './text.json'
import TransferLicence from 'components/Common/InviteBar/InviteModal/TransferLicence'

export default () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button
        variation={ButtonVariation.primary}
        marginButton='10px 0 20px 0'
        size={ButtonSize.big}
        label={Text.buttonText}
        width={330}
        height={47}
        handleClick={() => setIsOpen(!isOpen)}
      />
      <Modal
        handleClose={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      >
        <TransferLicence />
      </Modal>
    </>
  )
}
