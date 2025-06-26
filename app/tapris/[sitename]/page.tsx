import { redirect } from 'next/navigation'
import { TapriService } from '@/lib/services/tapri-service'

interface TapriSiteNamePageProps {
  params: {
    siteName: string
  }
}

export default async function TapriSiteNamePage({ params }: TapriSiteNamePageProps) {
  if (!params?.siteName) {
    console.error('Missing siteName in params')
    return <div>Not Found</div>
  }

  try {
    const { data } = await TapriService.getTapriBySiteName(params.siteName)
    if (data) {
      redirect(`/tapris/${data.id}`)
    }
  } catch (error) {
    console.error('Error fetching tapri by siteName:', error)
  }
  return <div>Not Found</div>
}
