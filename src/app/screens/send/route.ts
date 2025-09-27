
import  {Resend }from 'resend'
import { EmailTemplate } from '@/app/components/EmailTamplate'
import supabase from '@/app/lib/Supabase';

const Resended = new Resend(process.env.RESEND_API_KEY) 




export async function Post () {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    
       if (error) {
         console.error('Error fetching user:', error.message);
       }

    try {
        
      const { data, error } = await Resended.emails.send({
      from: 'startup@booking.com',
      to: [user?.email],
      subject: 'Hello world',
      react: EmailTemplate({ firstName }),
    });

    if(error){
        return Response.json(error)
    }
    return Response.json(data)
    
    } catch (error) {
        console.log(error)
    }
}
