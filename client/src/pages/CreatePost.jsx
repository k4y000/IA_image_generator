import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRamdomPrompt } from '../utils'
import { FormField, Loader } from '../components'


const CreatePost = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', 
    prompt: '',
    photo: ''
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    setError("")
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://ia-image-generator-server.vercel.app/API/v1/dalle', 
                                        { method: 'POST', 
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify({ prompt: form.prompt })
                                    })
        const data = await response.json();
        if(data.status == 200) {
          setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`});
        } else {
          console.log(data);
          setError(`Error: ${data.error.message}`)
        }
      } catch(e) {
        console.log(e);
        setError("We have a situation here !")
      } finally {
        setGeneratingImg(false);
      }
    } else {
      setError("Please enter a prompt")
    }
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError("");
    setSubmitLoading(true);
    if(form.prompt && form.photo) {

      setLoading(true);

      try {
        const response = await fetch('https://ia-image-generator-server.vercel.app/api/v1/post', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form)
        })
        await response.json();
        navigate('/');
      } catch(e) {
        console.log(e);
        setError("Oups, we have a situation here")
      } finally {
        setLoading(true);
      }
    } else {
      setError("Please enter a prompt and a name")
    }
  }

const handleChange = (e) => {
  setError("");
  setForm({ ...form, [e.target.name]: e.target.value });
}


  const handleSurpriseMe = () => {
    const randomPrompt = getRamdomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt})
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Create
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create imaginative and visually stunning images through DALLE-E AI and share them with the community
        </p>
      </div>
      <form className='mt-16 max-w-"xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField labelName="Your Name" type="text" name="name" placeHolder={"John Doe"} value={form.name} handleChange={handleChange}/>
          <FormField labelName="Prompt" type="text" name="prompt" 
            placeHolder={"a bowl of soup that looks like a monster, knitted out of wool" }
            value={form.prompt} 
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            />

            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
                {form.photo ? (
                  <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className='w-9/12 h-9/12 object-contain opacity-40'/>
                )}
                {generatingImg && (
                  <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
            <div className='mt-5 flex gap-5'>
              <button className='text-white bg-green-700 font-medium rounded-md text-sm
                w-full sm-w-auto px-5 py-2.5 text-center' type="button" onClick={generateImage} >
                  {generatingImg ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <div className='mt-10'>
              <p className="mt-2 text-[#666e75] text-[14px]" >Once you have created, you can share it others in the community</p>
              <button type="submit" className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-5 text-center'>
                { submitLoading ? (<Loader />) : ("Share with the community") }
              </button>
            </div>
            {error && (
              <div className='mt-10'>
              <p className="mt-2 text-[14px] text-red-500" >{error}</p>
              </div>
            )}
      </form>
    </section>
  )
}

export default CreatePost