// import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ items }) => {
  function DropDownItem({ url, icon, content, onClickEventHandler }) {
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
    <div className="dropdown-menu">
      <ul>
        {items?.map((x) => (
          <DropDownItem url={x.url} content={x.name} key={x.id}>
            {x.name}
          </DropDownItem>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;

// function DropdownMenu({ dropdownProps, className }) {
//   function DropDownItem({ url, icon, content, onClickEventHandler }) {
//     return (
//       // <Link onClick={onClickEventHandler} to={url} className="menu-item">
//       <div>
//         <span className="icon-button">{icon}</span>
//         {content}
//       </div>
//       // </Link>
//     );
//   }
//   return (
//     <StyledDiv className={className}>
//       {dropdownProps.map((dropdownProp, index) => (
//         <DropDownItem
//           key={`dropDownItem${index}`}
//           content={dropdownProp.content}
//           icon={dropdownProp.icon}
//           url={dropdownProp.url}
//           onClickEventHandler={dropdownProp.onClickEventHandler}
//         />
//       ))}
//     </StyledDiv>
//   );
// }
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
// export default DropdownMenu;
