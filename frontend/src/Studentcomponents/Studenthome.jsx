import React from 'react'

export default function Studenthome() {
  return (
    <div className='container-fluid'>
        <div className="row">
        <div className="col-12 col-sm-6">
            <div className="card m-2">
                <b className="card-header">
                    Notifications
                </b>
                <div className="card-body">
                    No notifications yet
                </div>
            </div>
        </div>
        <div className="col-12 col-sm-6">
            <div className="card m-2">
                <b className="card-header">
                    Information
                </b>
                <div className="card-body">
                    Please check Company / Job section from menu for companies
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}