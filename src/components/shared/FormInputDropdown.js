import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

export const FormInputDropdown = ({
  name,
  control,
  label,
  options,
  changeHandler,
}) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem
          role={option.roleName}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth={true}>
          <InputLabel id="form-input-label">{label}</InputLabel>
          <Select
            labelId="form-input-label"
            label={label}
            style={{ marginBottom: '1em' }}
            onChange={(e, newValue) => {
              onChange(newValue);
              changeHandler(e);
            }}
          >
            {generateSelectOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
};
