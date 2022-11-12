import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IconButton from '@mui/material/IconButton';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InsightsIcon from '@mui/icons-material/Insights';
import './Landing.css';
import { sendSOS } from './Services/SendSOS';
import { useState } from 'react';
import {
    Link
  } from "react-router-dom";

export const LandingPage = () => {
    const [sos, setSos] = useState(false);
    return <Container>
        <div>
            <section className='lp-header'>   <Link to="/account/"> <IconButton size="lg"><ManageAccountsIcon></ManageAccountsIcon></IconButton></Link>
                <Link to="/map/"><IconButton size="lg"><InsightsIcon></InsightsIcon></IconButton></Link>
            </section>
            <section className='lp-sos'><Button variant="danger" onClick={async (e) => {
                const resp = await sendSOS('john', navigator.geolocation, Date.now());
                setSos(resp)
            }} size="xlg">
                SOS        </Button></section>
            <section className='lp-sec'><Button variant="success" disabled={true} size="xlg">
                Mark Safe        </Button></section>
        </div>

    </Container>;
}