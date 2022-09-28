import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useState } from "react";
import moment from "moment";
import Otherscomments from "./Otherscomments";
import { Grid } from "@mui/material";

import UserComment from "./UserComment";

function Comment() {
  const [message, setMessage] = useState();
  const [isMessage, isSetMessage] = useState([]);
  const [editMessage, isEditSetMessage] = useState();
  const [isEditMessage, isSetEdtMessage] = useState(false);
  const [editId, isEditId] = useState();
  const [time, setTime] = useState();

  const deletMessag = (id) => {
    const deletMessage = isMessage.filter((msgId) => {
      return msgId.id !== id;
    });
    isSetMessage(deletMessage);
  };

  const editMessag = (id) => {
    isSetEdtMessage(!isEditMessage);
    isEditId(id);
    const editMsg = isMessage.find((editMsgId) => {
      return editMsgId.id === id;
    });
    isEditSetMessage(editMsg.userMessage);
  };

  const onEditSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editMsgNew = isMessage.find((item) => {
        return item.id === editId;
      });

      isSetMessage(
        isMessage.map((i) => {
          return i.id === editMsgNew.id
            ? {
                id: i.id,
                userMessage: editMessage,
                userImg: i.userImg,
              }
            : {
                id: i.id,
                userMessage: i.userMessage,
                userImg: i.userImg,
              };
        })
      );
    }
    isSetEdtMessage(!isEditMessage);
  };

  const oninputChangeEdit = (e) => {
    isEditSetMessage(e.target.value);
  };

  return (
    <>
      <div className="over">
        <Otherscomments />

        {isMessage &&
          isMessage.map((i) => {
            return (
              <Grid
                container
                spacing={2}
                bgcolor="white"
                p={1}
                marginTop="10px"
                marginLeft="10px"
                borderRadius={3}
              >
                <Grid item xs={9} display="flex" gap={2}>
                  <item>
                    {
                      <img
                        src={i.userImg}
                        alt="img"
                        width="40px"
                        height="auto"
                      />
                    }
                  </item>

                  <item> {<b>juliusomo </b>} </item>
                  <item> {moment(i.date).fromNow()} </item>
                </Grid>
                <Grid item sx={2}>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => deletMessag(i.id)}
                    startIcon={
                      isEditMessage && editId === i.id ? " " : <DeleteIcon />
                    }
                  >
                    {isEditMessage && editId === i.id ? " " : "Delet"}
                  </Button>

                  <Button
                    variant="text"
                    onClick={() => editMessag(i.id)}
                    color={isEditMessage && editId === i.id ? "error" : "info"}
                    startIcon={
                      isEditMessage && editId === i.id ? (
                        <CloseIcon />
                      ) : (
                        <EditIcon />
                      )
                    }
                  >
                    {isEditMessage && editId === i.id ? "Cancel" : "Edit"}
                  </Button>
                </Grid>
                <Grid item sx={6}>
                  {i.userMessage}
                </Grid>
                <Grid item xs={11} p={1}>
                  {isEditMessage && editId === i.id ? (
                    <form onSubmit={onEditSubmit}>
                      <TextField
                        type="text"
                        name="editmessage"
                        fullWidth
                        placeholder="Add a comment"
                        value={editMessage}
                        onChange={oninputChangeEdit}
                      />
                      <Button
                        type="submit"
                        style={{ marginTop: "10px" }}
                        variant="contained"
                      >
                        Update
                      </Button>
                    </form>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            );
          })}
      </div>
      <UserComment
        message={message}
        setMessage={setMessage}
        isMessage={isMessage}
        isSetMessage={isSetMessage}
        isEditMessage={isEditMessage}
        isSetEdtMessage={isSetEdtMessage}
        time={time}
        setTime={setTime}
      />
    </>
  );
}

export default Comment;
