import { useState } from 'react'
import { API } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import { onError } from '../lib/errorLib'
import config from '../config'
import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import BillingForm from '../components/BillingForm'

const SettingsContainer = styled.div`
  @media all and (min-width: 480px) {
    padding: 60px 0;
 
    form {
      margin: 0 auto;
      max-width: 480px;
    }
  }
`

export default function Settings () {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const stripePromise = loadStripe(config.STRIPE_KEY)

  async function handleFormSubmit (storage, { token, error }) {
    if (error) {
      onError(error)
      return
    }

    setIsLoading(true)

    try {
      await billUser({
        storage,
        source: token.id
      })

      alert('Your card has been charged successfully')
      history.push('/')
    } catch (err) {
      onError(err)
      setIsLoading(false)
    }
  }

  return <SettingsContainer>
    <Elements
      stripe={stripePromise}
      fonts={[{
        cssSrc: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800",
      }]}>
      <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
    </Elements>
  </SettingsContainer >
}

function billUser (details) {
  return API.post("notes", "/billing", {
    body: details
  });
}