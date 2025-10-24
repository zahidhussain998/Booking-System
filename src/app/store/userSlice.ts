// userSlice.js
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import  supabase  from "../lib/Supabase"



type Room = {
    base_price: any;
    image_Url: any;
    id: number
    name: string
    discription: string
    avaliblity: string
    location: string
    address: string
    capacity: number
    charge: number
    square: number
    created_at?: string
}


type RoomsState = {
    items: Room[]
    loading: boolean,
    error: null,
    uploadImage: string | null
}

const initialState: RoomsState =
{
    items: [],
    loading: false,
    error: null,
    uploadImage: null,
}


const BASE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rooms`
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!


const baseHeaders: HeadersInit = {
  apikey: ANON,
  Authorization: `Bearer ${ANON}`,
  'Content-Type': 'application/json',
}

export const addRoom = createAsyncThunk<Room, Omit<Room, 'id'>>('rooms/add',
     async (payload) => {
        const res = await fetch(`${BASE_URL}`, {
            method:'POST',
            headers : {...baseHeaders, prefer:'return=representation'},
        body: JSON.stringify(payload)



        })
        

        if(!res.ok) throw new Error("faild to create")

            const data:Room[] = await res.json()
            return data
    }
)


export const uploadImage = createAsyncThunk<string, File>('rooms/upload',
    async(file:File) => {
        console.log("the image is reached here")
        const filePath = `rooms/${Date.now()}-${file.name}`

        const {error} = await supabase.storage
        .from("rooms_bucket")
        .upload(filePath, file)

        if(error) {
            throw new Error(error.message)
        }

        const {data} = supabase.storage.from("rooms_bucket").getPublicUrl(filePath)

        console.log(data, "the image is uploaded")

        return data.publicUrl
    }
)

export const fetchRooms = createAsyncThunk<Room[]>('rooms/fetchAll',
  async () => {
    const res = await fetch(`${BASE_URL}?select=*`, { headers: baseHeaders });
    if (!res.ok) throw new Error("failed to fetch");
    const data: Room[] = await res.json();
    return data;
  }
);





const userSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addRoom.fulfilled, (state, action:PayloadAction<Room>) => {
                state.items.push(action.payload); // update local state immediately
            })

            .addCase(uploadImage.fulfilled, (state, action) => {
              state.uploadImage = action.payload
            })
    }
});



export default  userSlice.reducer;
