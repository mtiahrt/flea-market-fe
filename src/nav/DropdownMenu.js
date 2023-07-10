import { Link } from 'react-router-dom';

function DropdownMenu(props) {
  function DropDownItem(props) {
    return (
      <Link to={props.url} className="menu-item">
        <span className="icon-button">{props.icon}</span>
        {props.content}
      </Link>
    );
  }
  return (
    <div className="dropdown">
      {props.dropdownProps.map((dropdownProp) => (
        <DropDownItem
          content={dropdownProp.content}
          icon={dropdownProp.icon}
          url={dropdownProp.url}
        />
      ))}
    </div>
  );
}
export default DropdownMenu;
