import { Avatars, amazonBucket } from 'constants/'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useIntercom } from 'react-use-intercom'

export default () => {
  const { boot, update } = useIntercom()
  const { Email = '', FirstName = '', LastName = '', Phone = '', Id: managerId = null, Photo = '' } = useSelector(({ organizationProfile }) => organizationProfile)
  const { Id: companyId = null, Name = '', licenseInfo = { TotalLicensesRemaining: 0 }, Country = '' } = useSelector(({ organization }) => organization)
  const { Total = 0 } = useSelector(({ learners }) => learners)
  const { Count = 0 } = useSelector(({ managers }) => managers)
  const userDetails = {
    userId: managerId,
    email: Email,
    name: `${FirstName} ${LastName}`,
    phone: Phone,
    avatar: {
      type: 'image',
      imageUrl: Photo ? `${amazonBucket.bucketBaseUrl}${Photo}` : `${amazonBucket.avatar}${Avatars.anonymous}`
    },
    company: {
      companyId: companyId,
      name: Name,
      customAttributes: {
        nbr_licences_restantes: licenseInfo.TotalLicensesRemaining,
        nbr_managers: Count,
        country: Country,
        nbr_users: Total
      }
    }
  }
  useEffect(() => {
    if (managerId && companyId) boot(userDetails)
  }, [managerId, companyId])
  useEffect(() => {
    if (managerId && companyId) update(userDetails)
  }, [
    licenseInfo.TotalLicensesRemaining,
    Count,
    Total,
    Email,
    FirstName,
    LastName,
    Photo
  ])
  return null
}
