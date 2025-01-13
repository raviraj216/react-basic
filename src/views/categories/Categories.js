import React from 'react'

import {useState,useEffect} from 'react'

import { useCookies } from "react-cookie";

import { Link } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import {
  CButton ,
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
} from '@coreui/react'

import {
    cilPencil,
    cilPlus,
    cilTrash
  } from '@coreui/icons'
  
import { DataGrid } from '@mui/x-data-grid';

import { getCategories } from "../../api/categories";
import { bottom } from '@popperjs/core';


const Categories = () => {
    const [cookie] = useCookies(["user"]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [err, setErr] = useState("");
    const [show, setShow] = useState(false);
    const [totalCategories, setTotalCategories] = useState(0);

    const fetchData = async () => {
      try {
       const { jwt } = cookie;
       const response = await getCategories(jwt, currentPage + 1, show);
       
       const { data, meta } = response;
       setCategories(data);
       console.log("data",data)
       setTotalCategories(meta.pagination.total);
       setErr("");
     } catch (error) {
       setErr(error.message);
     } finally {
       //setLoading(false);
     }
   };

   useEffect(() => {
    fetchData();
  }, [currentPage, show]);

    const columns1 = [
        { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'employee-header', cellClassName: 'employee' },
        { field: 'lastName', headerName: 'Last Name', flex: 1, headerClassName: 'employee-header' },
        { field: 'firstName', headerName: 'First Name', flex: 1, headerClassName: 'employee-header' },
        { field: 'age', headerName: 'Age', flex: 1, headerClassName: 'employee-header' },
        {
          field: 'Edit', headerName: '', width: 30, renderCell: (params) => (
            <Link onClick={(event) => event.stopPropagation()} to={`/categories/edit/${params.row.id}`}>
              <CIcon icon={cilPencil} customClassName="nav-icon" />
            </Link>
          )
        },
        {
          field: 'Delete', headerName: '', width: 30, renderCell: (params) => (
            <div onClick={(e) => { e.stopPropagation(); handleRemoveEmployee(params.row.id, params.row.id); }}>
              <CIcon icon={cilTrash} customClassName="nav-icon" />
            </div>
          )
        },
      ];

      const rows1 = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];

      
      const columns = [
        { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'employee-header', cellClassName: 'employee' },
        { field: 'Name', headerName: 'Name', flex: 1, headerClassName: 'employee-header' },
        { field: 'createdAt', headerName: 'Created At', flex: 1, headerClassName: 'employee-header' },
        { field: 'documentId', headerName: 'Document Id', flex: 1, headerClassName: 'employee-header' },
        {
          field: 'Edit', headerName: '', width: 30, renderCell: (params) => (
            <Link onClick={(event) => event.stopPropagation()} to={`/categories/edit/${params.row.documentId}`}>
              <CIcon icon={cilPencil} customClassName="nav-icon" />
            </Link>
          )
        },
        {
          field: 'Delete', headerName: '', width: 30, renderCell: (params) => (
            <div onClick={(e) => { e.stopPropagation(); handleRemoveEmployee(params.row.id, params.row.documentId); }}>
              <CIcon icon={cilTrash} customClassName="nav-icon" />
            </div>
          )
        },
      ];

      console.log("categories",categories)

      const rows = categories.map((val, index) => {
        return {"id":val.id,
        "Name": val?.Name ?? "",
        "createdAt": val?.createdAt ?? 0,
        "documentId": val?.documentId ?? 0,
        };
    })
 

      const rows12= categories.map(({ id, attributes }) => ( 
         {
        id:attributes?.id ?? "",
        Name: attributes?.Name ?? "",
        createdAt: attributes?.createdAt ?? 0,
        documentId: attributes?.documentId ?? 0,
      })
    );


  return (

    <CRow>
 

 
      <div className="">
        <Link className="btn btn-info add-button" style={{marginBottom:"10px"}}  onClick={(event) => event.stopPropagation()} to={`/categories/add/`}>
          <CIcon icon={cilPlus} customClassName="" /> Add Category
        </Link>
      </div>
 
      <p className="text-body-secondary small">
             Filter
            </p>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Categories</strong>
          </CCardHeader>
          <CCardBody>
           
            <DataGrid
                rows={rows}
                sx={{ border: '0px' }}
                rowCount={totalCategories}
                columns={columns}
                localeText={{ noRowsLabel: "No Results" }}
                
                pageSizeOptions={[10]}

                paginationMode="server"
                onPaginationModelChange={({ page }) => setCurrentPage(page)}
                disableColumnMenu
                disableColumnFilter
                //disableColumnSorting
                initialState={{
                    pagination: {
                        paginationModel: { page: currentPage, pageSize: 10 },
                    },
                }}
              />
          </CCardBody>
        </CCard>
      </CCol>
   
      
    </CRow>
  )
}

export default Categories
