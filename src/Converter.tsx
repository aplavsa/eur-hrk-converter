import React, { ChangeEvent, FormEventHandler, MouseEventHandler, useState } from 'react'
import styled from 'styled-components'

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
    const [racun, setRacun] = useState<number>();
    const [cash, setCash] = useState<number>(); 
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
                setRacun(parsedNumber)
                break;
                case "cash":
                    setCash(parsedNumber)
                    break;
        
            default:
                break;
        }
    }
const calculate: FormEventHandler = (e) => {
    e.preventDefault(); 
    if(!racun || !cash) {
      return; 
    }
    let iznosUHrk = racun * TECAJ; 
    let ostatak = cash - iznosUHrk; 
    if(ostatak > 0) {
        setToReturn(ostatak / TECAJ);
    } else {
        setError("Nedovoljno za podmiriti račun")
    }
}

const racunUKunama = ((racun ? racun : NaN) * TECAJ)
  return (
    <Wrapper>
        <form onSubmit={calculate}>
      <TextContainer>
        <p>Unesite iznos računa u eurima</p>
      </TextContainer>
      <TextContainer>
        <label htmlFor="amount">Iznos (€)</label>
        <input name="amount" autoComplete="off" type="number" onChange={handleChange} value={racun}/>
      </TextContainer>
      {!isNaN(racunUKunama) && <TextContainer>
        <p>Iznos u kunama: <span>{racunUKunama.toFixed(2)}</span></p>
      </TextContainer>}
      <TextContainer>
        <label htmlFor="cash">Iznos gotovine (HRK)</label>
        <input name="cash" autoComplete="off" type="number" onChange={handleChange} value={cash}/>
      </TextContainer>
      <TextContainer>
        <span>{error}</span>
      </TextContainer>
      <TextContainer>
        <button type="submit">Izračunaj</button>
      </TextContainer>
      <Container>
        <p>
          Rezultat: <span>{toReturn.toFixed(2)}</span> €
        </p>
      </Container>
      </form>
    </Wrapper>
  );
}
