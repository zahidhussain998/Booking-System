"use client";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, uploadImage } from "../../store/userSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
import { FileUpload } from "@/components/ui/file-upload";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

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
  image_Url?: string   // store the public or signed URL here
  created_at?: string
};

function Page() {
  const router = useRouter(); // for navigation
  const dispatch = useDispatch(); 

  const uploadedImageUrl = useSelector((state: RootState) => state.user.uploadImage);// getting the image form the uploadImage

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>(); //hook form for handling the user input filed easy to handling the events



  

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
    <div className=" max-w-2xl mx-auto">
      <h1 className="text-2xl mb-10 text-black font-bold">Slot Detail's</h1>
   <form onSubmit={handleSubmit(create)} className="space-y-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label className="text-sm font-medium">Room Name</label>
      <input required {...register("name")}
        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>

    <div>
      <label className="text-sm font-medium">Room Description</label>
      <input required {...register("discription")}
        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>

    <div>
      <label className="text-sm font-medium">Room Square Feet</label>
      <input required {...register("square")}
        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>

    <div>
      <label className="text-sm font-medium">Room Capacity</label>
      <input required {...register("capacity")}
        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>

    <div>
      <label className="text-sm font-medium">Charges per hour</label>
      <input required {...register("charge")}
        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>

    <div>
      <label className="text-sm font-medium">Room Address</label>
      <input required {...register("address")}
        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>

    <div>
      <label className="text-sm font-medium">Room Location</label>
      <input required {...register("location")}
        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>

    <div>
      <label className="text-sm font-medium">Room Availability</label>
      <input required {...register("avaliblity")}
        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>
  </div>

  {/* File Upload */}
  <div className="mt-6">
    <FileUpload onChange={handleImage} />
  </div>

  {/* Submit Button */}
  <div className="flex justify-center mt-10">
    <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-6 py-2"
      onClick={() => router.push("/screens/slots")}
    >
      <span>Submit</span>
    </HoverBorderGradient>
  </div>
</form>

    </div>
  );
}

export default Page;
