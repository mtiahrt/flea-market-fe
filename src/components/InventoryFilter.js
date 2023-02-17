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

function InventoryFilter({ setFilter }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES_WITH_SUBCATEGORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleChangeEventChecked = (categoryId, subcategoryId) => {
    console.log('handle add');
    setFilter((prev) => {
      return prev.find((c) => c.categoryId === categoryId)
        ? prev.map((item) => {
            if (item.categoryId === categoryId) {
              return {
                categoryId: categoryId,
                subcategoryIds: [...item.subcategoryIds, subcategoryId],
              };
            }
          })
        : [
            ...prev,
            { categoryId: categoryId, subcategoryIds: [subcategoryId] },
          ];
    });
  };
  const handleChangeEventUnchecked = (categoryId, subcategoryId) => {
    setFilter((prev) => {
      if (prev.length === 1 && prev[0].subcategoryIds.length === 1) {
        return [];
      }
      return prev.map((item) => {
        if (item.categoryId === categoryId) {
          return item.subcategoryIds.length <= 1
            ? prev.filter((x) => x.categoryId !== categoryId)
            : {
                ...item,
                subcategoryIds: item.subcategoryIds.filter(
                  (x) => x !== subcategoryId
                ),
              };
        } else {
          return item;
        }
      });
    });
  };
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

  function handleSwitchChange() {}

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
          <FormControlLabel
            value="All"
            control={<Switch onChange={handleSwitchChange} color="primary" />}
            label="All"
            labelPlacement="end"
          />
          <AccordionDetails>
            {cat.subcategoriesList.map((sub) => (
              <FormControlLabel
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
