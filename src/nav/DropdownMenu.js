import { Link } from 'react-router-dom';

function DropdownMenu({ dropdownProps }) {
  function DropDownItem({ url, icon, content, onClickEventHandler }) {
    return (
      <Link onClick={onClickEventHandler} to={url} className="menu-item">
        <span className="icon-button">{icon}</span>
        {content}
      </Link>
    );
  }
  return (
    <div className="dropdown">
      {dropdownProps.map((dropdownProp, index) => (
        <DropDownItem
          key={`dropDownItem${index}`}
          content={dropdownProp.content}
          icon={dropdownProp.icon}
          url={dropdownProp.url}
          onClickEventHandler={dropdownProp.onClickEventHandler}
        />
      ))}
    </div>
  );
}
export default DropdownMenu;
