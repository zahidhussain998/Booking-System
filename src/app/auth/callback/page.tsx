"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const handleSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

    
      if (error) {
        console.error("Session error:", error.message);
      }
      


      if (session) {
        router.push("/dashboard"); // redirect where you want after login
      } else {
        router.push("/screens/login");
      }
    };

    handleSession();
  }, [supabase, router]);

  return <p>Loading...</p>;
}
