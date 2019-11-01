var React = require('react');

class SolutionMarkingModals extends React.Component {
  render() {
    return(
        <div>
            <div className={"modal fade"} id={this.props.markSolution} tabindex={"-1"} role={"dialog"} aria-hidden={"true"}>
                <div className={"modal-dialog modal-dialog-centered"} role={"document"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header"}>
                            <h5 className={"modal-title font-weight-bold"}>Mark as Solution</h5>
                            <button type={"button"} className={"close"} data-dismiss={"modal"} aria-label={"Close"}>
                                <span aria-hidden={"true"}>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form method={'POST'} action={'/activity/'+this.props.question_id+'/reply/'+ this.props.reply_id +'/mark/edit?_method=PUT'}>
                              <p> Are you sure to mark this reply as the solution? </p>
                              <div class="modal-footer">
                                <button type={"button"} class={"btn btn-light"} data-dismiss={"modal"}>Close</button>
                                <button type={"submit"} class={"btn btn-dark"}>Mark</button>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"modal fade"} id={this.props.unmarkSolution} tabindex={"-1"} role={"dialog"} aria-hidden={"true"}>
                <div className={"modal-dialog modal-dialog-centered"} role={"document"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header"}>
                            <h5 className={"modal-title font-weight-bold"}>Unmark as Solution</h5>
                            <button type={"button"} className={"close"} data-dismiss={"modal"} aria-label={"Close"}>
                                <span aria-hidden={"true"}>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form method={'POST'} action={'/activity/'+this.props.question_id+'/reply/'+ this.props.reply_id +'/unmark/edit?_method=PUT'}>
                              <p> Are you sure to unmark this reply as the solution? </p>
                              <div class="modal-footer">
                                <button type={"button"} class={"btn btn-light"} data-dismiss={"modal"}>Close</button>
                                <button type={"submit"} class={"btn btn-dark"}>Unmark</button>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}


module.exports = SolutionMarkingModals;