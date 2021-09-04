import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";

function User_rqst() {
  const [values, setValues] = useState({
    name: "",
    address: "",
    date: "",
    time: "",
    location: "",
    facts: "",
  });

  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onSubmitHandler = async (event) => {
    setLoading(true);
    const { name, address, date, time, location, facts } = values;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", JSON.parse(localStorage.getItem("policia")).userId);
      formData.append("name", name);
      formData.append("address", address);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("location", location);
      formData.append("facts", facts);

      let config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };

      if (
        name === "" ||
        address === "" ||
        date === "" ||
        time === "" ||
        location === "" ||
        facts === ""
      ) {
        toast.error("Field is empty!");
        return;
      }

      const res = await axios.post(
        "http://localhost:9000/police/addRequest",
        formData,
        config
      );

      console.log(res);
      toast.success("Successfully submitted");
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast.error("Request failed");
      setLoading(false);
    }
    // console.log(values);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        File your FIR request here
      </Typography>

      <form
        style={{
          display: "flex",
          flexFlow: "column",
          width: "70%",
          margin: "0 auto",
        }}
      >
        <label className="Fir__label">Fir Details</label>
        <TextField
          id="outlined-basic-2"
          label={`Name`}
          variant="outlined"
          value={values.name}
          onChange={handleChange("name")}
          style={{ borderColor: "black", marginBottom: "10px" }}
          required
        />
        <TextField
          id="outlined-basic-2"
          label={`Address`}
          variant="outlined"
          value={values.address}
          onChange={handleChange("address")}
          style={{ borderColor: "black", marginBottom: "10px" }}
          required
        />
        <label className="Fir__label">Reporter Details</label>
        <TextField
          id="outlined-basic-2"
          label={`Date`}
          variant="outlined"
          value={values.date}
          onChange={handleChange("date")}
          style={{ borderColor: "black", marginBottom: "10px" }}
          required
        />
        <TextField
          id="outlined-basic-2"
          label={`Time`}
          variant="outlined"
          value={values.time}
          onChange={handleChange("time")}
          style={{ borderColor: "black", marginBottom: "10px" }}
          required
        />
        <TextField
          id="outlined-basic-2"
          label={`Location`}
          variant="outlined"
          value={values.location}
          onChange={handleChange("location")}
          style={{ borderColor: "black", marginBottom: "10px" }}
          required
        />
        <TextField
          id="outlined-basic-2"
          label={`Facts`}
          variant="outlined"
          value={values.facts}
          onChange={handleChange("facts")}
          style={{ borderColor: "black", marginBottom: "10px" }}
          required
        />

        <input
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />

        <Button
          style={{ width: "15%", background: "blue", color: "white" }}
          onClick={onSubmitHandler}
        >
          {loading ? (
            <CircularProgress style={{ width: "20px", height: "20px" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}

export default User_rqst;
