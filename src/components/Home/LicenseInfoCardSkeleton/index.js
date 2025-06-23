import NoLicencesUserCard from 'components/Home/NoLicencesUserCard'
import InfoCard from 'components/Common/Cards/InfoCard'
import { Skeleton } from '@pro_boa/ui'

const skeletonLicense = [...Array(2)]
export default () => {
  return (

    <InfoCard loading>
      <Skeleton lines={1} height={20} width='80%' margin='0 0 80px 0' />
      {skeletonLicense.map((_, index) => {
        return (
          <div key={index}>
            <NoLicencesUserCard loading />
          </div>
        )
      })}
    </InfoCard>
  )
}
