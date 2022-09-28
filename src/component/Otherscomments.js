import React from "react";
import { useState } from "react";
import othrscomments from "./data.json";
import { Button, TextField, section } from "@mui/material";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import userImg from "../images/avatars/image-juliusomo.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Unstable_Grid2";
function Otherscomments() {
  const [replyCmt, setreplyCmt] = useState();
  const [isreplyCmt, isSetOthersCmt] = useState([]);
  const [isEditMessage, isSetEdtMessage] = useState(false);
  const [isReplyeditId, isSetReplyeditId] = useState();
  const [othersId, setOthersId] = useState();
  const replyComment = (id) => {
    isSetEdtMessage(!isEditMessage);
    isSetReplyeditId(id);
    setOthersId(id);
  };

  const replySubmit = (e) => {
    const replayData = {
      id: isreplyCmt.length + 1,
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
              <Grid item xs={10} display="flex" gap={2}>
                <img src={content.user.image.png} alt="img" />
                <b> {content.user.username} </b>

                {content.createdAt}
              </Grid>
              <Grid item sx={2}>
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

              <Grid item sx={6}>
                <p> {content.content} </p>
              </Grid>
              <Grid item xs={11} p={1}>
                {isEditMessage && isReplyeditId === content.id ? (
                  <form onSubmit={replySubmit}>
                    <TextField
                      type="text"
                      name="replyMessage"
                      fullWidth
                      placeholder="Replay Message"
                      value={replyCmt}
                      onChange={oninputReplayChange}
                    />
                    <Button
                      type="submit"
                      style={{ marginTop: "10px" }}
                      variant="contained"
                    >
                      Reply
                    </Button>
                  </form>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            {isreplyCmt.map((userReplay) => {
              return userReplay.othersId === content.id ? (
                <>
                  <Grid
                    container
                    spacing={2}
                    borderLeft="solid #dee2e6 1px"
                    p={1}
                    marginLeft={2}
                    marginTop={0}
                    marginBottom={0}
                  >
                    <Grid
                      container
                      border="solid #dee2e6 1px"
                      borderRadius={2}
                      m={2}
                      bgcolor="#fff"
                      spacing={1}
                      sx={{ flexGrow: 1 }}
                    >
                      <Grid item xs={6} display="flex" gap={2}>
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
                      <Grid item sx={2} xsOffset={2}>
                        <Button
                          onClick={() => deleteReply(userReplay.id)}
                          variant="text"
                          color="error"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="text"
                          color="info"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </Grid>

                      <Grid item sx={6}>
                        <p>
                          <span style={{ color: "#5457b6" }}>
                            {" "}
                            {"@"}
                            {content.user.username}{" "}
                          </span>{" "}
                          {userReplay.replyMessage}
                        </p>
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
