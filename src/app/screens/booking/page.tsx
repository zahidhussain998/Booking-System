"use client";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, uploadImage } from "../../store/userSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";

type Inputs = {
  example: string;
  exampleRequired: string;
  name: string;
  discription: string;
  avaliblity: string;
  location: string;
  address: string;
  capacity: string;
  charge: string;
  square: string;
  image_Url?: string   // 👈 store the public or signed URL here
  created_at?: string
};

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const uploadedImageUrl = useSelector((state: RootState) => state.user.uploadImage);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();



  

const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
   if(e.target.files && e.target.files[0]) {
      try {
        dispatch(uploadImage(e.target.files[0]));
      } catch (error) {
        console.error('Image upload failed:', error);
      } 
    }
  }
  const create = async (formData) => {
    try {
      const parsedData = {
        ...formData,
        capacity: parseInt(formData.capacity),
        charge: parseFloat(formData.charge),
        square: parseFloat(formData.square),
        image_Url: uploadedImageUrl || null
      };

 dispatch(addRoom(parsedData) as any);
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <div>
      <form onSubmit={handleSubmit(create)}>
        <div>
          <h1>Room Name</h1>
          <input type="text" placeholder="enter name" {...register("name")} />
        </div>

        <div>
          <h1>Room Discription</h1>
          <input
            type="text"
            placeholder="enter discription"
            {...register("discription")}
          />
        </div>
        <div>
          <h1>Room Squre Feet</h1>
          <input
            type="text"
            placeholder="enter avalibilty"
            {...register("avaliblity")}
          />
        </div>
        <div>
          <h1>Room Capacity</h1>
          <input
            type="text"
            placeholder="enter capacity"
            {...register("capacity")}
          />
        </div>

        <div>
          <h1>Charegis per-hour</h1>
          <input
            type="text"
            placeholder="enter charge"
            {...register("charge")}
          />
        </div>

        <div>
          <h1>Room address</h1>
          <input
            type="text"
            placeholder="enter address"
            {...register("address")}
          />
        </div>
        <div>
          <h1>Room location</h1>
          <input
            type="text"
            placeholder="enter location"
            {...register("location")}
          />
        </div>

        <div>
          <h1>Room avaliblity</h1>
          <input
            type="text"
            placeholder="enter square"
            {...register("square")}
          />

          <div>
            <h1>img</h1>
            
               <input type="file" accept="image/*"  onChange={handleImage}/>
               </div>
          <button type="submit" onClick={() => router.push("/screens/slots")}>submint</button>
        </div>

        {/* router push this on  */}
      </form>
    </div>
  );
}

export default Page;
