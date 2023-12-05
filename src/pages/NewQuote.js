import QuoteForm from "../components/quotes/QuoteForm";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
export default function NewQuote(){
    const history = useHistory();
    const {sendRequest,status} = useHttp(addQuote);
    useEffect(()=>{
        if(status === 'completed'){
            history.push('/quotes');
        }
    },[status,history])
    const addQuoteHandler =(quoteData)=>{
        sendRequest(quoteData);
    }
    return (
        <QuoteForm isLoading={status === 'pending'}onAddQuote={addQuoteHandler}/>
    )
}