import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";

import Switch from "./Switch";
import alertify from "alertifyjs";

const steps = [
  "Registro/busqueda Titular",
  "Registro Acompañantes",
  "Lugar de Salida",
  "Información de Pago",
];

export default function StepsIncripcionTour() {
  const { registrarInscripcion, validar } = useContext(RegistroTourClienteContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (e) => {
    const data = validar(localStorage.getItem("current_component"));

    if (!data.estado) {
      alertify.error(data.mensaje);
      return;
    }

    if (e.target.firstChild.nodeValue == "Guardar") {
      registrarInscripcion();
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            // labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}> {label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Se guardó correctamente la información</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleFinish}>Finalizar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Switch step={activeStep + 1} />
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Anterior
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Guardar" : "Siguiente"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
