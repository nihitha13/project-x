import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconButton from "@mui/material/IconButton";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InsightsIcon from "@mui/icons-material/Insights";
import "./Landing.css";
import { sendSOS } from "./Services/SendSOS";

import { useState } from "react";
import { Link } from "react-router-dom";
import MarkSafeModal from "./components/MarkSafeModal";

export const LandingPage = () => {
  const [sos, setSos] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [incident_id, setIncident] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSOS = async (e) => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => console.log(err)
    );

    let resp = await sendSOS("abc@vt.edu", { latitude, longitude }, Date.now());

    console.log(resp);

    setIncident(resp.incident_id);

    setSos(true);
  };

  return (
    <Container>
      <div>
        <section className="lp-header">
          {" "}
          <Link to="/account/">
            {" "}
            <IconButton size="lg">
              <ManageAccountsIcon></ManageAccountsIcon>
            </IconButton>
          </Link>
          <Link to="/map/">
            <IconButton size="lg">
              <InsightsIcon></InsightsIcon>
            </IconButton>
          </Link>
        </section>
        <section className="lp-sos">
          <Button
            variant="danger"
            disabled={sos}
            onClick={(e) => handleSOS()}
            size="xlg"
          >
            SOS{" "}
          </Button>
        </section>
        <section className="lp-sec">
          <Button
            variant="success"
            disabled={!sos}
            onClick={(e) => setOpenModal(true)}
            size="xlg"
          >
            Mark Safe{" "}
          </Button>
        </section>
        {openModal && <MarkSafeModal incident_id={incident_id} />}
      </div>
    </Container>
  );
};
