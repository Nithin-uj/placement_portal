import React from 'react'
import './Header.css';


function Header() {
  return (
    <div> 
    <div className="d-flex justify-content-center align-items-center">
       <div className="d-block m-2">
       <img src="./image.png" className="p-1 mb-0" alt="logo" width="60px"/>
       <div className="d-flex font-weight-bold justify-content-center align-items-center" style={{ fontSize: '10px' }}>ESTD : 1946</div>
       </div>
       <div className="m-4" id="longtitle">
        <span className="fs-2 sw-bold my-auto">The National Institute of Engineering</span>
        <div className="fs-6 sw-bold my-auto">Autonomous Institution, Affiliated to VTU. Recognized by AICTE., Accredited by NAAC, New Delhi</div>
        <div className="fs-4 sw-bold my-auto">Training and Placement Department</div>
       </div>
       <div className="m-2" id="shorttitle">
        <span className="fs-2 sw-bold m-3 my-auto">NIE, MYSURU</span>
        {/* <!-- <div className="fs-6 sw-bold m-3 my-auto">Autonomous Institution, Affiliated to VTU. Recognized by AICTE., Accredited by NAAC, New Delhi</div> --> */}
        <div className="fs-5 sw-bold m-3 my-auto">Training and Placement Department</div>
       </div>
    </div>
</div>
  )
}

export default Header