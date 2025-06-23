import { useState } from 'react'
import OnBoardingStep1 from './OnBoardingStep1'
import OnBoardingStep2 from './OnBoardingStep2'
import OnBoardingSuccess from './OnBoardingSuccess'

export default ({ isInvited }) => {
  const [step, setStep] = useState(0)
  switch (step) {
    case 0:
      return <OnBoardingStep1 setStep={setStep} isInvited={isInvited} />
    case 1:
      return <OnBoardingStep2 setStep={setStep} isInvited={isInvited} />
    case 2:
      return <OnBoardingSuccess setStep={setStep} isInvited={isInvited} />
    default:
      return <OnBoardingStep1 setStep={setStep} />
  }
}
