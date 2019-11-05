var React = require("react");

class ChatNavbar extends React.Component {
  render() {

    return (
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <div class="sidebar-brand">
                    <a href='/home'>
                        <img src = "https://i.ibb.co/pzxTKtr/photo-2019-10-16-20-46-11.jpg" className = "mx-auto navbar-logo"/>
                    </a>
                </div>
                <a href = '/profile'>
                    <div class="sidebar-header">
                        <div class="user-pic">
                            <img class="profile-icon" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                                alt="User picture"/>
                        </div>
                        <div class="user-info mt-2">
                            <span class="user-name"><strong class="text-capitalize font-large">{this.props.user_name}</strong></span>
                            <span class="user-role text-capitalize">{this.props.user_company} - {this.props.user_type}</span>
                        </div>
                    </div>
                </a>
                <div class="sidebar-menu">
                    <ul>
                        <li class="sidebar ">
                            <a href="/chat" className="mb-5 border-bottom">
                                <i class="far fa-comments"></i>
                                <span>Chat</span>
                            </a>
                        </li>
                        <img id="chat-img" className = "chat-screen" src = "/img/1.png"/>
                        <div class="input-group mb-3 chat-margin">
                          <input type="text" class="form-control pl-20" id="chat-textbox" placeholder="Your reply"/>
                          <div class="input-group-append">
                            <span class="input-group-text" id="chat-send">Send</span>
                          </div>
                        </div>
                        <li class="sidebar col bg-white logout-margin">
                            <a className = "pt-0 pl-0" href = "/logout">
                                 <i class="fa fa-power-off"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="sidebar-footer">
                  <small className = "col my-1 text-muted text-center">Gotrix @ 2019 </small>
            </div>
        </nav>
    );
  }
}

module.exports = ChatNavbar;