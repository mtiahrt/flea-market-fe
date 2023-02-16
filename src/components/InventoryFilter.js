import React from 'react';
import { useQuery } from '@apollo/client';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GET_CATEGORIES_WITH_SUBCATEGORIES } from '../queries/graphQL';
import { Checkbox, FormControlLabel } from '@mui/material';

function InventoryFilter({ filter, setFilter }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES_WITH_SUBCATEGORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleChangeEvent = (e, categoryId, subcategoryId) => {
    setFilter((prevState) => {
      return e.target.checked
        ? {
            categoryId: [...prevState.categoryId, categoryId],
            subcategoryId: [...prevState.subcategoryId, subcategoryId],
          }
        : {
            categoryId: prevState.categoryId.filter((x) => x !== categoryId),
            subcategoryId: prevState.subcategoryId.filter(
              (x) => x !== subcategoryId
            ),
          };
    });
  };
  return (
    <div role="filter-selections">
      {data.categoriesList.map((cat) => (
        <Accordion key={cat.id} role={cat.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{cat.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {cat.subcategoriesList.map((sub) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => handleChangeEvent(e, cat.id, sub.id)}
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
