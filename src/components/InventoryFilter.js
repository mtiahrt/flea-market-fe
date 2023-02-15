import React from 'react';
import { useQuery } from '@apollo/client';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GET_CATEGORIES_WITH_SUBCATEGORIES } from '../queries/graphQL';

function InventoryFilter() {
  const { loading, error, data } = useQuery(GET_CATEGORIES_WITH_SUBCATEGORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
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
              <label key={sub.id}>
                <input type="checkbox" />
                {sub.name}
              </label>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default InventoryFilter;
