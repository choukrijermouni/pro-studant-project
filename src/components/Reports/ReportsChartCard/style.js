import {
  loadingSkeleton,
  loadingSkeletonAnimation,
  neutral
} from '@pro_boa/ui'

export default {
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 4,
    border: `1px solid ${neutral[1]}`
  },
  primaryDot: {
    height: 16,
    width: 16,
    backgroundColor: ({ primaryColor }) => primaryColor,
    borderRadius: '50%',
    display: 'inline-block'
  },
  secondaryDot: {
    height: 16,
    width: 16,
    backgroundColor: ({ secondaryColor }) => secondaryColor,
    borderRadius: '50%',
    display: 'inline-block'
  },
  licenseInfoContainer: {
    height: 80,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: 20
  },
  licenseInfoStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartContainer: {
    margin: '0 auto',
    maxWidth: '100%',
    position: 'relative',
    width: 180,
    height: 200,
    marginTop: 20
  },
  skeletonContainer: ({ loading }) => ({
    position: 'relative',
    padding: '15px 18px',
    height: 175,
    width: 175,
    borderRadius: 50,
    ...(loading && loadingSkeleton({ borderRadius: '50%' }).core)
  }),
  ...loadingSkeletonAnimation,
  chartInner: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '10%',
    right: '20%',
    bottom: '20%',
    left: '20%',
    overflow: 'hidden'
  }
}
