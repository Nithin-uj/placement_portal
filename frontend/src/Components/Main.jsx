import React from 'react'
import { Stepper,Step,StepButton } from '@mui/material'

function Main() {


  return (
    <div>
        <Stepper nonLinear activeStep={2}>
          <Step>
            <StepButton color="primary">
              {"label"}
            </StepButton>
          </Step>
          <Step>
            <StepButton color="primary">
              {"label"}
            </StepButton>
          </Step>
          <Step>
            <StepButton color="inherit">
              {"label"}
            </StepButton>
          </Step>
      </Stepper>
    </div>
  )
}

export default Main