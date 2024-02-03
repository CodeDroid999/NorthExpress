import React from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

export default function PaymentForm({ assignTutor }) {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!')
          break
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (error?.type === 'card_error' || error?.type === 'validation_error') {
      setMessage(error?.message)
    } else {
      await assignTutor()
    }

    setIsLoading(false)
  }

  const paymentElementOptions: any = {
    layout: 'tabs',
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-full">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="mt-6 w-full rounded-full bg-green-900 py-2 font-semibold text-white"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="pt-1 text-center text-red-500">
          {message}
        </div>
      )}
    </form>
  )
}
