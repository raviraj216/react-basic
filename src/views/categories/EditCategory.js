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
 
import { getCategory } from "../../api/categories";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();
    const [cookie] = useCookies(["user"]);


console.log("id",id)
    const [category, setCategory] = useState([]);
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        const fetchProjectData = async () => {
           // setLoading(true);
            try {
                const { data } = await getCategory(cookie.jwt, id);
                setCategory(data?.attributes);
                if (data?.attributes) {
                    setValue("Name", data.attributes?.Name);
                }

                console.log("categorycategory",category)
            } catch (err) {
                 toast.error(err.message);
            } finally {
               // setLoading(false);
            }
        };

        fetchProjectData();
    }, [cookie.jwt, id]);


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

export default EditCategory