import react, {useState, useRef	} from 'react';
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Helpers';

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState();

    const AddUserHandler = (event) => {
        event.preventDefault();
        const entedredName = nameInputRef.current.value;
        const entedredUserAge = ageInputRef.current.value;
        
        //validation
        if(entedredName.trim() === 0 || entedredUserAge.trim() === 0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        if(+entedredUserAge < 1){
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (must be over 1).'
            })
            return;}
        props.onAddUser(entedredName, entedredUserAge);
        //to reset the form using refs inseatd of state based solution
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };

    const errorHandler = () => {
        setError(null);
    }

    return (
        <Wrapper>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
        <Card className={classes.input}>
            <form onSubmit={AddUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type='text' ref={nameInputRef} />
                <label htmlFor="age">Age</label>
                <input id="age" type='number' ref={ageInputRef} />
                <Button type="submit">Add User</Button>
            </form>
        </Card>
        </Wrapper>
    )
}

export default AddUser;