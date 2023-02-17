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
            } else {
              return item;
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
      if (
        prev.find((x) => x.categoryId === categoryId).subcategoryIds.length <= 1
      ) {
        return prev.filter((x) => x.categoryId !== categoryId);
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

  const handleSwitchChange = (e, categoryId) => {
    return e.target.checked
      ? setFilter((prev) => {
          return [
            ...prev,
            {
              categoryId: categoryId,
              subcategoryIds: data.categoriesList
                .find((x) => x.id === categoryId)
                .subcategoriesList.map((x) => x.id),
            },
          ];
        })
      : setFilter((prev) => prev.filter((x) => x.categoryId !== categoryId));
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
            {cat.subcategoriesList.map((sub) => (
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
