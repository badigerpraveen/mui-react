import { Button, TextareaAutosize } from "@mui/material";
import React from "react";
import userImg from "../images/avatars/image-juliusomo.png";
import { Grid } from "@mui/material";
import moment from "moment";

function UserComment({
  message,
  setMessage,
  errorMessage,
  setErrorMessage,
  isMessage,
  isSetMessage,
  time,
  setTime,
}) {
  const messageId = (userMassageid = isMessage.length) => {
    if (userMassageid === 0) {
      return 0;
    } else {
      return isMessage[isMessage.length - 1].id;
    }
  };

  const onSubmit = (e) => {
    const userData = {
      id: messageId() + 1,
      userMessage: message.message,
      userImg: userImg,
      date: moment().format("MM DD YYYY, h:mm:ss a"),
    };

    e.preventDefault();

    if (message.message) {
      isSetMessage([...isMessage, userData]);
    }
    
    setTime();
    setMessage({ message: "" });
    setErrorMessage(validate(message));
  };
  const oninputChange = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  const validate = (values) => {
    const error = {};
    if (!values.message) {
      error.message = "*! Comment Field is required , Write something.... ";
    }
    return error;
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
              value={message.message}
              minRows={4}
              style={{ width: "100%" }}
              placeholder="Add a comment"
              onChange={oninputChange}
            />{" "}
            <p style={{ color: "red" }}>{errorMessage.message} </p>
          </Grid>
          <Grid item sm={1}>
            <Button
              type="submit"
              variant="contained"
              style={{ background: "#5457b6" }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default UserComment;
