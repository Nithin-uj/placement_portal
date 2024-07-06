import React, { useEffect, useState } from "react";
import TableRowsIcon from '@mui/icons-material/TableRows';
import { CircularProgress } from "@mui/material";
import "flatpickr/dist/themes/material_blue.css";
import axios from "axios";
import Studentdropdown from "./Studentdropdown";
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
          if(response.data.length<=0){
            setStudentlist(-1);
          }else{
            setStudentlist(response.data);
          }
        } catch (error) {
          console.log("Error while getting list");
        //   console.log(error);
        }
      };
      getlist();
    }, []);
  
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    if(studentlist === -1){
      return <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "25vh" }}
      >
      {/* <CircularProgress></CircularProgress> */}
      <div>
      <div className="d-flex justify-content-center"><TableRowsIcon color="disabled" sx={{ fontSize: 40 }}/></div>
      <div class="text-secondary">No Data</div>
      </div>
    </div>
    }

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


