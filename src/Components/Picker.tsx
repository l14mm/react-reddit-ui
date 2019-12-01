import React from "react";
import { Select, MenuItem, InputLabel, OutlinedInput, makeStyles, FormControl } from "@material-ui/core";

interface PickerProps {
  options: string[];
  value: string;
  onChange: Function;
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  }
}));

const Picker = ({ value, onChange, options }: PickerProps) => {
  const classes = useStyles();
  return (
    <span>
      <FormControl variant="outlined"
        className={classes.formControl}
      >
        <InputLabel htmlFor="outlined-subreddit-simple">Subreddit</InputLabel>
        <Select
          style={{ margin: 1 }}
          value={value}
          onChange={e => onChange(e.target.value)}
          input={<OutlinedInput labelWidth={50} name="subreddit" id="outlined-subreddit-simple" />}
        >
          {options.map(option => (
            <MenuItem value={option} key={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </span >
  )
}

export default Picker;
