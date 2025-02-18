import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUpload } from '../../../api/utils'
import useAuth from '../../../hooks/useAuth'
import { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useNavigate } from 'react-router-dom'


const AddPlant = () => {
  const navigate = useNavigate()
  const {user}=useAuth()
  const axiosSecure = useAxiosSecure()
  const [upLoadImage, setUpLoadImage] = useState('Upload Image')
  const [loading, setLoading] = useState(false)
  const handleSubmit= async e=>{
    //before fetech loading set loading true
    setLoading(true)
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const description = form.description.value
    const category = form.category.value
    const price = parseFloat(form.price.value)
    const quantity = parseInt(form.quantity.value)
    const image = form.image.files[0]
    const imageurl = await imageUpload(image)

    //seler info
    const seller = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    }
    //create plant object
    const plantData = {
      name,
      description,
      category,
      price,
      quantity,
      image: imageurl,
      seller,
    }
    // console.table(plantData);
    console.log(plantData);
    //send data to mongodb
    try {
      //post request
      const {data}= await axiosSecure.post(`/plants`, plantData)
      // const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/plants`, plantData)
      // toast.success('Plant added successfully')
      navigate('/dashboard/my-inventory')
    } catch (error) {
      console.log(error);
      
    }
    finally{
      setLoading(false)
    }

  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm  handleSubmit={handleSubmit} 
      upLoadImage={upLoadImage} 
      setUpLoadImage={setUpLoadImage} 
      loading={loading}
      />
    </div>
  )
}

export default AddPlant
