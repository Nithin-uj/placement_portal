import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import axios from 'axios'
import { address } from '../Address'

function Adminhome() {

  const [details,setDetails] = useState(null);
  useEffect(()=>{
    const getdetails = async ()=>{
      try {
        const response = await axios.post(address+'/getanalysis');
        if(response.status === 200){
          // console.log(response.data)
          setDetails(response.data)
        }
      } catch (error) {
        console.log("Failed to get details")
      }
    }
    getdetails();
  },[])

  if(details===null){
    return <>Loading...</>
  }

  return (
    <div>
    <div className='d-flex flex-wrap justify-content-center'>
        <Box component="section" sx={{ p:2, m:2,width:350 ,border: '1px dashed grey' }}>
           <div> Numner of students registered : <b>{details.sql1[0].studentcount}</b></div>
           <div> Numner of students placed : <b>{details.sql1[0].placedcount}</b></div>
        </Box>
        <Box component="section" sx={{ p:2, m:2,width:350 ,border: '1px dashed grey' }}>
            Number of companies visited : <b>{details.sql1[0].jobcount}</b>
            <hr className='m-1'/>
            <div className="container-fluid m-0 p-0">
              {details.sql2.length <= 0 ? <></> : 
              <div className="row m-0 p-0">
                {/* <div className="col-6 p-0">Open dream : <b>{details.sql2.filter(sql2 => sql2.type === 'opendream')[0].typecount}</b></div> */}
                {/* <div className="col-6 p-0">Dream : <b>{details.sql2.filter(sql2 => sql2.type === 'dream')[0].typecount}</b></div> */}
                {/* <div className="col-6 p-0">Core : <b>{details.sql2.filter(sql2 => sql2.type === 'core')[0].typecount}</b></div>
                <div className="col-6 p-0">Mass : <b>{details.sql2.filter(sql2 => sql2.type === 'mass')[0].typecount}</b></div> */}
                {details.sql2.map((data,index)=>{
                  return <div className="col-6 p-0">{data.type.toUpperCase() + " : "}<b>{data.typecount}</b></div> 
                })}
              </div>
              }
            </div>
        </Box>
    </div>
    <div className='d-flex justify-content-center'>
      <Box component="section" sx={{ p:2, m:2,width:350 ,border: '1px dashed grey' }}>
            <table class="table">
              <thead>
                <tr>
                  <th colspan="3" className='text-center'>CTC in LPA</th>
                </tr>
                <tr>
                <td colspan="3">
                  <div> Overall highest placed CTC : <b>{details.sql1[0].maxctc}</b></div>
                  <div> Overall average placed CTC : <b>{details.sql1[0].avgctc}</b></div>
                  </td>
                </tr>
                <tr>
                  <th scope="col">Branch</th>
                  <th scope="col">Highest</th>
                  <th scope="col">Average</th>
                </tr>
              </thead>
              {/* <tbody>
                <tr>
                  <td>AIML</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>CSE</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>ISE</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>ECE</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>EEE</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>CV</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>ME</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody> */}
              <tbody>
                {details.sql3.map((data,index)=>{
                  return <tr>
                    <td>{data.branch}</td>
                    <td>{data.max}</td>
                    <td>{data.avg}</td>
                  </tr>
                })}
              </tbody>
            </table>
            
      </Box>
    </div>
    </div>
  )
}

export default Adminhome