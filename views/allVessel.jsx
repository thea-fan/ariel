var React = require('react');
var Layout = require('./components/layout.jsx');
var moment = require('moment');


class AllVessel extends React.Component {
  render() {

    let vesselArray = [];
    this.props.vesselList.map(item => {
        vesselArray.push(item.vessel);
    });

    vesselArray = [...new Set(vesselArray)];

    const vessel = vesselArray.map(vessel =>{

        let name = vessel.toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); })

        return(
                 <div className = "category-card col-3 card card--hasShadow text-center p-0">
                    <div className = "row mt-3">
                        <div className = "col-8 pl-5 text-left">
                            <h4 className = "mt-4">{name}</h4>
                        </div>
                        <img className = "col-3 p-0" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUcPlGG9R-7YfDoQmAU3AS68xTvMrt7456xXFuOI6tZegVTgVi8g&s"/>
                    </div>
                    <div className = "text-left mt-2 pl-4 ml-2" >
                        <a className = "text-primary" href={"/vessel/" + vessel}>View issues</a>
                    </div>
                </div>
        )
    });

    return (
        <Layout user_name={this.props.status.user_name} user_company = {this.props.status.user_company} user_type = {this.props.status.user_type} user_id = {this.props.status.user_id}>
            <div class=" mt-5 d-flex text-center align-items-center justify-content-center flex-column">
                <input class="form-control homepage-searchbar" id="myInput" type="text" placeholder="Type here to search for vessel "/>
            </div>
            <div className = "row justify-content-center mt-5">
                {vessel}
            </div>
        </Layout>
    );
  }
}

module.exports = AllVessel;