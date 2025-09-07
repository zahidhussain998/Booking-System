'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import supabase from '../../../lib/Supabase'
import { createClient } from '../../../utils/server'

export async function login(formData: FormData) {
  const supabase = await createClient()


  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

    console.log("this is from the login",data)

  if (error) {
  console.log("Supabase login error:", error)
  redirect('/error')
}

  revalidatePath('/', 'layout')
  redirect('/')
};

  export async function handleGoogleLogin ()  {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });

    if (data.url) {
  redirect(data.url) // use the redirect API for your server framework
}
    if (error) {
      console.error("Google login error:", error.message);
    }
  };


export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)
    console.log("this is from the signup",data)


  if (error) {
  console.log("Supabase login error:", error)
}

  revalidatePath('/', 'layout')
  redirect('/screens/login')
}

