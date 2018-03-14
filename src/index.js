import React from 'react';
import ReactDOM from 'react-dom';
//import VisitorNavbar from './users/visitor/navbar/navbar';
import VisitorNavbar from './user/visitor/navbar/navbar';
import SellerNavbar from './user/seller/navbar/navbar';
import BuyerNavbar from './user/buyer/navbar/navbar';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <VisitorNavbar />
                <SellerNavbar />
                <BuyerNavbar/>
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
