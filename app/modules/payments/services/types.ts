export interface CreateCheckoutOptions {
  username: string
  price: string
  gistId: string
}

export interface IsAccountValidResponse {
  isValid: boolean
}

export interface CreateCheckoutResponse {
  id: string
  checkoutUrl: string
}

export interface CreatePayoutCheckoutResponse {
  accountId: string
  onboardingUrl: string
}
