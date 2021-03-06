/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    let registerUser = (userDetails, callback) => {
        let text = "SELECT email FROM users WHERE email = $1";
        let values = [userDetails.email];

        dbPoolInstance.query(text, values, (error, result) => {

            if( error ){
            callback(error, null);

            } else {
                if (result.rows.length > 0) {
                    callback(null, null);

                } else {
                    let query = "INSERT INTO users (email, password, first_name, last_name, company, department, user_type) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
                    let values = [userDetails.email, userDetails.password, userDetails.first_name, userDetails.last_name, userDetails.company, userDetails.department, userDetails.user_type]

                    dbPoolInstance.query(query, values, (error, result) => {
                        if( error ){
                            callback(error, null);

                        } else {
                            callback(null, result);
                        }
                    });
                }
            }
        });
    }

    let loginUser = (userDetails, callback) => {
        let text = "SELECT * from users where email = $1";
        let values = [userDetails.email];

        dbPoolInstance.query(text, values, (error, result) => {

            if( error ){
            callback(error, null);

            } else {
                    if( error ){
                        callback(error, null);

                    } else {
                        callback(null, result);
                }
            }
        });
    }


    let deleteQuestion = (question, cookies, callback) => {
        let query = "DELETE from questions where qn_id = $1 and user_id = $2 returning *";
        let values = [question, cookies.user_id];

        dbPoolInstance.query(query, values, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

    let editQuestion = (question, Id, cookies, callback) => {
        let query = "UPDATE questions set question_title = $1, equipment = $2, question_photo = $3, question_text = $4, question_status= $5 where qn_id = $6 and user_id = $7 returning *";
        let values = [question.question_title, question.equipment, question.question_photo, question.question_text, question.question_status, Id, parseInt(cookies.user_id)];

        dbPoolInstance.query(query, values, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

  let singleQuestion = (question, cookies, callback) => {
        let query = "select * from questions left join users on user_id = users.id where qn_id = $1";

        let values = [question];

        dbPoolInstance.query(query, values, (error, questionDetails) => {

            if( error ){
                callback(error, null);

            } else {

                let data = {
                    questionDetails : questionDetails.rows
                }
                let reply = "select * from replies LEFT JOIN users on replied_user_id = users.id LEFT JOIN uploads on replies.reply_id = uploads.reply_ref where question_id = $1 ORDER by reply_date ASC ";
                let value = [question];

                dbPoolInstance.query(reply, value, (error, replyDetails) => {
                    if( error ){
                        callback(error, null);

                    } else {
                        data.replyDetails = replyDetails.rows;
                        callback(null, data);
                    }
                });
            }
        });
    }

    let showAllQuestions = (question, cookies, callback) => {

        let query = "SELECT * from (select question_id, count(reply_text) FROM replies GROUP BY question_id) AS foo INNER JOIN questions ON question_id = qn_id LEFT JOIN users ON users.id = user_id ORDER BY created_date DESC";

        dbPoolInstance.query(query, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

    let allEquipment = (cookies, callback) => {

        let query = "select equipment, count (equipment) FROM questions GROUP BY equipment ORDER BY equipment";

        dbPoolInstance.query(query, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

    let singleEquipment = (equipment, cookies, callback) => {

        let query = "SELECT * from (select question_id, count(reply_text) FROM replies GROUP BY question_id) AS foo INNER JOIN questions ON question_id = qn_id LEFT JOIN users ON users.id = user_id  where equipment = $1 ORDER BY created_date DESC";
        let values = [equipment];

        dbPoolInstance.query(query, values, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

    let allVessel = (cookies, callback) => {

        let query = "select vessel, count (vessel) FROM questions GROUP BY vessel ORDER BY vessel";

        dbPoolInstance.query(query, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

    let singleVessel = (vessel, cookies, callback) => {

        let query = "SELECT * from (select question_id, count(reply_text) FROM replies GROUP BY question_id) AS foo INNER JOIN questions ON question_id = qn_id LEFT JOIN users ON users.id = user_id  where vessel = $1 ORDER BY created_date DESC";
        let values = [vessel];

        dbPoolInstance.query(query, values, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

    let getUserDetails  = (user, cookies, callback) => {
        let query = "SELECT * from users where email = $1";
        let values = [user];

        dbPoolInstance.query(query, values, (error, result) => {
            if( error ){
            callback(error, null);

            } else {
                callback(null, result);
            }
        });
    }


    let addNewQuestion = (question, cookies, callback) => {
        let text = "INSERT INTO questions (user_id, question_title, equipment, question_text, question_photo, vessel, question_status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING qn_id";
        let values =[parseInt(cookies.user_id), question.question_title, question.equipment, question.question_text, question.question_photo, question.vessel, question.question_status]

        dbPoolInstance.query(text, values, (error, result) => {
            let questionID = result.rows[0].qn_id

            if( error ){
            callback(error, null);

            } else {

                let reply = "INSERT into replies (question_id) values ($1)"
                let question_id = [questionID];

                dbPoolInstance.query(reply, question_id, (error, result) => {
                    let questionID = question_id

                    if( error ){
                    callback(error, null);

                    } else {
                        callback(null, questionID);
                    }
                });
            }
        });
    }


    let deleteAsSolution= (question, cookies, callback) => {
        let query = "UPDATE questions SET answer_id = $1 WHERE qn_id = $2";
        let values = [null, question];

        dbPoolInstance.query(query, values, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

    let editAsSolution = (reply, question, cookies, callback) => {
        let query = "UPDATE questions SET answer_id = $1 WHERE qn_id = $2 returning *";
        let values = [reply, question];

        dbPoolInstance.query(query, values, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

    let deleteReply = (reply, cookies, callback) => {
        let query = "DELETE from replies where reply_id = $1 and replied_user_id = $2 returning *";
        let values = [reply, parseInt(cookies.user_id)];

        dbPoolInstance.query(query, values, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

    let editReply = (reply, Id, cookies, callback) => {
        let query = "UPDATE replies set reply_text = $1 where reply_id = $2 and replied_user_id = $3 returning *";
        let values = [reply.reply_text, Id, parseInt(cookies.user_id)];

        dbPoolInstance.query(query, values, (error, result) => {

            if( error ){
                callback(error, null);

            } else {
                callback(null, result);
             }
        });
    }

    let addReply = (question, Id, cookies, callback) => {
        let text = "INSERT INTO replies (replied_user_id, question_id, reply_text) VALUES ($1, $2, $3) RETURNING reply_id";
        let values =[parseInt(cookies.user_id), Id, question.reply_text];

        dbPoolInstance.query(text, values, (error, result) => {
            if( error ){
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    let uploadFile = (fileUrl, replyID, callback) => {
        let text = "INSERT INTO uploads (url, reply_ref) VALUES ($1, $2) RETURNING id";
        let values =[fileUrl, replyID];
        dbPoolInstance.query(text, values, (error, result) => {
            if ( error ) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

  return {
    addReply,
    deleteReply,
    editReply,
    deleteAsSolution,
    editAsSolution,
    addNewQuestion,
    getUserDetails,
    showAllQuestions,
    singleQuestion,
    editQuestion,
    deleteQuestion,
    allEquipment,
    singleEquipment,
    allVessel,
    singleVessel,
    registerUser,
    loginUser,
    uploadFile
  };
};