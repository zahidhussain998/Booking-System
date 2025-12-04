import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js';

function EmailSender() {
  const [email, setEmail] = useState<string | null>(null)
  useEffect(() => {
        const supabase = createClient(
           process.env.NEXT_PUBLIC_SUPABASE_URL!,
           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
         )
 supabase.auth.getUser().then(({data}) => {
  setEmail(data.user?.email??null)

 })
        
      }, []);
  return email
}

export default EmailSender