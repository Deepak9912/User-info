import react, {useState} from 'react';
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Helpers';

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const AddUserHandler = (event) => {
        event.preventDefault();
        //validation
        if(enteredUsername.trim() === 0 || enteredAge.trim() === 0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        if(+enteredAge < 1){
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (must be over 1).'
            })
            return;}
        props.onAddUser(enteredUsername, enteredAge);
        //to reset the form
        setEnteredUsername('');
        setEnteredAge('');
    }

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <Wrapper>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
        <Card className={classes.input}>
            <form onSubmit={AddUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type='text' value={enteredUsername} onChange={usernameChangeHandler} />
                <label htmlFor="age">Age</label>
                <input id="age" type='number' value={enteredAge} onChange={ageChangeHandler} />
                <Button type="submit">Add User</Button>
            </form>
        </Card>
        </Wrapper>
    )
}

export default AddUser;