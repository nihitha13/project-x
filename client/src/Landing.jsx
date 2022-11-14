import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconButton from "@mui/material/IconButton";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InsightsIcon from "@mui/icons-material/Insights";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import MapIcon from "@mui/icons-material/Map";
import "./Landing.css";
import { sendSOS } from "./Services/SendSOS";

import { useState } from "react";
import { Link } from "react-router-dom";
import MarkSafeModal from "./Components/MarkSafeModal";
import { OrgPage } from "./Components/OrgPage";
import PublicIcon from "@mui/icons-material/Public";

export const LandingPage = () => {
  const [sos, setSos] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [incident_id, setIncident] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSOS = async (e) => {
    let x = await navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        // await sendSOS("abc@vt.edu", { latitude, longitude }, Date.now());
      },
      (err) => console.log(err)
    );

    console.log(latitude, longitude);
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
              <MapIcon></MapIcon>
            </IconButton>
          </Link>
          <Link to="/stats/">
            <IconButton size="lg">
              <QueryStatsIcon></QueryStatsIcon>
            </IconButton>
          </Link>
          <Link to="/org/">
            <IconButton size="lg">
              <PublicIcon></PublicIcon>
            </IconButton>
          </Link>
        </section>
        <section className="lp-sos">
          <Button
            style={{ borderRadius: "50%" }}
            variant="danger"
            disabled={sos}
            onClick={(e) => handleSOS()}
            size="xlg"
          >
            SOS{" "}
          </Button>
        </section>
        <section className="lp-sec">
          {sos && (
            <Button
              variant="success"
              // disabled={!sos}
              onClick={(e) => setOpenModal(true)}
              size="xlg"
            >
              Mark Safe{" "}
            </Button>
          )}
        </section>
        {openModal && (
          <MarkSafeModal incident_id={incident_id} setSos={setSos} />
        )}
      </div>
    </Container>
  );
};
