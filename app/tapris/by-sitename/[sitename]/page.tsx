import { redirect } from 'next/navigation'
import { TapriService } from '@/lib/services/tapri-service'

interface TapriSiteNamePageProps {
  params: {
    sitename: string
  }
}

export default async function TapriSiteNamePage({ params }: TapriSiteNamePageProps) {
  if (!params?.sitename) {
    console.error('Missing sitename in params')
    return <div>Not Found</div>
  }

  try {
    const { data } = await TapriService.getTapriBySiteName(params.sitename)
    if (data) {
      redirect(`/tapris/${data.id}`)
    }
  } catch (error) {
    console.error('Error fetching tapri by sitename:', error)
  }
  return <div>Not Found</div>
}