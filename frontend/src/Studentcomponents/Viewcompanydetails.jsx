import React from 'react'
import { useEffect,useState } from 'react';
import { address } from '../Address';
import axios from 'axios';
import { Checkbox } from '@mui/material';

function Viewcompanydetails({jid}) {
    const [details, setDetails] = useState(null);
    const [branchdetails, setBranchdetails] = useState(null);
    const objecttostring = (oldutcdate) => {
        const date = new Date(oldutcdate);
    
        const options = {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
    
        return date.toLocaleString("en-IN", options).replaceAll("/", "-");
      };

    useEffect(() => {
        const getdetails = async () => {
          try {
            const response = await axios.post(
              address+"/getcompanydetails",
              { jid: jid }
            );
            setDetails(response.data.companydetails[0]);
            setBranchdetails(response.data.branchdetails[0]);
          } catch (error) {
            console.log(error);
          }
        };
        getdetails();
      },[]);
      if(details === null || branchdetails === null){
        return <>Loading...</>
      }
  return (
    <div>
        <div className='d-flex container-fluid justify-content-center'>
            <div className='col col-12 col-sm-6'>
                <div className="row p-3 overflow-scroll">
                <div className="card p-0" style={{minWidth:"430px"}}>
                    <div className="card-header d-flex justify-content-center"><b>Company details</b></div>
                    <div className='card-body p-0'>
                        <div className="container justify-content-center">
                            <div className="row border-bottom py-1">
                                <b className="col-5">Job ID : </b>
                                <div className="col-7">{details.jid}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Company Name : </b>
                                <div className="col-7">{details.cname}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Company E-mail : </b>
                                <div className="col-7">{details.email}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Company Type : </b>
                                <div className="col-7">{details.type}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Job Role : </b>
                                <div className="col-7">{details.role}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Job Description : </b>
                                <div className="col-7">{details.jd}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Temp. Job Location : </b>
                                <div className="col-7">{details.location}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Full time CTC : </b>
                                <div className="col-7">{details.fulltimectc}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Backlogs allowed : </b>
                                <div className="col-7">{details.backlogs}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Branches allowed : </b>
                                <div className="col-7 p-0">
                                    {Object.entries(branchdetails).map(([branch, value]) => (
                                        <div key={branch} className='p-0 m-0'>
                                        <Checkbox disabled className='p-0 m-0' checked={value}/> {branch}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">B. E. Cutoff : </b>
                                <div className="col-7">{details.becutoff}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">12th Cutoff : </b>
                                <div className="col-7">{details.twelfthcutoff}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Diploma Cutoff : </b>
                                <div className="col-7">{details.diplomacutoff}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">10th Cutoff : </b>
                                <div className="col-7">{details.tenthcutoff}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Internship provided : </b>
                                <div className="col-7">{details.internship === 1 ? "Yes" : "No"}</div>
                            </div>
                            {
                                details.internship === 1 && <>
                                    <div className="row border-bottom py-1">
                                        <b className="col-5">Internship Stipend : </b>
                                        <div className="col-7">{details.stipendpm}</div>
                                    </div>
                                    <div className="row border-bottom py-1">
                                        <b className="col-5">Internship Duration : </b>
                                        <div className="col-7">{details.durationinm}</div>
                                    </div>
                                </>
                            }
                            <div className="row border-bottom py-1">
                                <b className="col-5">Additional info : </b>
                                <div className="col-7">{details.info}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Status : </b>
                                <div className="col-7">{details.status}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Arrival date & Time: </b>
                                <div className="col-7">{objecttostring(details.arrivaldate)}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Last date & Time: </b>
                                <div className="col-7">{objecttostring(details.lastdate)}</div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {/* <div className="card m-3">
            <div className="card-header d-flex justify-content-center"><b>Company details</b></div>
            <div className='card-body p-0'>
                <div className="container-fluid row d-flex justify-content-center">
                    <div className="row border-bottom py-1">
                        <b className="col-5">Job ID : </b>
                        <div className="col-7">{details.jid}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Company Name : </b>
                        <div className="col-7">{details.cname}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Company E-mail : </b>
                        <div className="col-7">{details.email}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Company Type : </b>
                        <div className="col-7">{details.type}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Job Role : </b>
                        <div className="col-7">{details.role}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Job Description : </b>
                        <div className="col-7">{details.jd}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Temp. Job Location : </b>
                        <div className="col-7">{details.location}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Full time CTC : </b>
                        <div className="col-7">{details.fulltimectc}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Backlogs allowed : </b>
                        <div className="col-7">{details.backlogs}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Branches allowed : </b>
                        <div className="col-7 p-0">
                            {Object.entries(branchdetails).map(([branch, value]) => (
                                <div key={branch} className='p-0 m-0'>
                                <Checkbox disabled className='p-0 m-0' checked={value}/> {branch}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">B. E. Cutoff : </b>
                        <div className="col-7">{details.becutoff}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">12th Cutoff : </b>
                        <div className="col-7">{details.twelfthcutoff}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Diploma Cutoff : </b>
                        <div className="col-7">{details.diplomacutoff}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">10th Cutoff : </b>
                        <div className="col-7">{details.tenthcutoff}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Internship provided : </b>
                        <div className="col-7">{details.internship === 1 ? "Yes" : "No"}</div>
                    </div>
                    {
                        details.internship === 1 && <>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Internship Stipend : </b>
                                <div className="col-7">{details.stipendpm}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Internship Duration : </b>
                                <div className="col-7">{details.durationinm}</div>
                            </div>
                        </>
                    }
                    <div className="row border-bottom py-1">
                        <b className="col-5">Additional info : </b>
                        <div className="col-7">{details.info}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Status : </b>
                        <div className="col-7">{details.status}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Arrival date & Time: </b>
                        <div className="col-7">{objecttostring(details.arrivaldate)}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Last date & Time: </b>
                        <div className="col-7">{objecttostring(details.lastdate)}</div>
                    </div>
                </div>
            </div>
            </div> */}
            </div>
    </div>
  )
}

export default Viewcompanydetails