import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconButton from "@mui/material/IconButton";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InsightsIcon from "@mui/icons-material/Insights";
import "./Landing.css";

export const LandingPage = () => (
  <Container>
    <div>
      <section className="lp-header">
        <IconButton size="lg">
          <ManageAccountsIcon></ManageAccountsIcon>
        </IconButton>
        <IconButton size="lg">
          <InsightsIcon></InsightsIcon>
        </IconButton>
      </section>
      <section className="lp-sos">
        <Button variant="danger" size="xlg">
          SOS{" "}
        </Button>
      </section>
      <section className="lp-sec">
        <Button variant="success" disabled="true" size="xlg">
          Mark Safe{" "}
        </Button>
      </section>
    </div>
  </Container>
);
