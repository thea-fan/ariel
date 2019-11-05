var React = require('react');
var Layout = require('./components/chatLayout.jsx');
var moment = require('moment');


class Chat extends React.Component {
  render() {


    return (
        <Layout user_name={this.props.status.user_name} user_company = {this.props.status.user_company} user_type = {this.props.status.user_type} user_id = {this.props.status.user_id}>
        <div class="d-flex text-center align-items-center justify-content-center flex-column">
            <img src="/img/dummy-1.png" id="chat-result" className="img-fluid"/>
        </div>
        </Layout>
    );
  }
}

module.exports = Chat;