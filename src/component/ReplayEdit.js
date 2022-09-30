import React from "react";
import { TextField, Button } from "@mui/material";

const ReplayEdit = ({
  isreplyCmt,
  isSetOthersCmt,
  repalyEditMessage,
  isreplayEditSetMessage,
  isEditReplayMessage,
  isSetEdtReplayMessage,
  isEditReplyeditId,
  isEditSetReplyeditId,
  othersId,
  userReplayId,
}) => {
  const onReplayEditSubmit = (e) => {
    e.preventDefault();

    isreplayEditSetMessage("");

    if (isEditReplyeditId) {
      const editRply = isreplyCmt.find((comment) => {
        return comment.id === isEditReplyeditId;
      });

      isSetOthersCmt(
        isreplyCmt.map((replyMsg) => {
          return replyMsg.id === editRply.id
            ? {
                id: replyMsg.id,
                replyMessage: repalyEditMessage,
                userImg: replyMsg.userImg,
                othersId: replyMsg.othersId,
              }
            : {
                id: replyMsg.id,
                replyMessage: replyMsg.replyMessage,
                userImg: replyMsg.userImg,
                othersId: replyMsg.othersId,
              };
        })
      );
    }
    isSetEdtReplayMessage(!isEditReplayMessage);
  };

  const oninputChangeReplyEdit = (e) => {
    isreplayEditSetMessage(e.target.value);
  };

  return (
    <>
      {isEditReplayMessage && isEditReplyeditId === userReplayId ? (
        <form onSubmit={onReplayEditSubmit}>
          <TextField
            type="text"
            name="editmessage"
            fullWidth
            placeholder="Add a comment"
            value={repalyEditMessage}
            onChange={oninputChangeReplyEdit}
          />
          <Button
            type="submit"
            style={{ marginTop: "10px", background: "#5457b6", float: "right" }}
            variant="contained"
          >
            Update
          </Button>
        </form>
      ) : (
        ""
      )}
    </>
  );
};

export default ReplayEdit;
