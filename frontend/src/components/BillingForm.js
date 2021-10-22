import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import LoaderButton from './LoaderButton'
import { useFormFields } from '../lib/hooksLib'
import styled from 'styled-components'

const StyledForm = styled(Form)`
  .card-field {
    line-height: 1.5;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    padding: 0.55rem 0.75rem;
    background-color: white;
    border: 1px solid #ced4da;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .card-field.StripeElement--focus {
    outline: 0;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`

export default function BillingForm ({ isLoading, onSubmit }) {
  const stripe = useStripe();
  const elements = useElements();
  const [fields, handleFieldChange] = useFormFields({
    name: '',
    storage: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false)

  isLoading = isProcessing || isLoading;

  function validateForm () {
    return (
      stripe &&
      elements &&
      fields.name !== '' &&
      fields.storage !== '' &&
      isCardComplete
    );
  }
  async function handleSubmitClick (event) {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);
    setIsProcessing(false);
    onSubmit(fields.storage, { token, error });
  }
  return (
    <StyledForm onSubmit={handleSubmitClick}>
      <Form.Group size='lg' controlId='storage'>
        <Form.Label>Storage</Form.Label>
        <Form.Control
          min='0'
          type='number'
          value={fields.storage}
          onChange={handleFieldChange}
          placeholder='Number of notes to store'
        />
      </Form.Group>
      <hr />
      <Form.Group size='lg' controlId='name'>
        <Form.Label>Cardholder&apos;s name</Form.Label>
        <Form.Control
          type='text'
          value={fields.name}
          onChange={handleFieldChange}
          placeholder='Name on the card'
        />
      </Form.Group>
      <Form.Label>Credit Card Info</Form.Label>
      <CardElement
        className='card-field'
        onChange={(e) => setIsCardComplete(e.complete)}
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#495057',
              fontFamily: "'Open Sans', sans-serif",
            },
          },
        }}
      />
      <LoaderButton
        block
        size='lg'
        type='submit'
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Purchase
      </LoaderButton>
    </StyledForm>
  )
}