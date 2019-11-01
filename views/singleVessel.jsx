var React = require('react');
var Layout = require('./components/layout.jsx');
var moment = require('moment');


class SingleVessel extends React.Component {
  render() {

    let questions = this.props.questionList.map(question => {

        let username = ""
        if (question.first_name === null){
            username = "Demo User";
        } else {
            username = question.first_name.toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); }) + " " + question.last_name.toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); });
        }

        let ownershipIndicator = ""
        if (parseInt(question.user_id) === parseInt(this.props.status.user_id)){
            ownershipIndicator = <small className= "text-danger font-weight-bold">(By you)</small>
        }

        let questionStatus = ""
        if (question.question_status === "open"){
            questionStatus = <span class="mt-3 badge badge-warning">OPEN</span>
        } else if (question.question_status === "resolved"){
            questionStatus = <span class="mt-3 badge badge-info">RESOLVED</span>
        }

        let numOfReplies = question.count;
        let questionURL ="/activity/"+question.qn_id;
        let userURL = "/user/"+question.user_id;
        let questionTitle = question.question_title.toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); });
        let equipmentName = question.equipment.toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); });
        let created_time = question.created_date;
        var postTime = moment(created_time).format('lll');


        return (

            <li class="home-event-list mb-3 rounded">
                    <div class="row">
                        <div class="text-center col-2 p-4 my-auto">
                            <p class="text-uppercase font-weight-bold mb-0">{numOfReplies}</p><small>Replies</small>
                        </div>
                        <div class="col-7">
                           <a href={questionURL}>
                            <span className="vessel-name font-weight-bold">MT {question.vessel}</span> - {questionStatus}
                            <p class="home-activity-name text-capitalise font-weight-bold my-1">{questionTitle} <br/></p>
                            </a>
                            <p class ="text-capitalise">
                                <a href = {"/equipment/"+question.equipment}className="badge badge-equipment">{equipmentName}</a>
                            </p>
                        </div>
                        <div class = " mt-5 d-flex flex-column align-items-center justify-content-center">
                            <small>Asked on {postTime}</small>
                            <div className="row mt-1">
                                <img class="img-responsive img-rounded home-profile-icon pr-2" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                                alt="User picture"/>
                                <div>
                                    <small className="mt-2 d-block small-line-height">{username}</small>
                                    {ownershipIndicator}
                                </div>
                            </div>
                        </div>
                    </div>
            </li>
        )
    });

    return (
        <Layout user_name={this.props.status.user_name} user_company = {this.props.status.user_company} user_type = {this.props.status.user_type} user_id = {this.props.status.user_id}>
            <h2 className="mt-5 text-center"> All Issues For MT {this.props.questionList[0].vessel} </h2>
            <div class=" mt-3 d-flex text-center align-items-center justify-content-center flex-column">
                <input class="form-control homepage-searchbar" id="myInput" type="text" placeholder="Type here to search for questions "/>
            </div>
                <div class="container mt-3">
                <div class = "container">
                <div class = "mt-5 px-5">
                    <ul id="myTable" className = "col-10 offset-1">
                        {questions}
                    </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
  }
}
module.exports = SingleVessel;