import { Link } from 'react-router-dom';
import { ReactComponent as SaleIcon } from '../icons/sale-svgrepo-com.svg';
import { ReactComponent as CategoryIcon } from '../icons/category-svgrepo-com.svg';

function DropdownMenu() {
  function DropDownItem(props) {
    return (
      <Link to={props.url} className="menu-item">
        <span className="icon-button">{props.icon}</span>
        {props.children}
      </Link>
    );
  }
  return (
    <div className="dropdown">
      <DropDownItem url="/addItem" icon={<SaleIcon />}>
        Inventory Item
      </DropDownItem>
      <DropDownItem url="/editCategories" icon={<CategoryIcon />}>
        Category
      </DropDownItem>
    </div>
  );
}
export default DropdownMenu;
