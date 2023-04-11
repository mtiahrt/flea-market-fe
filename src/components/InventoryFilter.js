import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import styled from 'styled-components';
import NavItem from '../nav/NavItem';
import { ReactComponent as ChevronRight } from '../icons/chevron-right.svg';
import { ReactComponent as ChevronLeft } from '../icons/chevron-left.svg';

//ToDo: add color schemes

function InventoryFilter({
  categories,
  dispatchFilter,
  showComponent,
  showComponentClickHandler,
}) {
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
  function handleRightChevronClick() {
    showComponentClickHandler();
  }
  const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 1%;
    @media (max-width: 40em) {
      display: ${showComponent ? 'flex' : 'none'};
    }
  `;
  return (
    <StyledDivContainer className="filterContainer">
      <StyledDiv role="filter-selections">
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
              style={{ marginLeft: '2px', marginBottom: '10px' }}
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
        ))}{' '}
      </StyledDiv>
      <NavItem
        style={{ alignSelf: 'flex-start' }}
        className="chevron-left"
        backgroundColor="#9da0a375"
        url={'#'}
        icon={
          showComponent ? (
            <ChevronLeft name="filter" />
          ) : (
            <ChevronRight name="filter" />
          )
        }
        clickHandler={handleRightChevronClick}
      ></NavItem>
    </StyledDivContainer>
  );
}
const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export default InventoryFilter;
