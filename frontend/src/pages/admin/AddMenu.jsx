import React, { useState, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Upload } from 'lucide-react'
import { toast } from 'react-hot-toast'

const AddMenu = () => {
  const {axios, navigate, loading, setLoading, categories, fetchMenus} = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  })
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if(selectedFile) {
      setFile(selectedFile);
    }
    setFormData({...formData, image: selectedFile});
    if(selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    
    if (!file) {
      toast.error("Please upload an image");
      return;
    }
    
    try{
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      if(file) {
        formDataToSend.append('image', file);
      }
      
      console.log("Form data being sent:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      
      const {data} = await axios.post("/api/menu/add", formDataToSend, { headers: {"Content-Type":"multipart/form-data"}});
      if(data.success){
        toast.success(data.message);
        await fetchMenus(); // Refresh menus before navigating
        navigate("/admin/menus");
      } else {
        toast.error(data.message);
      }
    } catch(error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className = "py-12">
      <form onSubmit = {handleSubmit} className = "max-w-2xl w-full flex flex-col gap-5">

        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-2">
            Menu Name *
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent" placeholder = "Enter Menu Name" />
        </div>
        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-2">
            Menu Price *
          </label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent" placeholder = "Enter Menu Price" />
        </div>
        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-2">
            Menu Description *
          </label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent" placeholder = "Enter Menu Description" />
        </div>
        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-2">
            Select Category *
          </label>
          <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent">
            <option value="">Select a category</option>
            {categories && categories.length > 0 && categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-2">
            Menu Image
          </label>
          <input type = "file" id="fileUpload" className = "hidden" onChange={handleFileChange} required />

          {/* Custom Upload Area */}
          <label htmlFor = "fileUpload" className="flex flex-col items-center justify-center w-full h-32 border-dashed border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 transition">
            <Upload className='w-8 h-8 text-gray-500 mb-2'/>
            <span className = "text-gray-600 text-sm">
              {file ? file.name : 'Click to upload an image'}
            </span>
          </label>
        </div>
        {preview && <img src={preview} alt="preview" className="w-22" />}
        <button type="submit" className="bg-orange-500 text-white px-8 py-3 cursor-pointer">
          {loading ? 'Adding...' : 'Add Menu'}  
        </button> 
      </form>
    </div>
  )
}

export default AddMenu