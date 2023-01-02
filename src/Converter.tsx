import React, { ChangeEvent, FormEventHandler, MouseEventHandler, useState } from 'react'
import styled from 'styled-components'
import Alert from 'react-bootstrap/Alert'
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/esm/Button'

const Wrapper = styled.div`
    margin: 0;
    padding: 0rem;
    width: 100%; 
    
`

const TextContainer = styled.div`
    padding: 0 0.5rem;
    p {
        font-size: 1rem;
        font-weight: 400;
        color: rgb(0,0,0); 
        margin-block-start: 0;
    }
`
const Container = styled.div`
    width: auto;
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 0.5rem;
    background: ${props => props.theme.secondary};
    p {
        margin: 0;
        text-align: right;
    }
    span {
        font-size: 2rem;
    }
`

const TECAJ = 7.53450; 

export default function Converter() {
    const [racun, setRacun] = useState<string>();
    const [cash, setCash] = useState<string>(); 
    const [toReturn, setToReturn] = useState(0); 
    const [error, setError] = useState<string>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let parsedNumber = Number.parseFloat(e.target.value)
        if(isNaN(parsedNumber)){
            setError("Uneseni iznosi moraju biti u brojčanoj vrijednosti, npr. 12,6");
        }
        setError(undefined);
        switch (e.target.name) {
            case "amount":
                setRacun(e.target.value)
                break;
                case "cash":
                    setCash(e.target.value)
                    break;
        
            default:
                break;
        }
    }
const calculate: FormEventHandler = (e) => {
    e.preventDefault(); 
    setError(undefined); 
    if(!racun || !cash) {
      return; 
    }
    let parsedRacun = Number.parseFloat(racun);
    let parsedCash = Number.parseFloat(cash); 
    if(isNaN(parsedRacun) ||isNaN(parsedCash)){
      setError("Format unesenih iznosa mora biti u formatu npr. 12.58")
      return; 
    }
    let iznosUHrk = parsedRacun * TECAJ; 
    let ostatak = parsedCash - iznosUHrk; 
    if(ostatak > 0) {
        setToReturn(ostatak / TECAJ);
    } else {
        setError("Nedovoljno za podmiriti račun")
    }
}

const racunUKunama = ((racun ? Number.parseFloat(racun) : NaN) * TECAJ)
  return (
    <Wrapper>
      <Card>
        <Card.Body>
          <Card.Title>Izračun ostatka u EUR</Card.Title>
          <Card.Subtitle>
            Unesite iznos računa u eurima i iznos koji ste dali u kunama, a
            aplikacija će vam izračunati iznos ostatka u eurima.
          </Card.Subtitle>
          <Form onSubmit={calculate}>
            <TextContainer>
              <p>Unesite iznos računa u eurima</p>
            </TextContainer>
            <Form.Group>
              <Form.Label htmlFor="amount">Iznos (€)</Form.Label>
              <Form.Control
                name="amount"
                autoComplete="off"
                type="number"
                onChange={handleChange}
                value={racun}
                step="any"
                inputMode="decimal"
              />
            </Form.Group>
            {!isNaN(racunUKunama) && (
              <TextContainer>
                <p>
                  Iznos u kunama: <span>{racunUKunama.toFixed(2)}</span>
                </p>
              </TextContainer>
            )}
            <Form.Group className="mb-3" controlId="cash">
              <Form.Label htmlFor="cash">Iznos gotovine (HRK)</Form.Label>
              <Form.Control
                name="cash"
                autoComplete="off"
                type="number"
                onChange={handleChange}
                value={cash}
                step="any"
                inputMode="decimal"
              />
            </Form.Group>

            {error && <Alert variant="warning">{error}</Alert>}

            <Button type="submit">Izračunaj</Button>

            <Container>
              <p>
                Rezultat: <span>{toReturn.toFixed(2)}</span> €
              </p>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Wrapper>
  );
}
