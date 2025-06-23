import { useState, useEffect } from 'react'
import OnBoardingStep1 from './Step1'
import OnBoardingStep2 from './Step2'
import OnBoardingStep3 from './Step3'
import OnBoardingSuccess from './OnBoardingSuccess'
import { useDispatch } from 'react-redux'
import { fetchOrganizationProfileAction } from 'pages/MyAccount/store'

export default () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrganizationProfileAction())
  }, [])
  const [step, setStep] = useState(0)
  switch (step) {
    case 0:
      return <OnBoardingStep2 setStep={setStep} />
    case 1:
      return <OnBoardingStep3 setStep={setStep} />
    case 2:
      return <OnBoardingSuccess setStep={setStep} />
    default:
      return <OnBoardingStep1 setStep={setStep} />
  }
}
