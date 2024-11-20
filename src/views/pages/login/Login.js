import React from 'react'
import {useState,useEffect} from 'react'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import {authorize} from "../../../api/auth";
import { Error as ErrorMessage } from "../../../components/error/Error";

// import Loader from "../../components/loader/Loader";



import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
 const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false)
 
  const isAuthenticated = !!cookies.jwt;
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);



  const handleSubmit = async (event) => {
    event.preventDefault()
      event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true);
      return false;
    }

    try {
        const { jwt, user } = await authorize(username, password);

        console.log("sdcfasds",user)
        console.log("ddd",jwt)

        if (!user) {
          console.log("in")
          setError("Wrong login");
          throw new Error(
            "Wrong login"
          );
        }

        //const [settings] = await getUserSettings(jwt);
       // setCookie("settings", settings?.attributes);

        setCookie("jwt", jwt);
        setCookie("userId", user.id);
        setCookie("user_data", user);
        console.log("/dashboard");
        navigate("/dashboard");
        setError("");
        window.location.reload();
      } catch (error) {
        const err =
          error?.response?.data?.error?.message ??
          error?.response?.data ??
          error?.message;
          console.log("err",err)

        setError(err);
      } finally {
        //setLoading(false);
      }

  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className="row g-3 needs-validation"  noValidate validated={validated} onSubmit={handleSubmit} >
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" feedbackValid="Looks good!" id="username" required onChange={(e) => setUserName(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password" feedbackValid="Looks good!" id="password"  required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    
                    <ErrorMessage>{error}</ErrorMessage>

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
