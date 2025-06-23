import { TypographyElement } from '@pro_boa/ui'
import Layout from 'components/Common/Layout'
import Text from './text'
import InviteModal from 'components/Common/InviteBar/InviteModal/InviteModalContainer'
import ProfileInfo from 'components/Profile/ProfileInfo'
import MyAccount from 'pages/MyAccount'
import UserCard from 'components/Team/UserCard'
import UserHistory from 'components/UserHistory'
import TeamCard from 'components/Team/TeamCard'
import ManagerCard from 'components/Manager/ManagerCard'
import MailCard from 'components/Common/Cards/MailCard'
import Profil from 'mock/profile'
export default () => {
  return (
    <Layout>
      <div>
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          spacing='20px 0 30px 0'
        >
          {Text.profileInfo}
        </TypographyElement>
        <ProfileInfo size='size_4' />
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          spacing='20px 0 30px 0'
        />

        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          spacing='20px 0 30px 0'
        >
          {Text.managerCard}
        </TypographyElement>
        <ManagerCard />
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          spacing='20px 0 30px 0'
        >
          {Text.mailCard}
        </TypographyElement>
        <MailCard Data={Profil} />
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          spacing='20px 0 30px 0'
        >
          {Text.userCard}
        </TypographyElement>
        <UserCard />
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          spacing='20px 0 30px 0'
        >
          {Text.teamCard}
        </TypographyElement>
        <TeamCard />
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          spacing='20px 0 30px 0'
        >
          {Text.userHistory}
        </TypographyElement>
        <UserHistory />
        <MyAccount />
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          spacing='20px 0 30px 0'
        >
          {Text.inviteModal}
        </TypographyElement>
        <InviteModal />
      </div>
    </Layout>
  )
}
