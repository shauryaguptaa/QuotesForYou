import { useParams ,Route,useRouteMatch} from "react-router-dom/cjs/react-router-dom.min"
import { Fragment } from "react/cjs/react.production.min";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { Link } from "react-router-dom";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useEffect } from "react";

export default function QuoteDetail(){
    const para = useParams();
    const match =useRouteMatch();
    const {quoteId} = para;
    const {sendRequest, status , data:loadedQuote,error} = useHttp(getSingleQuote,true);
    useEffect(()=>{
        sendRequest(quoteId);
    },[sendRequest,quoteId])
    if(status === 'pending'){
        return <div className="centered">
            <LoadingSpinner/>
        </div>
    }
    if(error){
        <div className="centered focused">{error} </div>
    } 
    if(!loadedQuote.text){
        return <p>No Quote Found</p>
    }
    return (
        <Fragment>
            <HighlightedQuote text = {loadedQuote.text} author={loadedQuote.author}/>
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`/quotes/${para.quoteId}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
            <Comments/>
        </Route>
        </Fragment>
    )
}