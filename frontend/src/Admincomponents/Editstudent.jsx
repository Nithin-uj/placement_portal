import React, { useEffect, useState } from "react";
import { ButtonGroup, Button, CircularProgress } from "@mui/material";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Alert } from "@mui/material";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import axios from "axios";
import Studentdropdown from "./Studentdropdown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tempedit from "./Subedit";
import { address } from "../Address";
import Subeditstudent from "./Subeditstudent";

const Searchstudent = () => {
    const [studentlist, setStudentlist] = useState([]);
    useEffect(() => {
      const getlist = async () => {
        try {
          const response = await axios.post(
            address+"/getusnandname"
          );
        //   console.log(response.data);
          setStudentlist(response.data);
        } catch (error) {
          console.log("Error while getting list");
        //   console.log(error);
        }
      };
      getlist();
    }, []);
  
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    return (
      <>
        {studentlist.length > 0 ? (
          <div className="container-fluid">
            <div className="row d-flex justify-content-center">
              <div className="col-12 col-sm-8 col-lg-7">
                <div className="row mx-1 mt-3">
                  Search and Select by Student USN or Name 
                </div>
                <div className="row">
                  <Studentdropdown
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    options={studentlist}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "25vh" }}
          >
            <CircularProgress></CircularProgress>
          </div>
        )}
  
        {!!selectedOption && (
          <div className="container-fluid">
            <div className="row d-flex justify-content-center">
              <div className="col-12 col-sm-7 col-lg-6">
                <Subeditstudent usn={selectedOption} setSelectedOption={setSelectedOption}/>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

export default function Editstudent() {
  return (
    <Searchstudent/>
  )
}


