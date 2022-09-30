import React from "react";
import { useState , useEffect} from "react";
import othrscomments from "./data.json";
import { Button,  TextareaAutosize } from "@mui/material";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import userImg from "../images/avatars/image-juliusomo.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Unstable_Grid2";
import ReplayEdit from "./ReplayEdit";
function Otherscomments() {
  const [replyCmt, setreplyCmt] = useState();
  const [isreplyCmt, isSetOthersCmt] = useState(JSON.parse(localStorage.getItem('isreplyCmt')) || "");
  const [repalyEditMessage, isreplayEditSetMessage] = useState();
  const [isEditMessage, isSetEdtMessage] = useState(false);
  const [isEditReplayMessage, isSetEdtReplayMessage] = useState(false);
  const [isReplyeditId, isSetReplyeditId] = useState();
  const [isEditReplyeditId, isEditSetReplyeditId] = useState();
  const [othersId, setOthersId] = useState();

  useEffect(() => {
    localStorage.setItem('isreplyCmt', JSON.stringify(isreplyCmt));
  }, [isreplyCmt]); 

 
 
  const replyComment = (id) => {
    isSetEdtMessage(!isEditMessage);
    isSetReplyeditId(id);
    setOthersId(id);
  };

  const repalyEditmsg = (id) => {
    isSetEdtReplayMessage(!isEditReplayMessage);
    isEditSetReplyeditId(id);
    setOthersId(id);
    const repalyEditMsg = isreplyCmt.find((replyEdit) => {
      return replyEdit.id === id;
    });
    isreplayEditSetMessage(repalyEditMsg.replyMessage);
  };

  const isreplyCmtId = (isreplyCmtId = isreplyCmt.length) => {
    if (isreplyCmtId === 0) {
      return 0;
    } else {
      return isreplyCmt[isreplyCmt.length - 1].id;
    }
  };

  const replySubmit = (e) => {
    const replayData = {
      id: isreplyCmtId() + 1,
      replyMessage: replyCmt,
      userImg: userImg,
      date: moment().format("MM DD YYYY, h:mm:ss a"),
      username: "juliusomo",
      othersId: othersId,
    };
    e.preventDefault();
    isSetOthersCmt([...isreplyCmt, replayData]);
    setreplyCmt("");
    isSetEdtMessage(!isEditMessage);
  };
  const oninputReplayChange = (e) => {
    setreplyCmt(e.target.value);
  };

  const deleteReply = (id) => {
    const replayDelete = isreplyCmt.filter((replayId) => {
      return replayId.id !== id;
    });
    isSetOthersCmt(replayDelete);
  };

  return (
    <>
      {othrscomments.comments.map((content) => {
        return (
          <>
            <Grid
              container
              spacing={2}
              bgcolor="white"
              p={1}
              m={1}
              borderRadius={3}
            >
              <Grid item sm={10} display="flex" gap={2}>
                <img
                  src={content.user.image.png}
                  alt="img"
                  width="40px"
                  height="auto"
                />
                <b> {content.user.username} </b>

                {content.createdAt}
              </Grid>
              <Grid item sm={2}>
                <Button
                  variant="text"
                  onClick={() => replyComment(content.id)}
                  color={
                    isEditMessage && isReplyeditId === content.id
                      ? "error"
                      : "info"
                  }
                  startIcon={
                    isEditMessage && isReplyeditId === content.id ? (
                      <CloseIcon />
                    ) : (
                      <ReplySharpIcon />
                    )
                  }
                >
                  {isEditMessage && isReplyeditId === content.id
                    ? "Cancel"
                    : "Reply"}
                </Button>
              </Grid>

              <Grid item sm={12}>
                <p> {content.content} </p>
              </Grid>

              {isEditMessage && isReplyeditId === content.id ? (
                <Grid item xs={12} gap={2}>
                  <form onSubmit={replySubmit}>
                    <TextareaAutosize
                      type="text"
                      name="replyMessage"
                      minRows={4}
                      style={{ width: "100%" }}
                      placeholder="Replay Message"
                      value={replyCmt}
                      onChange={oninputReplayChange}
                    />

                    <Button
                      type="submit"
                      style={{
                        marginTop: "10px",
                        background: "#5457b6",
                        float: "right",
                      }}
                      variant="contained"
                    >
                      Reply
                    </Button>
                  </form>
                </Grid>
              ) : (
                ""
              )}
            </Grid>

            {isreplyCmt.map((userReplay) => {
              return userReplay.othersId === content.id ? (
                <>
                  <Grid
                    container
                    spacing={2}
                    borderLeft="solid #dee2e6 1px"
                    p={1}
                    marginLeft={5}
                    marginTop={0}
                    marginBottom={0}
                  >
                    <Grid
                      container
                      border="solid #dee2e6 1px"
                      borderRadius={2}
                      m={2} 
                      marginTop={0}
                      marginBottom={0}
                      bgcolor="#fff"
                      spacing={1}
                      sx={{ flexGrow: 1 }}
                    >
                      <Grid item sm={7} display="flex" gap={2}>
                        <item>
                          {" "}
                          <img
                            src={userReplay.userImg}
                            alt="img"
                            width="40px"
                            height="auto"
                          />{" "}
                        </item>
                        <item>
                          {" "}
                          <b> {userReplay.username} </b>{" "}
                        </item>

                        <item> {moment(userReplay.date).fromNow()} </item>
                      </Grid>
                      <Grid item sm={3} xsOffset={2}>
                        <Button
                          onClick={() => deleteReply(userReplay.id)}
                          variant="text"
                          color="error"
                          startIcon={
                            isEditReplayMessage &&
                            isEditReplyeditId === userReplay.id ? (
                              ""
                            ) : (
                              <DeleteIcon />
                            )
                          }
                        >
                          {isEditReplayMessage &&
                          isEditReplyeditId === userReplay.id
                            ? ""
                            : "Delete"}
                        </Button>
                        <Button
                          onClick={() => repalyEditmsg(userReplay.id)}
                          variant="text"
                          color={
                            isEditReplayMessage &&
                            isEditReplyeditId === userReplay.id
                              ? "error"
                              : "info"
                          }
                          startIcon={
                            isEditReplayMessage &&
                            isEditReplyeditId === userReplay.id ? (
                              <CloseIcon />
                            ) : (
                              <EditIcon />
                            )
                          }
                        >
                          {isEditReplayMessage &&
                          isEditReplyeditId === userReplay.id
                            ? "Close"
                            : "Edit"}
                        </Button>
                      </Grid>

                      <Grid item sm={12} >
                        <p>
                          <span style={{ color: "#5457b6" }}>
                            {" "}
                            {"@"}
                            {content.user.username}{" "}
                          </span>{" "}
                          {userReplay.replyMessage}
                        </p>
                      </Grid>
                      <Grid item sm={12}>
                        <ReplayEdit
                          isreplyCmt={isreplyCmt}
                          isSetOthersCmt={isSetOthersCmt}
                          isEditReplayMessage={isEditReplayMessage}
                          isSetEdtReplayMessage={isSetEdtReplayMessage}
                          isEditReplyeditId={isEditReplyeditId}
                          isEditSetReplyeditId={isEditSetReplyeditId}
                          othersId={othersId}
                          setOthersId={setOthersId}
                          userReplayId={userReplay.id}
                          repalyEditMessage={repalyEditMessage}
                          isreplayEditSetMessage={isreplayEditSetMessage}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                ""
              );
            })}
          </>
        );
      })}
    </>
  );
}

export default Otherscomments;
