import React from 'react'

import {useState,useEffect} from 'react'

import { useCookies } from "react-cookie";

import { Link } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CForm ,
  CAlert 

} from '@coreui/react'

import {
    cilPencil,
    cilTrash
  } from '@coreui/icons'
  
import { DataGrid } from '@mui/x-data-grid';

import { addCategory } from "../../api/categories";
import { Error as ErrorMessage } from "../../../src/components/error/Error";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCategory = () => {
  const navigate = useNavigate();
 
    const [cookie] = useCookies(["user"]);
    const [category, setCategory] = useState([]);
    const [validated, setValidated] = useState(false)
    const [error, setError] = useState("");

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
        <ErrorMessage>{error}</ErrorMessage>
    </CRow>
  )
}

export default AddCategory
