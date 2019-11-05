var React = require("react");

class Navbar extends React.Component {
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
                        <li class="header-menu">
                            <span>General</span>
                        </li>
                        <li className="sidebar">
                            <a href="/chat">
                                <i className="far fa-comments"></i>
                                <span>Chat</span>
                                <span className="badge badge-pill badge-warning">New</span>
                            </a>
                        </li>
                        <li class="sidebar">
                            <a href='/home'>
                                <i class="fa fa-tachometer-alt"></i>
                                <span>All Issues</span>
                                <span class="badge badge-pill badge-danger">3</span>
                            </a>
                        </li>
                        <li class="sidebar">
                            <a href="/activity/new">
                                <i class="fa fa-folder"></i>
                                <span>Add New Issue</span>
                            </a>
                        </li>
                        <li class="sidebar">
                            <a href="/equipment">
                                <i class="fas fa-wrench"></i>
                                <span>Equipment</span>
                            </a>
                        </li>
                        <li class="sidebar">
                            <a href="/vessel">
                                <i class="fas fa-ship"></i>
                                <span>Vessels</span>
                            </a>
                        </li>
                        <li class="sidebar">
                            <a href = "/logout">
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

module.exports = Navbar;