import React, { useState } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useScheduleContext } from "../../../Context/ScheduleContext/ScheduleContext";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const BannerUpload = () => {
  const { setBannerImage } = useScheduleContext();
  const [imageName, setImageName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageName(file.name);
    }
  };

  return (
    <>
      <FormControl variant="outlined" sx={{ width: "90%" }}>
        <OutlinedInput
          id="banner-upload"
          type="text"
          value={imageName}
          placeholder="Choose a file"
          readOnly
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                color="primary"
                component="label"
                htmlFor="file-input"
              >
                <AttachFileIcon />
              </IconButton>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </InputAdornment>
          }
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-adornedEnd": {
              borderRadius: "4px",
            },
          }}
        />
      </FormControl>
      <div
        style={{
          color: "grey",
          marginTop: "10px",
          fontStyle: "italic",
          fontSize: "0.9em",
        }}
      >
        Image width should be 12345px.
      </div>
    </>
  );
};

export default BannerUpload;
