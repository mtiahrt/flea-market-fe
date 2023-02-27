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
        <Select
          onChange={(e, newValue) => {
            onChange(newValue);
            changeHandler(e);
          }}
          label={'Category'}
        >
          {generateSelectOptions()}
        </Select>
      )}
    />
  );
};
