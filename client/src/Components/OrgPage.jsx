import { Container } from "@mui/system";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export const OrgPage = () => {
  const [flag, setFlag] = useState(false);

  const handleChange = async (e) => {
    let response = await fetch("http://localhost:4000/sendalerts/", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Accept: "application/json, text/plain, */*",
      },
    });
    response = await response.json();
    setFlag(true);
  };

  return (
    <Container>
      <Button
        variant="danger"
        disabled={flag}
        style={{ marginLeft: "20px", textAlign: "center", marginTop: "50vh" }}
        onClick={(e) => handleChange(e)}
        value="Weapons"
      >
        Send alerts to my Org
      </Button>
    </Container>
  );
};
