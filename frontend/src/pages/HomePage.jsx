import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitUI from "../components/RateLimitUI";
import api from "../lib/axios";
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard";
import NotesNoteFound from "../components/NotesNoteFound";

const HomePage = () => {
  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {

        const res = await api.get("/notes")
        console.log(res.data);
        setNotes(res.data)
        setRateLimited(false)
      } catch (error) {

        console.log("error fetch data");
        console.log(error);
        if(error.response?.status === 429 ){
          setRateLimited(true)
        }else{

          toast.error("failed to load notes")
        }
      } finally{
        setloading(false)
      }
    }

    fetchNotes();
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar/>

      {rateLimited && <RateLimitUI/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes....</div>}

        {notes.length === 0 && !rateLimited && <NotesNoteFound/> }
      
        {notes.length > 0 && !rateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note =>
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage