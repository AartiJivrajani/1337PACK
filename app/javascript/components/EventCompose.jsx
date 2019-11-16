import React from "react";
import useForm from "react-hook-form";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    appBar: {
	position: 'relative',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function required(field) {
    return function validateRequired(value) {
    return value !== null || `${field} is required.`;
  };
};

const defaultValues = {
    start_time: new Date(),
};

function EventCompose(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, errors, getValues, setValue } = useForm({
	defaultValues
    });
    
    const handleClickOpen = () => {
	setOpen(true);
    };

    const handleClose = () => {
	setOpen(false);
    };

    const onSubmit = data => {
	console.log(data);
    };

    const handleDateChange = date => {
	setValue("start_time", date);
    };

    React.useEffect(() => {
	register({ name: "start_time", type: "datetime-local" });
    });

    const values = getValues();
    
    return (
	<div>
	  {props.onDrawer ? (
	      <ListItem button key='Post Event'
			onClick={handleClickOpen}>
		<ListItemIcon><AddIcon /></ListItemIcon>
		<ListItemText primary='Post Event' />
              </ListItem>
	  ) : (
	      <Button variant="contained" color="primary"
		      onClick={handleClickOpen}>
		Post New Event
	      </Button>
	  )}
	  <Dialog fullScreen open={open} onClose={handleClose}
		  TransitionComponent={Transition}>
	    <AppBar className={classes.appBar}>
	      <Toolbar>
		<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
		  <CloseIcon />
		</IconButton>
		<Typography variant="h6" className={classes.title}>
		  New event
		</Typography>
              </Toolbar>
            </AppBar>
	    <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
		<form className={classes.form}
		      noValidate
		      onSubmit={handleSubmit(onSubmit)}>
		  
		  <TextField variant="outlined" margin="normal"
                             required fullWidth
                             id="title" name="title"
                             label="Event Title"
                             autoFocus
                             inputRef={register({ required: true })}/>
                  {errors.title && 'Title is required.'}
		  
		  <TextField variant="outlined" margin="normal"
                             required fullWidth
                             id="host_name" name="host_name"
                             label="Hosted By"
                             autoFocus
                             inputRef={register({ required: true })}/>
                  {errors.host_name && 'Host name is required.'}

		  <MuiPickersUtilsProvider utils={DateFnsUtils}>
		    <DateTimePicker id="start_time"
				    name="start_time"
				    label="Event Date & Time"
				    inputVariant="outlined"
				    margin="normal"
				    required fullWidth
				    value={values.start_time}
				    onChange={handleDateChange}/>
		  </MuiPickersUtilsProvider>
		  
		  <TextField variant="outlined" margin="normal"
                             fullWidth
                             id="location_name" name="location_name"
                             label="Location"
                             autoFocus
                             inputRef={register}/>
		  
		  <TextField variant="outlined" margin="normal"
                             fullWidth
                             id="street_address" name="street_address"
                             label="Street Address"
                             autoFocus
                             inputRef={register}/>
		  
		  <TextField variant="outlined" margin="normal"
			     id="description" name="description"
			     label="Event Description"
			     multiline
			     fullWidth
			     autoFocus
			     inputRef={register}/>
		  
		  <Button type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}>
		    Post
                  </Button>
		</form>
	      </div>
	    </Container>
	  </Dialog>
	</div>
    );
};

export default withRouter(EventCompose);
