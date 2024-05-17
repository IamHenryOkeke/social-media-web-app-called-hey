import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import ForgotPasswordForm from './forgot-password-form'
import PreviousPageButton from '../ui/PreviousPageButton'

export const metadata: Metadata = {
  title: 'Forgot Password'
}

export default async function ForgotPassword() {
  const user = await auth()

  if (user) {
    redirect('/home')
  }

  return (
    <div>
      <div className='p-4 flex gap-3 items-center'>
        <PreviousPageButton />
        <h3 className='font-bold'>
          Reset Password
        </h3>
      </div>
      <ForgotPasswordForm />
    </div>
  )
}