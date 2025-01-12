import React from 'react'
import {useState,useEffect} from 'react'
import { useCookies } from "react-cookie";
import {
  CCol,
  CRow,
  CButton,
  CFormInput,
  CFormLabel,
  CForm 
} from '@coreui/react'
 
import { addCategory } from "../../api/categories";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCategory = () => {
  const navigate = useNavigate();
 
    const [cookie] = useCookies(["user"]);
    const [category, setCategory] = useState([]);
    const [validated, setValidated] = useState(false)

    const handleSubmit = async (event) => {
      event.preventDefault()
      event.stopPropagation()
      const { jwt } = cookie;
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        setValidated(true);
        return false;
      }
      try {
        const data = {
          Name: form.Name.value,
        };
        setCategory(data);
        let result = await addCategory(jwt, data);
        console.log("result",result.data.id)
        const id = result?.data?.id;
        toast.success("successful");
      } catch (error) {
          const err =
          error?.response?.data?.error?.message ??
          error?.response?.data ??
          error?.message;
          toast.error(err);
      }
    }
  return (
    <CRow>
        <CForm  noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="mb-3 col-md-6">
            <CFormLabel htmlFor="NameControlInput1">Name</CFormLabel>
            <CFormInput type="text" id="Name" placeholder="Name" required/>
          </div>
          <div className="mb-3">
            <CButton color="primary" type="submit" >Submit</CButton>
            <CButton onClick={() => navigate(-1)} color="danger">Cancel</CButton>
          </div>
        </CForm> 
        
    </CRow>
  )
}

export default AddCategory