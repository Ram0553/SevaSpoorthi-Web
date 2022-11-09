import Dropdown from './Dropdown';

function MenuItems({ items })  {
    return (
        <div>
        {items.submenu ? (
            <div className="nav-items">
            <a href="#">
                {items.title}{' '}
            </a>
            <Dropdown submenus={items.submenu} />
            </div>
            
        ) : (
            <div className="nav-items">
            <a href={items.url}>{items.title}</a>
            </div>
        )}
        </div>
    );
};

export default MenuItems;