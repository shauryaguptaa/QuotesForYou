import { useRef, useState } from 'react';
import { Prompt } from 'react-router-dom/cjs/react-router-dom.min';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isentered,setisentered] =useState(false);
  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
  const EnteringHandler = ()=>{
    setisentered(false);
  }
  const formFocusHandler =()=>{
    //console.log('!Focus');
    setisentered(true);
  }
  return (
    <Card>
    <Prompt when={isentered} message={(location)=> 'Are you sure to leave the page? All your entered data will be lost!'}/>
      <form onFocus ={formFocusHandler}className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button onClick={EnteringHandler} className='btn'>Add Quote</button>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;
