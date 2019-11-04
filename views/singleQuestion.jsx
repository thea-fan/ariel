var React = require('react');
var Layout;
var memberNav = require('./components/layout.jsx');
var nonMemberNav = require('./login/rootLayout.jsx');
var EditQuestionModals = require('./questions/editQuestionModals.jsx');
var EditReplyModals = require('./questions/editReplyModals.jsx');
var SolutionMarkingModals = require('./questions/solutionMarkingModals.jsx');
var moment = require('moment');

class SingleQuestion extends React.Component {
  render() {
    if (this.props.status.loggedIn !== undefined ){
        Layout = memberNav;
    } else {
        Layout = nonMemberNav;
    }

    let question = this.props.specificQuestion[0];

    let updatedQnTime = "";
        if (moment(question.created_date).format('lll') !== moment(question.updated_at).format('lll')){
            updatedQnTime = <small>, updated on {moment(question.updated_at).format('lll')}</small>
        } else {
            updatedQnTime;
        }

    let author_username = "";
        if (question.first_name  === null){
            author_username = "Demo User";
        } else {
            author_username = question.first_name.toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); }) + " " + question.last_name.toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); });
        }

    let questionStatus = ""
        if (question.question_status === "open"){
            questionStatus = <span class="badge badge-warning">OPEN</span>
        } else if (question.question_status === "resolved"){
            questionStatus = <span class="badge badge-info">RESOLVED</span>
        }

    let editQuestion = ""
        if (parseInt(question.user_id) === parseInt(this.props.status.user_id)){
            editQuestion = (
                <div className = {'row mt-3 mb-4 edit-question-controls'} >
                    <span data-toggle={"modal"} data-target={"#editQuestionModal"} className={"mr-3"} >
                        <i class="fas fa-edit"></i>
                    </span>
                    <span data-toggle={"modal"} data-target={"#deleteQuestionModal"}>
                        <i class="fas fa-trash"></i>
                    </span>
                    <EditQuestionModals question_id = {this.props.Id} question = {this.props.specificQuestion[0]}/>
                </div>
            )
        } else {
            editQuestion;
        }

    let questionURL = "/activity/"+this.props.Id;
    let post_time = question.created_date;
    var postTime = moment(post_time).format('lll');
    let numOfReplies = this.props.replyDetails;

    let reply = "";

    if (numOfReplies[0].replied_user_id === null && numOfReplies[1] === undefined){
        reply = <div className={'mt-2 comment-height text-center'}>
                    <p className={"mb-0"}> No one has replied yet. </p>
                    <small>Be the first to respond.</small>
                </div>

    } else {

        console.log(this.props.replyDetails);
        reply = this.props.replyDetails.filter(reply => reply.reply_text !== null).map((reply, index) =>{

            let reply_username = "";
            let reply_time = reply.reply_date;
            let replyTime = moment(reply_time).format('lll');
            let editReplyModalID = "edit-reply-"+index;
            let editReplyModalButtonID = "#edit-reply-"+index;
            let deleteReplyModalID = "delete-reply-"+index;
            let deleteReplyModalButtonID = "#delete-reply-"+index;
            let markSolutionModalID = "mark-solution-"+index;
            let markSolutionButtonID = "#mark-solution-"+index;
            let unmarkSolutionModalID = "unmark-solution-"+index;
            let unmarkSolutionButtonID = "#unmark-solution-"+index;

            let updatedTime = "";
            if (moment(reply.reply_date).format('lll') !== moment(reply.updated_at).format('lll')){
                updatedTime = <small>Updated on {moment(reply.updated_at).format('lll')}</small>
            } else {
                updatedTime;
            }

            let markAsSolution = "";
            if (parseInt(question.user_id) === parseInt(this.props.status.user_id)){
                if (question.answer_id === reply.reply_id){
                    markAsSolution = (
                        <div>
                            <span class="badge badge-success" data-toggle="modal" data-target={unmarkSolutionButtonID}>Best Solution</span>
                            <SolutionMarkingModals question_id = {this.props.Id} reply_id = {reply.reply_id} unmarkSolution = {unmarkSolutionModalID} />
                        </div>
                    )

                } else {
                    markAsSolution = (
                        <div>
                            <span data-toggle="modal" data-target={ markSolutionButtonID} class="badge badge-secondary">Mark as Solution</span>
                            <SolutionMarkingModals question_id = {this.props.Id} reply_id = {reply.reply_id} markSolution = {markSolutionModalID} />
                        </div>
                    )
                }

            } else {
                markAsSolution;
            }

            let editReply = "";
            if (parseInt(reply.replied_user_id) === parseInt(this.props.status.user_id)){

                editReply = (
                    <div>
                        <div className = {'edit-question-controls'} >
                            <span data-toggle="modal" data-target={editReplyModalButtonID} className={"mr-3"} >
                                <i class="fas fa-edit"></i>
                            </span>
                            <span data-toggle="modal" data-target={deleteReplyModalButtonID}>
                                <i class="fas fa-trash"></i>
                            </span>
                        </div>
                        <EditReplyModals editID = {editReplyModalID} deleteID = {deleteReplyModalID} question_id ={reply.question_id} current_reply = {reply.reply_text} reply_id={reply.reply_id}/>
                    </div>
                );

            } else {
                editReply;
            }

            if (reply.first_name === null){
                reply_username = "Demo User";
            } else {
                reply_username = reply.first_name.toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); }) + " " + reply.last_name.toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); });
            }

            let url = reply.url? (<a className="reply_upload" href={reply.url} target="_blank"><i
                className="fas fa-file"></i> View Attachment</a>): null;
            return (
                    <div className={'mt-2 row'}>
                        <div className={'col-2 text-center'}>
                            <img class="profile-icon" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                                alt="User picture"/>
                            <span class = "text-capitalize">{reply_username}</span>
                        </div>

                        <div className={'col-10 d-flex flex-column justify-content-center py-2 border-bottom comment-height'}>
                            <div className="row">
                                <div className="col-10 pb-2">
                                    <h6 className="pb-2">{reply.reply_text.charAt(0).toUpperCase() + reply.reply_text.slice(1)}</h6>
                                     {markAsSolution}
                                     {url}
                                </div>
                                {editReply}

                            </div>
                            <small className="mt-2"> Replied on {replyTime} </small>
                            {updatedTime}
                        </div>
                     </div>
            )
        })
    }

    return (
         <Layout user_name={this.props.status.user_name} user_company = {this.props.status.user_company} user_type = {this.props.status.user_type} user_id = {this.props.status.user_id}>
            <div class = "bg-white pb-4 col-8 offset-2 border rounded mt-4 px-5">
                <div class = "row mt-5 pb-3 border-bottom">
                    <div class = "col-1">
                        <img class="img-rounded profile-icon" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                            alt="User picture"/>
                    </div>
                    <div className = "offset-1 col-10">
                        <span className="vessel-name font-weight-bold">MT {question.vessel}</span>
                        <h3 class = "text-uppercase font-weight-bold mb-0 pr-2">{question.question_title}</h3>
                        <div className="row">
                            <h6 class="mb-1 text-capitalize pl-3">Equipment: <a href = {"/equipment/"+ question.equipment}> {question.equipment}</a> {questionStatus}</h6>
                            {editQuestion}
                        </div>
                        <small className="font-italic text-capitalize">Submitted by {author_username} on {postTime}</small>
                        {updatedQnTime}
                    </div>
                </div>
                <div class = "row px-4 pb-4 mb-4 justify-content-center border-bottom">

                    <div class = "col mt-4 pr-3">
                        <div>
                            <h6 className = "mb-3">{question.question_text.charAt(0).toUpperCase() + question.question_text.slice(1)}</h6>
                            <div>
                                <img className = "single-question-photo mx-auto img-fluid" src={question.question_photo}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'px-2 pb-4 comment-height'}>
                    <form method={'POST'} action={'/activity/'+this.props.Id+'/reply'} enctype="multipart/form-data">
                        <div class="reply-form">
                            <div class="input-group">
                                <div class="col-11">
                                    <textarea name="reply_text" type="text" className="col mb-0" rows="3" placeholder="Your reply" required/>
                                    <div className="file-upload">
                                        <div className="file-select">
                                            <div className="file-select-button" id="fileName">
                                                <i className="fas fa-paperclip"></i>
                                            </div>
                                            <div className="file-select-name" id="noFile">Add attachment</div>
                                            <input name="reply_upload" type="file" id="myFile" accept="image/gif, image/jpeg, image/png, application/pdf"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1 input-group-append">
                                    <button className="btn btn-dark" type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {reply}
            </div>
        </Layout>
    );
  }
}

module.exports = SingleQuestion;