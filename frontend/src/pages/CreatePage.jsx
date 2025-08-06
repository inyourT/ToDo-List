import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast';
import api from '../lib/axios';


const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading, setloading] = useState(false)

  const navigate = useNavigate()

  const handelSubmit = async (e) => {
      e.preventDefault()

      if (!title.trim() || !content.trim()){
        toast.error("All fields are required")
        return
      }

      setloading(true)
      try {
        await api.post("/notes",{
          title,
          content
        })
        toast.success("Note succes created")
        navigate("/")
      } catch (error) {
        console.log("error creating note:", error)
        if(error.response.status === 429){
          toast.error("Slow down! you're creating note too fast",{
            duration:4000
          })
        }else{
          toast.error("Failed to create note")
        }
      }finally{
        setloading(false)
      }
  }


  return <div className='min-h-screen bg-base-200'>
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5"/>
          Back to Notes
        </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handelSubmit}>

                <div className='form-control mb-4'>
                    <label className="label">
                      <span className='label-text'>Title</span>
                    </label>
                    <input type="text" 
                      placeholder="Note Title"
                      className='input input-bordered'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='form-control mb-4'>
                    <label className="label">
                      <span className='label-text'>Content</span>
                    </label>
                    <textarea
                      placeholder='Write Your note here..'
                      className='textarea textarea-bordered h-32'
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className='card-actions justify-between'>
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? "Craeting..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>

          </div>
      </div>
    </div>
  </div>
}

export default CreatePage