import React from 'react';
import { useQuery } from '@apollo/client';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GET_CATEGORIES_WITH_SUBCATEGORIES } from '../queries/graphQL';
import { Checkbox, FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';

function InventoryFilter({ categories, dispatchFilter }) {
  const handleChangeEventChecked = (categoryId, subcategoryId) => {
    dispatchFilter({ type: 'added_subcategory', categoryId, subcategoryId });
  };
  const handleChangeEventUnchecked = (categoryId, subcategoryId) => {
    dispatchFilter({ type: 'removed_subcategory', categoryId, subcategoryId });
  };
  const handleSwitchChange = (e, categoryId) => {
    const dispatchObject = e.target.checked
      ? {
          type: 'added_category',
          subcategoryIds: categories
            .find((x) => x.id === categoryId)
            .subcategories.map((x) => x.id),
        }
      : { type: 'removed_category' };
    dispatchFilter({ ...dispatchObject, categoryId });
  };

  return (
    <div role="filter-selections">
      {categories?.map((cat) => (
        <Accordion key={cat.id} role={cat.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{cat.name}</Typography>
          </AccordionSummary>
          <FormControlLabel
            value="All"
            control={
              <Switch
                onChange={(e) => handleSwitchChange(e, cat.id)}
                color="primary"
              />
            }
            label="All"
            labelPlacement="end"
          />
          <AccordionDetails>
            {cat.subcategories.map((sub) => (
              <FormControlLabel
                key={sub.id}
                control={
                  <Checkbox
                    onChange={(e) =>
                      e.target.checked
                        ? handleChangeEventChecked(cat.id, sub.id)
                        : handleChangeEventUnchecked(cat.id, sub.id)
                    }
                    inputProps={{
                      'aria-label': 'subcategory',
                    }}
                  />
                }
                label={sub.name}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default InventoryFilter;
