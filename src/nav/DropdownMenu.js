import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ items, className }) => {
  function DropDownItem({ url, content, icon, onClickEventHandler }) {
    return (
      <Link onClick={onClickEventHandler} to={url} className="menu-item">
        <div>
          <span className="icon-button">{icon}</span>
          {content}
        </div>
      </Link>
    );
  }

  return (
    <StyledDiv className={className}>
      <ul>
        {items?.map((x) => (
          <DropDownItem
            onClickEventHandler={x.onClickEventHandler}
            icon={x.icon}
            url={x.url}
            content={x.content}
            key={x.id}
          >
            {x.name}
          </DropDownItem>
        ))}
      </ul>
    </StyledDiv>
  );
};

export default DropdownMenu;

const StyledDiv = styled.div`
  position: absolute;
  margin-right: 10px;
  width: max(200px, 23%);
  background-color: var(--nav-bar-color);
  color: var(--icon-background-color);
  border: var(--border);
  border-radius: var(--border-radius);
  overflow: hidden;
  z-index: 2;
`;
