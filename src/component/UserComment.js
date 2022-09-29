import { Button, TextareaAutosize  } from "@mui/material";
import React from "react";
import userImg from "../images/avatars/image-juliusomo.png";
import { Grid } from "@mui/material";
import moment from "moment"; 


function UserComment({
  message,
  setMessage,
  isMessage,
  isSetMessage,
  time,
  setTime,
}) {
  const messageId = (a = isMessage.length) => {
    if (a === 0) {
      return 0;
    } else {
      return isMessage[isMessage.length - 1].id;
    }
  };

  const onSubmit = (e) => {
    const userData = {
      id: messageId() + 1,
      userMessage: message,
      userImg: userImg,
      date: moment().format("MM DD YYYY, h:mm:ss a"),
    };

    e.preventDefault();
    isSetMessage([...isMessage, userData]);
    setTime();
    setMessage("");
  };
  const oninputChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid
          container 
          spacing={2}
          bgcolor="white"
          width="99%"
          p={1}
          m={1}
          borderRadius={3}
        >
          <Grid item sm={1}>
            <img src={userImg} alt="img" width="40px" height="auto" />
          </Grid>
          <Grid item sm={9}>
            <TextareaAutosize 
             
              type="text"
              name="message"
              value={message}
              minRows={4} 
              style={{ width: '100%' }}
              placeholder="Add a comment"
              onChange={oninputChange}
            />{" "}
          </Grid>
          <Grid item sm={1}>
            <Button type="submit" variant="contained" style={{background:"#5457b6"}} >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default UserComment;
