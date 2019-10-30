import React, {Component} from "react";

//style
import './MyProfile.scss'

class MyProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <div className="profile-container">
                <div className="photo-container">

                </div>
                <div className="info-container">
                    <div className="name-container">
                        Alexander Zhakarovich
                    </div>
                    <div className="status-container">
                        status
                    </div>
                </div>
            </div>
        </div>)
    }
}


export default MyProfile;