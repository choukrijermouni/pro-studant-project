import {
  Modal,
  Button,
  ButtonVariation
} from '@pro_boa/ui'
import { billingCycleId } from 'constants/'
import { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Text from './text.json'

const ModalContent = (step, setStep, setIsOpen, learners, editEmails) => {
  const [subscriptionType, setSubscriptionType] = useState(billingCycleId.without)
  const [selectedTeam, setSelectedTeam] = useState('')
  switch (step) {
    case 1: return (
      <Step1
        learners={learners}
        subscriptionType={subscriptionType}
        setSubscriptionType={setSubscriptionType}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        editLearners={() => setStep(2)}
        nextStep={() => setStep(3)}
        closeModal={() => {
          setIsOpen(false)
          setStep(1)
        }}
      />
    )
    case 2: return (
      <Step2
        learners={learners}
        subscriptionType={subscriptionType}
        selectedTeam={selectedTeam}
        cancelEdit={() => setStep(1)}
        nextStep={() => setStep(3)}
        editEmails={editEmails}
        closeModal={() => {
          setIsOpen(false)
          setStep(1)
        }}
      />
    )
    case 3: return (
      <Step3
        nextStep={() => setStep(3)}
        closeModal={() => {
          editEmails([])
          setIsOpen(false)
          setStep(1)
        }}
      />
    )

    default: return null
  }
}

export default ({ learnersEmail = '', disableSubmit, editEmails }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const listOfEmails = learnersEmail.split('\n').filter(email => email)
  return (
    <>
      <Button
        dataTest='open-invite-modal-modal-button'
        variation={ButtonVariation.primary}
        marginButton='24px 0 0 0'
        label={Text.inviteButton}
        width='100%'
        handleClick={() => setIsOpen(!isOpen)}
        disabled={disableSubmit}
      />
      <Modal
        handleClose={() => {
          setStep(1)
          setIsOpen(false)
        }}
        isOpen={isOpen}
      >
        {ModalContent(step, setStep, setIsOpen, listOfEmails, editEmails)}
      </Modal>
    </>
  )
}
