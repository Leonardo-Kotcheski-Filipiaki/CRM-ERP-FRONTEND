import React from "react";
import { UserCircle } from "@phosphor-icons/react";

class Navbar extends React.Component{
    render() {
        return(
            <div className="navbar-nav p-4 w-100">
                <div className="right-side d-flex flex-row-reverse align-items-center">
                    <UserCircle className="user-icon" size={45}></UserCircle>
                    <label className="user-name">{sessionStorage.getItem('user')}</label>
                        
                </div>
            </div>
        )
    }
}

export default Navbar