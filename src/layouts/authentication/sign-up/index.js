/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import API from "Environment/config";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await API.post("/usuario/login", {
        user: user,
        pass: password,
      });

      if (response.data.acceso) {
        localStorage.setItem("isLogin", true);
        location.href = "/tables";
      } else {
        alertify.error(response.data.Message);
      }
    } catch (error) {
      alertify.error("Error en las credenciales.");
    }
  };
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Drop Zone Travel
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ingrese sus credenciales para ingresar
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {/* <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth />
            </MDBox> */}
            <MDBox mb={2}>
              <MDInput
                type="email"
                onChange={(e) => setUser(e.target.value)}
                label="Email"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              {/* <Checkbox /> */}
              {/* <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography> */}
              {/* <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography> */}
            </MDBox>
            <MDBox mt={4} mb={1}>
              {/* <DefaultNavbarLink icon="key" name="sign in" route="/authentication/sign-in"> */}
              <MDButton onClick={login} variant="gradient" color="info" fullWidth>
                Ingresar
              </MDButton>
              {/* </DefaultNavbarLink> */}

              {/* <MDButton variant="gradient" color="info" fullWidth>
                Ingresar
              </MDButton> */}
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                 Iniciar Sesion
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
