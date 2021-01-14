export  type Props = {
    data: Market[]
  
   }


   export type  PropsFunction = () => void;
   export type ModalProps = {
    
      handleClose: PropsFunction, 
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
      setAddress: React.Dispatch<React.SetStateAction<string>>,
      setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
      question: string,
      outcome:string, 
      errorMessage: string, 
      address: string,
      balance: string | undefined,
      show: boolean
   }
  
   export  type Market = {
    id: number,
    question: string,
    conditionId: string,
    slug: string,
    twitter_card_image: string,
    resolution_source: string,
    end_date: string,
    category: string,
    amm_type: string,
    liquidity: string,
    sponsor_name: string,
    sponsor_image: string,
    start_date: string,
    x_axis_value: unknown,
    y_axis_value: unknown,
    denomination_token: string,
    fee: unknown,
    image: string,
    icon: string,
    lower_bound: string,
    upper_bound: string,
    description: string,
    tags: string[],
    outcomes: string[],
    outcomePrices: string[],
    volume: string,
    active: boolean,
    market_type: string,
    format_type: string,
    lower_bound_date: string,
    upper_bound_date: string,
    closed: boolean,
    marketMakerAddress: string,
    created_at: string,
    updated_at: string,
    closed_time: string,
    wide_format: unknown,
    new: boolean,
    sent_discord: boolean,
    mailchimp_tag: string,
    use_cases: any[],
    seo: string
  
  
  }